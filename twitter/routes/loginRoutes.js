const express = require('express');
const app= express();
const router =express.Router();

app.set("view engine","pug");
app.set("views","views")


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

module.exports =router;