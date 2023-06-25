const express = require('express');
const middleware =require('./middleware');
const app= express();
const port = 3320;
const path=require('path');
const bodyParser =require('body-parser');


const server = app.listen(port,()=>{
    console.log("Server listening in port " + port);
})


app.set("view engine","pug");
app.set("views","views");

///use public folder in all the paths i use
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

//routes
const loginroute =require('./routes/loginRoutes');
const registeroute =require('./routes/registerRoutes');

app.use("/login",loginroute);
app.use("/register",registeroute);


app.get("/",middleware.requireLogin,(req,res,next)=>{
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