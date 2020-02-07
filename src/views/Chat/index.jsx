import React, { useState, useContext} from 'react';
import Sidebar from '../../components/Sidebar';
import SideAddToGroup from '../../components/SideAddToGroup';
import Navbar from '../../components/Navbar';
import ChatArea from '../../components/Chat';
import {currentUser, removeUserFromLocal} from '../../utils/firebase/auth';
import Interact from '../../utils/firebase/chat';
import {UserContext} from '../../context/UserContext';
import useFireBase from '../../CustomHook/useFireBase';
import { DataContext } from '../../context/Appcontext';
import Loader from '../../svg/Loader';

const Chat = (props) => {
	const [loginUser] = useFireBase(Interact.viewUserProfile, Interact.user);
	const [showSideBar, setShowBar] = useState(true);
	const [showGroup, setAddGroup] = useState(false);
	const [isAuth, setAuth] = useState(false);
	const [thisUser, setThisUser] = useContext(UserContext);
	const [thisGroupData] = useContext(DataContext);
	
	React.useEffect(()=> {
		//create seperate useEffect for other items
		currentUser().then((data) => {
			if(data) {
				setAuth(true)
			}else {
				removeUserFromLocal();
				props.history.push('/')
			}
		})
	}, [isAuth, loginUser])

	React.useEffect(() => {
		setThisUser(loginUser);
	}, [loginUser]);
	
	return (!isAuth ? <Loader /> :
		<div className=' h-screen relative Chat flex w-100'>
			<Sidebar showSideBar={showSideBar} setShowBar={setShowBar} />
			<div className='flex max-h-screen relative overflow-y-scroll flex-grow flex-col'>
			{	thisGroupData && <Navbar setAddGroup={setAddGroup} setShowBar={setShowBar} />}
				<ChatArea />
			</div>
           {showGroup && <SideAddToGroup setAddGroup={setAddGroup} />}
		</div>
	);
};

export default Chat;
