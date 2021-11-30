import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';

const Word = (props) => {

    return (
        <div className="current_word" onClick={props.onClick}>{props.word}
            <span className="current_count">{props.count}</span>
        </div>
      )
  }
  
  export default Word;  