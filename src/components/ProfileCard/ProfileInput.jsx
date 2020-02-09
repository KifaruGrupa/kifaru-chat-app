import React, { useState, useEffect } from 'react';

const ProfileInput = ({ name, value, regEx, errorMsg, disabled, className, ...rest }) => {
	const [error, setError] = useState(false);

	useEffect(() => {
		if (typeof value == 'string') {
			setError(!value.length || Boolean(regEx && !regEx.test(value)));
		}
	}, [regEx, value]);

	return (
		<div>
			<input name={name} autoComplete="off" value={value} disabled={disabled} className={`${className} ${!disabled ? 'input-edit' : ''}`} {...rest} />
			{!disabled && error && (
				<p className='text-red-700 font-medium text-sm text-center my-2'>
					{value.length
						? errorMsg || `Invalid Format for ${name}`
						: `${name} is required`}
				</p>
			)}
		</div>
	);
};

export default ProfileInput;
