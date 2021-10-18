import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import {AiOutlinePlusCircle} from 'react-icons/ai'

class WaitModal extends React.Component {
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
              <p className="modal-card-title">Remove [Attribute]?</p>
              <button
                onClick={this.handleClick}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
                <h1>You are about to remove the [attribute]</h1> 
                <h1>[First] [Last]</h1>
                <p>Completing this action will remove all of this listener's Information
                    from your account forever.
                </p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Yes, Remove Listener</button>
              <button onClick={this.handleClick} className="button">
                Cancel
              </button>
            </footer>
          </div>
        </div>

        <button onClick={this.handleClick}>
          Remove Listener
        </button>
      </div>
    );
  }
}

export default WaitModal;