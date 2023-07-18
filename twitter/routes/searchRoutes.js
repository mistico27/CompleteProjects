const express = require('express');
const router =express.Router();
const bodyParser =require('body-parser');
const User =require('../schemas/UserSchema');
const bcrypt= require('bcrypt');


router.get("/",(req,res,next)=>{
    try{
        let payload = createPayload(req.session.user);
        res.status(200).render("searchPage",payload);
    }catch(e){
        res.status(e.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})


router.get("/:selectedTab",(req,res,next)=>{
    try{
        let payload = createPayload(req.session.user);
        payload.selectedTab=req.params.selectedTab;
        res.status(200).render("searchPage",payload);
    }catch(e){
        res.status(e.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})



function createPayload(userLoggedIn){
    return{
        
            pageTitle:"Search",
            userLoggedIn:userLoggedIn,
            userLoggedInJs:JSON.stringify(userLoggedIn)
    };
}



module.exports =router;