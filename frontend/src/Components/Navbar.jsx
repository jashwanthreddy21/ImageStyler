// /* eslint-disable no-unused-vars */
// import React from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <div className=' sticky top-0 z-50 drop-shadow-lg shadow-2xl flex justify-around items-center w-auto h-20 bg-gradient-to-r from-black from-10% via-black-200 via-30% to-black-100 text-slate-800'>
      
//       <div className='flex justify-center items-center'>
        
//         <h2 className='font-bold cursor-pointer text-red-500 text-2xl'>NeuroPallete</h2>
//       </div>
//       <ul className='flex justify-center items-center gap-10'>
//         <li  className='hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white '>Home</li>
//         <li  className='hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white'>About us</li>
//         <li  className='hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white'>Contact us</li>
//         <li>
//         <Link to='/'  className='hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white'>Check Our Models</Link>
//         </li>
        
//       </ul>
      
//     </div>
//   )
// }

// export default Navbar

/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 drop-shadow-lg shadow-2xl flex justify-around items-center w-auto h-20 bg-gradient-to-r from-black from-10% via-black-200 via-30% to-black-100 text-slate-800">
      <div className="flex justify-center items-center">
        <h2 className="font-bold cursor-pointer text-red-500 text-2xl">NeuroPalette</h2>
      </div>
      <ul className="flex justify-center items-center gap-10">
      <Link to='/'  className='hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white'>Home</Link>
        <li className="hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white">
          About us
        </li>
        <li className="hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white">
          Contact us
        </li>
        <li>
          <Link
            to="/models"
            className="hover:border-b-2 border-slate-600 cursor-pointer font-bold text-white"
          >
            Check Our Models
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

