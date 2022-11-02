// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkSQLgQ_piRKPbn0Ys85n5b_kA9dltvEE",
  authDomain: "speed-a0458.firebaseapp.com",
  databaseURL: "https://speed-a0458-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "speed-a0458",
  storageBucket: "speed-a0458.appspot.com",
  messagingSenderId: "433059418148",
  appId: "1:433059418148:web:83eb81aeb3da3ecd6148b1"
};


firebase.initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const projectDatabase = firebase.database();
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
export { auth, projectDatabase, projectStorage, projectFirestore };
