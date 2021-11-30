const functions = require("firebase-functions");
const admin = require('firebase-admin');
const https = require('https');
const fs = require('fs');

admin.initializeApp();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const download = async (url, dest) => {
  var file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      return("finish")
    });
  });
}

const parseList = (listTitle) => {
  data = fs.readFileSync(listTitle, 'utf8');
  return data.split('\n');
}

const parseBook = () => { 
  const filePath = "/tmp/book.txt";
  // Grab list of most common words
  commonWords = parseList('most_common_words.txt')
  // Read data from book file
  data = fs.readFileSync(filePath, 'utf8');
  let bookObject = new Object();
  // Split file by spaces into Array
  bookArr = data.toLowerCase().split(' ');
  // Remove empty indexes and null values
  bookArr = bookArr.filter(el => {
    return el != null && el != '';
  });
  for(let i = 0; i < bookArr.length; i++) {
    // Remove any non alphabetic characters from word
    bookArr[i] = bookArr[i].replace(/[^A-Za-z]/g, '');
    if(bookArr[i].match(/[^A-Za-z]/g) != null) {
      bookArr = bookArr.splice(i, 1);
    }
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
} 

exports.addBook = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const text = req.query.text;
    const title = req.query.title;
    const AuthorName = req.query.AuthorName;
    console.log(`Adding ${title} written by ${AuthorName} to the database...`)
    // Push the new book into Realtime Database using the Firebase Admin SDK.
    db = admin.database();
    book = db.ref(`/Books/${text}`);
    book.child("Author Name").set(AuthorName);
    book.child("Title").set(title);
    const filePath = "/tmp/book.txt";
    let url = `https://firebasestorage.googleapis.com/v0/b/bigwords-202f6.appspot.com/o/bookTexts%2F${text}?alt=media`
    download(url, filePath);
    // Can't get download working right, but tested with extremely large book with 10s delay and works fine.
    await delay(10000);
    words = parseBook();
    if ("" in words) {
      delete words[""];
    };
    book.child("Words").set(words);
    // Send back a message that we've successfully written the message
    res.json({result: `${title} by ${AuthorName} successfully added to the database.`});
});
