// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiDqpi14fmmzD4sn-Ki6TPnegpZxS6Sz4",
  authDomain: "nwiiter-reloaded-3b7c9.firebaseapp.com",
  projectId: "nwiiter-reloaded-3b7c9",
  storageBucket: "nwiiter-reloaded-3b7c9.appspot.com",
  messagingSenderId: "344188276172",
  appId: "1:344188276172:web:99d9444bf1693c1aa3a169",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
