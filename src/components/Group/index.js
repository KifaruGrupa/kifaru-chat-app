import React, {useState, useEffect, useContext} from 'react';
import GroupList from './GroupList'
import Interact from '../../utils/firebase/chat';
import useFireBase from '../../CustomHook/useFireBase';
import {getUser} from '../../utils/firebase/auth'
import { getUserRooms } from '../../utils/helpers'


const Group = ({ setShowBar}) => {
    const [allRooms] = useFireBase(Interact.viewAllRooms);
    const [currentUser] = useFireBase(Interact.viewUserProfile, getUser());
    const [userGroups, setUserGroups] = useState(null);


    useEffect(() => {
     currentUser && allRooms && setUserGroups(getUserRooms(currentUser, allRooms))
    }, [currentUser, allRooms]);


   return (
       <>
    {!userGroups ?  <p className="text-center text-white">No Chat rooms yet.</p>: userGroups.map(the_group =>
    <GroupList data={the_group}
        setShowBar={setShowBar}
        name='recent-msg'
        radioType
        key={the_group.id}
   />)}
   </>)
};

export default Group;