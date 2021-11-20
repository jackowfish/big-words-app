import React, {useState} from "react";
import ReactDOM from "react-dom";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import Cookies from 'universal-cookie';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import useInput from "../../hooks/useInput";
import Modal from "../../hooks/modal";



const ReaderModal = () => {
  const cookies = new Cookies();
  const db = getDatabase();
  
  const add_reader = async (event) => {
    event.preventDefault();
    const newReader = push(ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Readers/"));
    const readerId = newReader.key;
    
    set(ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Readers/" + readerId),{
    "First Name": first_name.value,
    "Last Name": last_name.value,
  });

  openModal(event);
}

  const first_name = useInput("")
  const last_name = useInput("")
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
        <Modal
        showModal ={showModal}
        setShowModal={setShowModal}
        modalInfo={
            <div className="modal-background">
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Add New Reader</p>
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
                      placeholder="Reader First Name"
                      {...first_name} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                      type="text" 
                      className="input" 
                      placeholder="Reader Last Name"
                      {...last_name}/>
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={add_reader}>Add Reader</button>
                  <button className="button" onClick={openModal}>Cancel</button>
                </footer>
              </div>
            </div>
        }/>
    </div> 
  )

}

export default ReaderModal