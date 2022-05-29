const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
   },
 name:{
   type:String,
   required:true
 },
 password:{
   type:String,
   required:true,
 },
 date:{
   type:Date,
   default:Date.now
 }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
// const uniqueValidator = require('mongoose-unique-validator');

// function make(Schema, mongoose) {

//   var UserSchema = new Schema({
//     email: {
//       type: String,
//       index: {
//         unique: true,
//         dropDups: true
//       }
//     },
//     name: String
//   });

//   UserSchema.plugin(uniqueValidator);

//   mongoose.model('users', UserSchema);
// }
// module.exports.make = make;
