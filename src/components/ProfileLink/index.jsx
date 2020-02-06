import React from 'react';

const ProfileLink = ({ sidePos }) => {
	return (
		<div className={`profile-link ${sidePos ? `md:hidden` : ''} w-19 py-1 rounded-full flex items-center ml-4 justify-center px-2 ${sidePos ? 'bg-white' : 'bg-green-1100'}`}>
			<img
				src='https://i.pinimg.com/236x/10/7f/10/107f10abd0b67486b7f0bb17500eda22--black-men-lips.jpg'
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
						fill={sidePos ? '#00B493': '#ffffff'}
					/>
				</g>
			</svg>
		</div>
	);
};

export default ProfileLink;
