const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');
const bcrypt= require('bcrypt');


router.get("/",(req,res,next)=>{
    try{
        let payload = {
            pageTitle:req.session.user.username,
            userLoggedIn:req.session.user,
            userLoggedInJs:JSON.stringify(req.session.user),
            profileUser:req.session.user
        }
        res.status(200).render("profilePage",payload);
    }catch(e){
        res.status(err.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})




module.exports =router;