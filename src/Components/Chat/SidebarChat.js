import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Chat/style.css";
import { faker } from "@faker-js/faker";

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
    <Avatar src={faker.image.business()} />
      <div className="sidebarchat__info">
        <h2>Group name</h2>
        <p>grou info</p>

      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebar-chat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
