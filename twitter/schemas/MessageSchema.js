const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender:{type:Schema.Types.ObjectId,ref:"user"},
    content:{type:String,trim:true},
    chat:{type:Schema.Types.ObjectId,ref:"chat"},
    readBy:[{type:Schema.Types.ObjectId,ref:"user"}]
},{ timestamps:true });


let message = mongoose.model('message',messageSchema,"message");
module.exports=message;