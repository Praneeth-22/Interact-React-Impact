import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase_service";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}); // to store the user object from firebase

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
      value={{ user, signUp, logIn, googleSignIn }} // to provide the context to the children
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
