const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
        console.log("Your database is successfully connected to Mongo DB");
    }
    catch(err){
        console.error(`Error while connecting to DB: ${err}`)
    }
}

module.exports = connectDB