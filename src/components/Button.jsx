import React from 'react';
import '../styles/Button.css'
import '../styles/Colors.css'


const Button = (props) => {

    return (
        <button onClick={props.onClick} className={props.className}>{props.name}</button>
    )
}

export default Button