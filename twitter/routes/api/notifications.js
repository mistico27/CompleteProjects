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


router.get("/",async(req,res,next)=>{
   notification.find({ userTo: req.session.user._id, notificationType: { $ne: "newMessage" } })
   .populate("userTo")
   .populate("userFrom")
   .sort({createdAt:-1})
   .then(results =>res.status(200).send(results))
   .catch(error=>{
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message
        })
    })
})

module.exports =router;