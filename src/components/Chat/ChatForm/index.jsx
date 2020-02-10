import React, { useState, useEffect, useContext } from 'react';
import smiley from '../../../assets/smiley.svg';
import sendIcon from '../../../assets/arrow-back.svg';
import close from '../../../assets/close.svg';

import './chatForm.scss';
import {DataContext} from '../../../context/Appcontext';
import Interact from '../../../utils/firebase/chat'
import Picker from 'emoji-picker-react';

const ChatForm = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState('');
  const [thisGroupData] = useContext(DataContext);

  useEffect(() => {
  }, [thisGroupData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowEmojiPicker(false);
    if(chatMessage) {
     thisGroupData && Interact.sendMessage(thisGroupData.id, chatMessage);
    setChatMessage('');
      return;
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setChatMessage(value);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChatMessage(chatMessage => {
      return `${chatMessage} ${emojiObject.emoji}`;
    });
  }

  return (
    <div className="chat-form bg-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="chat-frame flex p-3">
          <div className="chat-smiley">
            <button
              className="px-10"
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <img src={showEmojiPicker ? close : smiley} alt='smiley'/></button>
          </div>
          <div className="chat-box flex flex-grow">
            <textarea className="flex-grow" placeholder="Type a message" value={chatMessage} onChange={handleInputChange} required />
            <button className="chat-send" type="submit"><img src={sendIcon} alt='send' /></button>
          </div>
        </div>
      </form>
      {
        showEmojiPicker && (<div className="emojipicker"><Picker onEmojiClick={onEmojiClick}/></div>)
      }
    </div>
  );
};

export default ChatForm;
