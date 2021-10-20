import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'
import Button from './Button'
import {Link} from "react-router-dom"
import '../styles/MyAccount.css'
// import WaitModal from './modals/waitModal';

const EditPage = () => {
    return(
        <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="myaccount"/>
          <div className="column accountBox">
              <h1> Edit [Attribute]</h1>
              <h1> [Attribute][#]</h1>
              <div className="field">
                  <label className="label">First Name</label>
                  <input className="control" type="text" placeholder="First Name"/>
              </div>
              <div className="field">
                  <label className="label">Last Name</label>
                  <input className="control" type="text" placeholder="Last Name"/>
              </div>
              {/* <WaitModal/> */}
          </div>
        </div>
    )
}

export default EditPage;