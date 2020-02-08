import React, {useState, useEffect, useContext} from 'react';
import GroupList from './GroupList'
import Interact from '../../utils/firebase/chat';
import useFireBase from '../../CustomHook/useFireBase';


const Group = ({ setShowBar}) => {
    const [allRooms] = useFireBase(Interact.viewAllRooms);
    const [currentUser] = useFireBase(Interact.viewUserProfile, Interact.user);
    const [userGroups, setUserGroups] = useState(null);

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
      currentUser && setUserGroups(getUserRooms(currentUser))
    }, [allRooms]);

    useEffect(() => {
     currentUser && allRooms && setUserGroups(getUserRooms(currentUser))
    }, [currentUser]);
 

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