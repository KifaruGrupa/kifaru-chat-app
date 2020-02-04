import React from 'react';
import { currentUser, } from '../../utils/firebase/auth';
import Interact from '../../utils/firebase/chat';

const addRoom = Interact.addRoom;
const sendMessage = Interact.sendMessage;
const viewAllRooms = Interact.viewAllRooms;

const Chat = () => {
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [user] = React.useState(currentUser());
    const [rooms, setRooms] = React.useState();
    React.useEffect(() => {
        console.log('user', user);

        viewAllRooms(setRooms);
        console.log('rooms', rooms)
    }, [rooms])

    const onChange = (e) => {
        setName(e.target.value);
    }

    const  createRoom = async () => {
       const room_key = await addRoom(name, user);
       console.log('room_key', room_key);
    }

    const sendMsg = () => {
        if(!message) return alert('messagae cannot be empty');
        sendMessage('K69H3H1T', message);
    }

    const onChat = (e) => {
        setMessage(e.target.value)
    }
    return (
        <>
        <div>
            <label>Room name</label>
            <p><input type="text" onChange={onChange}></input></p>
            <button onClick={createRoom}>add room</button>
        </div>
        <div>
            <label>massages</label>
            <p><input type="text" onChange={onChat}></input></p>
            <button onClick={sendMsg}>send</button>
        </div>
        </>
    )
};

export default Chat;