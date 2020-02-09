import React from 'react';

const EditProfileImg = ({ classes}) => {
	return (
		<div className={classes || ''}>
			<svg
				width='37'
				height='37'
				viewBox='0 0 37 37'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle cx='18.5' cy='18.5' r='18.5' fill='#FEFFFF' />
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M9 24.2V28H12.8L23.8 16.9L20 13.1L9 24.2ZM26.7 14C27.1 13.6 27.1 13 26.7 12.6L24.4 10.3C24 9.9 23.4 9.9 23 10.3L21.2 12.1L25 15.9L26.7 14ZM18 26L16 28H29V26H18Z'
					fill='#01C5A1'
				/>
			</svg>
		</div>
	);
};

export default EditProfileImg;
