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
	const [_, setThisUser] = useContext(UserContext);
	const [thisGroupData] = useContext(DataContext);

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
		<div className=' h-screen w-screen overflow-x-hidden relative Chat flex w-100'>
			<Sidebar
				showSideBar={showSideBar}
				setShowBar={setShowBar}
			/>
			<div className='flex max-h-screen relative w-9/12 overflow-y-scroll flex-grow flex-col'>
				{thisGroupData && (
					<Navbar
						setAddGroup={setAddGroup}
						setShowBar={setShowBar}
					/>
				)}
				<ChatArea />
			</div>
			{showGroup && <SideAddToGroup setAddGroup={setAddGroup} />}
			<ProfileCard	/>
		</div>
	);
};

export default Chat;
