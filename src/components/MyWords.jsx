import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/My_Words.css'
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";
import BigWords from './Big Words List'
import AllWords from './All Words List'

class MyWords extends React.Component {
  constructor() {
    super();

    this.cookies = new Cookies();
    this.db = getDatabase();

    this.state = {
      children_id: [],
      current_child: "",
      current_child_id: "",
      current_index: 0,
      has_child: false
    }
  }

  toggleListener = () => {
    this.setState({
      current_child_id: ""
    })
    let current_index = this.state.current_index;
    if (current_index >= this.state.children_id.length - 1) {
      current_index = 0;
    } else {
      current_index++;
    }
    const children_data = ref(this.db, "Users/" +  this.cookies.get('BigWordsUser').user.uid + "/Children/" + this.state.children_id[current_index] + "/First Name");
      onValue(children_data, (snapshot) => {
        this.setState({
          current_child: snapshot.val() + "'s Words",
          current_index: current_index,
          current_child_id: this.state.children_id[current_index]
      });
    });
  }

  componentDidMount() {
    this.render_data();
  }

  render_data() {
    const children_id = [];
    const selected_child = ref(this.db, "Users/" +  this.cookies.get('BigWordsUser').user.uid + "/Children");
    onValue(selected_child, (snapshot) => {
      for (var child in snapshot.val()) {
        this.setState({
          has_child: true
        })
        children_id.push(child);
      }
      this.setState({
        current_child_id: children_id[this.state.current_index],
        children_id: children_id
      });
      const children_data = ref(this.db, "Users/" +  this.cookies.get('BigWordsUser').user.uid + "/Children/" + children_id[0] + "/First Name");
      onValue(children_data, (snapshot) => {
        this.setState({
          current_child: snapshot.val() + "'s Words",
      });
    });
    });
  }

  render() {
    return (
    <div className="rows is-vcentered background"> 
      <NavBar className="navbar" current="mywords"/>
      <div className="listener_name_section">
          {this.state.has_child ? <h1 className="listener_name">{this.state.current_child} 
          <button className="listener" onClick={this.toggleListener}>Switch Listener</button>
          </h1> : <h1 className="listener_name"></h1>}
      </div>
      {this.state.current_child_id.length > 0 ? <BigWords className="bigwords_list" child={this.state.current_child_id}/> : null}
      {this.state.current_child_id.length > 0 ? <AllWords className="allwords_list" child={this.state.current_child_id}/> : null}
    </div>
    
    )
  }
}

export default MyWords;      