import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/Start_Page.css'
import Button from './Button'
import { useHistory } from 'react-router-dom'

const StartPage = () => {
  let history = useHistory();

  const signup = () => {
    history.push('/signup')
  }
  
  const login = () => {
    history.push('/login')
  }

    return (
        <div className="columns is-vcentered background"> 
          <div className="column">
            <img src="../static/BigWords.png" className="logo"/>
          </div>
          <div className="column">
              &nbsp;
              <Button className="green button" onClick={login} name="Login"/>
              &nbsp;
              <Button className="yellow button" onClick={signup} name="Sign Up"/>
          </div>
        </div>
      )
}

export default StartPage;