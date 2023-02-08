// importing the firebase modules
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
//
const firebaseConfig = {
  apiKey: "AIzaSyDnYVLIQfDx1xF2QMwcbyKhe3i43RVrHjM",
  authDomain: "se-team-o.firebaseapp.com",
  projectId: "se-team-o",
  storageBucket: "se-team-o.appspot.com",
  messagingSenderId: "516312440546",
  appId: "1:516312440546:web:f26aefe7dca2cc36bb88bb",
  measurementId: "G-V0NLJWLS16",
};
//
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider();
//export
export {auth,storage,googleProvider}
export default db
