// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEPeDqvfB4358YhQJ2GNyRHJ5MKY8cuzc",
  authDomain: "skill-share-fecf8.firebaseapp.com",
  projectId: "skill-share-fecf8",
  storageBucket: "skill-share-fecf8.appspot.com",
  messagingSenderId: "1036108369162",
  appId: "1:1036108369162:web:7940d6c94f713952c33ef3",
  measurementId: "G-XV4C71KQE9",
};

// Initialize Firebases
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);
