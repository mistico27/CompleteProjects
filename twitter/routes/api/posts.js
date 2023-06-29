const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')


app.use(bodyParser.urlencoded({extended:false}));


router.get("/",async(req,res,next)=>{
  let results= await getPosts({});
  res.status(200).send(results);
})

///with Id
router.get("/:id",async (req,res,next)=>{
  let postdId= req.params.id;

  let results= await getPosts({_id:postdId});
  results=results[0];
    res.status(200).send(results);
})




router.post("/",async(req,res,next)=>{
    

        let postData = {
          content:req.body.content,
          postedBy:req.session.user
        }
         post.create(postData)
         .then(async(newPost)=>{
            newPost=await user.populate(newPost,{path:"postedBy"})
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

  res.status(200).send(newPost)
})


///retweet
router.post("/:id/retweet",async(req,res,next)=>{
    
  let postId=req.params.id;
  let userId=req.session.user._id;

  ///try and delete tweet
  let deletedPost= await post.findOneAndDelete({postedBy:userId,retweetData:postId})
  .catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })

  let option=deletedPost !=null? "$pull":"$addToSet"
  
  let repost= deletedPost;
  if(repost==null){
    repost=await post.create({
      postedBy:userId,retweetData:postId
    }).catch(error=>{
      console.log(error);
      res.sendStatus(400);
    })
  }

  ///insert UserLike
  req.session.user= await user.findByIdAndUpdate(userId,{[option]:{retweets:repost._id}},{new:true})
  .catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })



  let newpostII= await post.findByIdAndUpdate(postId,{[option]:{retweetUsers:userId}},{new:true})
  .catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
  

  res.status(200).send(newpostII)
})


async function getPosts(filter){

   let results= await post.find(filter)
    .populate("postedBy")
    .populate("retweetData")
    .sort({"createdAt":-1})
    .catch(error=>{
      res.sendStatus(400);
      res.message(error.message)
    })
    
      return await user.populate(results,{path:"retweetData.postedBy"});  
  
}



module.exports =router;