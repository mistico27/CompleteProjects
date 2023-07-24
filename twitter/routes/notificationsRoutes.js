const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');
const chat = require('../schemas/ChatSchema');
const user = require('../schemas/UserSchema');


router.get("/",(req,res,next)=>{
    try{
        let payload = {
            pageTitle:"notifications",
            userLoggedIn:req.session.user,
            userLoggedInJs:JSON.stringify(req.session.user)
    };
        res.status(200).render("notificationPage",payload);
    }catch(e){
        res.status(e.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})




module.exports =router;