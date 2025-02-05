
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8eAzh5aonyynOGFcSopbMB5NDngQW4X8",
  authDomain: "ecommerce-7989f.firebaseapp.com",
  projectId: "ecommerce-7989f",
  storageBucket: "ecommerce-7989f.firebasestorage.app",
  messagingSenderId: "822500214386",
  appId: "1:822500214386:web:350bee77b2c2029e8e24eb",
  measurementId: "G-S9FV6NPFYX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
