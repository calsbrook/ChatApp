import React from 'react';
import { ChannelList } from './ChannelList'; 
import { MessagesPanel } from './MessagesPannel';
import socketClient from "socket.io-client";
import './chat.scss';


const SERVER = "http://127.0.0.1:8080";

export class Chat extends React.Component {
    state = {
        channels: [{id: 1, name: 'General', participants: 0},{id: 2, name:'Off-Topic', participants:0},{id: 3, name:'Memes Only', participants:0}],
        socket: null,
        channel: null
    }
    socket;
    componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }
    loadChannels = async () => { 
        console.log('hi')
        fetch('http://localhost:8080/getChannels').then(async response => {
            console.log(response)
            this.setState({channels: response.channels})
        .catch((error) => {
            console.error(error);
        });
    })}

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {
            let channels = this.state.channels;
            channels.forEach(currentChannel => {
                if (currentChannel.id === channel.id) {
                    currentChannel.participants = channel.participants;
                }
            });
            this.setState({channels});
        });
        socket.on('message', message => {
            let channels = this.state.channels
            channels.forEach(currChannel => {
                if (currChannel.id === message.channel_id) {
                    if (!currChannel.messages){
                        currChannel.messages = [message];
                    } else {
                        currChannel.messages.push(message);
                    }
                }
            });
            this.setState({channels});
        });
        this.socket = socket;
    }

    handleSendMessage = (channel_id, text, file = null) => {
        if (file){
            console.log('handleSendMessage of file')
            this.socket.emit('send-message', {channel_id, text, file, mimeType: file.type, fileName: file.name, senderName: this.socket.id, id:Date.now()});
        } else {
            console.log('handleSendMessage of text')
            this.socket.emit('send-message', {channel_id, text, senderName: this.socket.id, id:Date.now()});
        }
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        })
        this.setState({channel});
        this.socket.emit('channel-join', id, ack => {
        })
    }

    
    render() {
        return (
            <div className="chat-app">
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect}/>
                <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel}/>
            </div>
        )
    }
}