import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'    
import SearchBar from './SearchBar';
import BookPv from './BookPv';
import '../styles/MyLibrary.css';

const Search = () => {
    const cookies = new Cookies();
    const history = useHistory();

    if(cookies.get('BigWordsUser') == null) {
        history.push('/')
    }
    
    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="search"/>
          <div className="column libraryBox">
              <SearchBar/>
              <div className="column">
                  <h1 className="libraryHeader">Featured</h1>
                  <BookPv className="bookpv"/>
              </div>
          </div>
      </div>
      )
  }
  
  export default Search;    