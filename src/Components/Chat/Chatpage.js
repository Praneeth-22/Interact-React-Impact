import React from "react";
import "../Chat/style.css";
import Sidebar from "./Sidebar";
import Chatdata from "./Chat";

function Chat() {
  return (
    <div className="app-body">
      {/* <h1> Students Interaction</h1> */}
      <div className="ui-body" style={{
        margin: "10px 0px",
        borderRadius: "10px",
      }}>
        <Sidebar />
        <Chatdata />
      </div>
    </div>
  );
}
export default Chat;
