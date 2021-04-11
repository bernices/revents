import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const fireBaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "reventscourse-5ea3a.firebaseapp.com",
    projectId: "reventscourse-5ea3a",
    storageBucket: "reventscourse-5ea3a.appspot.com",
    messagingSenderId: "951794377918",
    appId: "1:951794377918:web:1822c99e972c5c8c43aaef"
}

firebase.initializeApp(fireBaseConfig);
firebase.firestore();

export default firebase;