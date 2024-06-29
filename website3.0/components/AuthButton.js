"use client";

import React, { useState, useEffect } from 'react';
import { Login, Signup } from './Login-Signup';
import { useSession } from 'next-auth/react';
import Profile from '@pages/Profile';

const AuthButton = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isshow,setisshow]=useState(false)
let session=useSession()
  useEffect(() => {
    if (showAuth) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAuth]);
  console.log(session)
  useEffect(()=>{

    if(session.status=='authenticated'){
      setisshow(true)
      localStorage.setItem('email',session.data.user.email)
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
    setisshow(false)
  };

  return (
    <>
      <button className="auth-btn" onClick={toggleAuth}>Login/Signup</button>
     {isshow &&
      <div className="auth-overlay" onClick={closeAuth}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <Profile onClose={closeAuth}/>

          </div>
        </div>}
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