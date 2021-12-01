import React, { useState } from 'react';
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import Button from './Button'
import {HashRouter as Router,Route, Link, Switch} from "react-router-dom"
import '../styles/MyAccount.css'
import {BsChevronRight} from 'react-icons/bs'
import ListenerModal from './modals/listenerModal';
import ReaderModal from './modals/readerModal';
import { getAuth, signOut } from '@firebase/auth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import TableBuilder from'./tableBuilder';


const MyAccount = () => {
    const cookies = new Cookies();
    const history = useHistory();
    const auth = getAuth();

    if(cookies.get('BigWordsUser') == null) {
        history.push('/');
        window.location.reload(false);
    }

    const logout = async (event) => {
        event.preventDefault();

        signOut(auth).then(() => {
            cookies.remove('BigWordsUser');
            history.push('/');
            window.location.reload(false);
        }).catch((error) => {
            alert("Error signing out of BigWords. Try Again!");
        });
    }

    const db = getDatabase();

    var user_first_name = "";
    const f_info = ref(db, 'Users/' + cookies.get('BigWordsUser').user.uid + "/First Name");
    onValue(f_info, (snapshot) => {
    user_first_name = snapshot.val();
    });

    var user_last_name = "";
    const l_info = ref(db, 'Users/' + cookies.get('BigWordsUser').user.uid + "/Last Name");
    onValue(l_info, (snapshot) => {
    user_last_name = snapshot.val();
    });


    return (
      <div className="rows is-vcentered background"> 
          <NavBar className="navbar" current="myaccount"/>
          <div className="row accountBox">
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
                        <td>{user_first_name} {user_last_name}</td>
                        <td>
                         <Link to={{pathname:'/edit',
                            search: `?sort=${cookies.get('BigWordsUser').user.uid}`,
                            data:{
                                id: `${'Users/' + cookies.get('BigWordsUser').user.uid}`,
                                type: 'Caregiver'
                            }}}><BsChevronRight size={20}/></Link>
                        </td>
                    </tr>
                  </tbody>
                  <thead>
                      <tr>
                          <th>Reader Information</th>
                          <th></th>
                          <th>
                            <ReaderModal/>
                              </th>
                      </tr>
                  </thead>
                  
                    <TableBuilder name="Reader"
                        data={{
                            user:"Users/" + cookies.get('BigWordsUser').user.uid + "/Readers/",
                            from:"account"
                        }}
                    />
                  
                  <thead>
                      <tr>
                          <th>Listener Information</th>
                          <th></th>
                          <th>
                                <ListenerModal/>
                            </th>
                      </tr>
                  </thead>
                  
                    <TableBuilder name="Listener"
                    data={{
                        user:"Users/" + cookies.get('BigWordsUser').user.uid + "/Children/",
                        from:"account"
                    }}
                    />
                  
                  
              </table>
            <Link id="LogoutLink" to="/">
                <Button type="submit" className="green button" name="Log Out" onClick={logout}/>
            </Link>
          
          </div>
      </div>
      )
  }
  
  export default MyAccount;    