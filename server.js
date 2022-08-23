var express = require('express');
const {listen} = require('socket.io');
var app = express();
var server = require('http').createServer(app);
var io=require('socket.io')(server);
users = [];
connections = [];

server.listen(3000);
app.get("/",function (req,resp) {
   //route for localhost:3000/
   resp.sendFile(__dirname + '/index.html');
})
io.sockets.on("connection",function (socket) {
    //when client connects to server
    connections.push(socket); // add plg details to custom array
    console.log("connextions:%s socket connected",connections.length); // curr connections
    socket.on("disconnect",function (data){
        //clint disc.frm server
        connections.splice(connections.indexOf(socket),1); //delet plug details
        console.log("Disconnected :%s socked connected", connections.length); //curr connections
    });

    socket.on("send message", function (data) {
        console.log(data);
        io.sockets.emit("new message", {msg:data});
        });
    });

    console.log("server is listining");