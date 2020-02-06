import React from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import './chat.scss';

const Chat = () => (
	<>
		<div className='flex flex-grow overflow-y-scroll flex-col bg-red-200'>
			<div className='chatBody overflow-y-scroll flex-grow'>
				<ChatList />
			</div>		
			<ChatForm />
		</div>

	</>
);

export default Chat;
