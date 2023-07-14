const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const multer =require("multer");
const upload=multer({dest:"uploads/"});
const post =require('../../schemas/PostSchema')
const user =require('../../schemas/UserSchema')
const path = require("path")
const fs = require("fs")


app.use(bodyParser.urlencoded({extended:false}));


router.put("/:userId/follow",async(req,res,next)=>{

    let userId=req.params.userId;
    
    let newuser=await user.findById(userId);
    if(newuser== null){
       return res.status(404);
    }

    let isFollowing=newuser.followers && newuser.followers.includes(req.session.user._id);
    let option=isFollowing?"$pull":"$addToSet";
    req.session.user= await user.findByIdAndUpdate(req.session.user._id,{[option]:{following:userId}},{new:true})
    .catch(error=>{
      console.log(error);
      res.sendStatus(400);
    })

    user.findByIdAndUpdate(userId,{[option]:{followers:req.session.user._id}})
    .catch(error=>{
      console.log(error);
      res.sendStatus(400);
    })


    res.status(200).send(req.session.user);

})


router.get("/:userId/following",async(req,res,next)=>{
  user.findById(req.params.userId)
  .populate("following")
  .then(results=>{
    res.status(200).send(results);
  })
  .catch(error=>{
    res.status(error.status || 500)
    res.json({
      success: false,
      message: error.message
    })
  })

});

router.get("/:userId/followers",async(req,res,next)=>{
  user.findById(req.params.userId)
  .populate("followers")
  .then(results=>{
    res.status(200).send(results);
  })
  .catch(error=>{
    res.status(error.status || 500)
    res.json({
      success: false,
      message: error.message
    })
  })

});


router.post("/profilePicture",upload.single("croppedImage"),async(req,res,next)=>{
  if(!req.file){
    console.log("no filed uploaded with ajax request,");
    return res.sendStatus(400)
  }
  let filePath = `/uploads/images/${req.file.filename}.png`;
  let tempPath = req.file.path;
  let targetPath= path.join(__dirname,`../../${filePath}`);
  fs.rename(tempPath,targetPath, async error=>{
    if(error != null){
        console.log(error);
        return res.sendStatus(400);
    }
    req.session.user =await user.findByIdAndUpdate(req.session.user._id,{profilePic:filePath},{new:true});
    res.sendStatus(204);
  })
 
});




module.exports =router;