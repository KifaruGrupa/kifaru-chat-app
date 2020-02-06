import React from 'react';

const FriendInfo = ({img, name}) => {
    return (
        <div className="friend-info flex-grow text-bold flex mx-4" >
            <img
				src={img || 'https://i.pinimg.com/236x/10/7f/10/107f10abd0b67486b7f0bb17500eda22--black-men-lips.jpg'}
				alt='img'
				className={`h-8 w-8 rounded-full mr-2 object-cover cursor-pointer`}
			/>
            <h3 className="flex-grow text-center font-bold">{name || 'Frank Obi'}</h3>
        </div>
    )
}

export default FriendInfo;
