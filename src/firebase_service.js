import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnYVLIQfDx1xF2QMwcbyKhe3i43RVrHjM",
  authDomain: "se-team-o.firebaseapp.com",
  projectId: "se-team-o",
  storageBucket: "se-team-o.appspot.com",
  messagingSenderId: "516312440546",
  appId: "1:516312440546:web:f26aefe7dca2cc36bb88bb",
  measurementId: "G-V0NLJWLS16",
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;