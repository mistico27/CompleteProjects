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
    let isValidId = mongoose.isValidObjectId(chatId);
    let payload ={
        pageTitle: "Chat",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    if(!isValidId){
        payload.errorMessage="chat does not exist or you do not have permission to do it."
        res.status(200).render("chatPage",payload);
    }

    var newchat = await chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } } })
    .populate("users");
    
    if(newchat == null) {
        // Check if chat id is really user id
        let userFound= await user.findById(chatId);
        if(userFound != null){
           chat = await getchatByUserId(userFound._id, userId);
        }
    }

    if(chat==null){
        payload.errorMessage="chat does not exist or you do not have permission to do it.";
    }else{
        payload.chat=newchat;
    }
    res.status(200).render("chatPage",payload);
})




router.get("/new/mensaje", (req, res, next) => {
    res.status(200).render("newMessage", {
        pageTitle: "New message",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})


function getchatByUserId(userLoggedInId,otherUserId){
    return chat.findOneAndUpdate({
        isGroupChat:false,
        users:{
            $size:2,
            $all:[
                {$elemMatch:{$eq:mongoose.Types.ObjectId(userLoggedInId)}},
                {$elemMatch:{$eq:mongoose.Types.ObjectId(otherUserId)}}
            ]
        }
    },{
        $setOnInsert:{
            users:[userLoggedInId,otherUserId]
        }
    },{
        new:true,
        upsert:true
    })
    .populate("users");
}




module.exports =router;