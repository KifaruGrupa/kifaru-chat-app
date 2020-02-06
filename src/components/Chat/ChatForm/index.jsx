import React, { useState } from 'react';
import smiley from '../../../assets/smiley.svg';
import sendIcon from '../../../assets/arrow-back.svg';
import './chatForm.scss';

const ChatForm = () => {
  const [chatMessage, setChatMessage] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setChatMessage('');
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setChatMessage(value);
  };

  return (
    <div className="chat-form bg-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="chat-frame flex p-3">
          <div className="chat-smiley">
            <button className="px-10" type="button"><img src={smiley} alt='smiley' /></button>
          </div>
          <div className="chat-box flex flex-grow">
            <textarea className="flex-grow" placeholder="Type a message" value={chatMessage} onChange={handleInputChange} required />
            <button className="chat-send" type="submit"><img src={sendIcon} alt='send' /></button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
