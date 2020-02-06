import React, { useEffect, useState } from 'react';

const useFireBase = method => {
	const [data, setData] = useState(null);
  const [parsed, setParsed] = useState(null);
  
	useEffect(() => {
		method(setData);
		if (data) {
			setParsed(Object.values(JSON.parse(data)));
		}
  }, [data]);
  
	return [parsed];
};

export default useFireBase;
