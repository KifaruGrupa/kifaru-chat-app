import React from 'react';
import { InitializeCaptcha, UserExist, SetPassword, SignOut, VerifyPhoneNumber, SignUp } from '../../utils/firebase/auth';

const Signup = () => {
  const [ phone, getPhone ] = React.useState('');
  const [ verification, getVerification ] = React.useState('');
  const [ password, getPassword ] = React.useState('');
  const [ verify, showVerify ] = React.useState(false);
  const [ verified, getVerified ] = React.useState(false);

  const captcha = async ()=>{
    try{
      const userExist = await UserExist(phone);
      if(userExist.status === 'success')
      return alert(userExist.message)
      InitializeCaptcha('recaptcha-container').then(resp => {
        VerifyPhoneNumber(phone)
        .then(resp=>{
          console.log(resp)
          showVerify(true)
        })
        .catch(err=>console.log(err))
      })
    } catch (e) {
      console.log(e);
    }
  }

  const verifyUser = () => {
    SignUp(verification)
    .then(resp=>{
      console.log(resp)
      getVerified(true);
    })
    .catch(err=>console.log(err))
  }

  const SignOutUser = () => {
    SignOut()
    .then(resp=>console.log('user signed out'))
    .catch(err=>console.log('user signed error'))
  }

  const SavePassword = () => {
    SetPassword(password)
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

        </div >
          <button onClick={captcha} className='btn bg-teal-400 border-sm'>
            {!verify ? 'Send OTP' : 'Resend OTP'}
          </button>
          <div className={`mb-4 ${verify ? 'inline-block': 'hidden'}`}>
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
          <button onClick={verifyUser}  className={`btn bg-teal-400 border-sm ${verification ? 'inline-block': 'hidden'}`}>
            Sign up
          </button>
          <div className={`mb-4 ${verified ? 'inline-block': 'hidden'}`}>
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
          <button onClick={SavePassword} className={`btn bg-teal-400 border-sm ${verified ? 'inline-block': 'hidden'}`}>
            Save password
          </button>
          <button onClick={SignOutUser} className={`btn bg-teal-400 border-sm ${verified ? 'inline-block': 'hidden'}`}>
            Sign out
          </button>
        </div>
    </div>
  );
}

export default Signup;
