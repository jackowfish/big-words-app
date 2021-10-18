import React, { useState } from 'react';
import getFirebase from '../../firebase.config';
import 'bulma/css/bulma.min.css';
import '../styles/Start_Page.css'
import Button from './Button'
import useInput from "../hooks/useInput"

const firebaseInstance = getFirebase();

const signUp = async (event) => {
    event.preventDefault();

    try {
      if (firebaseInstance) {
        const user = await firebaseInstance.auth().createUserWithEmailAndPassword(email.value, password.value)
        console.log("user", user)
        alert(`Welcome ${email.value}!`);
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
};

const SignUpForm = () => {

  const email = useInput("")
  const password = useInput("")

  return (
      <div className="columns is-vcentered background"> 
        <div className="column">
          <img src="../static/BigWords.png" className="logo"/>
        </div>
        <div className="column signupform">
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Caregiver First Name"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Caregiver Last Name"/>
            </div>
          </div>
          {/* <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Child First Name"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Child Last Name"/>
            </div>
          </div> */}
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
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Confirm Password"/>
            </div>
          </div>
          <Button type="submit" className="yellow button" name="Sign Up" onClick={signUp}/>
        </div>
      </div>
    )
}

export default SignUpForm;