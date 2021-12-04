import React, { useEffect, useState } from 'react';
import NavBar from './Nav Bar'
import Button from './Button'
import { useHistory} from "react-router-dom";
import '../styles/MyAccount.css'
import { getAuth } from '@firebase/auth';
import Cookies from 'universal-cookie';
import WaitModal from './modals/waitModal';
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import {BsChevronLeft} from 'react-icons/bs'

const EditPage = (props) => {
    const cookies = new Cookies();
    const history = useHistory();
    const auth = getAuth();
    const db = getDatabase();
    const dbData = props.location.data.id
    const type = props.location.data.type
    
    if(cookies.get('BigWordsUser') == null) {
        history.push('/');
        window.location.reload(false);
    }
    const first_name = React.createRef();
    const last_name = React.createRef();

    const childFirst = ref(db,dbData +"/First Name")
        var childFirstName="";
        const childLast = ref(db,dbData +"/Last Name/" )
        var childLastName=""
        
        onValue(childFirst, (snapshot) => {
            childFirstName = snapshot.val();
        })
        onValue(childLast, (snapshot) => {
            childLastName = snapshot.val();
        })
        
        const update_data = async (event) => {
            event.preventDefault();
            const updates = {};
            updates[dbData+'/First Name'] = first_name.current.value;
            updates[dbData+'/Last Name'] = last_name.current.value;
            update(ref(db), updates);
        
        }
        var waitM = ""
        if(type =='Caregiver'){
            waitM = ""
        } else {
            waitM = <WaitModal
            data={{
              id:dbData, 
              type:type,
              name: `${childFirstName} ${childLastName}`}}/>
        }
    
    return(
        <div className="rows is-vcentered background"> 
          <NavBar className="navbar" current="myaccount"/>
          <div className="row accountBox">
              <button className="button"
              onClick= {() => history.goBack()}><BsChevronLeft size={20}/></button>
              <h1> Edit {props.location.data.type}</h1>
              <div className="field">
                <label className="label">First Name</label>
                  <div className="control">
                    <input 
                    className="control" 
                    type="text" 
                    defaultValue = {childFirstName}
                    placeholder="First Name" 
                    ref={first_name}/>
                  </div>
              </div>
              <div className="field">
                  <label className="label">Last Name</label>
                  <input className="control" 
                  type="text" 
                  defaultValue={childLastName}
                  placeholder="Last Name" 
                  ref={last_name}/>
              </div>
              <button className="button is-light" onClick={update_data}>Save Changes</button>
              {waitM}
          </div>
        </div>
    )
};

export default EditPage;