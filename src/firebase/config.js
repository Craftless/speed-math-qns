// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkSQLgQ_piRKPbn0Ys85n5b_kA9dltvEE",
  authDomain: "speed-a0458.firebaseapp.com",
  projectId: "speed-a0458",
  storageBucket: "speed-a0458.appspot.com",
  messagingSenderId: "433059418148",
  appId: "1:433059418148:web:83eb81aeb3da3ecd6148b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectDatabase = getDatabase();
const projectStorage = getStorage();
export { projectDatabase, projectStorage }