import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import'../styles/BookPv.css';
import'../styles/index.css';
import {BiDotsVerticalRounded} from 'react-icons/bi'
import {Link, useLocation} from "react-router-dom"
import { getDatabase, ref, onValue } from "firebase/database";
import Cookies from 'universal-cookie';
import BookPv from './BookPv';

const BookList = (props) => {
    const db = getDatabase();
    const cookies = new Cookies();
    const current_uid = cookies.get('BigWordsUser').user.uid;
    const books_array = [];

    if (props.name == "featured") {
        books_array.push(<BookPv className="bookpv" key="FrtKf2u87GcBKhbE8q2w" name="FrtKf2u87GcBKhbE8q2w"/>);
    } else {
        const book_list = ref(db, 'Books/');
        onValue(book_list, (snapshot) => {
            const book_list_data = snapshot.val();
      
          for (const current_book in book_list_data) {
            const check_book_status = ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Books Read/" + `${current_book}`);
              onValue(check_book_status, (snapshot) => {
                if (snapshot.val() != null && snapshot.val() > 0) {
                    books_array.push(<BookPv className="bookpv" key={current_book} name={current_book}/>);
                 }
                });
            }
        });
    }

    return(
    <div className="column bookListSection">
        <div className = "column bookList">
            {books_array}
        </div>
    </div>
    )

}

export default BookList;