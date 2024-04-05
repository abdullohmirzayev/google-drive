import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-a057c.firebaseapp.com",
  projectId: "drive-a057c",
  storageBucket: "drive-a057c.appspot.com",
  messagingSenderId: "369144305724",
  appId: "1:369144305724:web:519d7494059eb672d20b39",
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { db };
