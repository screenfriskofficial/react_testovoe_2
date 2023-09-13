import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf_Mlpoij6LJxnjcwC_5NCi0LM0VYLzgg",
  authDomain: "react-free-images.firebaseapp.com",
  projectId: "react-free-images",
  storageBucket: "react-free-images.appspot.com",
  messagingSenderId: "605663239174",
  appId: "1:605663239174:web:5881daceb4b3326cd0b787",
  measurementId: "G-CESQ2W2RQK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
