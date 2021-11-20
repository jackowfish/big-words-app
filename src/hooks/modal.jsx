import React from "react"; 

const Modal = ({showModal, setShowModal, modalInfo}) => {
    return  <> {showModal ? modalInfo: null} </>;
  };

  export default Modal;