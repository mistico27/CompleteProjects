const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');




app.use(bodyParser.urlencoded({extended:false}));


router.get("/",(req,res,next)=>{
    try{
        if(req.session){
            req.session.destroy(()=>{
                res.redirect("/login");
            })
        }
    }catch(e){
        res.status(err.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})




module.exports =router;