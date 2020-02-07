import React, { useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import SideAddToGroup from '../../components/SideAddToGroup';
import Navbar from '../../components/Navbar';
import ChatArea from '../../components/Chat';
import {currentUser, removeUserFromLocal, getUser} from '../../utils/firebase/auth';
import Interact from '../../utils/firebase/chat';
import { UserContext } from '../../context/UserContext';
import useFireBase from '../../CustomHook/useFireBase';
import { DataContext } from '../../context/Appcontext';
import Loader from '../../svg/Loader';
import ProfileCard from '../../components/ProfileCard';

const Chat = (props) => {
	const [loginUser] = useFireBase(Interact.viewUserProfile, getUser());
	const [showSideBar, setShowBar] = useState(true);
	const [showGroup, setAddGroup] = useState(false);
	const [isAuth, setAuth] = useState(false);
	const [thisUser, setThisUser] = useContext(UserContext);
	const [thisGroupData] = useContext(DataContext);
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
	}, [isAuth, loginUser, props.history]);

	React.useEffect(() => {
		setThisUser(loginUser);
	}, [loginUser, setThisUser]);

	return !isAuth ? (
		<Loader />
	) : (
		<div className=' h-screen relative Chat flex w-100'>
			<Sidebar
				showSideBar={showSideBar}
				setShowProfile={setShowProfile}
				setShowBar={setShowBar}
			/>
			<div className='flex max-h-screen relative overflow-y-scroll flex-grow flex-col'>
				{thisGroupData && (
					<Navbar
						setAddGroup={setAddGroup}
						setShowProfile={setShowProfile}
						setShowBar={setShowBar}
					/>
				)}
				<ChatArea />
			</div>
			{showGroup && <SideAddToGroup setAddGroup={setAddGroup} />}
			<ProfileCard
				isMe
				setShowProfile={setShowProfile}
				profileInfo={{}}
				showCard={showCard}
			/>
		</div>
	);
};

export default Chat;
