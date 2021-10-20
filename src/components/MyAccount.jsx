import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import Button from './Button'
import {Link} from "react-router-dom"
import '../styles/MyAccount.css'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {BsChevronRight} from 'react-icons/bs'
// import ListenerModal from './modals/listenerModal';
// import ReaderModal from './modals/readerModal';
import { getAuth, signOut } from '@firebase/auth';


const MyAccount = () => {
    const cookies = new Cookies();
    const history = useHistory();
    
    if(cookies.get('BigWordsUser') == null) {
        history.push('/')
    }

    const logout = async (event) => {
        event.preventDefault();

        const auth = getAuth();
        signOut(auth).then(() => {
        }).catch((error) => {

        });

    }


    return (
      <div className="columns is-vcentered background"> 
          <NavBar className="navbar" current="myaccount"/>
          <div className="column accountBox">
              <h1 className="accountHeader">Account</h1>
              <table>
                  <thead>
                      <tr>
                          <th>Caregiver Information</th>
                          <th></th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Name</td>
                        <td>[First] [Last]</td>
                        <td>
                            <Link id="editPage" to="editpage">
                                <BsChevronRight size={15}/>
                            </Link>
                        </td>
                    </tr>
                  </tbody>
                  <thead>
                      <tr>
                          <th>Reader Information</th>
                          <th></th>
                          {/* <th><ReaderModal/></th> */}
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Reader 1</td>
                        <td>[Name]</td>
                        <td><BsChevronRight size={20}/></td>
                    </tr>
                  </tbody>
                  <thead>
                      <tr>
                          <th>Listener Information</th>
                          <th></th>
                          <th>
                                {/* <ListenerModal/> */}
                            </th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Listener 1</td>
                        <td>[First] [Last]</td>
                        <td><BsChevronRight size={15}/></td>
                    </tr>
                  </tbody>
                  
              </table>
            <Link id="LogoutLink" to="/">
                <Button type="submit" className="green button" name="Log Out" onClick={logout}/>
            </Link>
          
          </div>
      </div>
      )
  }
  
  export default MyAccount;    