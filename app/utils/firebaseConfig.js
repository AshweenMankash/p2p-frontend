// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { initializeApp as initializeFirebaseAdminApp } from "firebase-admin";
import admin from 'firebase-admin';
import { applicationDefault } from "firebase-admin/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfRiuw4CQVEziwRTzSr6kOTjMTbuunxI0",
  authDomain: "p2p-ashween.firebaseapp.com",
  projectId: "p2p-ashween",
  storageBucket: "p2p-ashween.appspot.com",
  messagingSenderId: "84571362902",
  appId: "1:84571362902:web:0740aada2d201e83f54df7",
  measurementId: "G-FM7BZJ3HJM"
};

// Initialize Firebase

// if(!admin.apps.length){
//     initializeFirebaseAdminApp({
//         credential: applicationDefault()
//     })
// }



let Firebase;
let analytics;

if( !Firebase?.apps?.length){
    console.log("Firebase Initialized!");
    Firebase = initializeApp(firebaseConfig);
}

async function signUp(email, password){
    
    // return createUserWithEmailAndPassword(auth,email, password);
}

export { signUp};

export default Firebase;