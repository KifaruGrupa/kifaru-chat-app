import React from 'react';
import PropTypes from 'prop-types';
import './chatDetails.scss';
import {formatDistance, subDays} from 'date-fns'

const ChatDetails = ({chat, user_id}) => (
  <>
    { chat.user_id === user_id? (
    <div className="chat-detail">
      <div className="chat-bubble triangle left-top">
    <div className="text font-black text-gray-800">Me</div>
        <div className="chat-text">{chat.message}</div>
        <div className="chat-time">
							{formatDistance(subDays(chat.timestamp, 0), new Date())}
        </div>
      </div>
    </div>
    ) : (
    <div className="chat-detail ">
      <div className="chat-bubble triangle right-top">
      <div className="chat-text font-bold text-gray-800">{chat.displayname}</div>
      <div className="chat-text">{chat.message}</div>
        <div className="chat-time">
							{formatDistance(subDays(chat.timestamp, 0), new Date())}
        </div>
      </div>
    </div>
    ) }
  </>
);
ChatDetails.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.string,
    chatUser: PropTypes.string,
    chatType: PropTypes.string,
    chatBody: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
};

export default ChatDetails;
