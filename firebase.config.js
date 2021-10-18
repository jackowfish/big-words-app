// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyC6XGoSkACCaHU31Rum-hDstWnsuJFIhK8",
  authDomain: "bigwords-202f6.firebaseapp.com",
  databaseURL: "https://bigwords-202f6-default-rtdb.firebaseio.com",
  projectId: "bigwords-202f6",
  storageBucket: "bigwords-202f6.appspot.com",
  messagingSenderId: "104341008963",
  appId: "1:104341008963:web:1622c81d8d665e6ee41af6",
  measurementId: "G-87G9LNTBYQ",
};

let instance

const getFirebase = () => {
    if (typeof window !== "undefined") {
        if (instance) return instance
        instance = firebase.initializeApp(firebaseConfig);
        return instance
    }

    return null
}

export default getFirebase;