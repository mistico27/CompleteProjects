const express = require('express');
const app= express();
const router =express.Router();
const bodyParser =require('body-parser');

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

router.post("/",(req,res,next)=>{
    try{
        console.log(req.body);
        res.status(200).render("register");
    }catch(e){
        res.status(err.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
})

module.exports =router;