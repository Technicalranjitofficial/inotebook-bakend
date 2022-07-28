// const mongoose = require("mongoose");

// const mongoseUri = process.env.DATABASE;
require('dotenv').config();
const mongoose = require('mongoose');
const uri=process.env.DATABASE;
const ldb="mongodb://localhost:27017";
const db="yourmongodburl"
const connectToMongose=()=>{
  mongoose.connect(uri, {

    useNewUrlParser: "true",
    useUnifiedTopology: "true"
  
  },()=>{
    console.log("Connected To Mongoose SucessFully");
  })
}



module.exports = connectToMongose;































