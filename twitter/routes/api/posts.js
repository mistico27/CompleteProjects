const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')



app.use(bodyParser.urlencoded({extended:false}));


router.get("/",(req,res,next)=>{
    try{
        res.status(200).render("login");
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

module.exports =router;