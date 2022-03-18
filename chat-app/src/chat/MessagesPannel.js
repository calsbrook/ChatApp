import React, {useRef} from 'react';
import { Message } from './Message';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';

export class MessagesPanel extends React.Component {
    state = {input_value: '', file: null}
    send = () => {
        if (this.state.file || this.state.input_value !== ''){
            this.props.onSendMessage(this.props.channel.id, this.state.input_value, this.state.file);
            this.setState({file: null});
            this.setState({input_value: ''});
        }
    }
    handleInput = e => {
        this.setState({input_value: e.target.value});
    }
    handleKeyDown = e => {
        if (e.key === 'Enter'){
            this.send();
        }
    }
    // handleClick = e => {
    //     hiddenFileInput.current.click();
    // }
    setFile = (e) => {
        this.setState({file: e})
    }
    selectFile = (e) => {
        // setFileMessage(e.target.files[0].name);
        this.setFile(e.target.files[0]);
    }
    render() {
        let list = <div className="no-content-message">There are no messages to show</div>;
        if (this.props.channel && this.props.channel.messages){
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} message={m}/>)
        }
        return(
            <div className="messages-panel">
                <div className="messages-list">{list}</div>
                <input onChange={this.selectFile} type="file" className="fileInput" ref="fileInput"/>
                <div className="messages-input">
                    {/* <FontAwesomeIcon icon={faImage} onClick={handleClick}/> */}
                    <input type="text" onChange={this.handleInput} value={this.state.input_value} onKeyDown={this.handleKeyDown}/>
                    <button onClick={this.send}>Send</button>
                </div>
            </div>
        );
    }
}