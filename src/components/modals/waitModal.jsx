import { getDatabase, ref, onValue, remove } from "firebase/database";
import Cookies from 'universal-cookie';
import React, {useState, useHistory} from "react";
import ReactDOM from "react-dom";
import Modal from "../../hooks/modal";
import 'bulma/css/bulma.min.css';

//Accessed from EditPage when "Delete Reader/Listener" is clicked
// This modal is used to warn the user that they are about to delete a Reader/Listener off their account
// When the 'Yes, delete listener' button is clicked, the reader/listener will be deleted  
const WaitModal = (props) => {
  const cookies = new Cookies();
  const db = getDatabase();
  const [showModal, setShowModal] = useState(false)
  const type = (props.data.type)
  const name = (props.data.name)

  if(cookies.get('BigWordsUser') == null) {
    history.push('/');
    window.location.reload(false);
}

//toggle modal button
  const openModal = (event) => {
    event.preventDefault();
    setShowModal(prev => !prev)
  }

  //onClick event, deletes reader/listner from the account
  const delete_data = async (event) =>{
    event.preventDefault();
    remove(ref(db,props.data.id));
    openModal(event);
    window.location.assign('#/myaccount')
  }

  return(
    <div className = "App">
      <button className="button is-danger" onClick={openModal}>Delete {type} </button>
      <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      modalInfo={
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title"> Remove {type}?</p>
              <button
              onClick={openModal}
              className="delete"
              aria-label="close"/>
            </header>
            <section className="modal-card-body">
              <h1>You are about to remove {type}</h1>
              <h1> <b>{name}</b></h1>
              <p>Completing this action will remove all of this {type}'s 
                information from your account forever.
              </p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={delete_data}>Yes, Remove {type}</button>
              <button className="button" onClick={openModal}>Cancel</button>
            </footer>
          </div>
        </div>
      }
      />
    </div>
  )
}

export default WaitModal;