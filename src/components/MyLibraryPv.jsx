import React, { useState } from 'react';
import'../styles/BookPv.css';
import'../styles/index.css';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import {Link, useLocation, useHistory} from "react-router-dom"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Cookies from 'universal-cookie';
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as ref_storage } from "firebase/storage";
import '../styles/MyLibrary.css';
import { BsPuzzleFill } from 'react-icons/bs';

class MyLibraryPv extends React.Component{
    constructor(props){
        super();
        this.db = getDatabase();
        this.state={
            dateArray:[],
            booksArray:[],
            path: props.data.path,

        };
    }

    componentDidMount() {
        this.render_data();
    }

    render_data(){
        const date_array = [];
        // const history = useHistory();
        const bookList = ref(this.db, 'Books/');

        // if(cookies.get('BigWordsUser') == null) {
        //     history.push('/');
        //     window.location.reload(false);
        // }

        //building date array
        const booksReadDate = ref(this.db, this.state.path)
        onValue(booksReadDate, (snapshot) => {
            const booksReadDateData = snapshot.val();
            for(const currentDate in booksReadDateData){
                const booksArray = [];
                const booksRead = ref(this.db, this.state.path + `/${currentDate}`)
                onValue(booksRead, (snapshot)=> {
                    const booksReadData = snapshot.val();
                    for(const currentBook in booksReadData){
                        var bookTitle = ""
                        const bookTitleRef = ref(this.db, this.state.path + `/${currentDate}/` +`${currentBook}/` + "Title/")
                        onValue(bookTitleRef, (snapshot) => {
                            if(snapshot.val() !=null){
                                bookTitle = snapshot.val();
                                booksArray.push(bookTitle)
                            }
                        })
                    }
                       
                    date_array.push(
                    {
                        date: currentDate,
                        books: booksArray
                    })

                    
                })
            }
            this.setState(this.state.dateArray = date_array)
        })

        //building preview array
        const dateBooksArray = this.state.dateArray
        const pvArray = [];
        
        for(var i=0; i< dateBooksArray.length; i++){
            var dateBooks = dateBooksArray[i].books
            for(var i =0; i < dateBooks.length; i++){
                //create URL
                var url = dateBooks[i];

                //counting words and big words
                var wordCount = 0;
                var bigWordCount = 0;
                const wordsList = ref(this.db, 'Books/' + url + '/Words/');
                onValue(wordsList, (snapshot) => {
                    const wordListData = snapshot.val();
                    for(var word in wordListData){
                        const wordInfo = ref(this.db, 'Books/' + url + '/Words/' + word);
                        onValue(wordInfo, (snapshot) => {
                            const wordData = snapshot.val();
                            wordCount++;
                            if(wordData.bigword == true){
                                bigWordCount++;
                            }
                        });
                    }
                })

                //title
                var title = "";
                const bTitle = ref(this.db, 'Books/' + url + '/Title')
                onValue(bTitle, (snapshot) => {
                    title = snapshot.val();
                })

                //author
                var author = "";
                const bAuthor = ref(this.db, 'Books/' + url + '/Author Name');
                onValue(bAuthor, (snapshot) => {
                    author = snapshot.val();
                })

                //push to array 
                pvArray.push({
                    url: url,
                    title: title,
                    author: author,
                    words:wordCount,
                    bigwords:bigWordCount,
                })
              

            }
        }
        this.setState(this.state.booksArray = pvArray)
    }

    render(){
        return(
            this.state.dateArray.map((date) => {
                return(
                    <div key={date.date}>
                        <h1 className="dateText">{date.date}</h1>
                        {this.state.booksArray.map((book)=> {
                            return(
                                <div className="bookpv" key={book.title}>
                                    <Link to={{
                                        pathname:'/bookinfo',
                                        search:`?sort=${book.url}`,
                                        data:{book:book}
                                    }}>
                                        <div className="row">
                                            <h2>{book.title}</h2>
                                            <h1>{book.author}</h1>
                                            <h3>{book.words} Words <br/>
                                            {book.bigwords} Big Words</h3>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )
            })
        )
    }
}

export default MyLibraryPv;