import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   //likhiths firebase tokens
        apiKey: "AIzaSyAlYVMq9NeR-I8pSQvzcdjvNN2PCDQLjVQ",
        authDomain: "authse-bddec.firebaseapp.com",
        projectId: "authse-bddec",
        storageBucket: "authse-bddec.appspot.com",
        messagingSenderId: "513093921948",
        appId: "1:513093921948:web:13c28519bb12fbcda31159"
     
  //praneeth-token    
//   apiKey: "AIzaSyDnYVLIQfDx1xF2QMwcbyKhe3i43RVrHjM",
//   authDomain: "se-team-o.firebaseapp.com",
//   projectId: "se-team-o",
//   storageBucket: "se-team-o.appspot.com",
//   messagingSenderId: "516312440546",
//   appId: "1:516312440546:web:f26aefe7dca2cc36bb88bb",
//   measurementId: "G-V0NLJWLS16",

//ajay tokens
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;