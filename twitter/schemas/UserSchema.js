const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName :{
        type:String,
        required:true,
        trim:true
    },
    lastName :{
        type:String,
        required:true,
        trim:true
    },
    username :{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email :{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },

    profilePic :{
        type:String,
        default:"/images/profilePic.jpg"
    },
    coverPhoto :{
        type:String
    },
    likes:[{type:Schema.Types.ObjectId,ref:"post"}],
    retweets:[{type:Schema.Types.ObjectId,ref:"post"}],
    following:[{type:Schema.Types.ObjectId,ref:"user"}],
    followers:[{type:Schema.Types.ObjectId,ref:"user"}]
},{ timestamps:true });


let user = mongoose.model('user',userSchema,"user");
module.exports=user;