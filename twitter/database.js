const mongoose = require('mongoose');

class Database{

    constructor(){
        this.connect();
    }

    connect(){
    const databaseURL = 'mongodb+srv://cristianb72:30vxY4BnKpy54mj7@cluster0.wxjolyf.mongodb.net/TwitterCloneDB';
    mongoose.connect(databaseURL)
    .then(() => {
    console.log("estamos conectados a mongo jajaj!!!!");
    })
    .catch((err) => {
    console.log("We have an error", err);
    });
    }
}

///exports
module.exports= new Database();


