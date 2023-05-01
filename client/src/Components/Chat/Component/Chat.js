import React from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../ChatContext';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
function Chat() {
  const navigate = useNavigate();
  const {data} = React.useContext(ChatContext)
  const backHome = () => {
    navigate("/home");
  }
  return (
    <div className="chat">
      <div className="chatInfo">
        <span style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          letterSpacing: "1.5px",
          marginLeft: "10px",

        }}>{data.user?.displayName}</span>
        <div className="chatIcons" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "100px",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}>
          <HomeOutlinedIcon onClick={backHome}/>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
}

export default Chat
