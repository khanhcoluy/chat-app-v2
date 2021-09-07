import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyAYLDwgSZ_ALiK97i3R1ThVBeLo8l4fbpY",
  authDomain: "uchat-44c0a.firebaseapp.com",
  projectId: "uchat-44c0a",
  storageBucket: "uchat-44c0a.appspot.com",
  messagingSenderId: "768528961277",
  appId: "1:768528961277:web:715dbbcffa783ef3c5b894",
  measurementId: "G-WBE3J3LR4Z"
}).auth();
