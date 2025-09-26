// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-fusion-lab-18ab7.firebaseapp.com",
    projectId: "ai-fusion-lab-18ab7",
    storageBucket: "ai-fusion-lab-18ab7.firebasestorage.app",
    messagingSenderId: "62334387049",
    appId: "1:62334387049:web:037398d252b5e066a8f3f8",
    measurementId: "G-12MVSFTWB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)