"use client"
import React, { useState } from 'react';
import "@stylesheets/login-signup.css";
import OTP from '@pages/OTP';
import Profile from '@pages/Profile';

// Login component
export const Login = ({ onClose, onSignupClick }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
      <div className="password-input-container">
        <div className="password-wrapper">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            <img
              src={passwordVisible ? "eye-open.png" : "eye-close.png"}
              alt="Toggle password visibility"
            />
          </span>
        </div>
      </div>
      <div>
        <a href="#" onClick={onSignupClick}>Forgot password</a><br/>
        <a href="#" onClick={onSignupClick}>New here? Sign up now</a><br/>
        <button className="login-btn">Login</button>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

// Signup component
export const Signup = ({ onClose, onLoginClick }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState('');

  // Function to handle the continue button click
  const handleContinue = () => {
    if (email) {
      setShowOTP(true);
      // Here you would typically trigger sending an OTP to the provided email
    } else {
      alert('Please enter your email');
    }
  };

  // Function to handle OTP submission
  const handleOTPSubmit = (otp) => {
    // Here you would typically verify the OTP
    console.log('OTP entered:', otp);
    // For now, we'll just move to the Profile component
    setShowProfile(true);
  };

  // Function to handle profile submission
  const handleProfileSubmit = (profileData) => {
    // Handle profile submission
    console.log('Profile data:', profileData);
    onClose(); // Close the signup process
  };

  // Function to go back to the signup form from the OTP screen
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
