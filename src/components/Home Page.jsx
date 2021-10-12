import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'

const HomePage = () => {

  return (
    <div className="columns is-vcentered background"> 
        <NavBar className="navbar" current="homepage"/>
    </div>
    
    )
}

export default HomePage;            