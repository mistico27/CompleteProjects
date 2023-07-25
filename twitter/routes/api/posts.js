const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema');
const notification =require('../../schemas/NotificationSchema')


app.use(bodyParser.urlencoded({extended:false}));


router.get("/",async(req,res,next)=>{
  let searchObj= req.query;
  if(searchObj.isReply !== undefined){
      let isReply=searchObj.isReply=="true";
      searchObj.replyTo={$exists:isReply}
      delete searchObj.isReply;
  }


  if(searchObj.search !== undefined){
    searchObj.content = {$regex:searchObj.search,$options:"i"};
    delete searchObj.search;
  }

  /*if(searchObj.followingOnly !== undefined){
    let followingOnly=searchObj.followingOnly=="true";
    if(followingOnly){
      let objectIds=req.session.use.following;
      objectIds.push(req.session.user_id);
      searchObj.postedBy={$in:objectIds};
    }
    
      delete searchObj.followingOnly;

  }
      */
  
  
  let results= await getPosts(searchObj);
  res.status(200).send(results);
})

///with Id
router.get("/:id",async (req,res,next)=>{
  let postdId= req.params.id;

  let postData= await getPosts({_id:postdId});
  postData=postData[0];

  let results={
    postData:postData
  }



  if(postData.replyTo!=undefined){
    results.replyTo=postData.replyTo
  }  

  results.replies =await getPosts({
    replyTo:postdId
  })

    res.status(200).send(results);
})




router.post("/",async(req,res,next)=>{
    
        let postData = {
          content:req.body.content,
          postedBy:req.session.user
        }

        if(req.body.replyTo){
          postData.replyTo=req.body.replyTo;
        }

         post.create(postData)
         .then(async(newPost)=>{
            newPost=await user.populate(newPost,{path:"postedBy"})
            newPost=await user.populate(newPost,{path:"replyTo"})
            console.log("que onda soy newPost_id", newPost._id);
            if(newPost.replyTo !== undefined){
              await notification.insertNotification(newPost.replyTo.postedBy,req.session.user._id,"reply",newPost._id);  

            }
            res.status(201).send(newPost);

         })
         .catch(error=>{
          console.log(error);
          res.sendStatus(400);
         })
        
    
})

router.put("/:id/like",async(req,res,next)=>{
    
  let postId=req.params.id;
  let userId=req.session.user._id;
  ///like or not like it
  let isLiked =req.session.user.likes && req.session.user.likes.includes(postId);

  let option=isLiked? "$pull":"$addToSet"
  ///insert User like
  req.session.user= await user.findByIdAndUpdate(userId,{[option]:{likes:postId}},{new:true})
  .catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
  
  ///insert Post like
  let newPost= await post.findByIdAndUpdate(postId,{[option]:{likes:userId}},{new:true})
  .catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })


  if(!isLiked) {
    console.log("hey soy postedby", newPost.postedBy)
    await notification.insertNotification(newPost.postedBy, userId, "postLike", newPost._id);
}

  res.status(200).send(newPost)
})


///retweet
router.post("/:id/retweet",async(req,res,next)=>{
    console.log(req.session);
  let postId=req.params.id;
  let userId=req.session.user._id;

  ///try and delete tweet
  let deletedPost= await post.findOneAndDelete({postedBy:userId,retweetData:postId})
  .catch(error=>{
    res.status(error.status || 500)
    res.json({
      success: false,
      message: error.message
    })
  })

  let option=deletedPost !=null? "$pull":"$addToSet"
  
  let repost= deletedPost;
  if(repost==null){
    repost=await post.create({
      postedBy:userId,retweetData:postId
    }).catch(error=>{
      res.status(error.status || 500)
      res.json({
        success: false,
        message: error.message
      })
    })
  }

  ///insert UserLike
  req.session.user= await user.findByIdAndUpdate(userId,{[option]:{retweets:repost._id}},{new:true})
  .catch(error=>{
    res.status(error.status || 500)
    res.json({
      success: false,
      message: error.message
    })
  })



  let newpostII= await post.findByIdAndUpdate(postId,{[option]:{retweetUsers:userId}},{new:true})
  .catch(error=>{
    res.status(error.status || 500)
    res.json({
      success: false,
      message: error.message
    })
  })


  if(!deletedPost){
    await notification.insertNotification(newpostII.postedBy,userId,"retweet",newpostII._id);
  }

  

  res.status(200).send(newpostII)
})


async function getPosts(filter){

   let results= await post.find(filter)
    .populate("postedBy")
    .populate("retweetData")
    .populate("replyTo")
    .sort({"createdAt":-1})
    .catch(error=>{
      console.log(error)
    })
    results= await user.populate(results,{path:"replyTo.postedBy"});
      return await user.populate(results,{path:"retweetData.postedBy"});  
}


router.delete("/:id",(req,res,next)=>{
    post.findByIdAndDelete(req.params.id)
    .then(()=>{
      res.sendStatus(202) 
      }).catch(e=>{
        res.sendStatus(e.status); 
    })
})


router.put("/:id",async(req,res,next)=>{


  if(req.body.pinnned !== undefined){
    await post.updateMany({postedBy:req.session.user}, {pinned:false})
    .catch(e=>{
      res.sendStatus(e.status); 
  })
  }

  post.findByIdAndUpdate(req.params.id,req.body)
  .then(()=>{
    res.sendStatus(204) 
    }).catch(e=>{
      res.sendStatus(e.status); 
  })
})


module.exports =router;