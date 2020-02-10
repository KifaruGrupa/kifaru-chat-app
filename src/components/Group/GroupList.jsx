import React, { useContext} from 'react';
import {formatDistance, subDays} from 'date-fns';
import {DataContext} from '../../context/Appcontext';
import defaultAvatar from '../../assets/group-avatar.svg';
import './groupList.scss';

const GroupList = ({data, radioType, setShowBar}) => {
	const [thisGroupData, setthisGroupData] = useContext(DataContext);
	const id = data.id;
	const handleClick = () => {
		setthisGroupData(data);
		setShowBar(false)
	}

	return (
		<>
		{ radioType ? <input type='radio' name='chatbox' className='chatbox-input hidden' id={id} onClick={handleClick}/> : ''}
			<label htmlFor={radioType && id} className='chat-box-label flex h-26 px-4'>
				<div className='profile-pic flex items-center justify-start w-2/12  mr-2 h-20 h-24 cursor-pointer'>
					<img
						src={data.avatar ? data.avatar : defaultAvatar }
						alt='img'
						className='h-10 w-10 rounded-full border-white border-4 border-solid object-cover cursor-pointer'
					/>
				</div>
				<div className='info flex-grow h-22 border-solid border-green-40 border-b-2 cursor-pointer'>
					<div className='name-wrap mt-4 flex items-center justify-center pl-1 cursor-pointer'>
						<h3 className=' flex-grow text-sm text-white font-bold cursor-pointer'>
							{data.name ? data.name : data.phone}
						</h3>
						<span className='w-6/12 text-xxs text-green-70 text-right cursor-pointer'>
							{formatDistance(subDays(data.last_message_timestamp || data.timestamp, 0), new Date())}
						</span>
					</div>
					<p className='into-text w-10/12 ml-0 mt-2 ml-1 text-xs text-green-70 cursor-pointer'>
						{data.last_message || 'last group message here'}
					</p>
				</div>
			</label>
		</>
	);
};

export default GroupList;
