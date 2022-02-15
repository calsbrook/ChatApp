const server = require('http').createServer(app);
const options = {cors:true, origins:["http://127.0.0.1:8080"]}
var express = require('express');
var app = express();
var io = require('socket.io')(server, options);
const STATIC_CHANNELS = [{
    name: 'Main chat',
    participants: 0,
    id: 1,
    sockets: []
},{
    name: 'Secondary chat',
    participants: 0,
    id: 2,
    sockets: []
}];
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})

io.on('connection', (socket) => {
    console.log('new client connected');

    socket.emit('connection', null)

    socket.on('channel-join', id => {
        console.log(`channel join: ${id}`);
        
        STATIC_CHANNELS.forEach(currentChannel => {
            if(currentChannel.id === id){
                if (currentChannel.sockets.indexOf(socket.id) == (-1)) {
                    currentChannel.sockets.push(socket.id);
                    currentChannel.participants++;
                    io.emit('channel', currentChannel);
                }
            } else {
                let index = -1;
                if(currentChannel.sockets){
                    index = currentChannel.sockets.indexOf(socket.id);
                }
                if (index !== -1){
                    currentChannel.sockets.splice(index,1);
                    currentChannel.participants--;
                    io.emit('channel', currentChannel);
                }
            }
        });
        return id;
    })

    socket.on('send-message', message => {
        io.emit('message', message);
        if (message.text.indexOf("/weather")===0 && socket.handshake){
            console.log(`WEATHER REQUEST FROM ${socket.handshake.address}`)
            Object.keys(socket.handshake).forEach(key => {
                console.log(key, socket.handshake[key])
            })
            // console.log(typeof socket.handshake);
        }
    })

})

app.get('/getChannels', (req, res) => {
    console.log(STATIC_CHANNELS);
    res.json({
        channels: STATIC_CHANNELS
    })
})