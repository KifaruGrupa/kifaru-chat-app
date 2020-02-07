import React, { useEffect, useState } from 'react';
import AddToChatIcon from '../../svg/AddToChatIcon';
import AddGroupIcon from '../../svg/AddGroupIcon';
import Search from '../Search';
import ProfileLink from '../ProfileLink';
import Interact from '../../utils/firebase/chat';
import useFireBase from '../../CustomHook/useFireBase';
import Groups from '../Group';
import ArrowBack from '../../svg/ArrowBack';
import useQuery from '../../CustomHook/useQuery';



const Sidebar = ({ setShowBar, showSideBar }) => {
	const [allUsers] = useFireBase(Interact.getAllUsers);
	const [ query, setQuery] = useState('');
	const filtered = useQuery(allUsers, query, 'phone_number');
	const [newRoom, setNewRoom] = useState(false);
	const [roomName, setRoomName] = useState('');
	const [loading, setLoading] = useState(false);


	const handleNewRoom = async () => {
		setLoading(true)
		await Interact.addRoom(roomName);
		setRoomName('');
		setNewRoom(false);
		setLoading(false);
	};

	useEffect(() => {
		console.log('filtered', filtered);
	}, [filtered]);

	return (
		<div
			className={`side-bar ${
				showSideBar ? '' : 'hide-side-bar'
			} w-full z-10 absolute md:relative min-h-screen flex flex-col md:min-w-md max-w-lg md:w-3/12 bg-green-1100`}
		>
			<div className='recent-chat-header w-100 min-h-20 flex justify-end items-center pr-8'>
				<div
					className='cursor-pointer'
					onClick={() => setNewRoom(prev => !prev)}
				>
					{newRoom ? <ArrowBack color="#ffffff" /> : <AddToChatIcon />}
				</div>
				<ProfileLink sidePos />
			</div>
			<Search placeholder='Search or start a new chat' setQuery={setQuery}/>
			<div className='messages pt-4'>
				{filtered && filtered.map((user, index) => (
					<Chatbox
						setShowBar={setShowBar}
						name='recent-msg'
						msg={user.message}
						phone={user.phone_number}
						username={user.username}
						photo={user.avatar}
						key={index}
						id={`chat-box-${index}`}
						radioType
				<div className={`newRoom ${!newRoom ? 'hidden' : '' } flex w-full px-6 pb-2`} >
					<input
						onChange={e => setRoomName(e.target.value)}
						value={roomName}
						type='text'
						placeholder='Create a new chat room'
						className='border-b border-solid border-b-2 bg-transparent text-white p-2 pt-0 pb-1 h-8 flex-grow'
					/>
					{Boolean(roomName.length) && (
						<button
							onClick={handleNewRoom}
							className='create-room text-white text-xs border border-solid border-white ml-2  p-2 py-1'
							disabled={loading}
						>
						{loading? 'Creating...' : 'Create'}
						</button>
					)}
				</div>
			<Search placeholder='Search or start a new chat' />
			<div className='messages flex-grow overflow-y-scroll pt-4'>
				<Groups setShowBar={setShowBar} />
			</div>
		</div>
	);
};

export default Sidebar;
