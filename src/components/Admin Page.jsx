import React, { useState } from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import 'bulma/css/bulma.min.css';
import '../styles/Home_Page.css'
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import Button from './Button'
import useInput from "../hooks/useInput"
import {Link} from "react-router-dom"

const AdminPage = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const db = getDatabase();
  // Initialize book input variables
  const authorFName = useInput("");
  const authorLName = useInput("");
  const bookText = useInput("");
  const bookName = useInput("");
  
  if(cookies.get('BigWordsUser') == null) {
    history.push('/')
  }

  const [info, setInfo] = useState("")
  if(info == "") {
    setInfo(ref(db, 'Users/' + cookies.get('BigWordsUser').user.uid + "/Type"));
  }
  console.log(info)
  // if(info != "Admin") {
  //   history.push('/')
  // }

  return (
    <div className="columns is-vcentered background"> 
        <NavBar className="navbar" current="homepage"/>
        <div className="column welcomeBack">
          <input className="input" type="text" placeholder="Author First Name" {...authorFName}/>
          <input className="input" type="text" placeholder="Author Last Name" {...authorLName}/>
          <input className="input" type="text" placeholder="Book Name" {...bookName}/>
          <div className="file">
            <label className="file-label">
              <input className="file-input" type="file" name="bookCover"/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>
          <textarea className="textarea" placeholder="Copy Book Text Here!" {...bookText}></textarea>
          <Button className="green button" name="Upload Book"/>
        </div>
    </div>
    
    )
}

export default AdminPage;            