import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'

const MyWords = () => {

    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="mywords"/>
      </div>
      )
  }
  
  export default MyWords;      