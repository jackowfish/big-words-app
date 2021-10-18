import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import'../styles/BookPv.css';
import'../styles/index.css';
import {BiDotsVerticalRounded} from 'react-icons/bi'
import {Link, useLocation} from "react-router-dom"
import { getDatabase, ref, onValue } from "firebase/database";

const BookPv = () => {
    const db = getDatabase();

    const title = ref(db, 'Books/FrtKf2u87GcBKhbE8q2w/Title');
    const bTitle=[];
    onValue(title, (snapshot)=> {
        const sTitle = snapshot.val();
        bTitle.push(sTitle);
    })

    const bAuthor=[];
    const authorF = ref(db, 'Books/FrtKf2u87GcBKhbE8q2w/Author First');
    onValue(authorF, (snapshot)=> {
        const sAuthor = snapshot.val();
        bAuthor.push(sAuthor);
    })
    const authorL = ref(db, 'Books/FrtKf2u87GcBKhbE8q2w/Author Last');
    onValue(authorL, (snapshot)=> {
        const sAuthor = snapshot.val();
        bAuthor.push(" ");
        bAuthor.push(sAuthor);
    })

    return(
    <Link id="BookInfoLink" to="bookinfo"> 
        <div className="bookpv">
            <div className="column">
                <div className="bookpv">
                    <img src="../static/BigWords.png" className="image"/>
                </div>
            </div>
            <div className="column">
                <h1> {bTitle} </h1>
                <h2> {bAuthor}</h2>
                
                <h3> 105 Words <br/>
                 55 Big Words</h3>
            
            </div>

        </div>
    </Link>
    )

}

export default BookPv;