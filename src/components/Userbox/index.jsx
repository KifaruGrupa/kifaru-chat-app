import React, { useState, useContext } from 'react';
import Interact from '../../utils/firebase/chat';
import { DataContext } from '../../context/Appcontext';
import PersonAdd from '../../svg/PersonAdd';
import { ProfileContext } from '../../context/ProfileContext';
import defaultAvatar from '../../assets/avatar.svg';

const Userbox = ({ member, name, phone_number, bool, setAddGroup }) => {
	const [thisGroupData] = useContext(DataContext);
	const {setThisProfile, setShowProfile} = useContext(ProfileContext);
	const [loading, setLoading] = useState(false);

	const handleProfile = () => {
		Interact.viewUserProfile(member, setThisProfile);
		setAddGroup(false)
		setShowProfile(true);
	};

	const handleAddToGroup = async () => {
		if (!loading) {
			setLoading(true);
			thisGroupData &&
				member &&
				member.id &&
				(await Interact.addMemberToRoom(member, thisGroupData.id));
				setLoading(false);
		}
	};
	return (
		<>
			<div className='flex items-center px-5'>
				<div
				onClick={handleProfile}
					className='chat-box-label flex items-center flex-grow h-16 px-4 border-solid border-green-40 border-b-2 cursor-pointer'
				>
					<div className='profile-pic flex items-center justify-start mr-4 h-16  cursor-pointer'>
						<img
							src={member.photoURL || member.avatar || defaultAvatar}
							alt='img'
							className='h-10 w-10 rounded-full border-white border-3 border-solid object-cover cursor-pointer'
						/>
					</div>
					<h3 className='items-center flex-grow capitalize text-sm text-white font-bold cursor-pointer'>
						{loading
							? 'Adding to Group...'
							: name || phone_number || 'John Newman'}
					</h3>
				</div>
				{bool && <div	onClick={handleAddToGroup} className='person-add h-16 flex items-center justify-center px-4 cursor-pointer'>
					<PersonAdd />
				</div>}
			</div>
		</>
	);
};

export default Userbox;
