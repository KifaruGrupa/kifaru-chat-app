import React, { useState, createContext, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = props => {
    const [thisUser, setThisUser] = useState(null)

    return (
        <UserContext.Provider
            value={[thisUser, setThisUser]}
        >
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };