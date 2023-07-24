const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({


    userTo:{
        type:Schema.Types.ObjectId,ref:"user"
    },

    userFrom:{
        type:Schema.Types.ObjectId,ref:"user"
    },

    notificationType:{
        type:String
    },
    opened:{
        type:Boolean,default:false
    },
    entityId:{
       type: Schema.Types.ObjectId
    }
    
},{ timestamps:true });


notificationSchema.statics.insertNotification=async(userTo,userFrom,notificationType,entityId)=>{
    let data={
        userTo:userTo,
        userFrom:userFrom,
        notificationType:notificationType,
        entityId:entityId
    };
    await notification.deleteOne(data).catch(error=>{console.log(error)})
    return notification.create(data).catch(error=>{console.log(error)});
}


let notification = mongoose.model('notification',notificationSchema,"notification");
module.exports=notification;