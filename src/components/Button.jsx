import React from 'react';
import '../styles/Button.css'
import '../styles/Colors.css'


function Button (props) {
    return (
        <button className={props.className}>{props.name}</button>
    )
}

export default Button