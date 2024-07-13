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
  const [oneTime,setOneTime]=useState(false)
  let [showProfile1,setShowProfile1]=useState(false)
  let {setIsAdminShow,finalUser,userName,setFinalUser,setIsLogin,setUserGithub,setUserName,setUserEmail,userImage,setUserImage,isLogin,theme}=useContext(Context)

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
  async function fetchData1(){
    setIsLogin(true)
    console.log('inside fetdshdjsd')
    let session=await JSON.parse(localStorage.getItem('finalUser'))
    let a=await    fetch("/api/createaccount",{
         method:"POST",
         body:JSON.stringify({
           email : session.email
         })
       })
      
      let  e=await a.json()
      setFinalUser(e.msg)
       let dt=await JSON.stringify(e.msg)
       localStorage.setItem('finalUser',dt)
       setIsLogin(true)
       
     }
  useEffect(()=>{
    if(localStorage.getItem('loggedin')){
      fetchData1()
    }
  },[])
  async function fetchData(){
    let a=await    fetch("/api/createaccount",{
         method:"POST",
         body:JSON.stringify({
           email : session.data.user.email,
           name:session.data.user.name,
           image:session.data.user.image
         })
       })
        a=await    fetch("/api/createaccount",{
        method:"POST",
        body:JSON.stringify({
          email : session.data.user.email,
          name:session.data.user.name,
          image:session.data.user.image
        })
      })
      let  e=await a.json()

      if(e.msg.email==process.env.NEXT_PUBLIC_ADMIN_URL){
        setIsAdminShow(true)
      }
      setFinalUser(e.msg)
       let dt=await JSON.stringify(e.msg)
       localStorage.setItem('finalUser',dt)
       setIsLogin(true)
       
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
      if(!oneTime){

        setOneTime(true)
                fetchData()
             
            setIsLogin1(true)
      }
//       if(localStorage.getItem('count')!==2){
// console.log(localStorage.getItem('count'))
//         localStorage.setItem('count',1)
//       }
  
    }
  },[session.status,oneTime])
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
   {!isLogin&& userName.length==0 &&   <button className={` ${theme?"bg-gray-100/80 text-black border-none":"text-white bg-black border-white border"}    auth-btn`} onClick={toggleAuth}>Login/Signup</button>
      }
     {/* {
 profile&& <> <div style={{width:"200px",display:"flex",alignItems:"center",gap:"20px"}}>
  <img style={{height:"70px",width:"70px",borderRadius:"50%"}} src={`${localStorage.getItem('image')}`} onClick={handleProfileShow}/><h1>{localStorage.getItem('userName')}</h1>
    </div><button onClick={handleLogout}>Logout</button></>
} */}
{
  isLogin && <div className={`auth-btn ${theme?"bg-gray-100/80 text-black border-none":"text-white bg-black border-white border"}`}  onClick={()=>router.push(`/profile?id=${finalUser._id}`)}>Profile</div>
}
{
  showProfile1 && isLogin  && 
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