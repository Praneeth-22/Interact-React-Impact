import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import "../Chat/style.css";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="side-bar">
      <div className="sidebar-header">
        <Avatar />
        <div className="sidebar-headerRight"></div>
        <IconButton>
          <DonutLarge />
        </IconButton>
        <IconButton>
          <Chat />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>
      <div className="sidebar-chats">
        <SidebarChat addNewChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
