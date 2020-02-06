import React from 'react';
import ArrowBack from '../../svg/ArrowBack';
import FriendInfo from '../FriendInfo';
import ProfileLink from '../ProfileLink';
import AddGroupIcon from '../../svg/AddGroupIcon';

const Navbar = ({ setShowBar, setAddGroup }) => {
	return (
		<div className='nav-bar min-h-4 h-8v w-100 flex px-6 items-center bg-gray-10'>
			<div className='cursor-pointer' onClick={() => setShowBar(true)}>
				<ArrowBack className='md:hidden' />
			</div>
			<FriendInfo />
			<AddGroupIcon setAddGroup={setAddGroup} />
			<ProfileLink />
		</div>
	);
};

export default Navbar;
