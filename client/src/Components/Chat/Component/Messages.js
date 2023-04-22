import React,{useEffect} from 'react'
import Message from './Message'
import { ChatContext } from '../ChatContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_service";
function Messages() {
    const [messages, setMessages] = React.useState([]);
    const {data} = React.useContext(ChatContext)

      useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
          unSub();
        };
      }, [data.chatId]);
  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}

export default Messages
