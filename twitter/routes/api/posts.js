const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');



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
        res.status(200).send("it worked")
     }catch(e){

     }
})

module.exports =router;