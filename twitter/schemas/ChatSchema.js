const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    users:[{type:Schema.Types.ObjectId,ref:"user"}],
    latestMessage:[{type:Schema.Types.ObjectId,ref:"Message"}],
    
},{ timestamps:true });


let chat = mongoose.model('chat',chatSchema,"chat");
module.exports=chat;