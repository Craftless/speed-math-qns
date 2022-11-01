// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
// import { getStorage } from "firebase/storage";
import { initializeAuth, setPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkSQLgQ_piRKPbn0Ys85n5b_kA9dltvEE",
  authDomain: "speed-a0458.firebaseapp.com",
  projectId: "speed-a0458",
  storageBucket: "speed-a0458.appspot.com",
  messagingSenderId: "433059418148",
  appId: "1:433059418148:web:83eb81aeb3da3ecd6148b1",
};

let app;
if (firebase.apps.length <= 0) app = firebase.initializeApp(firebaseConfig);
else app = firebase.app();

if (firebase.auth.length <= 0) {
  initializeAuth(app);
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const projectDatabase = firebase.database();
const projectStorage = firebase.storage();
export { auth, projectDatabase, projectStorage };
