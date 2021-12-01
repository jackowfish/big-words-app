import React, { useState } from 'react';
import'../styles/BookPv.css';
import'../styles/index.css';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import {Link, useLocation, useHistory} from "react-router-dom"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Cookies from 'universal-cookie';
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as ref_storage } from "firebase/storage";

class BookPv extends React.Component{
    constructor(props){
        super();
        this.db = getDatabase();
        this.cookies = new Cookies();
        this.state ={
            booksArray:[],
            name: props.name
        };
    }
    
    componentDidMount() {
        this.render_data();
    }

    render_data(){
        const db = getDatabase();
        const book_array = [];
        // const history = useHistory();
        const bookList = ref(db, 'Books/');
    
        // if(cookies.get('BigWordsUser') == null) {
        //     history.push('/');
        //     window.location.reload(false);
        // }
    
        onValue(bookList, (snapshot) => {
            const bookListData = snapshot.val();
            for(const currentBook in bookListData){
                //createURL
                var url = currentBook;

                //title
                var title =""
                const titleList = ref(db, 'Books/' + currentBook + '/Title/')
                onValue(titleList, (snapshot) => {
                    title = snapshot.val();
                })
               
                //counting words and big words
                var wordCount = 0;
                var bigWordCount =0;
                const wordList = ref(db, 'Books/' + currentBook + '/Words/');
                onValue(wordList, (snapshot) => {
                    const wordListData = snapshot.val();
                    for(var word in wordListData){
                        const wordInfo = ref(db, 'Books/' + currentBook + '/Words/' + word);
                        onValue(wordInfo, (snapshot) =>{
                            const wordData = snapshot.val();
                            wordCount++;
                            if(wordData.bigword == true){
                                bigWordCount++;
                            }
                        });
                    }
                })
                
                //author
                var author = "";
                const bAuthor = ref(db,'Books/' + currentBook + '/Author Name');
                onValue(bAuthor, (snapshot) => {
                    author = snapshot.val();
                })
                
                //push to array
                book_array.push({
                    url: url,
                    title: title,
                    author: author,
                    words:wordCount,
                    bigwords:bigWordCount,
                })
                   
            }
            this.setState(this.state.booksArray = book_array)
        });
    }

    render(){
        if(this.state.name == "featured"){
          return( this.state.booksArray.map((book) => {
               return(
                    <div className="bookpv" key={book.title}>
                        <Link to={{
                            pathname: `/bookinfo`,
                            search: `?sort=${book.url}`,
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
                );
            }))

        }
    }
}

export default BookPv