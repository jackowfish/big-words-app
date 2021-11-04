import React from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import 'bulma/css/bulma.min.css';
import '../styles/Home_Page.css'
import '../styles/AdminPage.css'
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import Button from './Button'
import useInput from "../hooks/useInput"
import getFirebase from '../../firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from "react";

const AdminPage = () => {
  // Initialize dependencies
  const cookies = new Cookies();
  const history = useHistory();
  const firebaseInstance = getFirebase();
  const db = getDatabase(firebaseInstance);
  let isAdmin = false;
  
  // Initialize book input variables
  const authorName = useInput("");
  const bookText = useInput("");
  const bookName = useInput("");
  const pages = useInput("");
  const bookCover = useInput("");
  
  const [isCompleted, setCompleted] = useState(false)
  //Make sure user logged in
  if(cookies.get('BigWordsUser') == null) {
    history.push('/');
    window.location.reload(false);
  }

  if (!isAdmin) {
    // Check to make sure user is an admin
    const user_type = ref(db, 'Users/' + cookies.get('BigWordsUser').user.uid + "/Type");
    onValue(user_type, (snapshot) => {
      if (snapshot.val() != null && snapshot.val().toLowerCase() !== "admin") {
          history.push("/homepage");
      } else {
        isAdmin = true;
      }
    });
  }

  // Function to submit book data
  const addBookDetails = async () => {
    console.log({
      text: bookText.value,
      title : bookName.value,
      authorName: authorName.value,
    });
    if(bookText.value == ""|| bookName.value == ""|| authorName.value == "") {
      alert('Please fill out all form fields!')
      return
    } else {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      fetch(`https://us-central1-bigwords-202f6.cloudfunctions.net/addBook?title=${bookName.value}&AuthorName=${authorName.value}&text=${bookText.value}`, requestOptions);
      setCompleted(true);
    }
  }

  return (
    <div className="columns is-vcentered background"> 
        <NavBar className="navbar" current="admin"/>
        <div className="column welcomeBack">
        {!isCompleted &&
          <div>
          <p className="PageTitle"> Upload new book data!</p>
          <input className="input adminInput" type="text" placeholder="Author Name" {...authorName}/>
          <input className="input adminInput" type="text" placeholder="Book Name" {...bookName}/>
          {/* <div className="file">
            <label className="file-label adminInput">
              <input className="file-input" type="file" name="bookCover" {...bookCover}/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div> */}
          <textarea className="textarea adminInput" placeholder="Copy Book Text Here!" {...bookText}></textarea>
          <Button className="green button adminInput" name="Upload Book" onClick={addBookDetails}/>
          </div>
        }
        {isCompleted &&
          <div>
          <p className="PageTitle"> Book Upload Successful!</p>
          <Button className="green button adminInput" name="Upload Another Book" onClick={() => window.location.reload(false)}/>
          </div>
        }
        </div>
      </div>
    )
}

export default AdminPage;            