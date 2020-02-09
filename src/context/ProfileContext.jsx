import React, { useState, createContext, useEffect } from 'react';

const ProfileContext = createContext();

const ProfileProvider = props => {
  const [raw, setThisProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
	const [thisProfile, parseProfile] = useState(null);

	useEffect(() => {
		raw && parseProfile(JSON.parse(raw));
  }, [raw]);
  
	return (
		<ProfileContext.Provider value={{thisProfile, setThisProfile, showProfile, setShowProfile}}>
			{props.children}
		</ProfileContext.Provider>
	);
};
export { ProfileContext, ProfileProvider };
