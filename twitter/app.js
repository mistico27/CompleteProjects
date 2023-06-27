const express = require('express');
const middleware =require('./middleware');
const app= express();
const port = 3320;
const path=require('path');
const bodyParser =require('body-parser');
const mongoose = require("./database");
const sesion = require('express-session');


const server = app.listen(port,()=>{
    console.log("Server listening in port " + port);
})


app.set("view engine","pug");
app.set("views","views");

///use public folder in all the paths i use
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use(sesion({
    secret:"chipotle chips",
    resave:true,
    saveUninitialized:false
}))

//routes
const loginroute =require('./routes/loginRoutes');
const registeroute =require('./routes/registerRoutes');
const logoutroute =require('./routes/logoutRoutes');
///api routes
const postApiroute =require('./routes/api/posts');


app.use("/login",loginroute);
app.use("/register",registeroute);
app.use("/logout",logoutroute);
app.use("/api/posts",postApiroute);


app.get("/",middleware.requireLogin,(req,res,next)=>{
    try{
        let payload = {
            pageTitle:"Home",
            userLoggedIn:req.session.user,
            userLoggedInJs:JSON.stringify(req.session.user),
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