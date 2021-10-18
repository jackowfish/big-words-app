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
        console.log("user", user);
        cookies.set('user', user);
        history.push('/homepage');
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };

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