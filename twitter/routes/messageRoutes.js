const express = require('express');
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');
const chat = require('../schemas/ChatSchema');


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

router.get("/:chatId", async (req, res, next) => {

    var userId = req.session.user._id;
    var chatId = req.params.chatId;

    var newchat = await chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } } })
    .populate("users");

    if(newchat == null) {
        // Check if chat id is really user id
    }

    res.status(200).render("chatPage", {
        pageTitle: "Chat",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        chat: newchat
    });
})




router.get("/new/mensaje", (req, res, next) => {
    res.status(200).render("newMessage", {
        pageTitle: "New message",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})





module.exports =router;