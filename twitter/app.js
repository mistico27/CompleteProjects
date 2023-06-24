const express = require('express');

const app= express();
const port = 3320;


const server = app.listen(port,()=>{
    console.log("Server listening in port " + port);
})


app.set("view engine","pug");
app.set("views","views")



app.get("/",(req,res,next)=>{
    try{
        let payload = {
            pageTitle:"Home"
        }
        res.status(200).render("home",payload);
    }catch(e){
        res.status(err.status || 500);
        res.json({
          success: false,
          message: e.message
        })
    }
    
})