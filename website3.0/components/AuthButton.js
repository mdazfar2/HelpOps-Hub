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
  let {userName,setUserLinkedin,setUserGithub,setUserName,userEmail,setUserCaption,setUserDesignation,setUserEmail,userImage,setUserImage,isLogin,theme}=useContext(Context)

  let router=useRouter()
  useEffect(()=>{
    if(userName){
      showProfile(true)
    }
   },[profile])
let session=useSession()
  // useEffect(() => {
  //   if (showAuth) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  // }, [showAuth]);
  if(session.status=='unauthenticated' && !isLogin){
    setUserEmail('')
    setUserImage('')
    setUserName('')
  }
  
  async function fetchData(){
    let a=await    fetch("/api/createaccount",{
         method:"POST",
         body:JSON.stringify({
           email : session.data.user.email,
           name:session.data.user.name,
           image:session.data.user.image
         })
       })
      
   
          
       
       
      let  e=await a.json()
       setUserEmail(e.msg.email)
       setUserName(e.msg.name)
       setUserImage(e.msg.image1)
       setUserDesignation(e.msg.designation)
       setUserCaption(e.msg.caption)
       setUserGithub(e.msg.github)
       setUserLinkedin(e.msg.linkedin)

       localStorage.setItem('userEmail',e.msg.email)
       localStorage.setItem('userName',e.msg.name)
       localStorage.setItem('userImage',e.msg.image1)
       localStorage.setItem('userDesignation',e.msg.designation)
       localStorage.setItem('userCaption',e.msg.caption)
       localStorage.setItem('userGithub',e.msg.github)
       localStorage.setItem('userLinkedin',e.msg.linkedin)

       let dt=await JSON.stringify(e.msg)
       console.log(e)
       localStorage.setItem('user',dt)
       setIsLogin1(true)
   
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

        fetchData()
     
    setIsLogin1(true)
//       if(localStorage.getItem('count')!==2){
// console.log(localStorage.getItem('count'))
//         localStorage.setItem('count',1)
//       }
  
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
   {!profile && userName.length==0 &&   <button className={` ${theme?"bg-gray-100/80 text-black border-none":"text-white bg-black border-white border"}    auth-btn`} onClick={toggleAuth}>Login/Signup</button>
      }
     {/* {
 profile&& <> <div style={{width:"200px",display:"flex",alignItems:"center",gap:"20px"}}>
  <img style={{height:"70px",width:"70px",borderRadius:"50%"}} src={`${localStorage.getItem('image')}`} onClick={handleProfileShow}/><h1>{localStorage.getItem('userName')}</h1>
    </div><button onClick={handleLogout}>Logout</button></>
} */}
{
  userName.length>0 && <div className={`auth-btn ${theme?"bg-gray-100/80 text-black border-none":"text-white bg-black border-white border"}`}  onClick={()=>router.push('/profile')}>Profile</div>
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