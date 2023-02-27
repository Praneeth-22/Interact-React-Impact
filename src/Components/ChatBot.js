import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import styled from "styled-components";
import config from "./chatbotUtilities/config";
import ActionProvider from "./chatbotUtilities/ActionProvider";
import MessageParser from "./chatbotUtilities/MessageParser";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
// import chatbotmain from '..images/chatbotmain.svg'
import chatbot from "../images/chatbot.jpg";
function ChatBot() {
  const [chat, setChat] = useState(false);
  const clickChat = () => {
    console.log("clicked");
    setChat(!chat);
  };
  const onClickCloseButton = () => {
    setChat(false);
  };
  return (
    <ChatbotMain>
      {chat ? (
        <div style={{
          display: "flex",          
        }}>
          <section>
            <CloseIcon onClick={onClickCloseButton} className="closeIcon" />
          </section>
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      ) : (
        <>
          <Chatfield>
            <img src={chatbot} alt="chatbot" onClick={clickChat} />
          </Chatfield>
        </>
      )}
      {/* <CloseIcon onClick={onClickCloseButton} className="closeIcon" /> */}
    </ChatbotMain>
  );
}
const ChatbotMain = styled.div`
  text-align: center;
  background-color: white;
  border-radius: 30px;
  position: fixed;
  right: 0;
  bottom: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: transparent;

  /* z-index: 999; */
  img {
    width: 50px;
    border-radius: 50px;
  }
  section {
    display: flex;
    justify-content: flex-end;
  }
  .closeIcon {
    position: relative;
    color: rgba(40, 16, 78, 1);
    font-size: 30px;
    cursor: pointer;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 2px;
    margin-right: 2px;
    margin-top: 10px;
  }
`;
const Chatfield = styled.div``;

export default ChatBot;
