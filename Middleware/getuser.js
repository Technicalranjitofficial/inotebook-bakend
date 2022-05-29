const jwt = require("jsonwebtoken");
const SECRET_KEY = "Ranjit";
//getting the auth token from request.header
const getuser=(req,res,next)=>{
    
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Try with correct token"})
    }
    try {
        //getting the userId from auth token 
        const data= jwt.verify(token,SECRET_KEY);
        req.user=data.user
        next()
    } catch (error) {
        res.status(401).send({error:"Try with correct token"})
    }
   
}

module.exports=getuser