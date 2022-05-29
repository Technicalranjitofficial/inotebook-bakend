const express = require("express");

const router = express.Router();
const Note = require("../models/Notes");
const getuser = require("../Middleware/getuser");

const { body, validationResult } = require("express-validator");

//ROUTE:1
router.get(
  "/fetchnotes",

  getuser,
  async (req, res) => {
    try {
      const note = await Note.find({ user: req.user.id });
      res.json(note);
    } catch (error) {
      return res.status(400).send({ error: "Internal Error!" });
    }
  }
);

router.post("/addnotes", getuser, 
[body("title").isLength({min:3}),
body("description").isLength({min:5}),

],async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const{title,description}=req.body;
    const notes=new Note({
        title,description,user:req.user.id
    })

    const saveNote=await notes.save();
    res.json(saveNote)
  } catch (error) {
      return res.status(500).send({error:"Internal Error"});
  }


});

//ROUTE:3
router.put('/noteupdate/:id',getuser,async(req,res)=>{

    try {
        const {title,description}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};

    const note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send({error:"Note Not Found"});
    }

    if(note.user.toString()!==req.user.id){
        return res.status(401).send({AccessDenies:"Unauthorized"});
    }

    const updateNotes=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send({updateNotes});
        
    } catch (error) {
        return res.status(500).send({error:"Internal Error"});
    }
    

})

router.delete('/deletenote/:id',getuser,async (req,res)=>{

    try {
        const note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note Found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Unauthorized");
        }
    
        const deleteNote=await Note.findByIdAndDelete(req.params.id);
        res.send({"sucess":"success","note":deleteNote})
    } catch (error) {
        return res.status(500).send({error:"Internal Error"});
    }

   
})

module.exports = router;
