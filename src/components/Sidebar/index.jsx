import React, {useEffect, useState} from 'react';
import AddGroupIcon from '../../svg/AddGroupIcon';
import Search from '../Search';
import Chatbox from '../Chatbox';
import ProfileLink from '../ProfileLink';
import Interact from '../../utils/firebase/chat';

const text = [
	'Hi whatsup',
	'If you like you listen to the song or not, the guy will still make money',
	'That your account manager called me again i toild him not to worry',
];
const Sidebar = ({setShowBar, showSideBar}) => {
	const [ query, setQuery] = useState('');
	const [result, setResult] = useState([]);
	let [users, setUsers] = useState();

	useEffect(() => {
		Interact.getAllUsers(setUsers);
		console.log('users ===>', users)
		if(users) {
			users = JSON.parse(users);
			users = Object.values(users);
			console.log('----', users)
		}
	}, [users]);

	useEffect(() => {
		const getResult = JSON.parse(users).filter((user) => user.phone_number.includes(query));
		setResult(getResult);
		console.log(result);
	}, [users, query, result]);

	return (
		<div  className={`side-bar ${showSideBar ? '' : 'hide-side-bar' } w-full z-10 absolute md:relative min-h-screen md:min-w-md max-w-lg md:w-3/12 bg-green-1100`}>
			<div className='recent-chat-header w-100 h-20 flex justify-end items-center pr-8'>
				<AddGroupIcon />
				<ProfileLink sidePos />
			</div>
			<Search placeholder='Search or start a new chat' setQuery={setQuery}/>
			<div className='messages pt-4'>
				{text.map((msg, index) => (
					<Chatbox setShowBar={setShowBar} name='recent-msg' msg={msg} key={index} id={`chat-box-${index}`} radioType />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
