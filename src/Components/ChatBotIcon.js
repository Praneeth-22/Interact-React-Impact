import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./ChatBot.css";

const ChatBot = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDnYVLIQfDx1xF2QMwcbyKhe3i43RVrHjM",
    authDomain: "se-team-o.firebaseapp.com",
    projectId: "se-team-o",
    storageBucket: "se-team-o.appspot.com",
    messagingSenderId: "516312440546",
    appId: "1:516312440546:web:f26aefe7dca2cc36bb88bb",
    measurementId: "G-V0NLJWLS16",
  };
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  // Retrieve data from Firestore
  useEffect(() => {
    const eventsCollection = collection(firestore, "events");

    getDocs(eventsCollection).then((querySnapshot) => {
      const eventsData = [];
      querySnapshot.forEach((doc) => {
        eventsData.push(doc.data());
      });
      setChatMessages((prevState) => [...prevState, ...eventsData]);
    });
  }, [firestore]);

  // Handle user message input
  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  // Handle user message submit
  const handleUserMessageSubmit = (event) => {
    event.preventDefault();
    const userMessageData = {
      text: userMessage,
      sender: "user",
    };
    setChatMessages((prevState) => [...prevState, userMessageData]);
    setUserMessage("");

    // TODO: Add logic to respond to user message
  };

  // Toggle chatbot display
  const handleChatBotToggle = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className="chatbot-container">
      <div
        className={`chatbot-icon ${showChatBot ? "open" : ""}`}
        onClick={handleChatBotToggle}
      >
        <span className="chatbot-icon-line"></span>
        <span className="chatbot-icon-line"></span>
        <span className="chatbot-icon-line"></span>
      </div>
      <div className={`chatbot-window ${showChatBot ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>Chatbot</h3>
          <button onClick={handleChatBotToggle}>X</button>
        </div>
        <div className="chatbot-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`chatbot-message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form className="chatbot-form" onSubmit={handleUserMessageSubmit}>
          <input
            type="text"
            value={userMessage}
            onChange={handleUserMessageChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
