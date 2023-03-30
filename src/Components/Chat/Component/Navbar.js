import React,{useState,useEffect} from 'react'
import { useUserAuth } from '../../../context/UserContextApi'
import { auth } from '../../../firebase_service';
import firebase from "firebase/compat/app";
export default function Navbar() {
    const { logOut } = useUserAuth();
    const loggingOut = () => {
        logOut();
        window.location.href = "/";
    }
  const [photoUrl, setPhotoUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user in navbar:", user);
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
    <div className="navbar">
      <span className="logo"> Chat</span>
      <div className="user">
        <img src={photoUrl} alt="" />
        <span>{displayName}</span>
        <button onClick={() => loggingOut()}>log Out</button>
      </div>
    </div>
  );
}
