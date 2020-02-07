import React, { useState } from 'react';
import CutIcon from '../../svg/CutIcon';
import EditProfileImg from '../../svg/EditProfileImg';
import ProfileInput from './ProfileInput';

const ProfileCard = ({
	setShowProfile,
	showCard,
	isMe,
	profileInfo: { name, phone, imgUrl, username },
}) => {
	const [isDone, setIsDone] = useState(true);
	const [userForm, setForm] = useState({
		name: name || 'Timi Tejumola',
		phone: phone || '+2347052648321',
		username: username || 'timicodes',
		imgUrl:
			imgUrl ||
			'https://i.pinimg.com/236x/10/7f/10/107f10abd0b67486b7f0bb17500eda22--black-men-lips.jpg',
	});

	const handleChange = ({ target }) => {
		setForm(prev => ({ ...prev, [target.name]: target.value }));
	};

	return (
		<div
			className={`prof-card ${
				!showCard ? 'profile-hide' : ''
			} w-full z-10 absolute min-h-screen md:min-w-md max-w-lg md:w-3/12 bg-green-1100`}
		>
			<div className='header h-20 flex justify-between items-center px-6'>
				<div onClick={() => setShowProfile(false)}>
					<CutIcon />
				</div>
				{isMe && (
					<span onClick={() => setIsDone(prev => !prev)} className='font-bold cursor-pointer ml-2 text-white'>
						{isDone ? 'EDIT PROFILE' : 'DONE'}
					</span>
				)}
			</div>
			<form className='flex mt-4 mx-auto items-center w-full px-4 flex-col'>
				<div className='imgWrap relative'>
					<img
						src={userForm.imgUrl}
						alt=''
						className='h-28 w-28 rounded-full border-white border-5 border-solid object-cover cursor-pointer`'
					/>
					{!isDone && <EditProfileImg classes='absolute z-10 edit-img' />}
				</div>
				<ProfileInput
					onChange={handleChange}
					name='name'
					errorMsg='Name must be at least 3 and at most 40'
					regEx={/^[\w ]{3,40}$/g}
					className='capitalize bg-transparent  w-full block text-center text-3xl text-white font-bold my-2'
					value={userForm.name}
					disabled={isDone}
				/>
				<ProfileInput
					onChange={handleChange}
					name='phone'
					regEx={/^[+][\d]{8,15}$/g}
					errorMsg='Invalid format for phone number'
					className='mt-4 font-bold bg-transparent w-full block text-center text-white'
					value={userForm.phone}
					disabled={isDone}
				/>
				<ProfileInput
					onChange={handleChange}
					name='username'
					errorMsg='username must be at least 3 and at most 20'
					regEx={/^[\w]{3,20}$/g}
					className='mt-4 font-medium bg-transparent w-8/12 mx-auto block text-center text-white'
					value={userForm.username}
					disabled={isDone}
				/>
			</form>
		</div>
	);
};

export default ProfileCard;
