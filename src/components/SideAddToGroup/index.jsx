import React from 'react';
import Search from '../Search';
import Chatbox from '../Chatbox';
import CutIcon from '../../svg/CutIcon';

const text = [
	'Hi whatsup',
	'If you like you listen to the song or not, the guy will still make money',
	'That your account manager called me again i toild him not to worry',
];

const SideAddToGroup = ({ setAddGroup }) => {
	return (
		<div className='add-to-group-wrap z-50 flex fixed inset-0 w-screen h-screen'>
			<div onClick={() => setAddGroup(false)} className='modal flex-grow bg-gray-50'></div>
			<div className='add-to-group md:min-w-md max-w-lg side-bar  md:w-3/12 bg-green-1100'>
				<div className='recent-chat-header px-8 w-100 h-20 flex justify-center items-center'>
					<div onClick={() => setAddGroup(false)} className='cursor-pointer'>
						<CutIcon />{' '}
					</div>
					<h3 className=' flex-grow text-white text-center font-bold'>
						Add To Group
					</h3>
				</div>
				<Search placeholder='Search to add to a group' />
				<div className='messages pt-4'>
					{text.map((msg, index) => (
						<Chatbox
							name='recent-group'
							msg={msg}
							key={index}
							id={`chat-box-${index}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SideAddToGroup;
