import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import '../../styles/BookInfo.css'
import LogReader from "./logReader";
import LogListener from "./logListeners";

class LogBook extends React.Component {
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
              <p className="modal-card-title">Now Reading</p>
              <button
                onClick={this.handleClick}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
                <h1 className="titleText"> [Title]</h1>
                <h1 className="authorText">By: [Author]</h1>
                <div className="bookInfo">
                    <img src="../static/BigWords.png" className="image"/>
                </div>
                <h1 className="bookDataText">[#]Words|[#]Big Words|Read[#]Times</h1>
                <div className="bookInfo">
                    <h1>Reader(s) <LogReader/></h1>
                    <h2>Click the + button to add reader(s)</h2> 
                </div>
                <div className="bookInfo">
                    <h1>Listener(s) <LogListener/></h1>
                    <h2>Click the + button to add listener(s)</h2>
                </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Log Book</button>
              <button onClick={this.handleClick} className="button">
                Cancel
              </button>
            </footer>
          </div>
        </div>

        <button onClick={this.handleClick}>
          Log Book
        </button>
      </div>
    );
  }
}

export default LogBook;