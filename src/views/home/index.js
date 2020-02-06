import React, { useState } from 'react';
import {
  InitializeCaptcha,
  UserExist,
  SetPassword,
  VerifyPhoneNumber,
  SignUp,
  LogIn
} from '../../utils/firebase/auth';
import chatIcon from '../../assets/chat.svg';
import groupIcon from '../../assets/group.svg';
import callIcon from '../../assets/call.svg';
import {ReactComponent as ArrowIcon} from '../../assets/arrow-back.svg';
import './home.scss';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import OTPInput from "otp-input-react";
import { ClipLoader } from "react-spinners";


const Main = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [ phone, setPhone ] = useState("");
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const [ password, setPassword ] = useState('');
  
  const captcha = async() => {
    try{
      setLoading(true);
      const userExist = await UserExist(phone);
      if(userExist.status === 'success') {
        setIndex(4);
        setLoading(false);
        return;
      }
      setLoading(false);
      InitializeCaptcha('recaptcha-container').then(resp => {
        VerifyPhoneNumber(phone)
        .then(resp => {
          setIndex(2);
          setLoading(false);
        })
        .catch(err=>console.log(err))
      })
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const verifyUser = () => {
    setLoading(true);
    SignUp(OTP)
    .then(resp => {
      console.log(resp)
      if(resp.status === "fail") {
        setError("Incorrect OTP.")
      }else{
        setIndex(3)
      }
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
    })
  };

  const savePassword = ()=> {
    setLoading(true);
    SetPassword(password)
    .then(resp=>{
      setLoading(false);
      props.history.push('/chat')
    })
    .catch(err=>console.log(err))
  };

  const SignInUser = () => {
    LogIn({ phone, password })
    .then(resp => {
      if(resp.status === "fail") {
        setError("The password is incorrect");
      }else{
        props.history.push('/chat')
      }
    })
    .catch(err=>console.log(err))
  }

  const handleNextClick = (event)=> {
    if(!isValidPhoneNumber(phone)){
      setError("Invalid phone number")
      return;
    }

    if(index === 2 && OTP.length < 6){
      setError("Invalid OTP");
      return;
    }

    if(index === 0){
      setIndex(1);
      captcha();
    }else if(index === 1) {
      setIndex(2);
    }else if(index === 2) {
      verifyUser();
    }else if(index === 3) {
      savePassword();
    }else if(index === 4){
      SignInUser();
    }
  };

  return (
    <div className="App">
      <header>
        <h1 className="text-5xl w-2/5 leading-none text-center font-extrabold text-white">Let’s Focus More on Conversations</h1>
        <p className="text-white mt-6 w-2/5 text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text dummy text of the printing and typesetting industry  industry's standard.</p>
        <div className="flex flex-col justify-center capsule bg-white">
          {
            !isLoading && (
              <p className="text-xs self-start font-bold">
                {
                  index === 0 ? "ENTER PHONE NUMBER" : index === 2 ? "ENTER OTP" : (index === 3 || index === 4) ? "ENTER PASSWORD" : ""
                }
              </p>
            )
          }
          { !isLoading ? (
            <div className={`flex w-full items-center ${ error === "" ? 'mb-2' : 'mt-0'}`}>
              {
                index === 1 ?  (
                  <div id='recaptcha-container' className="w-5/6 mr-6"/>
                ) :
                index === 2  ? (
                  <OTPInput
                    value={OTP}
                    onChange={(value)=>{
                      setError("");
                      setOTP(value)
                    }}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    inputClassName="ml-0"
                    className="w-5/6 mr-4"
                  />
                ) :
                (index === 3 || index === 4)  ? (
                  <input
                    type="text"
                    value={password}
                    onChange={(e)=>{
                      setError("");
                      setPassword(e.target.value)
                    }}
                    className="w-5/6 mr-6"
                  />
                ) :
                (
                  <PhoneInput
                    placeholder="Phone number"
                    value={phone}
                    onChange={(value)=>{
                      setPhone(value);
                      setError("");
                    }}
                    defaultCountry="NG"
                    className="w-5/6 mr-6"
                  />
                )
              }

              <button className="flex justify-center bg-secondary rounded-full" onClick={handleNextClick}>
                <ArrowIcon/>
              </button>
            </div>
          ): (
              <ClipLoader
                size={50}
                color={"#FFC46A"}
                loading={isLoading}
              />
            )
          }
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </header>
      <div id="middle">
        <div>
          <img src={chatIcon}/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text dummy</p>
        </div>

        <div>
          <img src={callIcon}/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text dummy</p>
        </div>

        <div>
          <img src={groupIcon}/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text dummy</p>
        </div>

      </div>
      <footer>
        <p>Terms & Conditions</p>
        <p>Built with ️❤ by Kifaru Grupa.io team </p>
        <p>kifaru.github.io</p>

      </footer>
    </div>
  );
}

export default Main;

