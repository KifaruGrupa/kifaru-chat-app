import React from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import './chat.scss';

const Chat = () => (
  <>
    <div className="chatBody">
      <ChatList />
    </div>
    <ChatForm />
  </>
);

export default Chat;
