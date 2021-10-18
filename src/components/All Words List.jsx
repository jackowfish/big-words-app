import React, { useState } from 'react';
import Word from './Word'
import { getDatabase, ref, onValue } from "firebase/database";
import 'bulma/css/bulma.min.css';

const AllWords = () => {

    const words_array = [];
    const db = getDatabase();
    const book_list = ref(db, 'Books/FrtKf2u87GcBKhbE8q2w/Words');

    onValue(book_list, (snapshot) => {
        const book_list_data = snapshot.val();
        for (var word in book_list_data) {
            const word_info = ref(db, 'Books/FrtKf2u87GcBKhbE8q2w/Words/' + word);
            
            onValue(word_info, (snapshot) => {
                const word_data = snapshot.val();
                const current_word = word + "_" + word_data.count;
                words_array.push(<Word key={word} name={current_word}/>);
            });
        }
    });

    return (
    <div className="column allWords_section">
        <h1 className="allwords_title">All Words</h1>
        <div className = "column allWords_list">
            {words_array}
        </div>
    </div>
      
      )
  }
  
  export default AllWords;      