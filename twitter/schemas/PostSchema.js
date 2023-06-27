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
    }
},{ timestamps:true });


let post = mongoose.model('post',postSchema,"post");
module.exports=post;