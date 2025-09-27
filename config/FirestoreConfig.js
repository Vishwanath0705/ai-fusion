
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA6iM9cLNZsrxYOHNocpXhAC2dfLE09bQA",
    authDomain: "ai-fusion-lab-1a237.firebaseapp.com",
    projectId: "ai-fusion-lab-1a237",
    storageBucket: "ai-fusion-lab-1a237.firebasestorage.app",
    messagingSenderId: "876792684251",
    appId: "1:876792684251:web:4c5147745c01a51e36f6fe",
    measurementId: "G-V9LY527C6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

