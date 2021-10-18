import React, { useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";
import 'bulma/css/bulma.min.css';
import '../styles/Home_Page.css'
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import Button from './Button'
import {Link} from "react-router-dom"

const HomePage = () => {
  const cookies = new Cookies();
  const history = useHistory();
  
  if(cookies.get('BigWordsUser') == null) {
    history.push('/')
  }

  var word_count = 0;
  var big_word_count = 0;

  // hardcoded for very hungry caterpillar for walking skeleton @ mentor suggestion
    const db = getDatabase();
    const book_list = ref(db, 'Books/FrtKf2u87GcBKhbE8q2w/Words');

    onValue(book_list, (snapshot) => {
        const book_list_data = snapshot.val();
        for (var word in book_list_data) {
          word_count++;
          const word_info = ref(db, 'Books/FrtKf2u87GcBKhbE8q2w/Words/' + word);
          
          onValue(word_info, (snapshot) => {
              const word_data = snapshot.val();
              if (word_data.bigword == true) {
                  big_word_count++;
              }
          });
        }
    });

  return (
    <div className="columns is-vcentered background"> 
        <NavBar className="navbar" current="homepage"/>
        <div className="column welcomeBack">
          <h1 className="welcomeText">Welcome Back<br></br>[NAME]!</h1>
            <hr></hr>
            <h1 className="bookDataText">Word Count: {word_count}<br></br>Big Word Count: {big_word_count}</h1>
          <Link id="LogBooksButton" to="search">
            <Button className="yellow button" name="Log Books"/>
          </Link>
          <h1 className="previousText">Previously Read...</h1>
        </div>
    </div>
    
    )
}

export default HomePage;            