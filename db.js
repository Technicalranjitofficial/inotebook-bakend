// const mongoose = require("mongoose");

// const mongoseUri = process.env.DATABASE;
require('dotenv').config();
const mongoose = require('mongoose');
const uri=process.env.DATABASE;

const connectToMongose=()=>{
  mongoose.connect("mongodb+srv://thexhacker:c-B8_LQVn66k*Tz@cluster0.ugev3.mongodb.net/test", {

    useNewUrlParser: "true",
    useUnifiedTopology: "true"
  
  },()=>{
    console.log("Connected To Mongoose SucessFully");
  })
}



module.exports = connectToMongose;































