"use client";

import React, { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import Profile from '@pages/Profile';
import Popup from './Popup';
import Login from './LoginSignup/Login';
import Signup from './LoginSignup/Signup';

const AuthButton = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [profile,showProfile]=useState(false)
  useEffect(()=>{
    if(localStorage.getItem('userName')){
      showProfile(true)
    }
   },[profile])
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
      // fetch("/api/login",{
      //   method:"POST",
      //   body:JSON.stringify({
      //     email : session.data.user.email,
      //     name:session.data.user.name
      //   })
      // })
      localStorage.setItem('userEmail',session.data.user.email)
      localStorage.setItem('userName',session.data.user.name)
      localStorage.setItem('image',session.data.user.image)
//       if(localStorage.getItem('count')!==2){
// console.log(localStorage.getItem('count'))
//         localStorage.setItem('count',1)
//       }
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
   {!profile &&   <button className="auth-btn" onClick={toggleAuth}>Login/Signup</button>
      }
     {
  profile&& <div style={{width:"200px",display:"flex",alignItems:"center",gap:"20px"}}>
<img style={{height:"70px",width:"70px",borderRadius:"50%"}} src={`${localStorage.getItem('image')}`}/><h1>{localStorage.getItem('userName')}</h1>
  </div>
}
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