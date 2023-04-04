import React, { useState, useEffect, useContext, useRef } from "react";
import { ChatContext } from "../ChatContext";
export default function Message({ message }) {
  console.log("------messeges----".message);
  //
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [avatarUrl, setavatarUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    console.log("user in Chats:", currentUser);
    const prepareData = {
      displayName: currentUser?.displayName,
      email: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl,
    };
    setavatarUrl(prepareData?.avatarUrl);
    setDisplayName(prepareData?.displayName);
    setEmail(prepareData?.email);
  }, [currentUser]);
  //
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.avatarUrl
              : data.user.avatarUrl
          }
          alt=""
        />
        <span>
          {
            //compute time
          }
        </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}
