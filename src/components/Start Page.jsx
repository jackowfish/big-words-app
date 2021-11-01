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
            <img src="https://firebasestorage.googleapis.com/v0/b/bigwords-202f6.appspot.com/o/BigWords.png?alt=media&token=c5301754-aba7-4c10-b1cb-389f4918be39" className="logo"/>
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