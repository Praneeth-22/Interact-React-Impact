import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Chat/style.css";

function SidebarChat({ addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
    }
  };
  return !addNewChat ? (
    <div className="sidebar-chat">
      <Avatar src={`https://api.dicebear.com/5.x/${seed}/svg`} />
      <div className="sidebarchat__info">
        <h2>Group name</h2>
        <p>group info</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebar-chat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
