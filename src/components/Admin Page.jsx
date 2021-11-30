import React from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
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
import { text } from 'dom-helpers';

const AdminPage = () => {
  // Initialize dependencies
  const cookies = new Cookies();
  const history = useHistory();
  const firebaseInstance = getFirebase();
  const db = getDatabase(firebaseInstance);
  const storage = getStorage();
  const storageRoot = storageRef(storage)
  let isAdmin = false;
  
  // Initialize book input variables
  const authorName = useInput("");
  // const bookText = useInput("");
  const bookName = useInput("");
  // const isbn = useInput("");
  const [image , setImage] = useState(false);
  const [bookText, setBookText] = useState(false); 
  // const pages = useInput("");
  // const bookCover = useInput("");
  
  const [isCompleted, setCompleted] = useState(false);
  const [isSending, setSending] = useState(false);
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

// const upload = ()=>{
//   if(image == null)
//     return;
  
// }

  // Function to submit book data
  const addBookDetails = async () => {
    console.log({
      title : bookName.value,
      authorName: authorName.value,
    });
    if(bookText == null|| bookName.value == ""|| authorName.value == "" || image == null) {
      alert('Please fill out all form fields!')
      return;
    } else {
      setSending(true);
      let bookID = bookName.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "");
      let coverPath = storageRef(storage, `/images/${bookID}`);
      let textPath = storageRef(storage, `/bookTexts/${bookID}`);
      await uploadBytes(coverPath, image).then((snapshot) => {
        console.log('Uploaded cover image!');
      });
      await uploadBytes(textPath, bookText).then((snapshot) => {
        console.log(snapshot);
        console.log('Uploaded text file!');
      });
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      fetch(`https://us-central1-bigwords-202f6.cloudfunctions.net/addBook?title=${bookName.value}&AuthorName=${authorName.value}&text=${bookID}`, requestOptions);
      setSending(false);
      setCompleted(true);
    }
  }

  return (
    <div className="columns is-vcentered background outer-div"> 
        <NavBar className="navbar" current="admin"/>
        <div className="column welcomeBack">
        {!isCompleted && !isSending &&
          <div>
          <p className="PageTitle"> Upload new book data!</p>
          <input className="input adminInput" type="text author" placeholder="Author Name" {...authorName}/>
          <input className="input adminInput" type="text book" placeholder="Book Name" {...bookName}/>
          {/* <input className="input adminInput" type="text isbn" placeholder="ISBN-10 Number" {...isbn}/> */}
          <div className="file is-dark inner-div">
            <b> Select cover image for book </b>
            <label className="file-label">
              <input className="file-input" type="file" name="bookCover" accept=".jpg, .png" onChange={(e)=>{setImage(e.target.files[0])}}/>
              <span className="file-cta">
                <span className="file-label">
                  {image ? image.name : 'No File Selected'}
                </span>
              </span>
            </label>
          </div>
          
          <div className="file is-dark inner-div">
            <b> Select file with book text (.txt)</b>
            <label className="file-label">
              <input className="file-input" accept=".txt" type="file" name="bookCover" onChange={(e)=>{setBookText(e.target.files[0])}}/>
              <span className="file-cta">
                <span className="file-label">
                  {bookText ? bookText.name : 'No File Selected'}
                </span>
              </span>
            </label>
          </div>
          <Button className="green button adminInput" name="Upload Book" onClick={addBookDetails}/>
          </div>
        }
        {!isSending && isCompleted &&
          <div>
          <p className="PageTitle"> Book Upload Successful!</p>
          <Button className="green button adminInput" name="Upload Another Book" onClick={() => window.location.reload(false)}/>
          </div>
        }
        {!isCompleted && isSending &&
          <div>
          <p className="PageTitle"> Book Upload In Progress!</p>
          <div className="loading">Loading&#8230;</div>
          </div>
        }
        </div>
      </div>
    )
}

export default AdminPage;            