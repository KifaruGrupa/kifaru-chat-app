import React, { useState} from 'react';
import Sidebar from '../../components/Sidebar';
import SideAddToGroup from '../../components/SideAddToGroup';
import Navbar from '../../components/Navbar';

const Chat = () => {
	const [showSideBar, setShowBar] = useState(true);
	const [showGroup, setAddGroup] = useState(true);
	return (
		<div className=' relative Chat flex w-100 min-h-screen overflow-y-scroll'>
			<Sidebar showSideBar={showSideBar} setShowBar={setShowBar} />
			<div className='flex-grow'>
				<Navbar setShowBar={setShowBar} />
			</div>
           {showGroup && <SideAddToGroup setAddGroup={setAddGroup} />}
		</div>
	);
};

export default Chat;
