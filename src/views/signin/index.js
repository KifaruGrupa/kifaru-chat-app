import React from 'react';
import { LogIn } from '../../utils/firebase/auth';

const SignIn = () => {
  const [ phone, getPhone ] = React.useState('');
  const [ password, getPassword ] = React.useState('');

  const SignInUser = () => {
    LogIn({ phone, password })
    .then(resp=>console.log(resp))
    .catch(err=>console.log(err))
  }

  return (
    <div className="App">
      <div className="bg-white w-1/4 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            phone Number
          </label>
          <input
            onChange={(e)=>getPhone(e.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="phoneNumber"
            type="text"
            placeholder="phone number"
          />
        </div>
        <div id='recaptcha-container' className='m-5'>

        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="verification"
          >
            password
          </label>
          <input
            onChange={(e)=>getPassword(e.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="password"
            type="text"
            placeholder="password"
          />
        </div>
        <button onClick={SignInUser} className='btn bg-teal-400 border-sm'>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
