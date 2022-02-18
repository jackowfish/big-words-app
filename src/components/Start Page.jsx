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
        <div className="rows is-vcentered background">
          <div className="column">
            <div className="border card">
              <div className="title">Big Words</div>
              &nbsp;
              <Button className="login button border" onClick={login} name="Login"/>
              &nbsp;
              <Button className="signup button border" onClick={signup} name="Sign Up"/>
            </div>
          </div> 
        </div>
      )
}

export default StartPage;