import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebase.config';
import 'bulma/css/bulma.min.css';
import '../styles/Start_Page.css'
import Button from './Button'
import useInput from "../hooks/useInput"

const firebaseInstance = initializeApp(firebaseConfig);

const login = async (event) => {
    event.preventDefault();

    try {
      if (firebaseInstance) {
        const user = await firebaseInstance.auth().signInWithEmailAndPassword(email.value, password.value)
        console.log("user", user)
        alert(`Welcome ${email.value}!`);
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
};

const LoginForm = () => {

  const email = useInput("")
  const password = useInput("")

  return (
      <div className="columns is-vcentered background"> 
        <div className="column">
          <img src="../static/BigWords.png" className="logo"/>
        </div>
        <div className="column loginForm">
          <div className="field">
            <div className="control">
              <input className="input" type="email" placeholder="Email" {...email}/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type="password" placeholder="Password" {...password}/>
            </div>
          </div>
          <Button type="submit" className="green button" name="Log In" onClick={login}/>
        </div>
      </div>
    )
}

export default LoginForm;