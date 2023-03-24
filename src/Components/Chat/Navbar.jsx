import { signOut } from 'firebase/auth';
import React,{useContext} from 'react'
import '../Chat/style.scss';
import {auth} from '../../firebase_service'

import firebase from "firebase/compat/app";
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {useUserAuth} from '../../context/UserContextApi'
const Navbar = () => {
  const { user,logOut } = useUserAuth();
  const loggingOut = () => {
    logOut()
    window.location.href = "/";
  }
  return (
    <div className='navbar'>
        <span className="logo">Student Chat</span>
        <div className="user">
        <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
        <button onClick={loggingOut}>Logout</button>
        </div>
      
    </div>
  )
}

export default Navbar
