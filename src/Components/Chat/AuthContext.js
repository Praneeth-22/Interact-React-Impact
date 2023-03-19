import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase_service";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(); //create a context

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({}); //create a state

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};