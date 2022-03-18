import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';

export class PictureButton extends React.Component {
    state = {file: null}
    hiddenFileInput = React.useRef(null);
    handleClick = evenet => {
        this.hiddenFileInput.current.click();
    }
    handleChange = event => {
        fileUploaded = event.target.files[0];
        this.props.handleFile(fileUploaded);
    }
    render() {
        return(
            <div className="picture-button">
                <FontAwesomeIcon icon={faImage} onClick={handleClick}/>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} className="fileInput"/>
            </div>
        );
    }
}