import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/My_Words.css'
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import BigWords from './Big Words List'
import AllWords from './All Words List'

const MyWords = () => {
    const cookies = new Cookies();
    const history = useHistory();

    if(cookies.get('BigWordsUser') == null) {
        history.push('/')
    }

    return (
      <div className="columns is-vcentered background"> 
        <NavBar className="navbar" current="mywords"/>
        <div className="listener_name_section">
            <h1 className="listener_name">My Words</h1>
        </div>
        <BigWords className="bigwords_list"/>
        <AllWords className="allwords_list"/>
      </div>
      
      )
  }
  
  export default MyWords;      