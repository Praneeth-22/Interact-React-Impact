import React from "react";
import { createChatBotMessage } from 'react-chatbot-kit';
import quiz from "../quiz";
import Options from "../options";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser"; 
 
const config = {
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage(`Hello`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "universitywebsitelink",
      widgetFunc: (props) => <quiz {...props} />,
      props: {

        url: "https://www.universitywebsitelink.com/",
        title: "University Websitelink",
        description: "Learn about the University Websitelink website.",
        image: "https://www.universitywebsitelink.com/wp-content/uploads/2019/04/logo-university-websitelink.png",
        questions: [
          {
            question: "What is the name of the University Websitelink?",
          },
          {
            question: "can i have university link",
            answer:
            "https://www.universitywebsitelink.com/",
            id: 2,
          },
        ],
      },
    },
  ],
};

export default config;