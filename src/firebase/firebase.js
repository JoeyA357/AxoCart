import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBRivqP7a1n6IIiIE-OdfXD5P_wt9ORSYU",
    authDomain: "axocartdb.firebaseapp.com",
    projectId: "axocartdb",
    storageBucket: "axocartdb.appspot.com",
    messagingSenderId: "298806492776",
    appId: "1:298806492776:web:cfda8f734e3529799ac5dd",
    measurementId: "G-1BZJ4S1PDT"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth()
  export const storage = getStorage()
  export const db = getFirestore()