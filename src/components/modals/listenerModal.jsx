import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import {AiOutlinePlusCircle} from 'react-icons/ai'

class ListenerModal extends React.Component {
  state = {
    isModal: false
  };

  handleClick = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  render() {
    const active = this.state.isModal ? "is-active" : "";
    return (
      <div className="App">
        <div className={`modal ${active}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add New Listener</p>
              <button
                onClick={this.handleClick}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Child First Name"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input" type="text" placeholder="Child Last Name"/>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Add Listener</button>
              <button onClick={this.handleClick} className="button">
                Cancel
              </button>
            </footer>
          </div>
        </div>

        <button onClick={this.handleClick}>
          <AiOutlinePlusCircle size={20}/>
        </button>
      </div>
    );
  }
}

export default ListenerModal;

 