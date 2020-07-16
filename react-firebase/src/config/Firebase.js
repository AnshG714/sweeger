import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyAI7gfqvFEDAYBDa8mIiDR73eVFoe8cmsg",
    authDomain: "sweeger.firebaseapp.com",
    databaseURL: "https://sweeger.firebaseio.com",
    projectId: "sweeger",
    storageBucket: "sweeger.appspot.com",
    messagingSenderId: "223663699687",
    appId: "1:223663699687:web:f3324c2b8d1a232c24d442",
    measurementId: "G-GGX6QKC1BL"

});

export default app;
