import React, { useState, useContext, useEffect } from 'react';
import Interact from '../../utils/firebase/chat';
import { DataContext } from '../../context/Appcontext';

const Userbox = ({ member, name, phone_number, bool }) => {
	const [thisGroupData] = useContext(DataContext);
	const [loading, setLoading] = useState(false);

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
			<div className='chat-box-label flex h-16 px-4'>
				<div className='profile-pic flex items-center justify-start w-2/12  mr-2 h-20 cursor-pointer'>
					<img
						src='https://i.pinimg.com/236x/10/7f/10/107f10abd0b67486b7f0bb17500eda22--black-men-lips.jpg'
						alt='img'
						className='h-10 w-10 rounded-full border-white border-3 border-solid object-cover cursor-pointer'
					/>
				</div>
				<div className='info flex flex-grow h-16 border-solid align-baseline justify-between border-green-40 border-b-2 cursor-pointer'>
					<div className='name-wrap flex items-center justify-center pl-1 cursor-pointer'>
						<h3 className=' flex-grow capitalize text-sm text-white font-bold cursor-pointer'>
							{loading
								? 'Adding to Group...'
								: name || phone_number || 'John Newman'}
						</h3>
					</div>
					{bool && <button onClick={handleAddToGroup} disabled={loading} class="text-gray-800 hover:text-black font-semibold py-2
					 px-4  rounded shadow">Add to group</button>}
				</div>
			</div>
		</>
	);
};

export default Userbox;
