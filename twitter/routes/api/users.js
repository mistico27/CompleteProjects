const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')


app.use(bodyParser.urlencoded({extended:false}));


router.put("/:userId/follow",async(req,res,next)=>{

    let userId=req.params.userId;
    
    let newuser=await user.findById(userId);
    if(newuser== null){
       return res.status(404);
    }

    let isFollowing=newuser.followers && newuser.followers.includes(req.session.user._id);
    let option=isFollowing?"$pull":"$addToSet";
    req.session.user= await user.findByIdAndUpdate(req.session.user._id,{[option]:{following:userId}},{new:true})
    .catch(error=>{
      console.log(error);
      res.sendStatus(400);
    })

    user.findByIdAndUpdate(userId,{[option]:{followers:req.session.user._id}})
    .catch(error=>{
      console.log(error);
      res.sendStatus(400);
    })


    res.status(200).send(req.session.user);

})




module.exports =router;