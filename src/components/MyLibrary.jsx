import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import NavBar from './Nav Bar';
import SearchBar from './SearchBar';
import'../styles/BookPv.css';
import '../styles/MyLibrary.css';
import MyLibraryPv from'./MyLibraryPv';

const MyLibrary = () => {
    const cookies = new Cookies();
    const history = useHistory();

    if(cookies.get('BigWordsUser') == null) {
        history.push('/');
        window.location.reload(false);
    }

    const current_uid = cookies.get('BigWordsUser').user.uid;
    
    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="mylibrary"/>
          <div className="column libraryBox">
              <h1 className="libraryHeader">My Library</h1>
              <SearchBar/>
              <div className="column">
                  <MyLibraryPv data={{path: "Users/" + cookies.get('BigWordsUser').user.uid + "/BooksRead/"}}/>
              </div>
          </div>
      </div>
      )
  }
  
  export default MyLibrary;    