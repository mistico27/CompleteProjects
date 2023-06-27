const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content:{
        type:String,
        trim:true
    },
    postedBy:{
        type:Schema.Types.ObjectId,ref:"user"
    },
    pinned:{
        type:Boolean
    },
    likes:[{type:Schema.Types.ObjectId,ref:"user"}]
},{ timestamps:true });


let post = mongoose.model('post',postSchema,"post");
module.exports=post;