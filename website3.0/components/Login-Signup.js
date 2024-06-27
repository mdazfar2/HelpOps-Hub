"use client";

import React,{useState} from 'react';
import "@stylesheets/login-signup.css";
import OTP from '@pages/OTP';

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
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (email) {
      setShowOTP(true);
      // Here you would typically trigger sending an OTP to the provided email
    } else {
      alert('Please enter your email');
    }
  };

  const handleOTPContinue = (otp) => {
    // Handle OTP verification here
    console.log('OTP entered:', otp);
    // If OTP is valid, proceed with signup
    // If not, show an error message
  };

  if (showOTP) {
    return <OTP onClose={onClose} onContinue={handleOTPContinue} />;
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

