import React, { useState } from 'react';
import Word from './Word'
import { getDatabase, ref, onValue } from "firebase/database";
import 'bulma/css/bulma.min.css';
import { propTypes } from 'react-bootstrap/esm/Image';
import Cookies from 'universal-cookie';

const BigWords = () => {

    const words_array = [];
    const db = getDatabase();
    const book_list = ref(db, 'Books/');
    const cookies = new Cookies();

    onValue(book_list, (snapshot) => {
        const book_list_data = snapshot.val();
  
      for (const current_book in book_list_data) {
        const check_book_status = ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Books Read/" + `${current_book}`);
          onValue(check_book_status, (snapshot) => {
            if (snapshot.val() != null && snapshot.val() > 0) {
                const word_list = ref(db, 'Books/' + `${current_book}` + '/Words/');
            onValue(word_list, (snapshot) => {
                const word_list_data = snapshot.val();
                for (var word in word_list_data) {
                    const word_info = ref(db, 'Books/' + `${current_book}` + '/Words/' + word);
                    onValue(word_info, (snapshot) => {
                        const word_data = snapshot.val();
                        if (word_data.bigword == true) {
                            const current_word = word + "_" + word_data.count;
                            words_array.push(<Word key={word} name={current_word}/>);
                        }
                    });
                }
            });
            }
        });
        }
    });

    return (
    <div className="column bigWords_section">
        <h1 className="bigwords_title">Big Words</h1>
        <div className = "column bigWords_list">
            {words_array}
        </div>
    </div>
      
      )
  }
  
  export default BigWords;      