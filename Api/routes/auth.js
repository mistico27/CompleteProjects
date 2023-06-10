const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
///Register
router.post("/register", async (req,res)=>{
    
    try{///create new Password
        const salt=await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hasPassword
        })
        //save user and response
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }

});

///login
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        if(req.body.password===user.password){
            res.status(200).json(user)
        }else{
            res.status(400).json("wrong password")
        }
    }catch(err){
        console.log(err);
    }
});


module.exports =router;