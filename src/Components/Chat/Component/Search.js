import React, { useContext, useState,useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase_service";
import { useUserAuth } from "../../../context/UserContextApi";
export default function Search() {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);
  //
  const currentUser = JSON.parse(localStorage.getItem("user"));
const [photoUrl, setPhotoUrl] = useState("");
const [displayName, setDisplayName] = useState("");
const [email, setEmail] = useState("");
 useEffect(() => {
   console.log("user in search chat:", currentUser);
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
  const handleSearch = async () => {
    console.log("searching");
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists ,if not create one
    //creating a combined id for the 1-1 chat
    console.log("going to create comid");
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    // console.log("combinedId", combinedId);
    // console.log("currentUser.uid", currentUser.uid);
    // console.log("searched user.uid", user.uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("combine key in try",combinedId);
      console.log("res in try",res);
      if (!res.exists()) {
        //create a new chat
        console.log("going to create new chat-----");
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("new chat created-----");
        //create user chats
        console.log("going to create 1-user chats-----");
        console.log("currentUser--------", currentUser.uid);
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.avatarUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("1-user chats created-----");
        console.log("going to create 2-user chats-----");
         await updateDoc(doc(db, "userChats", user.uid), {
           [combinedId + ".userInfo"]: {
             uid: currentUser.uid,
             displayName: currentUser.displayName,
             photoURL: currentUser.photoURL,
           },
           [combinedId + ".date"]: serverTimestamp(),
         });
            console.log("2-user chats created-----");
      }
    } catch (err) {
      console.log("error in search------", err);
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err && <p className="error">User not found</p>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.avatarUrl} alt="avatar" />
          <div className="userChatInfo">
            <span className="name">{user.displayName}</span>
            
          </div>
        </div>
      )}
    </div>
  );
}
