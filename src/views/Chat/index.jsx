import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import SideAddToGroup from '../../components/SideAddToGroup';
import Navbar from '../../components/Navbar';
import ChatArea from '../../components/Chat';
import { currentUser, removeUserFromLocal } from '../../utils/firebase/auth';
import ProfileCard from '../../components/ProfileCard';

const Chat = props => {
	const [showSideBar, setShowBar] = useState(true);
	const [showGroup, setAddGroup] = useState(false);
	const [isAuth, setAuth] = useState(false);
	const [showCard, setShowProfile] = useState(true);
	React.useEffect(() => {
		//create seperate useEffect for other items
		currentUser().then(data => {
			if (data) {
				setAuth(true);
			} else {
				removeUserFromLocal();
				props.history.push('/');
			}
		});
	}, [isAuth, props.history]);
	return !isAuth ? (
		<div>Loading</div>
	) : (
		<div className=' h-screen relative Chat flex w-100'>
			<Sidebar
				showSideBar={showSideBar}
				setShowProfile={setShowProfile}
				setShowBar={setShowBar}
			/>
			<div className='flex max-h-screen relative overflow-y-scroll flex-grow flex-col'>
				<Navbar
					setAddGroup={setAddGroup}
					setShowProfile={setShowProfile}
					setShowBar={setShowBar}
				/>
				<ChatArea />
			</div>
			{showGroup && <SideAddToGroup setAddGroup={setAddGroup} />}
			<ProfileCard isMe 	setShowProfile={setShowProfile} profileInfo={{}} showCard={showCard} />
		</div>
	);
};

export default Chat;
