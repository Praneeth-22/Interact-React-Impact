import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  //likhiths firebase tokens
  // apiKey: "AIzaSyAlYVMq9NeR-I8pSQvzcdjvNN2PCDQLjVQ",
  // authDomain: "authse-bddec.firebaseapp.com",
  // projectId: "authse-bddec",
  // storageBucket: "authse-bddec.appspot.com",
  // messagingSenderId: "513093921948",
  // appId: "1:513093921948:web:13c28519bb12fbcda31159"

  //praneeth-token
  apiKey: "AIzaSyDnYVLIQfDx1xF2QMwcbyKhe3i43RVrHjM",
  authDomain: "se-team-o.firebaseapp.com",
  projectId: "se-team-o",
  storageBucket: "se-team-o.appspot.com",
  messagingSenderId: "516312440546",
  appId: "1:516312440546:web:f26aefe7dca2cc36bb88bb",
  measurementId: "G-V0NLJWLS16",

  //ajay tokens
  // apiKey: "AIzaSyBwmT83h9krm9V-OWftkhoe4YpPCIe8r1w",
  // authDomain: "chat-73e93.firebaseapp.com",
  // projectId: "chat-73e93",
  // storageBucket: "chat-73e93.appspot.com",
  // messagingSenderId: "57780263497",
  // appId: "1:57780263497:web:4f3e3816826d3a7003fd98",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
