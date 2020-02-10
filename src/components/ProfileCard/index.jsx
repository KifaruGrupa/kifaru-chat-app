import React, { useState, useContext, useEffect } from 'react';
import CutIcon from '../../svg/CutIcon';
import EditProfileImg from '../../svg/EditProfileImg';
import ProfileInput from './ProfileInput';
import { ProfileContext } from '../../context/ProfileContext';
import { UserContext } from '../../context/UserContext';
import Interact from '../../utils/firebase/chat';
import cloudinaryUpload from '../../utils/cloudinaryUpload';

const ProfileCard = () => {
	const { thisProfile, setShowProfile, showProfile } = useContext(
		ProfileContext
	);
	const [thisUser] = useContext(UserContext);
	const [showEdit, setshowEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [userForm, setForm] = useState({
		name: 'User',
		phone: '+2347991389238',
		imgUrl:
			'https://res.cloudinary.com/dflmq4zxb/image/upload/v1581205772/Group_2_jghuh9.jpg',
	});
	const [pictureFile, setPictureFile] = useState(null);

	const handleChange = ({ target }) => {
		setForm(prev => ({ ...prev, [target.name]: target.value }));
	};

	const loadFilePath = async file => {
		const readPath = new FileReader();
		readPath.readAsDataURL(file);
		readPath.onload = e =>
			setForm(prev => ({ ...prev, imgUrl: e.target.result }));
	};

	const handleImgChange = event => {
		const [imgFile] = event.target.files;
		setPictureFile(imgFile);
		loadFilePath(imgFile);
	};

	const handleSave = async () => {
		// i want to save
		if (!loading && showEdit && thisUser) {
			setLoading(true);
			const imgUrl = pictureFile
				? await cloudinaryUpload(pictureFile)
				: (thisUser.avatar || thisUser.profileUrl || 'https://res.cloudinary.com/dflmq4zxb/image/upload/v1581205772/Group_2_jghuh9.jpg');
			const updated = {
				uid: thisUser.id || thisUser.uid,
				displayName: userForm.name,
				photoURL: imgUrl,
				phoneNumber: thisUser.phone_number || thisUser.phoneNumber,
			};
			Interact.updateUserProfile(updated);
			setshowEdit(false);
			setLoading(false);
			setPictureFile(null)
			return;
		}
		!loading && setshowEdit(true);
	};

	const setUser = user => {
		if (user) {
			setForm({
				name: user.name || (thisProfile.id === thisUser.id ? 'You' : 'User'),
				imgUrl:
					user.avatar ||
					user.photoUrl ||
					'https://res.cloudinary.com/dflmq4zxb/image/upload/v1581205772/Group_2_jghuh9.jpg',
			});
		}
	};

	useEffect(() => {
		setUser(thisProfile);
	}, [thisProfile]);

	return (
		<div
			className={`prof-card ${
				!showProfile ? 'profile-hide' : ''
			} w-full z-10 absolute min-h-screen md:min-w-md max-w-lg md:w-3/12 bg-primary`}
		>
			<div className='header h-20 flex justify-between items-center px-6'>
				<div
					onClick={() => {
						setShowProfile(false);
						setshowEdit(false);
					}}
				>
					<CutIcon />
				</div>
				{thisProfile && thisUser && thisProfile.id === thisUser.id && (
					<span
						onClick={handleSave}
						className='font-bold cursor-pointer ml-2 text-white'
					>
						{(loading ? 'SAVING...' : (!showEdit ? 'EDIT PROFILE' : 'DONE'))}
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

					{showEdit && (
						<>
						<label htmlFor='profile-img-upload' className="cursor-pointer">
							<EditProfileImg classes='absolute z-10 edit-img cursor-pointer' />
						</label>
						<input
						onChange={handleImgChange}
						name='file'
						id='profile-img-upload'
						accept='image/*'
						type='file'
						className='hidden'
					/>
					</>
					)}
				</div>
				<ProfileInput
					onChange={handleChange}
					name='name'
					errorMsg='Name must be at least 3 and at most 40'
					regEx={/^[\w ]{3,40}$/g}
					className='prof-input capitalize bg-transparent  w-full block text-center text-3xl text-white font-bold my-2'
					value={userForm.name}
					disabled={!showEdit}
				/>
				<p
					className='mt-4 font-bold bg-transparent w-full block text-center text-white'
				>{thisProfile ? (thisProfile.phone_number || thisProfile.phoneNumber) : '+234567788990'}</p>
			</form>
		</div>
	);
};

export default ProfileCard;
