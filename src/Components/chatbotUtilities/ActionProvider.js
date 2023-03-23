import React from "react";
import { createChatBotMessage } from 'react-chatbot-kit';
// import quiz from "../quiz";
// import Options from "../options";


      
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("what are you searching for today");
    this.addMessageToState(message);
  };
  
   handleJavascriptQuiz = () => {
    const message = this.createChatBotMessage(
      " Here is your website link !",
      {
        widget: "javascriptQuiz",
         
      }
    );
    

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
