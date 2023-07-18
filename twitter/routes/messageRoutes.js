const express = require('express');
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');


router.get("/",(req,res,next)=>{
    try{
        let payload = {
            pageTitle:"Inbox",
            userLoggedIn:req.session.user,
            userLoggedInJs:JSON.stringify(req.session.user)
    };
        res.status(200).render("inboxPage",payload);
    }catch(e){
        res.status(e.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})

router.get("/new",(req,res,next)=>{
    try{
        let payload = {
            pageTitle:"new Message",
            userLoggedIn:req.session.user,
            userLoggedInJs:JSON.stringify(req.session.user)
    };
        res.status(200).render("newMessage",payload);
    }catch(e){
        res.status(e.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})





module.exports =router;