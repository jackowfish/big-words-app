import React, { useState } from 'react';
import getFirebase from '../../firebase.config';
import 'bulma/css/bulma.min.css';
import '../styles/Start_Page.css'
import Button from './Button'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useHistory } from 'react-router-dom'
import useInput from "../hooks/useInput"
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const firebaseInstance = getFirebase();
const auth = getAuth();
const db = getDatabase();

const SignUpForm = () => {
  const history = useHistory();

  const signUp = async (event) => {
    event.preventDefault();

    try {
      if (firebaseInstance) {
        const user = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log("user", user);
        cookies.set('BigWordsUser', user, { path: '/' });
        history.push('/homepage');

        set(ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid), {
          "First Name": first_name.value,
          "Last Name": last_name.value,
          "Books Read": "",
      });
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
};

  const email = useInput("")
  const password = useInput("")
  const first_name = useInput("")
  const last_name = useInput("")


  return (
      <div className="rows is-vcentered background"> 
        <div className="border card center">
        <div className="column signupform">
          <div className="field">
            <div className="control">
              <input className="input caregiverFirst" type="text" placeholder="Caregiver First Name" {...first_name}/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input caregiverLast" type="text" placeholder="Caregiver Last Name" {...last_name}/>
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
              <input className="input email" type="email" placeholder="Email" {...email}/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input password" type="password" placeholder="Password" {...password}/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input passwordConfirm" type="password" placeholder="Confirm Password"/>
            </div>
          </div>
          <Button type="submit" className="signup button border" name="Sign Up" onClick={signUp}/>
        </div>
        </div>
      </div>
    )
}

export default SignUpForm;