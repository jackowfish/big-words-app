const functions = require("firebase-functions");
const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp();
// https://bigwords-202f6-default-rtdb.firebaseio.com/Books

const parseList = (listTitle) => {
  data = fs.readFileSync(listTitle, 'utf8');
  return data.split('\n');
}

const parseBook = (data) => { 
//   // Grab list of most common words
  commonWords = parseList('most_common_words.txt')
//   // Read data from book file
//   data = fs.readFileSync(bookTitle, 'utf8');
  let bookObject = new Object();
  // Split file by spaces into Array
  bookArr = data.split(' ');
  for(let i = 0; i < bookArr.length; i++) {
    // Remove any non alphabetic characters from word
    bookArr[i] = bookArr[i].replace(/[^A-Za-z]/g, '').toLowerCase();
    /*  
    Check to see if word exists in object
    * If yes, enumerate
    * Otherwise, create word object that contains
      the word count and whether the word is "big"
    */
    if(bookObject[bookArr[i]]) {
      bookObject[bookArr[i]].count ++;
    } else {
      bookObject[bookArr[i]] = {
        'count':1,
        'bigword':false
      };
      // Determine if word is a big word
      if(commonWords.includes(bookArr[i])){
        bookObject[bookArr[i]].bigword = false;
      } else {
        bookObject[bookArr[i]].bigword = true;
      }
    }  
  }
  return bookObject;
  // return bookObject;
} 

exports.addBook = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const text = req.query.text;
    const title = req.query.title;
    const authorFirst = req.query.authorFirst;
    const authorLast = req.query.authorLast;
    const pages = req.query.pages;
    console.log(f`Adding ${title} written by ${authorFirst} ${authorLast} to the database...`)

    // Push the new book into Realtime Database using the Firebase Admin SDK.
    db = admin.database();
    books = db.ref('/Books')
    // Updaate book info
    books.child(title).child("Words").set(parseBook(text))
    book = db.ref(`/Books/${title}`)
    book.child("Author First").set(authorFirst)
    book.child("Author Last").set(authorLast)
    book.child("Pages").set(pages)
    // Send back a message that we've successfully written the message
    res.json({result: `${title} by ${authorFirst} ${authorLast} successfully added to the database.`});
  });
