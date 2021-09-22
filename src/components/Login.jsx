import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/Login.css'
import Button from './Button'



function Login () {
    return (
        <div className="columns"> 
          <div className="column">
            <img src="../static/BigWords.png" className="logo"/>
          </div>
          <div className="column">
              <Button className="green button" name="Login"/>
              &nbsp;
              <Button className="yellow button" name="Sign Up"/>
          </div>
        </div>
      )
}

export default Login;