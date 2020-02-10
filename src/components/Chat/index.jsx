import React, {useContext, useEffect, useState, useRef} from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import EmptyChat from './EmptyChat';
import {DataContext} from '../../context/Appcontext';
import './chat.scss';

const Chat = () => {
	const [thisGroupData] = useContext(DataContext);
	const [show, setShow] = useState(false)
	const chatBody = useRef(null);

	const updateScroll =  () => {
		const scrollHeight = chatBody.current.scrollHeight;
		const height = chatBody.current.clientHeight;
		const maxScrollTop = scrollHeight - height;
		chatBody.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	}

	useEffect(() => {
		if(thisGroupData) {
			setShow(true)
		}
	}, [thisGroupData])

	return (
	<>
		<div className='flex flex-grow overflow-y-scroll flex-col'>
			<div className='chatBody overflow-y-scroll flex-grow' ref={chatBody}>
				<ChatList updateScroll={updateScroll}/>
				{!show && (
					<EmptyChat/>
					)
				}
			</div>
			{show && <ChatForm />}
		</div>
	</>
)};

export default Chat;
