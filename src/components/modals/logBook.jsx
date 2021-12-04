import React, {useState} from "react";
import ReactDOM from "react-dom";
import '../../styles/BookInfo.css'
import LogReader from "./logReader";
import LogListener from "./logListeners";
import { getDatabase, ref, set, push} from "firebase/database";
import Modal from "../../hooks/modal"
import TableBuilder from'../tableBuilder';
import Cookies from 'universal-cookie';
import LogSelect from "../LogSelect";

class LogBook extends React.Component{
  constructor(props){
    super();
    this.db = getDatabase();
    this.cookies = new Cookies();
    this.state = {
      url: props.data.url,
      title: props.data.title,
      author: props.data.author,
      words: props.data.words,
      bigwords: props.data.bigwords,
      img: props.data.img,
      show: false,
      readers:[],
      children:[]

    };
  }

  componentDidMount(){}

  openModal = (event) => {
    event.preventDefault();
    if(this.state.show == false){
      this.setState({
      show:true
      })
    }else{
      this.setState({
        show:false,
        readers: [],
        children: []
      })
    }

  }

  handleReadersCallback = (childData)=> {
    this.state.readers = childData
  
  }

  handleChildrenCallback = (childData)=> {
    this.state.children = childData
    
  }


  submitLog = async(event) => {
    event.preventDefault();
    const newLog = push(ref(this.db, "Users/" + this.cookies.get('BigWordsUser').user.uid + "/BooksRead/"));
    const logId = newLog.key
  
    const oldDate = new Date().toLocaleDateString()
    const todayDate = oldDate.replace(/-|\//g, "-")
    
    for(var i=0; i< this.state.children.length; i++){
      set(ref(this.db, "/Users/" + this.cookies.get('BigWordsUser').user.uid + "/Children/" + this.state.children[i] + "/Books Read/" + this.state.url), 1)
    }

   set(ref(this.db, "Users/" + this.cookies.get('BigWordsUser').user.uid + "/BooksRead/" + `${todayDate}/`+ logId), {
      "Title": this.state.url,
      "Readers": this.state.readers,
      "Children": this.state.children
    })

    
    this.openModal(event);
    
  }

  render(){
    return(
      <div className="App">
      <button className="button"
      onClick={this.openModal}>
        Log Book
      </button>
      <Modal
      showModal = {this.state.show}
      modalInfo={
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-header">
              <p className="modal-card-title"></p>
                <button 
                className="delete"
                onClick={this.openModal}
                aria-label="close"/>
            </header>
            <section className="modal-card-body">
              <h1 className="titleText">{this.state.title}</h1>
              <h1 className="authorText">By: {this.state.author}</h1>
              {/* <div className="bookInfo">
                <img src={this.state.img} className="image"/>
              </div> */}
              <h1 className="bookDataText">{this.state.words} Words | {this.state.bigwords} BigWords</h1>
              <div className="userInfo">
                <h1>Reader(s)</h1>
                <LogSelect
                parentCallback={this.handleReadersCallback}
                name="Readers"
                data={{
                  user:"Users/" + this.cookies.get('BigWordsUser').user.uid + "/Readers/",
                  from: "logbook",
                }}/>

              </div>
              <div className="userInfo">
                <h1>Listener(s)</h1>
                  <LogSelect
                    parentCallback={this.handleChildrenCallback}
                    name="Listeners"
                    data={{
                      user:"Users/" + this.cookies.get('BigWordsUser').user.uid + "/Children/",
                      from: "logbook",
                  }}/>
                
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={this.submitLog}>Log Book</button>
              <button className="button" onClick={this.openModal}>Cancel</button>
            </footer>
          </div>
        </div>
      }/>
    </div>
    )

  }
  

}

export default LogBook;