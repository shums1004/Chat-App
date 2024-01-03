const User = require("../models/userModel.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register (req,res, next)  {

    try{
        const {username, email, password} = req.body;
        const us = username[0];
        const em = email[0];

        
        const usernameCheck =  await User.findOne({us});
        if(usernameCheck !== null){
            return res.json({msg:"Username already exists"}, false);
        }
    
        const emailCheck = await User.findOne({em});
        if(emailCheck){
            return res.json({msg:"Email already exists"}, false);
        }   
    
        
        const hashPassword = await bcrypt.hash(password[0], 10);
        
        const user1 = await User.create({
            username: us,
            email: em,
            password: hashPassword,
    
        });
    
        delete user1.password;
    
        return res.json({status: true, user1});
    }
    catch(err){
         next(err);
    }
};


async function login(req,res, next)  {

    try{
        const {username, password} = req.body;
        const us = username[0];

        const user1 =  await User.findOne({username: us});
        const ps = password[0]
        if(!user1){
            // delete user.password;
            
            console.log("User Not found")
            return res.status(404).json({ error: "User not found" });
            
        }

       
        const validPassword =  bcrypt.compare(ps, user1.password)
          
        if(!validPassword){
            return res.status(404).json({ error: "Note not found" });
        }


        const exp = Date.now() + 1000*60*10;
        var token = jwt.sign({sub: user1._id, exp}, process.env.SECRET);
        
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
        })
    
        return res.json({status: true, user1})
       
    }
    catch(err){
         console.log(err);
         res.sendStatus(400);
    }
   

}

function checkAuth (req,res){
    try{
        console.log(req.user);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(401);
    }
}

function logout (req,res){
    try{
        res.clearCookie("Autharization");
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(401);
    }
}

async function setAvatar(req, res, next){
    try{
        const us = req.body.username;
        const user1 =  await User.findOne({username: us});
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(user1._id, {
            isAvatarImageSet: true,  
            avatarImage
        });
        const exp = Date.now() + 1000*60*10;
        var token = jwt.sign({sub: user1._id, exp}, process.env.SECRET);
        
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
        })
        return res.json({
            isSet: true,
            image: userData.avatarImage,
        });
    }
    catch(err){
        next(err);
    }

}

async function getAllUsers(req, res, next){
    try{ 
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]) 

        return res.json(users);
    }
    catch(err){
        next(err);
    }
}


async function getUser(req, res, next){
    try{
        const user = await User.findOne({username : req.params.username});

        return res.json(user);
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    register,
    login,
    checkAuth,
    logout,
    setAvatar,
    getAllUsers,
    getUser,
}
