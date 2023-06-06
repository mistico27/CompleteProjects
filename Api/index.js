const express = require("express");
const router = require("express").Router();
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");


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

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);



app.listen(8800,()=>{
    console.log("BackEnd server is ready and running   !!!!");
})