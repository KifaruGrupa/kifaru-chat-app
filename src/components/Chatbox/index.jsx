import React from 'react';

const Chatbox = ({id, msg, radioType, setShowBar}) => {
	return (
		<>
		{ radioType ? <input type='radio' name='chatbox' className='chatbox-input hidden' id={id} /> : ''}
			<label onClick={() => radioType && setShowBar(false)} htmlFor={radioType && id} className='chat-box-label flex h-26 px-4'>
				<div className='profile-pic flex items-center justify-start w-2/12  mr-2 h-20 h-24 cursor-pointer'>
					<img
						src='https://i.pinimg.com/236x/10/7f/10/107f10abd0b67486b7f0bb17500eda22--black-men-lips.jpg'
						alt='img'
						className='h-10 w-10 rounded-full border-white border-3 border-solid object-cover cursor-pointer'
					/>
				</div>
				<div className='info flex-grow h-24 border-solid border-green-40 border-b-2 cursor-pointer'>
					<div className='name-wrap mt-4 flex items-center justify-center pl-1 cursor-pointer'>
						<h3 className=' flex-grow text-sm text-white font-bold cursor-pointer'>
							John Newman
						</h3>
						<span className='w-2/12 text-xxs text-green-70 text-right cursor-pointer'>
							10:00AM
						</span>
					</div>
					<p className='w-10/12 ml-0 mt-2 ml-1 text-xs text-green-70 cursor-pointer'>
						{msg}
					</p>
				</div>
			</label>
		</>
	);
};

export default Chatbox;
