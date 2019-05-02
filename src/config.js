import firebase from 'firebase';

// Change you firebase settings here 
const firebaseConfig = {
    apiKey: "AIzaSyBl636lagteBi8mTqVCRqUMx-TcJpY2-_0",
    authDomain: "test-authentication-2ce9c.firebaseapp.com",
    databaseURL: "https://test-authentication-2ce9c.firebaseio.com",
    projectId: "test-authentication-2ce9c",
    storageBucket: "test-authentication-2ce9c.appspot.com",
    messagingSenderId: "1010836337614"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
