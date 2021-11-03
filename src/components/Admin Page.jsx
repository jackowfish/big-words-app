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

const AdminPage = () => {
  // Initialize dependencies
  const cookies = new Cookies();
  const history = useHistory();
  const db = getDatabase(firebaseInstance);
  const firebaseInstance = getFirebase();
  const functions = getFunctions(firebaseInstance);
  
  // Initialize book input variables
  const authorFName = useInput("");
  const authorLName = useInput("");
  const bookText = useInput("");
  const bookName = useInput("");
  const pages = useInput("");
  const bookCover = useInput("");
  
  // Initialize firebase cloud function
  const addBook = httpsCallable(functions, 'addBook');
  
  //Make sure user logged in
  if(cookies.get('BigWordsUser') == null) {
    history.push('/')
  }

  // Check to make sure user is an admin
  const user_type = ref(db, 'Users/' + cookies.get('BigWordsUser').user.uid + "/Type");
  onValue(user_type, (snapshot) => {
    console.log(snapshot.val());
    if (snapshot.val() != null && snapshot.val().toLowerCase() !== "admin") {
        history.push("/");
    }
  });

  // Function to submit book data
  const addBookDetails = () => {
    addBook({
      text: bookText,
      title : bookName,
      authorFirst: authorFName,
      authorLast: authorLName,
      pages: pages,
    })
  }

  return (
    <div className="columns is-vcentered background"> 
        <NavBar className="navbar" current="admin"/>
        <div className="column welcomeBack">
        <p className="PageTitle"> Upload new book data!</p>
          <input className="input adminInput" type="text" placeholder="Author First Name" {...authorFName}/>
          <input className="input adminInput" type="text" placeholder="Author Last Name" {...authorLName}/>
          <input className="input adminInput" type="text" placeholder="Book Name" {...bookName}/>
          <input className="input adminInput" type="text" placeholder="Number of Pages" {...pages}/>
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
    </div>
    
    )
}

export default AdminPage;            