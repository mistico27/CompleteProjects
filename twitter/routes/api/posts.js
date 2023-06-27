const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')


app.use(bodyParser.urlencoded({extended:false}));


router.get("/",(req,res,next)=>{
    try{
        post.find()
        .populate("postedBy")
        .then((results)=>{
          res.status(200).send(results)
        })
        .catch(error=>{
          res.sendStatus(400);
          res.message(error.message)
        })
    }catch(e){
        res.status(err.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})


router.post("/",async(req,res,next)=>{
    

        let postData = {
          content:req.body.content,
          postedBy:req.session.user
        }
         post.create(postData)
         .then(async(newPost)=>{
            newPost=await user.populate(newPost,{path:"postedBy"})
            res.status(201).send(newPost);

         })
         .catch(error=>{
          console.log(error);
          res.sendStatus(400);
         })
        
    
})

router.put("/:id/like",async(req,res,next)=>{
    
  let postId=req.params.id;
  let userId=req.session.user._id;
  ///like or not like it
  let isLiked =req.session.user.likes && req.session.user.likes.includes(postId);

  let option=isLiked? "$pull":"$addToSet"
  ///insert User like

  req.session.user= await user.findByIdAndUpdate(userId,{[option]:{likes:postId}},{new:true})
  .catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
  
  ///insert Post like
  let newPost= await post.findByIdAndUpdate(postId,{[option]:{likes:userId}},{new:true})
  .catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })

  res.status(200).send(newPost)
})
module.exports =router;