import { signOut } from 'firebase/auth';
import React,{useContext,useState,useEffect} from 'react'
import '../Chat/style.scss';
import {auth} from '../../firebase_service'

import firebase from "firebase/compat/app";
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {useUserAuth} from '../../context/UserContextApi'
const Navbar = () => {
  const { user,logOut } = useUserAuth();
  // console.log("user in navbar:", user)
  const loggingOut = () => {
    logOut()
    window.location.href = "/";
  }
  const [photoUrl, setPhotoUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    console.log("user in navbar:", user)
    const prepareData = {
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    };
    setPhotoUrl(prepareData.photoURL);
    setDisplayName(prepareData.displayName);
    setEmail(prepareData.email);
  }, []);
  return (
    <div className='navbar' >
        <span className="logo">Student Chat</span>
        <div className="user">
        <img src={photoUrl} alt="" />
        <span>{displayName}</span>
        <button onClick={loggingOut}>Logout</button>
        </div>
      
    </div>
  )
}

export default Navbar
