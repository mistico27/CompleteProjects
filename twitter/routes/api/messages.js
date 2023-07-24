const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')
const Chat =require('../../schemas/ChatSchema')
const messages =require('../../schemas/MessageSchema');
const notification = require('../../schemas/NotificationSchema');

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
.then(async(message)=>{
    message= await message.populate("sender");
    message= await message.populate("chat");
    message= await user.populate(message,{path:"chat.users"})
    
     Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message})
    .catch(error=>{
      res.status(error.status || 500);
      res.json({
        success: false,
        message: error.message
      })
  })
  //  insertNotification(chat,message);
    res.status(201).send(message);
}).catch(error=>{
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message
    })
})

})


function insertNotification(chat,message){
  chat.users.forEach(userId => {
    if(userId== message.sender._id){
      return;
    }
    notification.insertNotification(userId,message.sender._id,"newMessage",message.chat._id)
  });
}

module.exports =router;