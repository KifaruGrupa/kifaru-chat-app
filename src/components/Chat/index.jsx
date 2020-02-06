import React from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import './chat.scss';

const Chat = () => (
  <div className="flex flex-grow flex-col">
    <div className="chatBody flex-grow bg-red-600">
      <ChatList />
    </div>
    <ChatForm />
  </div>
);

export default Chat;
