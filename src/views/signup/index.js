import React from 'react';
import { initializeCaptcha, VerifyPhoneNumber, SignUp } from '../../firebase/auth';

const Signup = () => {
  const [ phone, getPhone ] = React.useState('');
  const [ verification, getVerification ] = React.useState('');

  React.useEffect(()=>{
    initializeCaptcha('recaptcha-container')
  }, [])

  const captcha = ()=>{
    VerifyPhoneNumber(phone)
  }

  const verifyUser = () => {
    SignUp(verification)
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
        <button onClick={captcha} className='btn bg-teal-400 border-sm'>
          Verify
        </button>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="verification"
          >
            Code
          </label>
          <input
            onChange={(e)=>getVerification(e.currentTarget.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="verifyphone"
            type="text"
            placeholder="verification number"
          />
        </div>
        <button onClick={verifyUser} className='btn bg-teal-400 border-sm'>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Signup;
