import React, {useState} from "react";
import ReactDOM from "react-dom";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import Cookies from 'universal-cookie';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import useInput from "../../hooks/useInput";
import Modal from "../../hooks/modal";


//Accessed from "+" Button next to "Listeners" in MyAccount
//This Modal is used to let users add a new listener to their account
const ListenerModal = () => {
  const cookies = new Cookies();
  const db = getDatabase();
  
  //onClick event, sends user input into their account information in the database
  const add_listener = async (event) => {
    //event.preventDefault();
    const newChild = push(ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Children/"));
    const childId = newChild.key;
    
    set(ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Children/" + childId),{
    "First Name": first_name.value,
    "Last Name": last_name.value,
    "Books Read" : "",
  });
  openModal(event);
}

//takes user input for add_listener to use
  const first_name = useInput("")
  const last_name = useInput("")

  //toggle modal function
  const [showModal, setShowModal] = useState(false)
  const openModal = (event) => {
    event.preventDefault();
    setShowModal(prev => !prev)
  }

  return(
    <div className="App">
        <button
        onClick={openModal}>
          <AiOutlinePlusCircle size={20}/>
        </button>
        
        {/* Modal from "../../hooks/modal"; */}
        <Modal
        showModal ={showModal}
        setShowModal={setShowModal}
        modalInfo={
            <div className="modal-background">
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Add New Listener</p>
                  <button 
                  className="delete"
                  onClick={openModal}
                  aria-label="close"/>
                </header>
                <section className="modal-card-body">
                  <div className="field">
                    <div className="control">
                      <input 
                      type="text" 
                      className="input"
                      placeholder="Listener First Name"
                      {...first_name} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                      type="text" 
                      className="input" 
                      placeholder="Listener Last Name"
                      {...last_name}/>
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={add_listener}>Add Listener</button>
                  <button className="button" onClick={openModal}>Cancel</button>
                </footer>
              </div>
            </div>
        }/>

    </div> 
  )

}

export default ListenerModal

 