import React from "react";
import "../Chat/style.css";
import Sidebar from "./Sidebar";
import Chatdata from "./Chat";

function Chat() {
  return (
    <div className="app-body">
      <h1> Students Interaction</h1>
      <div className="ui-body">
        <Sidebar />
        <Chatdata />
      </div>
    </div>
  );
}
export default Chat;
