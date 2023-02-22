import React from "react";
import "../Chat/style.css";
import Sidebar from "./Sidebar";


function Chat() {
  return (
    <div className="app-body">
      <h1> Students Interaction</h1>
      <div className="ui-body">
        <Sidebar />
       
      </div>
    </div>
  );
}
export default Chat;
