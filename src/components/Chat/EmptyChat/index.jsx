import React from 'react';
import { ReactComponent as GroupIcon } from '../../../assets/group-add.svg';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as PersonIcon } from '../../../assets/person-add.svg';
import { ReactComponent as EmptyIcon } from '../../../assets/empty-icon.svg';


const EmptyChat = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <EmptyIcon />
            <h1 className="text-lg font-bold text-primary mt-4">Let's get you started</h1>
            <div className="mt-4">
                <div className="flex mt-4"><GroupIcon/><h2 className="ml-4 font-semibold">Create a group by clicking the icon</h2></div>
                <div className="flex mt-4"><SearchIcon/><h2 className="ml-4 font-semibold">Search a user by their phone number</h2></div>
                <div className="flex mt-4"><PersonIcon/><h2 className="ml-4 font-semibold">Add a user to the newly created group</h2></div>
            </div>
        </div>
    )
};


export default EmptyChat;