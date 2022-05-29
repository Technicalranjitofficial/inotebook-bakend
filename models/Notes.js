const mongoose=require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId
    },
  title:{
      type:String,
      required:true
  },
  description:{
      type:String,
  },
  date:{
    type:Date,
    default:Date.now
  }

});

const Note=mongoose.model("Note",NoteSchema);
module.exports=Note