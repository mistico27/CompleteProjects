const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')
const chat =require('../../schemas/ChatSchema')
const messages =require('../../schemas/MessageSchema')

app.use(bodyParser.urlencoded({extended:false}));


router.post("/",async(req,res,next)=>{
   if(!req.body.content || !req.body.chatId){
        console.log("invañlid data for messenger");
        return res.sendStatus(400);
   }

   let newMessage={
    sender:req.session.user._id,
    content:req.body.content,
    chat:req.body.chatId
   }
messages.create(newMessage)
.then((message)=>{
    res.status(201).send(message);
}).catch(error=>{
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message
    })
})

})


module.exports =router;