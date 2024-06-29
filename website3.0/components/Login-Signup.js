"use client";

import React,{useEffect, useState} from 'react';
import "@stylesheets/login-signup.css";
import OTP from '@pages/OTP';
import Profile from '@pages/Profile';
import Popup from "@components/Popup";
import Popup1 from './Popup1';
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { signIn,useSession } from 'next-auth/react';
export const Login = ({ onClose, onSignupClick }) => {
  const [showPassword,setShowPassword]=useState(false)
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  let [error,setError]=useState(false)
  let [valid,setValid]=useState(false)

  function toggle(){
    if(showPassword){
      setShowPassword(false)
    }else{
      setShowPassword(true)
    }
  }
async  function handleLogin(){
    console.log('sdsdsdsdd')
    console.log(email,password)
    let res=await fetch("/api/login",{
      method:"POST",
      body:JSON.stringify({
        email:email,
        password:password
      })
    })

    let data=await res.json()
    console.log(data)
    if(!data.success){
      console.log('ssdsdsdsd')
      setError(data.msg)
      setTimeout(() => {
        setError('')
}, 2000);
      return
    }
   localStorage.setItem('userName',data.user[0].name)
   localStorage.setItem('userEmail',data.user[0].email)
   setError(`${data.user[0].name} Welcome !!`)
   
   setTimeout(() => {
     setError("")
     onClose()
}, 2000);
  }
  return (
    <div className="login-auth-container">
      {error && <Popup msg={error} error={`${error=="User Doesn't Valid"||error=="Incorrect Password"?"red1":"green1"}`}/>}

      <h1>Login to HelpOps-Hub</h1>
      <button className="google-btn">
      <img src="google.png" alt="Google" />
        Sign in with Google
      </button>
      <button className="github-btn">
      <img src="github.png" alt="GitHub" />
        Sign in with Github
      </button>
      <p>Or</p><br/>
      <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
      <input      onChange={(e)=>setPassword(e.target.value)}       type={`${showPassword?"text":"password"}`}
 placeholder="Password" />         {showPassword ? <FaEye className='eye1' onClick={toggle}/>:<FaEyeSlash className='eye1' onClick={toggle}/>}
<br/>
      <a href="#" onClick={onSignupClick}>New here? Sign up now</a><br/>
      <button className="login-btn" onClick={handleLogin}>Login</button>
      <button className="close-btn" onClick={onClose}>
       &#10005; {/* Cross Unicode character */}
      </button>
    </div>
  );
};

export const Signup = ({ onClose, onLoginClick }) => {
  const session=useSession()
  const [showOTP, setShowOTP] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");  // State to hold error messages
  const [errorOtp, setErrorOtp] = useState(false);  // State to hold error messages
let [loading,setLoading]=useState(false)
  const [popup,setPopup]=useState(false)
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  const handleContinue =async () => {
    setLoading(true)

    if(validateEmail(email)){
     let data= await fetch("/api/signup",{
        method:"POST",
        body:JSON.stringify({
          email:email,
        isSend:true
        })
        
      })
      data=await data.json()
      console.log(data)
      //for checking any types of error
      if(!data.success){
        setError('User Already Exist')
        setPopup(true)
        setTimeout(() => {
          setError('')
          setLoading(false)
          setPopup(false)
        }, 2000);
        return
      }
      //for storing the user 
      localStorage.setItem('email',email)
      setShowOTP(true);
      // Here you would typically trigger sending an OTP to the provided email
      setLoading(false)
    }else{
      //for giving error
      setError('Please Enter a valid Email address')
      setPopup(true)
      setTimeout(() => {
        setError('')
        setPopup(false)
        setLoading(false)

        setEmail('')
}, 2000);
    }
    
  };
  const handleOTPSubmit =async (otp) => {
    try {
      let email = localStorage.getItem('email');
      let response = await fetch('/api/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, isSend: false })
      });

      let data = await response.json();
    
      // Here you would typically verify the OTP
      if (data.otp == otp) {
        setShowProfile(true);
      } else {
        setErrorOtp(true);
        setPopup(true)
        setTimeout(() => {
          setErrorOtp(false);
          setLoading(false)
        }, 2000);
      }
    } catch (error) {
      setErrorOtp('An error occurred');
      setTimeout(() => {
        setErrorOtp('');
      }, 2000);
    }
  };

  const handleProfileSubmit = (profileData) => {
    // Handle profile submission
    console.log('Profile data:', profileData);
    onClose(); // Close the signup process
  };

  const handleBackToSignup = () => {
    setShowOTP(false);
  };

  if (showProfile) {
    return <Profile onSubmit={handleProfileSubmit} onClose={onClose} />;
  }

  if (showOTP) {
    return <> <OTP onClose={onClose} isError={errorOtp} setError={setError} onOTPSubmit={handleOTPSubmit} onBack={handleBackToSignup} />;
        
          </> 
  }
console.log(session)
  return (
    <div className="signup-auth-container">
      {popup&& <Popup msg={error} error={`${error=='Subscribed Successfully'?"green1":"red1"}`} />}
      {errorOtp&& <Popup1 msg={errorOtp} error={`${errorOtp=='Subscribed Successfully'?"green1":"red1"}`} />}

      <h1>Create Your HelpOps-Hub Account</h1>
      <h5>Join the HelpOps-Hub community by registering for a new account and unlock the world of DevOps resources.</h5>
      <button className="google-btn" onClick={()=>signIn('google')}>
        <img src="/google.png" alt="Google" />
        Sign up with Google
      </button>
      <button className="github-btn">
        <img src="/github.png" alt="GitHub" />
        Sign up with Github
      </button>
      <p>Or</p><br/>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>
      <a href="#" onClick={onLoginClick}>Already have an account? Login</a><br/>

      <button className="continue-btn" onClick={handleContinue}>Continue &nbsp;{loading && <div className="loader3">
  <div className="circle">
    <div className="dot"></div>
    <div className="outline"></div>
  </div>
 
</div>}</button>
     

    </div>
  );
};