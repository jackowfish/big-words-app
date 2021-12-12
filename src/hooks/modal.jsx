import React from "react"; 
//used for all modals not (yet) written within a React Class

//showModal toggles modal on/off
//modalInfo is the html code for the modal
const Modal = ({showModal, setShowModal, modalInfo}) => {
    return  <> {showModal ? modalInfo: null} </>;
  };

  export default Modal;