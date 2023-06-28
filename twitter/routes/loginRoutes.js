const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');
const bcrypt= require('bcrypt');

app.set("view engine","pug");
app.set("views","views")

app.use(bodyParser.urlencoded({extended:false}));


router.get("/",(req,res,next)=>{
    try{
        res.status(200).render("login");
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
        let payload= req.body;
        if(req.body.logUsername && req.body.logPassword){
           const username = req.body.logUsername.trim();
           const email = req.body.logUsername.trim();
                let userII = await User.findOne({
                $or:[{
                        username:username
                    },
                    {
                        email:email
                    }]
               }).catch((e)=>{
                res.status(e.status || 500);
                res.json({
                success: false,
                 message: e.message
                    })
               })
            
            if(userII!= null){
               let result= await bcrypt.compare(req.body.logPassword,userII.password);
               if(result===true){
                req.session.user=userII;
                return res.redirect("/");
               }
            }
            payload.errorMessage=" mail or password does not correspond to a currently user";
            res.status(200).render("login",payload);

        }
        payload.errorMessage=" Make sure each field has a valid value";
        return res.status(200).render("login");
    }catch(e){
        res.status(e.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})

module.exports =router;