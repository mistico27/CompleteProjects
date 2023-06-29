const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');
const bcrypt= require('bcrypt');


router.get("/:id",(req,res,next)=>{
    try{
        let payload = {
            pageTitle:"view Post",
            userLoggedIn:req.session.user,
            userLoggedInJs:JSON.stringify(req.session.user),
            postId:req.params.id
        }
        res.status(200).render("postPage",payload);
    }catch(e){
        res.status(err.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})



module.exports =router;