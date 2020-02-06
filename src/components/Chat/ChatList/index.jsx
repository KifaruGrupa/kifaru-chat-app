import React from 'react';
import ChatDetails from '../ChatDetails';
import './chatList.scss';

const ChatList = () => {
  const chats = [
    {
      'id': '1',
      'chatUser': 'ewere',
      'chatType': 'receiver',
      'chatBody': 'Lorem Ipsum, Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
      'createdAt': '8:23PM',
    },
    {
      'id': '2',
      'chatUser': 'ewere',
      'chatType': 'sender',
      'chatBody': 'Lorem Ipsum, Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
      'createdAt': '8:23PM',
    },
    {
      'id': '1',
      'chatUser': 'ewere',
      'chatType': 'receiver',
      'chatBody': 'Lorem Ipsum, Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
      'createdAt': '8:23PM',
    },
    {
      'id': '1',
      'chatUser': 'ewere',
      'chatType': 'receiver',
      'chatBody': 'Lorem Ipsum, Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
      'createdAt': '8:23PM',
    },
    {
      'id': '2',
      'chatUser': 'ewere',
      'chatType': 'sender',
      'chatBody': 'Lorem Ipsum, Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
      'createdAt': '8:23PM',
    },
    {
      'id': '1',
      'chatUser': 'ewere',
      'chatType': 'receiver',
      'chatBody': 'Lorem Ipsum, Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
      'createdAt': '8:23PM',
    }
  ];

  return chats.length ? (
    <div className="chat-list">
      {
        chats.map((chat) => (
          <ChatDetails chat={chat} key={chat.id} />
        ))
      }
    </div>
  ) : '';
};

export default ChatList;
