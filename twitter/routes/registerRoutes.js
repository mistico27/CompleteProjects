const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema')
const bcrypt= require('bcrypt');


app.set("view engine","pug");
app.set("views","views")


app.use(bodyParser.urlencoded({extended:false}));


router.get("/",(req,res,next)=>{
    try{
        res.status(200).render("register");
    }catch(e){
        res.status(err.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})

router.post("/",async(req,res,next)=>{
    try{

        let firstName=req.body.firstName.trim();
        let lastName=req.body.lastName.trim();
        let userName=req.body.username.trim();
        let email=req.body.email.trim();
        let password=req.body.password;

        let payload= req.body;

        if(firstName&&lastName&&userName&&email&&password){
         try{
            var user = await User.findOne({
            $or:[{
                    username:userName
                },
                {
                    email:email
                }]
           })
        }catch(e){
            res.status(e.status || 500);
            res.json({
              success: false,
              message: e.message
            })
        }  
        
        if(user===null){
           
           let data =req.body;
           data.password=await bcrypt.hash(password,10);
           User.create(data)
           .then((user)=>{
            req.session.user=user;
           return res.redirect("/");
           })

        }else{
            ///user found
            if(email==user.email){
                payload.errorMessage="email is already in Use";
            }else{
                payload.errorMessage="username is already in Use";
            }
            res.status(200).render("register",payload);

        }

        }else{
            payload.errorMessage="make sure that each field has a valid Value.";
            res.status(200).render("register",payload);
        }
    }catch(e){
        res.status(e.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})

module.exports =router;