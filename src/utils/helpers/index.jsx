
const getUserRooms = (currentUser, allRooms) => {
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

export {
    getUserRooms
};