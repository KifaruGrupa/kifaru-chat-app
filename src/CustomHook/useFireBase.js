import React, { useEffect, useState } from 'react';

const useFireBase = (method, param = null, type = 'object') => {
	const [data, setData] = useState(null);
  const [parsed, setParsed] = useState(null);
  
	useEffect(() => {
		param ?	method(param, setData) :	method(setData);
		
		const res = data && data.trim() !== 'null' && JSON.parse(data);
		
		
		if (res && !param) {	
			setParsed(Object.values(res));
		}	
		if(data && param && type === 'object')
		{
			setParsed(res);
		}
		if(data && param && type === 'array')
		{
			setParsed(Object.values(res));
		}
  }, [data]);
  
	return [parsed];
};

export default useFireBase;
