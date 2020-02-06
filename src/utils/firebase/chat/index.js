import {database} from '../config';
import {getUser} from '../auth';
const user = getUser();

const Interact = {};

Interact.addRoom = async (room_name = 'room') => {
    const timestamp = new Date().getTime();
        const group_unique_id = Number(timestamp).toString(36).toUpperCase();
        const userId = user.uid;

        await database().ref(`chat-rooms/${group_unique_id}`).set({
            id: group_unique_id,
            name: room_name,
            timestamp,
            created_by: userId,
        })
        await database().ref(`room-members/${group_unique_id}`).set({
            id: group_unique_id,
        })
        await database().ref(`room-messages/${group_unique_id}`).set({
            id: group_unique_id,
        });

        return group_unique_id;
};


Interact.sendMessage = (room_id, message = 'default', username = null) => {
    const timestamp = new Date().getTime();
    const msg = database().ref(`room-messages/${room_id}`);
    msg.push({
        message,
        timestamp,
        user_id: user.uid,
        displayname: user.displayName ||
        username || user.phoneNumber,
    })
    const msg = database().ref(`chat-rooms/${room_id}`).update({
        last_message_timestamp: timestamp
    });
}

Interact.viewRoomMessages = (room_id, setValue) => {
    const msg = database().ref(`room-messages/${room_id}`);
    msg.on('value', snapshot => {
        setValue(JSON.stringify(snapshot.val()));
    });
}

Interact.viewAllRooms =  (setValue) => {
    const msg = database().ref('chat-rooms');
    msg.on('value', snapshot => {
        setValue(JSON.stringify(snapshot.val()));
    });
}

Interact.viewRoomMembers = (room_id, setValue) => {
    const room_members = database().ref(`room-members/${room_id}`);
    room_members.on('value', snapshot => {
        setValue(JSON.stringify(snapshot.val()));
    });
}

Interact.addMemberToRoom = async (member, group_unique_id) => {
    const room = database().ref(`room-members/${group_unique_id}`);
    await room.push(member);
    database().ref(`users/${member.uid}/groups`).push({
        room_id: group_unique_id
    })
};

Interact.getAllUsers = (setValue) => {
    const users = database().ref(`users`);
    users.on('value', snapshot => {
        setValue(JSON.stringify(snapshot.val()));
    });
}

Interact.updateUserProfile = (user) => {
    database().ref(`users/${user.uid}`).update({
        id: user.uid,
        name: user.displayName,
        phone_number: user.phoneNumber,
        avatar: user.photoURL,
     })
}

Interact.viewUserProfile = (user, setValue) => {
   const user_detail = database().ref(`users/${user.uid}`);
   user_detail.on('value', snapshot => {
       setValue(JSON.stringify(snapshot.val()));
   })
}

export default Interact;