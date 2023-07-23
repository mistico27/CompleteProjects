const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')
const chat =require('../../schemas/ChatSchema')
const message = require('../../schemas/MessageSchema')

app.use(bodyParser.urlencoded({extended:false}));


router.post("/",async(req,res,next)=>{
    if(!req.body.users){
        console.log("Users param not sent with request");
        return res.sendStatus(400);
    }
    let users=JSON.parse(req.body.users);
    if(users.length==0){
        console.log("Users array is empty");
        return res.sendStatus(400);
    }

    users.push(req.session.user);
    let chatData={
        users:users,
        isGroupChat:true
    };

    chat.create(chatData)
    .then(results=>res.status(200).send(results))
    .catch(error=>{
        res.status(error.status || 500);
        res.json({
          success: false,
          message: error.message
        })
    })
    

})


router.get("/", async (req, res, next) => {
    chat.find({ users: { $elemMatch: { $eq: req.session.user._id } }})
    .populate("users")
    
    .sort({ updatedAt: -1 })
    .then( results => {
       // results = await user.populate(results, { path: "latestMessage.sender" });
        res.status(200).send(results)
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.put("/:chatId",async(req,res,next)=>{
    chat.findByIdAndUpdate(req.params.chatId,req.body)
    .then(results=>res.sendStatus(204))
    .catch(error=>{
        res.status(error.status || 500);
        res.json({
          success: false,
          message: error.message
        })
    })
})


router.get("/:chatId",async(req,res,next)=>{
    chat.findOne({
        _id:req.params.chatId, users:{$elemMatch:{$eq:req.session.user._id}}
    })
    .populate("users")
    .then(results=>res.status(200).send(results))
    .catch(error=>{
        res.status(error.status || 500);
        res.json({
          success: false,
          message: error.message
        })
    })
})

router.get("/:chatId/messages",async(req,res,next)=>{
    message.find({
        chat:req.params.chatId
    })
    .populate("sender")
    .then(results=>res.status(200).send(results))
    .catch(error=>{
        res.status(error.status || 500);
        res.json({
          success: false,
          message: error.message
        })
    })
})


module.exports =router;