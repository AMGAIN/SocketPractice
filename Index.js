const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


let userCount = 0;
//Socket.io
io.on('connection', (socket) =>{
    userCount ++;
    socket.userNum = userCount;
    socket.on('user-message', (message)=>{
        io.emit('message', {
            text: message,
            userNo: socket.userNum
        });
        console.log(`The user ${socket.userNum} message: `, message);
    })
});

app.use(express.static(path.resolve('./public')));

app.get("/",(req,res)=>{
    return res.sendFile('./public/index.html');
})
server.listen(9000, ()=>{
    console.log("Server started at 9000 port");
})