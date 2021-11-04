import React, { useState } from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
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
  const db = getDatabase();
  
  if(cookies.get('BigWordsUser') == null) {
    history.push('/');
    window.location.reload(false);
  }


  var user_first_name = "";
  const info = ref(db, 'Users/' + cookies.get('BigWordsUser').user.uid + "/First Name");
  onValue(info, (snapshot) => {
    user_first_name = snapshot.val();
  });

  var word_count = 0;
  var big_word_count = 0;

  const book_list = ref(db, 'Books/');

  onValue(book_list, (snapshot) => {
      const book_list_data = snapshot.val();

    for (const current_book in book_list_data) {
      const check_book_status = ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Books Read/" + `${current_book}`);
        onValue(check_book_status, (snapshot) => {
          if (snapshot.val() != null && snapshot.val() > 0) {
            const word_list = ref(db, 'Books/' + `${current_book}` + '/Words/');
              onValue(word_list, (snapshot) => {
              const word_list_data = snapshot.val();
              for (var word in word_list_data) {
                  const word_info = ref(db, 'Books/' + `${current_book}` + '/Words/' + word);
                  onValue(word_info, (snapshot) => {
                    const word_data = snapshot.val();
                    word_count++;
                    if (word_data.bigword == true) {
                      big_word_count++;
                      }
                  });
                }
            });
          }
        });
      }
    });


  return (
    <div className="columns is-vcentered background"> 
        <NavBar className="navbar" current="homepage"/>
        <div className="column welcomeBack">
          <h1 className="welcomeText">Welcome Back {user_first_name}<br></br></h1>
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