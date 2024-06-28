"use client";

import React,{useState} from 'react';
import "@stylesheets/login-signup.css";
import OTP from '@pages/OTP';
import Profile from '@pages/Profile';

export const Login = ({ onClose, onSignupClick }) => {
  return (
    <div className="login-auth-container">
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
      <input type="text" placeholder="Email or username" />
      <input type="password" placeholder="Password" /><br/>
      <a href="#" onClick={onSignupClick}>New here? Sign up now</a><br/>
      <button className="login-btn">Login</button>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};

export const Signup = ({ onClose, onLoginClick }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState('');

  const handleContinue =async () => {
    if (email) {
      await fetch("/api/signup",{
        method:"POST",
        body:JSON.stringify({
          email:email,
        isSend:true
        })
      })
      localStorage.setItem('email',email)
      setShowOTP(true);
      // Here you would typically trigger sending an OTP to the provided email
    } else {
      alert('Please enter your email');
    }
  };

  const handleOTPSubmit =async (otp) => {
    let ema=localStorage.getItem('email')
    let data=await fetch('/api/signup', {
      method:"POST",
      body:JSON.stringify({email:ema,isSend:false})
    })
    data=await data.json()
    // Here you would typically verify the OTP
   if(data.otp==otp){

     setShowProfile(true);
   }
   else{
    console.log(false)
   }
    // For now, we'll just move to the Profile component
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
    return <OTP onClose={onClose} onOTPSubmit={handleOTPSubmit} onBack={handleBackToSignup} />;
  }

  return (
    <div className="signup-auth-container">
      <h1>Create Your HelpOps-Hub Account</h1>
      <h5>Join the HelpOps-Hub community by registering for a new account and unlock the world of DevOps resources.</h5>
      <button className="google-btn">
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
      <button className="continue-btn" onClick={handleContinue}>Continue</button>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};