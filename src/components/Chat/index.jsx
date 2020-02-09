import React, {useContext, useEffect, useState} from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import EmptyChat from './EmptyChat';
import {DataContext} from '../../context/Appcontext';
import './chat.scss';

const Chat = () => {
	const [thisGroupData] = useContext(DataContext);
	const [show, setShow] = useState(false)

	useEffect(() => {
		if(thisGroupData) {
			setShow(true)
		}
	}, [thisGroupData])

	return (
	<>
		<div className='flex flex-grow overflow-y-scroll flex-col'>
			<div className='chatBody overflow-y-scroll flex-grow'>
				<ChatList />
			</div>
			{show && <ChatForm />}
		</div>
	</>
)};

export default Chat;
