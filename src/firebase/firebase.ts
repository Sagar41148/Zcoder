import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBR-_sxB04KctLbTfn9Sv4q_9HKT33m-bI",
    authDomain: "z-coder-462e8.firebaseapp.com",
    projectId: "z-coder-462e8",
    storageBucket: "z-coder-462e8.firebasestorage.app",
    messagingSenderId: "152247849502",
    appId: "1:152247849502:web:73796543d0bcecf252140f"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };
