// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVw0U-5EKWI0wm-FVCjUurHfefYNwXj2Y",
  authDomain: "skill-share-90bd8.firebaseapp.com",
  projectId: "skill-share-90bd8",
  storageBucket: "skill-share-90bd8.appspot.com",
  messagingSenderId: "88409553509",
  appId: "1:88409553509:web:0e66fccfb50d7745c4e48c",
  measurementId: "G-M9TQ7D3D3R",
};

// Initialize Firebases
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);
