import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

const ChatHome = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatHome;
