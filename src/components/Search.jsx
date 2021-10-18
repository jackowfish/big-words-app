import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'    

const Search = () => {
    const cookies = new Cookies();
    const history = useHistory();

    if(cookies.get('BigWordsUser') == null) {
        history.push('/')
    }
    
    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="search"/>
      </div>
      )
  }
  
  export default Search;    