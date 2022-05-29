const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
      type: String,
      required:true,
      unique: true,
  },
  email:{
      type:String,
      required:true,
      unique: true,
      
  }
});
const User=mongoose.model('user',UserSchema);
module.exports=User;
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