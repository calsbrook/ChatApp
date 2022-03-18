import React from 'react';
import Image from './Image';

export class Message extends React.Component {
    render() {
        if (this.props.message.file){
            const blob = new Blob([this.props.message.file], {type: this.props.message.type});
            return(
                <div className="message-item">
                    <div><b>{this.props.message.senderName}</b></div>
                    <Image blob={blob}/>
                </div>
            )
        } else {
            return(
                <div className="message-item">
                    <div><b>{this.props.message.senderName}</b></div>
                    <span>{this.props.message.text}</span>
                </div>
            )
        }
    }
}