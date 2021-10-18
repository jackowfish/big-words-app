import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import {AiOutlinePlusCircle} from 'react-icons/ai'

class LogListener extends React.Component {
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
              <p className="modal-card-title">Add Listeners</p>
              <button
                onClick={this.handleClick}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div>
                  <h1>[Name]</h1>
                  <button className="button"> Add</button>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Done</button>
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

export default LogListener;