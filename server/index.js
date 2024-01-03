const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./config/connectToDB.js")
const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/", userRoutes);
app.use("/messages", messageRoutes);

connectToDB();
const port = process.env.PORT;

const server = app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

const io = socket(server, {
    
        origin : "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
});



global.onlineUsers = new Map();

io.on("connection", (socket) =>{
    global.chatSocket = socket;
    socket.on("addUser", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMsg", (data) =>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msgRecieve", data.msg);
        }
    })


})


