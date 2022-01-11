import React, { useState } from 'react';
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { HashRouter as Router, Link,useHistory } from 'react-router-dom'    
import SearchBar from './SearchBar';
import {getAuth} from '@firebase/auth';
import '../styles/MyLibrary.css';
import BookPv from './BookPv';

//This page is for users to browse and search for books using a search bar
const Search = () => {
    const cookies = new Cookies();
    const history = useHistory();
    const auth = getAuth();

    if(cookies.get('BigWordsUser') == null) {
        history.push('/');
        window.location.reload(false);
    }
    
    return (
      <div className="rows is-vcentered background"> 
          <NavBar className="navbar" current="search"/>
          <div className="row featuredBox">
              {/* <SearchBar/> */}
              <p>Can't find a book you're looking for? Submit a <a href="mailto:jennifer.k.stone@med.unc.edu?subject=Book Suggestion for BigWords">request</a>!</p>
              <div className="row">
                  <h1 className="featuredHeader">All Books</h1>
                  <BookPv className="bookList" key="bookPv_list" name="featured"/>
              </div>
          </div>
      </div>
      )
  }
  
  export default Search;    