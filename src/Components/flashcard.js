import React, { UseState, UseEffect } from "react";



const flashCard = ({ question, answer, incrementIndex }) => 
{

  const [showAnswer, setShowAnswer] = UseState(false);

  UseEffect(() => setShowAnswer(false), [question]);

  return (
    <>
      <div
        className="flashcard-container"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {!showAnswer && question}
        {showAnswer && answer}
      </div>
      {showAnswer && (
        <button onClick={incrementIndex} className="flashcard-button">
          Next question
        </button>
      )}
    </>
  );
};

export default flashCard;