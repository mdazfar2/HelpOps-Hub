"use client";
import React, { useState } from 'react';
import "@stylesheets/profile.css"

const Profile = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/createaccount', {
      method: 'POST',
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        name: username,
        password: password
      })
    })
    onClose();
  };

  return (
    <div className="profile-container">
      {/* Close button */}
      <button className="close-btn" onClick={onClose}>
        &#10005; {/* Cross Unicode character */}
      </button>
      <h1>Profile</h1>
      <img src="circle.png" alt="Profile-circle" />
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* Password input */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Confirm password input */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {/* Submit button */}
        <button type="submit" className="create-account-btn">Create Account</button>
      </form>
    </div>
  );
};

export default Profile;