"use client";

import React, { useState, useEffect, useContext } from 'react';

import Profile from '@pages/Profile';
import Popup from './Popup';
import Login from './LoginSignup/Login';
import Signup from './LoginSignup/Signup';
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';
import { Context } from '@context/store';
import { useSession } from 'next-auth/react';
const AuthButton = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin1, setIsLogin1] = useState(true);
  const [profile,showProfile]=useState(false)
  let [showProfile1,setShowProfile1]=useState(false)
  let {userName,setUserName,userEmail,setUserEmail,userImage,setUserImage,isLogin}=useContext(Context)

  let router=useRouter()
  useEffect(()=>{
    if(userName){
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
  if(session.status=='unauthenticated' && !isLogin){
    setUserEmail('')
    setUserImage('')
    setUserName('')
  }
  useEffect(()=>{

    if(session.status=='authenticated'){
      // fetch("/api/login",{
      //   method:"POST",
      //   body:JSON.stringify({
      //     email : session.data.user.email,
      //     name:session.data.user.name
      //   })
      // })
    setUserEmail(session.data.user.email)
    setUserName(session.data.user.name)
    setUserImage(session.data.user.image)
    localStorage.setItem('userEmail',session.data.user.email)
    localStorage.setItem('userName',session.data.user.name)
    localStorage.setItem('userImage',session.data.user.image)
    setIsLogin1(true)
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
    setIsLogin1(false);
  };
const onBack=()=>{
  setIsLogin1(true)

}
  const switchToLogin = () => {
    setIsLogin1(true);
  };
  async function handleLogout(){
    if(session.status=="authenticated"){
      setUserEmail('')
      setUserImage('')
      setUserName('')
      router.push('https://www.helpopshub.com/api/auth/signout?csrf=true')
  
    }
    setUserEmail('')
    setUserImage('')
    setUserName('')
        window.location.reload()
    }
  const closeAuth = () => {
    setShowAuth(false);
    setIsLogin1(true);
  };
  function handleProfileShow(){
    setShowProfile1(true)
  }
  function closeProfile(){
    setShowProfile1(false)
  }
  useEffect(()=>{
console.log(userName)
  },[userName])
  return (
    <>
   {!profile && userName.length==0 &&   <button className="auth-btn" onClick={toggleAuth}>Login/Signup</button>
      }
     {/* {
 profile&& <> <div style={{width:"200px",display:"flex",alignItems:"center",gap:"20px"}}>
  <img style={{height:"70px",width:"70px",borderRadius:"50%"}} src={`${localStorage.getItem('image')}`} onClick={handleProfileShow}/><h1>{localStorage.getItem('userName')}</h1>
    </div><button onClick={handleLogout}>Logout</button></>
} */}
{
  userName.length>0 && <div className="auth-btn"  onClick={()=>router.push('/profile')}>Profile</div>
}
{
  showProfile1  && 
  <div className="auth-overlay" >
          <div className="auth-modal"  onClick={(e) => e.stopPropagation()}>
  <UserProfile onClose={closeProfile} onLogout={handleLogout}/>
          </div>
        </div>
}
      {showAuth && !userName && (
        <div className="auth-overlay" onClick={closeAuth}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            {isLogin1 ? (
              <Login onClose={closeAuth} onSignupClick={switchToSignup} />
            ) : (
              <Signup onClose={closeAuth} onBack={onBack} onLoginClick={switchToLogin} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;