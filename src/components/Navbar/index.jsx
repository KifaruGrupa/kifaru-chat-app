import React, { useContext } from 'react';
import ArrowBack from '../../svg/ArrowBack';
import FriendInfo from '../FriendInfo';
import ProfileLink from '../ProfileLink';
import AddGroupIcon from '../../svg/AddGroupIcon';
import { DataContext } from '../../context/Appcontext';

const Navbar = ({ setShowBar, setAddGroup }) => {
	const [thisGroupData] = useContext(DataContext);

	return (
		<div className='nav-bar min-h-4 w-100 flex px-6 items-center bg-gray-10'>
			<div className='cursor-pointer' onClick={() => setShowBar(true)}>
				<ArrowBack className='md:hidden' />
			</div>
			<FriendInfo name={thisGroupData && thisGroupData.name}  />
			<AddGroupIcon setAddGroup={setAddGroup} />
			<ProfileLink />
		</div>
	);
};

export default Navbar;
