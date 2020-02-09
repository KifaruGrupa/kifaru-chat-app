import React, { useState, useEffect, useContext } from 'react';
import smiley from '../../../assets/smiley.svg';
import sendIcon from '../../../assets/arrow-back.svg';
import './chatForm.scss';
import {DataContext} from '../../../context/Appcontext';
import Interact from '../../../utils/firebase/chat'

const ChatForm = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [thisGroupData] = useContext(DataContext);

  useEffect(() => {
  }, [thisGroupData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(chatMessage) {
     thisGroupData && Interact.sendMessage(thisGroupData.id, chatMessage);
    setChatMessage('');
      return;
    }
  };

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(event);
    }
  }

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
            <textarea className="flex-grow" placeholder="Type a message" value={chatMessage} onChange={handleInputChange} onKeyDown={onKeyDown} required />
            <button className="chat-send" type="submit"><img src={sendIcon} alt='send' /></button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
