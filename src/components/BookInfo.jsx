import React, { useState } from 'react';
import '../styles/BookInfo.css'
import NavBar from './Nav Bar'
import Button from './Button'
import {Link, useHistory,useLocation, withRouter} from "react-router-dom"
import {BsChevronLeft} from 'react-icons/bs'
import LogBook from './modals/logBook';
import { getDatabase, ref, onValue } from "firebase/database";
import Cookies from 'universal-cookie';
import { getAuth } from '@firebase/auth';



const BookInfo = (props) => {
  const cookies = new Cookies();
  const auth = getAuth();
  const history= useHistory();
  const db = getDatabase();
  const location = useLocation();
  const bookInfo  = props.location.data.book


  if(cookies.get('BigWordsUser') == null) {
    history.push('/');
    window.location.reload(false);
}

    return (
        <div className="rows is-vcentered background"> 
            <NavBar className="navbar" current="mylibrary"/>
            <div className="row bookInfo">
            <button className="button" onClick={() => history.goBack()}><BsChevronLeft/></button> 
                <h1 className="titleText">                {bookInfo.title}</h1>
                <h1 className="authorText">By: {bookInfo.author}</h1>
                <div>
                    <img className="book_cover" src={bookInfo.cover} className="image"/>
                </div>
                <h1 className="bookDataText">{bookInfo.words} Words | {bookInfo.bigwords} Big Words</h1>
              <Link id="ViewBigWordsButton" to="search">
                <Button className="yellow button" name="View Big Words"/>
              </Link>
              <Link id="ViewAllWordsButton" to="search">
                <Button className="white button"name="View All Words"/>
              </Link>
              <Link id="ReadingHistoryButton" to="search">
                <Button className="yellow button" name="Reading History"/>
              </Link>
              <LogBook data={bookInfo}/>
            </div>
        </div>
        
        )

}

export default BookInfo;