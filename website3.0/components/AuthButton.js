"use client";

import React, { useState } from 'react';
import { Login, Signup } from './Login-Signup';

const AuthButton = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setShowAuth(!showAuth);
  };

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const closeAuth = () => {
    setShowAuth(false);
    setIsLogin(true);
  };

  return (
    <>
      <button className="auth-btn" onClick={toggleAuth}>Login/Signup</button>
      {showAuth && (
        <div className="auth-overlay">
          <div className="auth-modal">
            {isLogin ? (
              <Login onClose={closeAuth} onSignupClick={switchToSignup} />
            ) : (
              <Signup onClose={closeAuth} onLoginClick={switchToLogin} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;