import React from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../ChatContext';
function Chat() {
  const {data} = React.useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
}

export default Chat
