import React, { useState } from 'react';
import {
  InitializeCaptcha,
  UserExist,
  SetPassword,
  SignOut,
  VerifyPhoneNumber,
  SignUp
} from '../../utils/firebase/auth';
import chatIcon from '../../assets/chat.svg';
import groupIcon from '../../assets/group.svg';
import callIcon from '../../assets/call.svg';
import {ReactComponent as ArrowIcon} from '../../assets/arrow-back.svg';
import './home.scss';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import OTPInput, { ResendOTP } from "otp-input-react";
import { ClipLoader } from "react-spinners";



const Main = () => {
  const [isLoading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [ phone, setPhone ] = useState('');
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const [ verification, getVerification ] = useState('');
  const [ password, getPassword ] = useState('');
  const [ verify, showVerify ] = useState(false);
  const [ verified, getVerified ] = useState(false);

  const captcha = async () => {
    try{
      setLoading(true);
      const userExist = await UserExist(phone);
      if(userExist.status === 'success')
      return alert(userExist.message)
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

      }
      getVerified(true);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
    })
  }

  const SavePassword = () => {
    SetPassword(password)
    .then(resp=>console.log(resp))
    .catch(err=>console.log(err))
  }

  return (
    <div className="App">
      <header>
        <h1 className="text-5xl w-2/5 leading-none text-center font-extrabold text-white">Let’s Focus More on Conversations</h1>
        <p className="text-white mt-6 w-2/5 text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text dummy text of the printing and typesetting industry  industry's standard.</p>
        <div className="flex flex-col justify-center capsule bg-white">
          { !isLoading ? (
            <div className={`flex w-full items-center ${ error != "" ? 'mt-6' : 'mt-0'}`}>
              {
                index === 1 ?  (
                  <div id='recaptcha-container' className="w-5/6 mr-6"/>
                ) :
                index == 2  ? (
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
                (
                  <PhoneInput
                    placeholder="Enter phone number"
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

              <button disabled={index == 1 && !verify} className="flex justify-center bg-secondary rounded-full" onClick={() => {
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
                }
              }}>
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
          <img src={chatIcon}/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text dummy</p>
        </div>

        <div>
          <img src={chatIcon}/>
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

