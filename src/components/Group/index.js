import React, {useState, useEffect, useContext} from 'react';
import GroupList from './GroupList'
import Interact from '../../utils/firebase/chat';
import useFireBase from '../../CustomHook/useFireBase';
import {getUser} from '../../utils/firebase/auth'


const Group = ({ setShowBar}) => {
    const [allRooms] = useFireBase(Interact.viewAllRooms);
    const [currentUser] = useFireBase(Interact.viewUserProfile, getUser());
    const [userGroups, setUserGroups] = useState(null);
    const [sortGroups, setSortGroups] = useState(null);

    const getUserRooms = (currentUser) => {
       if(currentUser.groups) {
        const groups = Object.values(currentUser.groups)
        const grp_lenght = groups.length;
        let user_rooms = [];
        for(let i = 0; i < grp_lenght; i++) {
            user_rooms.push(...allRooms.filter((room) => room.id === groups[i].room_id))
        }
        return user_rooms;
    }
     return null;
    }

    useEffect(() => {
     currentUser && allRooms && setUserGroups(getUserRooms(currentUser))
    }, [currentUser, allRooms]);

    useEffect(() => {
        let grps = userGroups;
        if(grps && grps.length) {
            grps.sort((a,b) => b.last_message_timestamp - a.last_message_timestamp)
            setSortGroups(grps)
        }
    }, [userGroups])
 

   return (
       <>
    {!sortGroups ?  <p className="text-center text-white">No Chat rooms yet.</p>: sortGroups.map(the_group => 
    <GroupList data={the_group} 
        setShowBar={setShowBar}
        name='recent-msg'
        radioType
        key={the_group.id}
   />)}
   </>)
};

export default Group;