import React, { useState} from 'react';
import Sidebar from '../../components/Sidebar';
import SideAddToGroup from '../../components/SideAddToGroup';
import Navbar from '../../components/Navbar';
import ChatArea from '../../components/Chat';
import {currentUser, removeUserFromLocal} from '../../utils/firebase/auth';

const Chat = (props) => {
	const [showSideBar, setShowBar] = useState(true);
	const [showGroup, setAddGroup] = useState(true);
	const [isAuth, setAuth] = useState(false);
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
	}, [isAuth])
	return (!isAuth ? <div>Loading</div> :
		<div className=' relative Chat flex w-100 min-h-screen overflow-y-scroll'>
			<Sidebar showSideBar={showSideBar} setShowBar={setShowBar} />
			<div className='flex-grow flex flex-col'>
				<Navbar setShowBar={setShowBar} />
				<ChatArea />
			</div>
           {showGroup && <SideAddToGroup setAddGroup={setAddGroup} />}
		</div>
	);
};

export default Chat;
