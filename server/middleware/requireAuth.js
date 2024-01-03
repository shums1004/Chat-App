const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

async function requireAuth(req, res, next){

    try{
    //Read the token off cookie
    const token = req.cookies.Authorization;

    //Decode the token 
    const decoded = jwt.verify(token, process.env.SECRET);
    
    // check expiration
    if(Date.now() > decoded.exp) return res.sendStatus(401);

    //find user using decoded sub
    const user =  await User.findById(decoded.sub);
    if(!user) return res.sendStatus(401);
    
    //attach the user to req
    req.user = user;

    //continue on
    next();
    }
    catch(err){
        res.sendStatus(401);
    }
}

module.exports = requireAuth;
