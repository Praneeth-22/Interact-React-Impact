import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, storage, db } from "../firebase_service";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  getMetadata,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { v4 } from "uuid";
//

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}); // to store the user object from firebase
  const [loading, setLoading] = useState(true); // to check if the user is logged in or not
  const [articles, setArticles] = useState([]); // to store the articles from firebase

  function logIn(email, password) {
    // to sign in the user
    return signInWithEmailAndPassword(auth, email, password); //firebase service to sign in
  }
  function signUp(email, password) {
    // to sign up the user
    return createUserWithEmailAndPassword(auth, email, password); //firebase service to create user
  }
  function logOut() {
    // to sign out the user
    return signOut(auth); //firebase service to signOut
  }
  function googleSignIn() {
    // to sign in the user using google
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function postArticleAPI(payload) {
    // to post the article
    setLoading(true); // to start the loading

     if (payload.image !== "") {
       const storageRef = ref(storage, `images/${payload.image.name + v4()}`);
       const upload = uploadBytesResumable(storageRef, payload.image);
       console.log("upload img:", upload);
       upload.on(
         "state_changed",
         (snapshot) => {
           const progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log("Upload is " + progress + "% done");
           if (snapshot.state === "running") {
             console.log("Upload is running");
           }
         },
         (error) => {
           console.log(error.code);
         },
         async () => {
           const downloadURL = await getDownloadURL(storageRef);
           try {
            const metadata = await getMetadata(storageRef);
             console.log("File available at", downloadURL);
             const docRef = await addDoc(collection(db, "articles"), {
               actor: {
                 email: payload.user.email,
                 title: payload.user.displayName,
                 date: payload.timestamp,
                 image: payload.user.photoURL,
               },
               video: payload.video,
               sharedImg: downloadURL,
               comments: 0,
               description: payload.description,
             });
             setLoading(false); // to stop the loading
             console.log("Document written with ID: ", docRef.id);
           } catch (error) {
             console.log("Error adding document: ", error);
           }
         }
       );
     }else if(payload.video !== ""){
        // for video
        setLoading(true); // to start the loading

        try {
          const docRef = addDoc(collection(db, "articles"), {
            actor: {
              email: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: "",
            comments: 0,
            description: payload.description,
          });
          setLoading(false); // to stop the loading
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.log("Error adding document: ", error);
        }
     }
   
  }
  function getArticlesAPI() {
    // to get the articles
    setLoading(true); // to start the loading
    const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payload = querySnapshot.docs.map((doc) => doc.data());
      console.log("database data:", payload);
      setLoading(false); // to stop the loading
      setArticles(payload);
    });
    return unsubscribe;
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // to check if the user is logged in or not
      console.log("Auth", currentuser);
      setUser(currentuser);
    }); //firebase service to check if the user is logged in or not

    return () => {
      // to unsubscribe the listener
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider // to provide the context to the children
      value={{
        user,
        loading,
        signUp,
        logIn,
        googleSignIn,
        logOut,
        postArticleAPI,
        getArticlesAPI,
        articles
      }} // to provide the context to the children
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
