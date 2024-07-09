import React, { useEffect, useState } from 'react'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import "@stylesheets/reset.css";
import Popup from './Popup';

export default function Reset() {
    const [showPassword,setShowPassword]=useState(false)
  let [email,setEmail]=useState('') //for storing the email 
 
  let [password,setPassword]=useState('') //for storing the password 
  let [password1,setPassword1]=useState('') //for storing the password 

  let [error,setError]=useState(false) // for showing the popup on error
  const [loading,setLoading]=useState(false)
  let [allShow,setAllShow]=useState(true)
  let [display,setDisplay]=useState(false)
    let [token1,setToken]=useState('')
    let [pop,setPop]=useState(false)


    function validateDetails(){
        // for checking the password validation 
         if(password==password1){
           if(password.length < 8 || 
             !/[0-9]/.test(password) || 
             !/[a-z]/.test(password) || 
             !/[A-Z]/.test(password) || 
             !/[@#$%^&*()\-_=+{}[\]\|\\;:'",.<>\/?~`!]/.test(password)){
             
             return {isSuccess:false,msg:"Please Enter Valid Password"}
           }else{
            return {isSuccess:true}

           }
         }else{
           return {isSuccess:false,msg:"Password and confirm Password Doesn't Match"}
         }
       }

  useEffect(() => {
    // Extract token from URL query parameters
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
setToken(token)
  
  }, []);



 async function handleSubmit(){
    if(!validateDetails().isSuccess){
        setPop(validateDetails().msg)
        setTimeout(()=>{
            setPop(false)
        },2000)
        return
    }
    
    await fetch("/api/changepass",{
        method:"POST",
        body:JSON.stringify({
            password:password,
            token:token1
        })
    })
    setPop("Password Changed")
    setDisplay(true)

  }
  function toggle(){
    if(showPassword){
      setShowPassword(false)
    }else{
      setShowPassword(true)
    }
  }
  return (
    <div className={`auth-overlay ${display?"dnone":""}`} >
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
{pop&&
    <Popup msg={pop} error="red1" />
}<div className="login-auth-container md:w-500px sm:w-80vw sm:m-auto ">
     

      <h1>{"Change Password"}</h1>
      
      <input type="text"  onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" />
      <input     onChange={(e)=>setPassword1(e.target.value)}    value={password1}   type={`${showPassword?"text":"password"}`}
 placeholder="Enter Confirm Password" />         
<br/>
    
      <button className="login-btn" onClick={handleSubmit} >Submit &nbsp;{loading && <div className="loader3">
  <div className="circle">
    <div className="dot"></div>
    <div className="outline"></div>
  </div>
 
</div>}</button> 
      <button className="close-btn">
       &#10005; {/* Cross Unicode character */}
      </button>
    </div>
    </div>
    </div>
  )
}
