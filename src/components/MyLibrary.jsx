import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import NavBar from './Nav Bar';
import BookPv from './BookPv';
import SearchBar from './SearchBar';
import'../styles/BookPv.css';
import '../styles/MyLibrary.css';

const MyLibrary = () => {
    const cookies = new Cookies();
    const history = useHistory();

    if(cookies.get('BigWordsUser') == null) {
        history.push('/')
    }
    
    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="mylibrary"/>
          <div className="column libraryBox">
              <h1 className="libraryHeader">My Library</h1>
              <SearchBar/>
              <div className="column">
                  <h1 className="dateText">Month Day, Year</h1>
                  <BookPv className="bookpv"/>
              </div>
          </div>
      </div>
      )
  }
  
  export default MyLibrary;    