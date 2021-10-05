import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/Start_Page.css'
import Button from './Button'



function SignUpForm () {
    return (
        <div className="columns"> 
          <div className="column">
            <img src="../static/BigWords.png" className="logo"/>
          </div>
          <div className="column">
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
            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Child First Name"/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Child Last Name"/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="email" placeholder="Email"/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="password" placeholder="Password"/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Confirm Password"/>
              </div>
            </div>
            <Button className="yellow button" name="Sign Up"/>
          </div>
        </div>
      )
}

export default SignUpForm;