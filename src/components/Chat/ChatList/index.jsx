import React, {useContext, useEffect, useState} from 'react';
import ChatDetails from '../ChatDetails';
import './chatList.scss';
import {DataContext} from '../../../context/Appcontext';
import Interact from '../../../utils/firebase/chat';
import {UserContext} from '../../../context/UserContext';


const ChatList = (props) => {
  const [thisGroupData] = useContext(DataContext);
	const [thisUser] = useContext(UserContext);
  let [msg, setMsg] = useState(null);
  const [chats, setchats] = useState(null);

  useEffect(() => {
    if (thisGroupData) {
      Interact.viewRoomMessages(thisGroupData.id, setMsg);
    }
  }, [chats, thisGroupData]);
  useEffect(()=> {
    if(msg) {
      const strMsg = msg;
      let paresedMsg = JSON.parse(strMsg);
      paresedMsg = Object.values(paresedMsg);
      setchats(paresedMsg);
      props.updateScroll();
    }
  }, [msg, props])

  useEffect(()=> {
  }, [thisUser])


  return chats && chats.length ? (
    <div className="chat-list" id="chat-list">
      {
        chats && chats.map((chat, index) => {
          if(typeof chat !== typeof '') {
            return (<ChatDetails chat={chat} user_id={thisUser.id} user_name={thisUser.name} key={index} />)
          }
        })
      }
    </div>
  ) : '';
};

export default ChatList;
