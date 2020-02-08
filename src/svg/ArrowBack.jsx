import React from 'react';

const ArrowBack = ({ className, color }) => {
	return (
		<div className={`arrow-back ${className || ''}`}>
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M7 0L7 12.2L1.4 6.6L0 8L8 16L16 8L14.6 6.6L9 12.2L9 0H7Z'
					fill={color || '#29362D'}
					fillOpacity='1'
				/>
			</svg>
		</div>
	);
};

export default ArrowBack;
