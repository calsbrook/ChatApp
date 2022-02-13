var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
// var uuid = require('uuid-random');

var PORT = process.env.PORT || 3000

var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Listening at port ${PORT}`);
})
app.get("/", (req, res) => {
    res.send("A message from CS361");
})

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var io = require('socket.io')(server);

var chatRoomData = []
var connectedClients = {}

io.use((socket, next) => {
    let handshake = socket.handshake;
});

io.on('connection', (client) => {
    // creating new user
    client.on("CreateUserData", () => {
        let userID = uuid();
        let username = "someone";
        let address = client.handshake.address;
        let userData = {userID: userID, username: username, address: address}
        client.emit("SetUserData", userData);
    })

    // registered user enters the chat
    client.on("UserEnteredRoom", (userData) => {
        var enteredRoomMessage = {message: `${userData.username} is here`, username: "", userID: 0, timeStamp: null}
        chatRoomData.push(enteredRoomMessage);
        sendUpdatedChatRoomData(client);
        connectedClients[client.id] = userData;
    });
    
    // new message sent
    client.on("SendMessage", (messageData) => {
        chatRoomData.push(messageData);
        sendUpdatedChatRoomData(client);
    });

    // disconnect
    client.on('disconnecting', (data) => {
        if(connectedClients[client.id]){
            let disconnectMessage = {message: `${connectedClients[client.id].username} has left the chat`, username: "", userID: 0, timeStamp: null}
            chatRoomData.push(disconnectMessage);
            sendUpdatedChatRoomData(client);
            delete connectedClients[client.id];
        }
    });

    client.on('ClearChat', () => {
        chatRoomData = [];
        sendUpdatedChatRoomData(client);
    })
    
});

function sendUpdatedChatRoomData(client){
    client.emit("RetrieveChatRoomData", chatRoomData);
    client.broadcast.emit("RetrieveChatRoomData", chatRoomData);
}