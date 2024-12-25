import React from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import '../sass/components/chatContainer.scss';

const ChatContainer = () => {

  const { messages, isMessagesLoading } = useChatStore();

  return (
    <div className='chat-container'>
      <ChatHeader />
      {
         isMessagesLoading ? <FiLoader size={20} style={{ color: "var(--icon-color)"}} className='spinner' /> : (
          messages.map(() => (
            <div key={messages.senderId}>message</div>
          ))
         )
      }
      <ChatInput />
    </div>
  )
}

export default ChatContainer