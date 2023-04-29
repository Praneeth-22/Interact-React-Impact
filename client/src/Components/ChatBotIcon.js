import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
// import myData from "./chatbotUtilities/ChatQuery";
import ChatBot from "react-simple-chatbot";
import chatbotImg from "../images/chatbot.jpg";
import { useUserAuth } from "../context/UserContextApi";
import axios from "axios";

const steps = [
  {
    id: "1",
    message: "Hi, I'm a chatbot. What's your name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Hi {previousValue}, nice to meet you!",
    trigger: "4",
  },
  {
    id: "4",
    message: "How can I help you?",
    trigger: "5",
  },
  {
    id: "5",
    options: [],
  },
];

const theme = {
  background: "white",
  headerBgColor: "#28104e",
  headerFontSize: "20px",
  botBubbleColor: "#28104e",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#CEB9F0",
  userFontColor: "#28104e",
};
const config = {
  botAvatar: chatbotImg,
  floating: true,
};
const myData = [config, steps, theme];
function ChatBotIcon() {
  const { event, getEventsAPI } = useUserAuth();
  const [chat, setChat] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleEnd = ({ steps, values }) => {
    if (!conversationHistory.length) {
      const newConversationHistory = [
        {
          type: "user",
          message: values.name,
          data: values,
        },
      ];
      steps.forEach((step) => {
        if (step.message) {
          newConversationHistory.push({
            type: "bot",
            message: step.message,
            data: step,
          });
        }
      });
      setConversationHistory(newConversationHistory);
    }
  };
  const handleReset = () => {
    setConversationHistory([]);
    window.location.reload();
  };

  useEffect(() => {
    const emails = conversationHistory[0]?.data?.filter((item) =>
      item.includes("@")
    );
    getEventsAPI();
    console.log("email found:", emails);
    console.log("=================event found:======================", event);
    // format the event data by mapping through the event array and returning the event name and event date by storing it in a string variable
    let eventInfo = "";
    let index = 1;
    event.map((item) => {
      const data = `${index} . ${item.event.title} on ${item.event.date} at ${item.event.time} in ${item.event.university}\n${item.event.description}\n\n`;
      eventInfo += data;
      index++;
    });
    console.log("eventInfo:", eventInfo);
    if (conversationHistory.length > 0) {
      axios
        .post(`http://3.87.56.207:3000/sendEmail`, {
          email: emails,
          subject: "IRI Chatbot",
          info: {
            type: "chatbot",
            des: eventInfo,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [conversationHistory]);
  useEffect(() => {
    setConversationHistory([]);
  }, []);
  console.log(myData.theme);
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
          steps={[
            {
              id: "1",
              message: "Hi, I'm a chatbot. What's your name?",
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              trigger: "3",
            },
            {
              id: "3",
              message: "Hi {previousValue}, nice to meet you!",
              trigger: "4",
            },
            {
              id: "4",
              message: "How can I help you?",
              trigger: "5",
            },
            {
              id: "5",
              options: [
                {
                  value: "1",
                  label: "I want to know about the website",
                  trigger: "6",
                },
                {
                  value: "2",
                  label: "I want to know about the upcoming events",
                  trigger: "7",
                },
              ],
            },
            {
              id: "6",
              message:
                "A university-specific social media app can help students, faculty, and staff stay connected. It allows posting and modifying content, sharing campus event details, and real-time 1-1 chats. This fosters a sense of community and keeps users informed about important news. Overall, it enhances the college experience and promotes engagement.",
              trigger: "8",
            },
            {
              id: "7",
              message:
                "Could you please provide your email id , so that we can send you the details of the upcoming events?",
              trigger: "11",
            },
            {
              id: "11",
              user: true,
              trigger: "12",
            },
            {
              id: "12",
              message:
                "Thankyou for providing your email id, we will send you the details of the upcoming events",
              trigger: "8",
            },
            {
              id: "8",
              message: "Do you want to know anything else?",
              trigger: "9",
            },
            {
              id: "9",
              options: [
                {
                  value: "1",
                  label: "Yes",
                  trigger: "5",
                },
                {
                  value: "2",
                  label: "No",
                  trigger: "10",
                },
              ],
            },
            {
              id: "10",
              message: "thankyou for using the chatbot",
              end: true,
            },
          ]}
          {...config}
          handleEnd={handleEnd}
          handleReset={handleReset}
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
