import React from 'react';
import getFirebase from '../../firebase.config';
import Cookies from 'universal-cookie';
import 'bulma/css/bulma.min.css';
import '../styles/Start_Page.css'
import Button from './Button'
import useInput from "../hooks/useInput"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom'

const auth = getAuth();
const firebaseInstance = getFirebase();

const LoginForm = () => {
  const cookies = new Cookies();
  
  const history = useHistory();

  const email = useInput("");
  const password = useInput("");

  const login = async (event) => {
    event.preventDefault();

    try {
      if (auth) {
        const user = await signInWithEmailAndPassword(auth, email.value, password.value);
        cookies.set('BigWordsUser', user, { path: '/' });
        history.push('/homepage');
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };

  return (
      <div className="rows is-vcentered background"> 
        <div className="border card center">
        <div className="column loginForm">
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
          <Button type="submit" className="login button border" name="Log In" onClick={login}/>
        </div>
        </div>
      </div>
    )
}

export default LoginForm;