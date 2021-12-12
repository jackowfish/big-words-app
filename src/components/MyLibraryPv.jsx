import React, { useState } from 'react';
import'../styles/BookPv.css';
import'../styles/index.css';
import {Link, useLocation, useHistory} from "react-router-dom"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Cookies from 'universal-cookie';
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as ref_storage } from "firebase/storage";
import '../styles/MyLibrary.css';

//Accessed from MyLibrary
//This component creates a list of books the user has logged by date
class MyLibraryPv extends React.Component{
    constructor(props){
        super();
        this.db = getDatabase();
        this.state={
            dateArray:[],
            path: props.data.path,
            loaded: false,
            booksArray: [],
            title: ""

        };
    }

    componentDidMount() {
        this.render_data();
    }

    render_data() {

        const date_array = [];
        // const history = useHistory();
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
                        //url
                        var url = ""
                        const bookUrlRef = ref(this.db, this.state.path + `/${currentDate}/` +`${currentBook}/` + "Title/")
                        onValue(bookUrlRef, (snapshot) => {
                            url = snapshot.val();
                        })

                        //title
                        var title = ""
                        const bTitle = ref(this.db, 'Books/' + url + '/Title')
                        onValue(bTitle, (snapshot) => {
                            title = snapshot.val();
                            this.state.title = snapshot.val();
                        })
                        //author
                        var author = "";
                        const bAuthor = ref(this.db, 'Books/' + url + '/Author Name');
                        onValue(bAuthor, (snapshot) => {
                            author = snapshot.val();
                        })

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
                                        if(wordData != null && wordData.bigword == true){
                                            bigWordCount++;
                                        }
                                });
                            }
                        })

                        //waiting for data to completely be returned before pushing to booksArray
                        setTimeout(100)
                        booksArray.push({
                            url: url,
                            title: this.state.title,
                            author: author,
                            words: wordCount,
                            bigwords: bigWordCount,
                            cover:`https://firebasestorage.googleapis.com/v0/b/bigwords-202f6.appspot.com/o/images%2F${url}?alt=media`,
                        })
                    }
                    
                    //wait for data to be returned before rendering
                    setTimeout(() => {
                        this.setState({
                          loaded: true
                        })
                      }, 100);
                       
                    date_array.push(
                    {
                        date: currentDate,
                        books: booksArray
                    })

                    
                })
            }
            this.setState({dateArray: date_array})
            
        })
    }


    render(){
            return(
            this.state.loaded ? this.state.dateArray.map((date) => {
                return(
                    <div key={date.date}>
                        <h1 className="dateText">{date.date}</h1>
                            { date.books.map((book) => {
                                return(
                                    <div className="bookpv" key={book.url}>
                                        <Link to={{
                                            pathname:'/bookinfo',
                                            search:`?sort=${book.url}`,
                                            data:{book:book}
                                        }}>
                                            <div className="row">
                                                <div className="columns">
                                                    <div className="column bookpv_cover">
                                                        <img className="book_cover" src={book.cover} key={book.title + "cover"}/>
                                                    </div>
                                                    <div className="column book_info_text">
                                                        <h2>{book.title}</h2>
                                                        <h1>{book.author}</h1>
                                                        <h3>{book.words} Words <br/>
                                                        {book.bigwords} Big Words</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>)
                            })}
                    </div>
                )
            }): null)
    }
}

export default MyLibraryPv;