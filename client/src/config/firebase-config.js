// import firebase from "firebase/compat/app"
import "firebase/compat/auth"
// import { initializeApp } from 'firebase/app';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDXH8tJTwaOGEamm6jYzhfQa5r6dGXpTIg",
  authDomain: "protracker-2ec25.firebaseapp.com",
  projectId: "protracker-2ec25",
  storageBucket: "protracker-2ec25.appspot.com",
  messagingSenderId: "810269753593",
  appId: "1:810269753593:web:351566b96a9ed41bb5a228"
})

export const auth = app.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);

export default app
