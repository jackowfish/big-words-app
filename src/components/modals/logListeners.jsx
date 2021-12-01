import { getDatabase } from "@firebase/database";
import React, {useState} from "react";
import ReactDOM from "react-dom";
import {AiOutlinePlusCircle} from 'react-icons/ai'
import Modal from "../../hooks/modal"
import Cookies from 'universal-cookie';
import TableBuilder from'../tableBuilder';


const LogListener = (props) => {
  const cookies = new Cookies();
  const db = getDatabase();

  
  const[showModal, setShowModal] = useState(false);
  const openModal = (event) => {
    event.preventDefault();
    setShowModal(prev => !prev)
  }
  
  return(
    <div className="App">
      <button className="button" onClick={openModal}><AiOutlinePlusCircle size={20}/></button>
      <Modal
      showModal = {showModal}
      setShowModal={setShowModal}
      modalInfo={
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Listener</p>
              <button 
              className="delete"
              onClick={openModal}
              aria-label="close"/>
            </header>
            <section className="modal-card-body">
              <div>
                <TableBuilder
                data={{
                  user:"Users/" + cookies.get('BigWordsUser').user.uid + "/Children/",
                  from: "logbook"
                }}/>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Done</button>
              <button className="button" onClick={openModal}>Cancel</button>
            </footer>
          </div>
        </div>
      }/>
    </div>
  )
}

export default LogListener