// const mongoose = require("mongoose");

// const mongoseUri = process.env.DATABASE;
require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongose=()=>{
  mongoose.connect(process.env.DATABASE, {

    useNewUrlParser: "true",
    useUnifiedTopology: "true"
  
  },()=>{
    console.log("Connected To Mongoose SucessFully");
  })
}



module.exports = connectToMongose;































