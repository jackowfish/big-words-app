import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import'../styles/BookPv.css';
import'../styles/index.css';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import {Link, useLocation} from "react-router-dom"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Cookies from 'universal-cookie';
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as ref_storage } from "firebase/storage";

const BookPv = (props) => {
    const db = getDatabase();
    const storage = getStorage();
    const cookies = new Cookies();

    const photoRef = ref_storage(storage, props.name + '.jpg'); // having issues with the photos from storage still, hard coded for now
    const photo_url = getDownloadURL(photoRef).then((url) => {
        return url;
    });

    const add_book = async (event) => {
        event.preventDefault();
        set(ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Books Read/" + props.name), 1);
    };

    const remove_book = async (event) => {
        event.preventDefault();
        set(ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Books Read/" + props.name), 0);
    };

    var word_count = 0;
    var big_word_count = 0;

    const word_list = ref(db, 'Books/' + props.name + '/Words/');
    onValue(word_list, (snapshot) => {
    const word_list_data = snapshot.val();
    for (var word in word_list_data) {
        const word_info = ref(db, 'Books/' + props.name + '/Words/' + word);
        onValue(word_info, (snapshot) => {
          const word_data = snapshot.val();
          word_count++;
          if (word_data.bigword == true) {
            big_word_count++;
            }
        });
      }
  });

    const check_book_status = ref(db, "Users/" +  cookies.get('BigWordsUser').user.uid + "/Books Read/" + props.name);
    const button_icon= [];
    onValue(check_book_status, (snapshot) => {
        if (snapshot.val() != null && snapshot.val() > 0) {
            button_icon.push(<AiOutlineMinusCircle key="remove_library" className="status_button" onClick={remove_book} size={20} color="black"/>);
        } else {
            button_icon.push(<AiOutlinePlusCircle key="add_library" className="status_button" onClick={add_book} size={20} color="black"/>);
        }
    });


    const title = ref(db, 'Books/' + props.name + '/Title');
    const bTitle=[];
    onValue(title, (snapshot)=> {
        const sTitle = snapshot.val();
        bTitle.push(sTitle);
    })

    const bAuthor=[];
    const authorF = ref(db, 'Books/' + props.name + '/Author First');
    onValue(authorF, (snapshot)=> {
        const sAuthor = snapshot.val();
        bAuthor.push(sAuthor);
    })
    const authorL = ref(db, 'Books/' + props.name + '/Author Last');
    onValue(authorL, (snapshot)=> {
        const sAuthor = snapshot.val();
        bAuthor.push(" ");
        bAuthor.push(sAuthor);
    })

    return(
        <div className="bookpv">
            <Link id="BookInfoLink" to="bookinfo"> 
                <div className="column">
                    <div className="bookpv">
                        <img src="https://firebasestorage.googleapis.com/v0/b/bigwords-202f6.appspot.com/o/FrtKf2u87GcBKhbE8q2w.jpg?alt=media&token=792f0ce4-b2fa-44a6-9d15-0f8fe8461fb2" className="image"/>
                    </div>
                </div>
                <div className="column">
                    <h1> {bTitle} </h1>
                    <h2> {bAuthor}</h2>
                    
                    <h3> {word_count} Words <br/>
                    {big_word_count} Big Words</h3>
                </div>
            </Link>
           {button_icon}
        </div>
    )

}

export default BookPv;