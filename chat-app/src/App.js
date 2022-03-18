import React from 'react';
import socketClient from 'socket.io-client';
// import {ChannelList} from './chat/ChannelList';
// import { MessagesPanel } from './chat/MessagesPannel';
import { Chat } from './chat/Chat';
import './App.css';
// import { Channel } from './chat/Channel';
const SERVER = "http://127.0.0.1:8080";
function App() {
  var socket = socketClient (SERVER);
  socket.on('connection', () => {
    console.log("I'm connected with the back-end");
  });

  return (
    <div className="App">
      <Chat/>
    </div>
  );
}

export default App;
