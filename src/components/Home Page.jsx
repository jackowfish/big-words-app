import React, { useState } from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import 'bulma/css/bulma.min.css';
import '../styles/Home_Page.css'
import NavBar from './Nav Bar'
import Cookies from 'universal-cookie';
import Button from './Button'
import {Link, useHistory} from "react-router-dom"

class HomePage extends React.Component {
  constructor(props) {
    super();

    this.db = getDatabase();
    this.cookies = new Cookies();
    this.state = {
      first_name: "",
      books: [],
      words: [],
      big_word_count: 0,
      word_count: 0,
      loaded: false
    };
  }
  
  componentDidMount() {
    this.render_data();
  }

  render_data() {
    const info = ref(this.db, 'Users/' + this.cookies.get('BigWordsUser').user.uid + "/First Name");
    onValue(info, (snapshot) => {
      this.setState({
        first_name: snapshot.val(),
      });
    });

    const children_info = ref(this.db, "Users/" +  this.cookies.get('BigWordsUser').user.uid + "/Children");
    onValue(children_info, (snapshot) => {
      const book_array = [];
      const words_array = [];
      let word_count = 0;
      let big_word_count = 0;
      for (var child in snapshot.val()) {
        const book_list = ref(this.db, "Users/" +  this.cookies.get('BigWordsUser').user.uid + "/Children/" + child + "/Books Read");
        onValue(book_list, (snapshot) => {
          for (var book in snapshot.val()) {
            if (!book_array.includes(book)) {
              book_array.push(book);
            }
          }
          this.setState({
            books: book_array
          });
        });
      }
      for (var i = 0; i < book_array.length; i++) {
        const current_book = book_array[i];
        const word_list = ref(this.db, "Books/" + current_book + "/Words");
        onValue(word_list, (snapshot) => {
          for (var word in snapshot.val()) {
            if (!words_array.includes(word)) {
              words_array.push(word);
              const word_data = ref(this.db, "Books/" + current_book + "/Words/" + word);
              onValue(word_data, (snapshot) => {
                word_count++;
                if (snapshot.val().bigword) {
                  big_word_count++;
                }
              })
            }
            this.setState({
              words: words_array,
              word_count: word_count,
              big_word_count: big_word_count
            })
            setTimeout(() => {
              this.setState({
                loaded: true
              })
            }, 100);
          }
        })
      }
    });
  }

  render() {
    return (
      <div className="rows is-vcentered background"> 
          <NavBar className="navbar" current="homepage"/>
          <div className="column welcomeBack">
            <h1 className="welcomeText">Welcome Back<br></br>{this.state.first_name}<br></br></h1>
              <hr></hr>
              {this.state.loaded ? <h1 className="bookDataText">Word Count: {this.state.word_count}<br></br>Big Word Count: {this.state.big_word_count}</h1> : <h1 className="bookDataText"></h1>}
              <Link id="LogBooksButton" to="search">
                <Button className="yellow button" name="Log Books"/>
              </Link>
            {/* <h1 className="previousText">Previously Read...</h1> */}
          </div>
      </div>
      
      )
    }
  }

export default HomePage;            