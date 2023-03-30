import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useUserAuth } from "../../../context/UserContextApi";
import { auth } from "../../../firebase_service";
import firebase from "firebase/compat/app";
import { db } from "../../../firebase_service";
import { ChatContext } from "../ChatContext";
export default function Chats() {
  const [chats, setChats] = useState([]);
  //
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [photoUrl, setPhotoUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    console.log("user in Chats:", currentUser);
    const prepareData = {
      displayName: currentUser?.displayName,
      email: currentUser?.email,
      photoURL: currentUser?.photoURL,
    };
    setPhotoUrl(prepareData?.photoURL);
    setDisplayName(prepareData?.displayName);
    setEmail(prepareData?.email);
  }, [currentUser]);
  //
    const { dispatch } = useContext(ChatContext);
 useEffect(() => {
   const getChats = () => {
     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
       setChats(doc.data());
       console.log("doc.data():", doc.data());
     });

     return () => {
       unsub();
     };
   };

   currentUser.uid && getChats();
 }, [currentUser.uid]);
 console.log("chats:", chats);
 console.log("Objects:",Object.entries(chats));
 //
 const handleSelect = (u) => {
   dispatch({ type: "CHANGE_USER", payload: u });
 };
 //
  return (
    <div className="chats">
       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
