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
    likes:[{type:Schema.Types.ObjectId,ref:"post"}],
    retweets:[{type:Schema.Types.ObjectId,ref:"post"}]
},{ timestamps:true });


let user = mongoose.model('user',userSchema,"user");
module.exports=user;