import React, { useState} from 'react';
import SearchIcon from '../../svg/SearchIcon';
import ArrowBack from '../../svg/ArrowBack';

const Search = ({placeholder}) => {
    const [focused, setFocused] = useState(false);
	return (
		<div className='search-wraper flex justify-center items-center w-100 min-h-20 bg-green-1200'>
			<div className='search w-11/12 h-12 bg-white rounded-full flex'>
				<div className='icon w-1/12 flex items-center justify-end'>
					{focused ? <ArrowBack /> : <SearchIcon />}
				</div>
				<input
                    onFocus={() => !focused && setFocused(true)}
                    onBlur ={() => focused && setFocused(false)}
					className='h-12 border-none flex-grow rounded-full pl-2 text-xs'
					placeholder={placeholder}
					type='text'
				/>
			</div>
		</div>
	);
};

export default Search;
