import React, { useContext, useState } from "react";
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
// import { db } from "../Chat/firebase";
import {db} from '../../firebase_service'
// import { AuthContext } from "../Chat/AuthContext";
import { useUserAuth } from "../../context/UserContextApi";
const Search = () => {
  const [username, setUsername] = useState("");
  const [cuser, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { user } = useUserAuth();
  const currentUser = user;

  const handleSearch = async () => {
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
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > cuser.uid
        ? currentUser.uid + cuser.uid
        : cuser.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: cuser.uid,
            displayName: cuser.displayName,
            photoURL: cuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", cuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search" style={{

      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      zIndex: "100",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {cuser && (
        <div className="userChat" onClick={handleSelect}>
          <img src={cuser.avatarUrl} alt="" />
          <div className="userChatInfo">
            <span>{cuser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;