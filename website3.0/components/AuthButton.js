"use client";

import React, { useState, useEffect, useContext } from 'react';

import Profile from '@pages/Profile';
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
  let [usernameValue,setusernameValue]=useState('')
  const [oneTime,setOneTime]=useState('')
  let [usernameModal,setUsernameModal]=useState(false)
  const [currentModal, setCurrentModal] = useState('login');
  let [showProfile1,setShowProfile1]=useState(false)
  let {setIsAdminShow,finalUser,userName,setFinalUser,setIsLogin,setUserGithub,setUserName,setUserEmail,userImage,setUserImage,isLogin,theme,setIsPopup,setMsg}=useContext(Context)

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
      if(!e.msg.username){
        localStorage.setItem("userId1",e.msg._id)
        setUsernameModal(true)
        return  
      }
      if(e.msg? e.msg.email==process.env.NEXT_PUBLIC_ADMIN_URL:""){
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
    setCurrentModal('login');
  };

  const switchToSignup = () => {
    setIsLogin1(false);
    setCurrentModal('signup');
  };
const onBack=()=>{
  setIsLogin1(true);
  setCurrentModal('login');

}
  const switchToLogin = () => {
    setIsLogin1(true);
    setCurrentModal('login');
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
    if (['login', 'signup'].includes(currentModal)) {
      setShowAuth(false);
      setIsLogin1(true);
      setCurrentModal('login');
    }
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

  const handleOTPStart = () => {
    setCurrentModal('otp');
  };

  const handleProfileStart = () => {
    setCurrentModal('profile');
  };
async function getUser(name){
  let user=await fetch("/api/getuser",{
    method:"POST",
    body:JSON.stringify({
      username:name
    })
  })
  let  e=await user.json()
  if(!e.msg.username){
    localStorage.setItem("userId1",e.msg._id)
    setUsernameModal(true)
    return  
  }
  if(e.msg? e.msg.email==process.env.NEXT_PUBLIC_ADMIN_URL:""){
    setIsAdminShow(true)
  }
  setFinalUser(e.msg)
   let dt=await JSON.stringify(e.msg)
   localStorage.setItem('finalUser',dt)
   setIsLogin(true)
   setUsernameModal(false)
}
  const handleProfileComplete = () => {
    setShowAuth(false);
    setCurrentModal('login');
  };
  async function handleCheckUsername(){
  let canCreate=await fetch('/api/checkusername',{
    method:"POST",
    body:JSON.stringify({
      username:usernameValue
    })
  })
  canCreate=await canCreate.json()
  if(!canCreate.success){
      setIsPopup(true)
      setMsg("This Username is Not Available")
      return
    }
     canCreate=await fetch('/api/checkusername',{
      method:"PUT",
      body:JSON.stringify({
        username:usernameValue,
        id:localStorage.getItem('userId1')
      })
    })
    localStorage.removeItem('userId1')
    getUser(usernameValue)
    return
}
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
  isLogin && <div className={`auth-btn ${theme?"bg-gray-100/80 text-black border-none":"text-white bg-black border-white border"}`}  onClick={()=>router.push(`/profile?id=${finalUser.username||finalUser._id}`)}>Profile</div>
}
{
  showProfile1 && isLogin  && 
  <div className="auth-overlay" >
          <div className="auth-modal"  onClick={(e) => e.stopPropagation()}>
  <UserProfile onClose={closeProfile} onLogout={handleLogout}/>
          </div>
        </div>
}{
              usernameModal &&  <>  <div className="auth-overlay" onClick={['login', 'signup'].includes(currentModal) ? closeAuth : undefined}>
<div className="auth-modal" onClick={(e) => e.stopPropagation()}><div
              className={`bg-[rgba(255, 255, 255, 1)] border-dashed border-[2px] ${
                theme
                  ? "bg-slate-100 border-black"
                  : "bg-[#0f0c0c] whiteshadow border-white"
              } p-5 border-rounded1 lg:w-[500px] md:w-[500px] max-sm:h-auto  w-[96vw] relative select`}>
                  <h1
            className={`text-center mt-[5px] ${
              theme ? "text-black" : "text-white"
            } text-[22px] font-bold max-sm:mt-[20px]`}
          >
            Please Enter Username
          </h1>
          <div>
                {/* Added id attribute to email input for focus functionality */}
                <input
                  type="text"
                  onChange={(e) => setusernameValue(e.target.value)}
                  value={usernameValue}
                  className={`md:w-[65%] p-[10px] mb-[10px] border-b-2 bg-none background-none text-black md:ml-[70px] max-sm:w-[100%] rounded-none ${
                    theme ? "border-gray-500" : "border-white text-white"
                  } border-[#837b7b] m-auto input-place`}
                  placeholder="Enter your Username"
                /></div>
          <button
                className={`w-[120px] h-[52px] flex justify-center content-center items-center p-2 relative md:left-[100px] bg-[#098CCD] text-white mt-4 rounded-[18px] cursor-pointer md:ml-[40%] gap-[18px] text-[19px] ${
                  theme
                    ? "bg-[#098CCD] border-none"
                    : "bg-[#272525] border-white border whiteshadow"
                } max-sm:m-[auto] max-sm:mt-[20px]  font-semibold`}
                onClick={handleCheckUsername}
              >
                Submit &nbsp;
               
              </button>
                </div>
              </div>
              </div>
              </>
            }
      {showAuth && !userName && (
        <div className="auth-overlay" onClick={['login', 'signup'].includes(currentModal) ? closeAuth : undefined}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            {isLogin1 ? (
              <Login onClose={closeAuth} onSignupClick={switchToSignup} />
            ) : (
              <Signup 
                onClose={closeAuth} 
                onBack={onBack} 
                onLoginClick={switchToLogin} 
                onOTPStart={handleOTPStart}
                onProfileStart={handleProfileStart}
                onProfileComplete={handleProfileComplete}
              />
            )}
            
            </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;