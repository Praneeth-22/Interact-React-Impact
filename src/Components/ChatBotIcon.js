import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
// import myData from "./chatbotUtilities/ChatQuery";
import ChatBot from "react-simple-chatbot";
import chatbotImg from '../images/chatbot.jpg'
const steps = [
  {
    id: "0",
    message: "Hey Geek!",

    // This calls the next id
    // i.e. id 1 in this case
    trigger: "1",
  },
  {
    id: "1",
    // This message appears in
    // the bot chat bubble
    message: "Please write your username",
    trigger: "2",
  },
  {
    id: "2",

    // Here we want the user
    // to enter input
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: " hi {previousValue}, how can I help you?",
    trigger: 4,
  },
  {
    id: "4",
    options: [
      // When we need to show a number of
      // options to choose we create alist
      // like this
      { value: 1, label: "View Courses" },
      { value: 2, label: "Read Articles" },
    ],
    end: true,
  },
];

const theme = {
  background: "white",
  headerBgColor: "#28104e",
  headerFontSize: "20px",
  botBubbleColor: "#0F3789",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#FF5733",
  userFontColor: "white",
};
const config = {
  botAvatar: chatbotImg,
  floating: true,
};
const myData = [config, steps, theme];
function ChatBotIcon() {
  const [chat, setChat] = useState(false);
  console.log(myData.theme)
  const clickChat = () => {
    console.log("clicked");
    setChat(!chat);
  };
  const onClickCloseButton = () => {
    setChat(false);
  };
  return (
    <ChatbotMain>
   <ThemeProvider theme={theme}>
          <ChatBot
            // This appears as the header
            // text for the chat bot
            headerTitle="chatbot"
            steps={steps}
            {...config}
          />
        </ThemeProvider> 
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
  z-index: 999099999999999;

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

export default ChatBotIcon;
