
import React from 'react';
import "@stylesheets/login-signup.css";

const Signup = ({ onClose }) => {
  return (
    <div className="auth-container">
      <h2>Create Your HelpOps-Hub Account</h2>
      <button className="google-btn">
        <img src="/google-icon.png" alt="Google" />
        Sign up with Google
      </button>
      <button className="github-btn">
        <img src="/github-icon.png" alt="GitHub" />
        Sign up with Github
      </button>
      <p>Or</p>
      <input type="email" placeholder="Enter your email" />
      <a href="#">Already have an account?Login</a>
      <button className="continue-btn">Continue</button>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Signup;