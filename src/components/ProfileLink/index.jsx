import React, { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import Interact from '../../utils/firebase/chat';
import { UserContext } from '../../context/UserContext';

const ProfileLink = ({ sidePos }) => {
	const {setThisProfile, setShowProfile} = useContext(ProfileContext);
	const [thisUser] = useContext(UserContext);

	const handleProfile = () => {
		Interact.viewUserProfile(thisUser, setThisProfile);
		setShowProfile(true);
	};

	return (
		<div
			onClick={handleProfile}
			className={`profile-link ${
				sidePos ? `md:hidden` : ''
			} w-19 py-1 rounded-full flex items-center ml-4 justify-center px-2 ${
				sidePos ? 'bg-white' : 'bg-green-1100'
			}`}
		>
			<img
				src={ (thisUser && (thisUser.avatar || thisUser.profileUrl) ) || 'https://res.cloudinary.com/dflmq4zxb/image/upload/v1581205772/Group_2_jghuh9.jpg'}
				alt='img'
				className={`h-8 w-8 rounded-full mr-2 ${
					sidePos ? 'border-green-1100' : 'border-white'
				} border-3 border-solid object-cover cursor-pointer`}
			/>
			<svg
				width='12'
				height='6'
				viewBox='0 0 10 5'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g id='arrow-drop-down'>
					<path
						id='Shape'
						fillRule='evenodd'
						clipRule='evenodd'
						d='M0 0L5 5L10 0H0Z'
						fill={sidePos ? '#00B493' : '#ffffff'}
					/>
				</g>
			</svg>
		</div>
	);
};

export default ProfileLink;
