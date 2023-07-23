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

const io=require("socket.io")(server,{pinTimeout:6000});

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
const postRoute =require('./routes/postRoutes');
const profileRoute =require('./routes/profileRoutes');
///api routes
const postApiroute =require('./routes/api/posts');
const userApiroute =require('./routes/api/users');
const uploadRoute =require('./routes/uploadsRoutes');
const searchRoute =require('./routes/searchRoutes');
const messageRoute =require('./routes/messageRoutes');
const ChatsApiRoute =require('./routes/api/chats');
const messagesApiRoute =require('./routes/api/messages');

app.use("/login",loginroute);
app.use("/register",registeroute);
app.use("/logout",logoutroute);
app.use("/posts",middleware.requireLogin,postRoute);
app.use("/profile",middleware.requireLogin,profileRoute);
app.use("/uploads",uploadRoute);
app.use("/search",middleware.requireLogin,searchRoute);
app.use("/messages",middleware.requireLogin,messageRoute);


app.use("/api/posts",postApiroute);
app.use("/api/users",userApiroute);
app.use("/api/chats",ChatsApiRoute);
app.use("/api/messages",messagesApiRoute);


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


io.on("connection",socket=>{
  console.log("connected to socket io");
  socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
  })

  socket.on("join room",room=>{
    socket.join(room);
  })

  socket.on("typing",room=>{
    socket.in(room).emit("typing");
  })

  socket.on("stop typing",room=>{
    socket.in(room).emit("stop typing");
  })

  socket.on("new Message",newMessage=>{
        let chat = newMessage.chat;
        if(!chat.users) return console.log("Chat users not defined");
        chat.users.forEach(user=>{
            if(user._id==newMessage.sender._id) return;
            socket.in(user._id).emit("message received",newMessage);
        })
  });

})


