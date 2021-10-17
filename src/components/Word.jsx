import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';

const Word = (props) => {

    const word_and_count = props.name.split("_");
    console.log(word_and_count);


    return (
        <div className="current_word">{word_and_count[0]}
        <span className="current_count">{word_and_count[1]}</span>
        </div>
      )
  }
  
  export default Word;  