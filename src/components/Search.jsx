import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'

const Search = () => {

    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="search"/>
      </div>
      )
  }
  
  export default Search;    