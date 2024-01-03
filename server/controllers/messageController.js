const messageModel = require("../models/messageModel");


addMessage = async(req, res, next) =>{
try{
    const {from, to, message} = req.body;
    const data = await messageModel.create({
        message:{text : message},
        users:[from, to],
        sender: from,
    });
    if(data) return res.json({msg : "Message Added Successfullt"});

    return res.json({msg: "Failed to send the message"});
}
catch(err){
    console.log(err);
}
}

getAllMessages = async(req, res, next) =>{
    try{

        const {from, to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all: [from, to],
            }
        }).sort({updatedAt : 1})

        const projectMessages = messages.map((msg)=>{
            return {
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text,
            };
        });
        return res.json(projectMessages);

    }
    catch(err){
        console.log(err);
    }

}


module.exports ={
    addMessage,
    getAllMessages

}