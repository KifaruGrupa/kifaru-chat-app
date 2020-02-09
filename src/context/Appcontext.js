import React, { useState, createContext } from 'react';

const DataContext = createContext();

const DataProvider = props => {
    const [thisGroupData, setthisGroupData] = useState(null)

    return (
        <DataContext.Provider
            value={[thisGroupData, setthisGroupData]}
        >
            {props.children}
        </DataContext.Provider>
    );
}
export { DataContext, DataProvider };