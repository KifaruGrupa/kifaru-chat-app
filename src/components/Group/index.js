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
    const [sortGroups, setSortGroups] = useState(null);


    useEffect(() => {
     currentUser && allRooms && setUserGroups(getUserRooms(currentUser, allRooms))
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