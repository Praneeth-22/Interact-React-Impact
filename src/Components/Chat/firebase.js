import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwmT83h9krm9V-OWftkhoe4YpPCIe8r1w",
  authDomain: "chat-73e93.firebaseapp.com",
  projectId: "chat-73e93",
  storageBucket: "chat-73e93.appspot.com",
  messagingSenderId: "57780263497",
  appId: "1:57780263497:web:4f3e3816826d3a7003fd98",
};
// getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
