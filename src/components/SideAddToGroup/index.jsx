import React, { useContext } from 'react';
import Search from '../Search';
import Userbox from '../Userbox';
import CutIcon from '../../svg/CutIcon';
import useFireBase from '../../CustomHook/useFireBase';
import Interact from '../../utils/firebase/chat';
import { DataContext } from '../../context/Appcontext';

const SideAddToGroup = ({ setAddGroup }) => {
	const [allUsers] = useFireBase(Interact.getAllUsers);
	const [thisGroupData] = useContext(DataContext);

	return (
		<div className='add-to-group-wrap z-50 flex fixed inset-0 w-screen h-screen'>
			<div
				onClick={() => setAddGroup(false)}
				className='modal flex-grow bg-gray-50'
			></div>
			<div className='add-to-group md:min-w-md max-w-lg side-bar  md:w-3/12 bg-green-1100'>
				<div className='recent-chat-header px-8 w-100 h-20 flex justify-center items-center'>
					<div onClick={() => setAddGroup(false)} className='cursor-pointer'>
						<CutIcon />
					</div>
					<h3 className=' flex-grow text-white text-center font-bold'>
						Add To Group
					</h3>
				</div>
				<Search placeholder='Search to add to a group' />
				{!allUsers ?  <p className="text-center text-white">No User yet.</p> : (
					<>
				<div className='messages pt-4'>
					{thisGroupData &&
						allUsers.map((member, index) => {
							const { name, phone_number, groups } = member;
							const groupIds =
								groups && Object.values(groups).map(({ room_id }) => room_id);

							if (!groups || groupIds && !groupIds.includes(thisGroupData.id)) {
								return (
									<Userbox
										member={member}
										name={name}
										phone_number={phone_number}
										key={index}
									/>
								);
							}
						})}
				</div>
				</>)}
			</div>
		</div>
	);
};

export default SideAddToGroup;
