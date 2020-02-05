import React from 'react';
import ArrowBack from '../../svg/ArrowBack';

const Navbar = ({setShowBar}) => {
    return (
        <div className= "w-100 h-20 flex pl-6 items-center bg-gray-10" >
           <div className="cursor-pointer" onClick={() => setShowBar(true)}><ArrowBack className="md:hidden" /></div> 
        </div>
    )
}

export default Navbar;
