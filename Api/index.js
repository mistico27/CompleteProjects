const express = require("express");
const router = require("express").Router();
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path= require("path")



const url='mongodb+srv://cristianb72:30vxY4BnKpy54mj7@cluster0.wxjolyf.mongodb.net/nuevoSchema?retryWrites=true&w=majority'
mongoose.connect(url,{

}).then(()=>{console.log("estoy conectado a la base  de datos de mongo putos");})
.catch((e)=>console.log("El error de conexion es " +e));


//crear();

/*async function listDatabases(client){
   const databasesLists = await client.db().admin().listDatabases();
   console.log("Databases");
   databasesLists.databases.forEach(db => {
            console.log(`- ${db.name}`);  
   });
}
*/
app.use("/images",express.static(path.join(__dirname,"public/images")));


app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
});

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("file uploaded successfully")
    }catch(e){
        console.log(e);
    }
})


app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);



app.listen(8800,()=>{
    console.log("BackEnd server is ready and running   !!!!");
})