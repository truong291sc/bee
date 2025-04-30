import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmd16nSe0gqYUkWCKB2URRlam_bpPEAV4",
  authDomain: "bee-money-e9a8b.firebaseapp.com",
  projectId: "bee-money-e9a8b",
  storageBucket: "bee-money-e9a8b.firebasestorage.app",
  messagingSenderId: "135784809474",
  appId: "1:135784809474:web:63fa6adcaddb57332a531b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 