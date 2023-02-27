import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlYVMq9NeR-I8pSQvzcdjvNN2PCDQLjVQ",
    authDomain: "authse-bddec.firebaseapp.com",
    projectId: "authse-bddec",
    storageBucket: "authse-bddec.appspot.com",
    messagingSenderId: "513093921948",
    appId: "1:513093921948:web:13c28519bb12fbcda31159"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;