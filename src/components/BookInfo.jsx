import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/BookInfo.css'
import NavBar from './Nav Bar'
import Button from './Button'
import {Link} from "react-router-dom"
import {BsChevronLeft} from 'react-icons/bs'
import LogBook from './modals/logBook';
import { getDatabase, ref, onValue } from "firebase/database";

const BookInfo = () => {
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

    return (
        <div className="columns is-vcentered background"> 
            <NavBar className="navbar" current="mylibrary"/>
            <div className="column bookInfo">
                <h1 className="titleText"> <BsChevronLeft size={20}/> {bTitle}</h1>
                <h1 className="authorText">By: {bAuthor}</h1>
                <div className="bookInfo">
                    <img src="../static/BigWords.png" className="image"/>
                </div>
                <h1 className="bookDataText">[#]Words|[#]Big Words|Read[#]Times</h1>
              <Link id="ViewBigWordsButton" to="search">
                <Button className="yellow button" name="View Big Words"/>
              </Link>
              <Link id="ViewAllWordsButton" to="search">
                <Button className="white button"name="View All Words"/>
              </Link>
              <Link id="ReadingHistoryButton" to="search">
                <Button className="yellow button" name="Reading History"/>
              </Link>
              <LogBook/>
            </div>
        </div>
        
        )

}

export default BookInfo;