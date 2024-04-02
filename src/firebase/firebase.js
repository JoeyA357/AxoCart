import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBRivqP7a1n6IIiIE-OdfXD5P_wt9ORSYU",
    authDomain: "axocartdb.firebaseapp.com",
    projectId: "axocartdb",
    storageBucket: "axocartdb.appspot.com",
    messagingSenderId: "298806492776",
    appId: "1:298806492776:web:cfda8f734e3529799ac5dd",
    measurementId: "G-1BZJ4S1PDT"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };