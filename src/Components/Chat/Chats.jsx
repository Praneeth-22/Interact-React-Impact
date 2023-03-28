import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Chat/AuthContext";
import { ChatContext } from "../Chat/ChatContext";
import { db } from "../../firebase_service";
import { useUserAuth } from "../../context/UserContextApi";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { user } = useUserAuth();
  const currentUser = user;
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  const obj = {
    chatId: "vDKJOXtzVpsYNH0WHJpm",
    userInfo: {
      photoURL: user.photoURL,
      displayName: user.displayName,
    },
    lastMessage: {
      text: "hello",
    },
  };

  return (
    <div className="chats">
      {/* {Object.entries(chats || obj)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => {
              handleSelect(chat[1].userInfo);
              console.log("chat[1].userInfo", chat[1].userInfo);
            }}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))} */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
            borderBottom: "1px solid #ccc",
          }}
        >
          <img
            src={currentUser?.photoURL}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {currentUser?.displayName}
            </span>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {data?.lastMessage?.text}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
            borderBottom: "1px solid #ccc",
          }}
        >
          <img
            src={currentUser?.photoURL}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {currentUser?.displayName}
            </span>
            <p>{data?.lastMessage?.text}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
            borderBottom: "1px solid #ccc",
          }}
        >
          <img
            src={currentUser?.photoURL}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {currentUser?.displayName}
            </span>
            <p>{data?.lastMessage?.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
