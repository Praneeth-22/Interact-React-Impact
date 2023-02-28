import { Css } from "@mui/icons-material";
import React from "react";



const Options = (props) => {
  const options = [
    {
      text: " university website link",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "university games and activities", handler:props.actionProvider.handleJavascriptQuiz , id: 2 },
    { text: "university instagram page ", handler: props.actionProvider.handleJavascriptQuiz, id: 3 },
  ];

  

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;