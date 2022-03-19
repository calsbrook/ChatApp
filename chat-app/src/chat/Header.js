import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUtensils} from '@fortawesome/free-solid-svg-icons'

function Header() {
    return(
        <div className="Header">
            <h1><FontAwesomeIcon icon={faUtensils}/> Chat-All</h1>
        </div>
    )
}

export default Header;