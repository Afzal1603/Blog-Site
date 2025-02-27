// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "blog-webapp-5f1a7.firebaseapp.com",
  projectId: "blog-webapp-5f1a7",
  storageBucket: "blog-webapp-5f1a7.firebasestorage.app",
  messagingSenderId: "562042364887",
  appId: "1:562042364887:web:2d93c0b3583e885d97a192",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
