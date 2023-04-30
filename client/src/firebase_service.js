import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage ,ref} from "firebase/storage";
import { getMessaging } from "firebase/messaging";

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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const messaging = getMessaging(app);
// export const storageRef = ref(storage);
export const db = getFirestore(app);

// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth, setPersistence } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage ,ref} from "firebase/storage";
// import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {

//   apiKey: "AIzaSyDnYVLIQfDx1xF2QMwcbyKhe3i43RVrHjM",
//   authDomain: "se-team-o.firebaseapp.com",
//   projectId: "se-team-o",
//   storageBucket: "se-team-o.appspot.com",
//   messagingSenderId: "516312440546",
//   appId: "1:516312440546:web:f26aefe7dca2cc36bb88bb",
//   measurementId: "G-V0NLJWLS16",

// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const storage = getStorage(app);
// const messaging = getMessaging(app);
// const db = getFirestore(app);

// // Set persistence and enable insecure requests
// setPersistence(auth, firebase.auth.Auth.Persistence.SESSION)
// .then(() => {
// auth.useDeviceLanguage();
// auth.settings.appVerificationDisabledForTesting = true;
// firebase.database().ref().child('users').on('value', function (snapshot) {
// console.log(snapshot.val());
// });
// })
// .catch((error) => {
// console.log(error);
// });
// export { app, auth, storage, messaging, db }; 