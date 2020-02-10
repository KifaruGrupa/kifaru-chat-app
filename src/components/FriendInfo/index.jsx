import React from 'react';
import defaultAvatar from '../../assets/group-avatar.svg';

const FriendInfo = ({img, name}) => {
    return (
        <div className="friend-info flex-grow text-bold flex mx-4" >
            <img
				src={img || defaultAvatar}
				alt='img'
				className={`h-11 w-11 rounded-full mr-2 object-cover cursor-pointer border-4 border-primary`}
			/>
            <h3 className="flex-grow text-center font-bold">{name || 'Frank Obi'}</h3>
        </div>
    )
}

export default FriendInfo;
