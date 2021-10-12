import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'

const MyAccount = () => {

    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="myaccount"/>
      </div>
      )
  }
  
  export default MyAccount;    