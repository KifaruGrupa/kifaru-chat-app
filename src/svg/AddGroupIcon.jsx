import React from 'react';

const AddGroupIcon = ({ setAddGroup }) => {
	return (
		<div onClick={() => setAddGroup(true)} className='mx-2 cursor-pointer'>
			<svg
				width='37'
				height='37'
				viewBox='0 0 37 37'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle cx='18.5' cy='18.5' r='18.5' fill='#00B493' />
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M19.4545 17.5455C21.2545 17.5455 22.7273 16.0727 22.7273 14.2727C22.7273 12.4727 21.2545 11 19.4545 11C17.6545 11 16.1818 12.4727 16.1818 14.2727C16.1818 16.0727 17.6545 17.5455 19.4545 17.5455ZM12.0909 15.9091V13.4545H10.4545V15.9091H8V17.5455H10.4545V20H12.0909V17.5455H14.5455V15.9091H12.0909ZM19.4545 19.1818C17.2455 19.1818 12.9091 20.2455 12.9091 22.4545V24.0909H26V22.4545C26 20.2455 21.6636 19.1818 19.4545 19.1818Z'
					fill='white'
				/>
			</svg>
		</div>
	);
};

export default AddGroupIcon;
