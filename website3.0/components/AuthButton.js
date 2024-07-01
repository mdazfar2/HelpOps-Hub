"use client";

import React, { useState, useEffect } from 'react';
import { Login, Signup } from './Login-Signup';
import { useSession } from 'next-auth/react';
import Profile from '@pages/Profile';
import Popup from './Popup';

const AuthButton = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

let session=useSession()
  useEffect(() => {
    if (showAuth) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAuth]);
 
  useEffect(()=>{

    if(session.status=='authenticated'){
      localStorage.setItem('email',session.data.user.email)
      localStorage.setItem('name',session.data.user.name)
       fetch("/api/createaccount",{
        method:"POST",
        body:JSON.stringify({
          email : session.data.user.email,
          name:session.data.user.name
        })
      })
    }
  },[session.status])
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
        <div className="auth-overlay" onClick={closeAuth}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
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