// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIJZgmMUuz9tE7979iEFp_riSiGRjOpsY",
  authDomain: "tesla-ae311.firebaseapp.com",
  projectId: "tesla-ae311",
  storageBucket: "tesla-ae311.appspot.com",
  messagingSenderId: "433238092555",
  appId: "1:433238092555:web:ef224ef3c32cd8b93d900e",
  measurementId: "G-4BRJZBYBWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
