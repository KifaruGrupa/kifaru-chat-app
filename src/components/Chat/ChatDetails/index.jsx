import React from 'react';
import PropTypes from 'prop-types';
import './chatDetails.scss';

const ChatDetails = ({
  chat: {
    id, chatUser, chatType, chatBody, createdAt
  }
}) => (
  <>
    { chatType === 'receiver' ? (
    <div className="chat-detail">
      <div className="chat-bubble triangle left-top">
        {/* <div className="chat-author">{chatUser}</div> */}
        <div className="chat-text">{chatBody}</div>
        <div className="chat-time">{createdAt}</div>
      </div>
    </div>
    ) : (
    <div className="chat-detail ">
      <div className="chat-bubble triangle right-top">
        <div className="chat-text">{chatBody}</div>
        <div className="chat-time">{createdAt}</div>
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
