"use client";
import React, {  useRef, useState } from 'react';
import "@stylesheets/profile.css"
import Popup from "@components/Popup";
import {FaEye,FaEyeSlash, FaPen} from 'react-icons/fa'
const Profile = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading ]=useState(false)
  const [showPassword,setShowPassword]=useState(false)
  let [url,setUrl]=useState('')
  const [showConfirmPassword,setConfirmShowPassword]=useState(false)
  let ref=useRef()

let [error,setError]=useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');
  function validateDetails(){
   // for checking the password validation 
    if(password==confirmPassword){
      if(password.length < 8 || 
        !/[0-9]/.test(password) || 
        !/[a-z]/.test(password) || 
        !/[A-Z]/.test(password) || 
        !/[@#$%^&*()\-_=+{}[\]\|\\;:'",.<>\/?~`!]/.test(password)){
        setError('password must be 8 charachters long must contains 1 lowercase 1 uppercase and 1 special charachter') 
        return false
      }else{
        if(username.length==0){
          // if username not entered 
          setError("Please Enter Username")
          return false
        }else{
          
          return true
        }

      }
    }else{
      setError("Please enter same password and confirm password")
      return false
    }
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // TODO: Add account creation logic here
    if(validateDetails()){
      await fetch('/api/createaccount', {
        method: 'POST',
        body: JSON.stringify({
          email:localStorage.getItem('userEmail'),
          name: username,
          password: password,
          image:url.length>0?url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s'
        })
      })
    await fetch('/api/createaccount', {
      method: 'POST',
      body: JSON.stringify({
        email:localStorage.getItem('userEmail'),
        name: username,
        password: password
      })
    })
    // to top loading on button 
    setLoading(false)
    onClose();
  }else{
    setLoading(true)
      setTimeout(() => {
        // stopping loading and error popup
        setError('')
        setLoading(false)
      }, 2000);
    }
   
  };
  function toggle1(){
    if(showConfirmPassword){
      setConfirmShowPassword(false)
    }else{
      setConfirmShowPassword(true)
    }
  }
  // to toggling the password fields on clicking on eye icon 
  function toggle(){
    if(showPassword){
      setShowPassword(false)
    }else{
      setShowPassword(true)
    }
  }

  //For handling key event
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (username && password && confirmPassword) {
        handleSubmit(event);
      }
    }
  };

  async function handlefilechange(event){
  
    let imageFile=event.target.files[0]
    let imageUrl = '';
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'e_image'); // replace with your upload preset
      const response = await fetch(`https://api.cloudinary.com/v1_1/dwgd3as6k/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      setUrl( data.secure_url);
      console.log(imageUrl)
    }
  }
  return (
    <div className=" border-dashed border-black border-[2px] bg-slate-100 pl-[70px] pt-[40px] pr-[70px] rounded-lg text-center w-[500px] h-[550px] relative pb-[35px]">
            {error&& <Popup msg={error} error={`${error=='Subscribed Successfully'?"green1":"red1"}`} />}

      {/* Close button */}
      <button className="absolute bg-transparent border-none cursor-pointer text-[#333] right-[15px] hover:text-[#666] text-[24px] top-[5px]" onClick={onClose}>
        &#10005; {/* Cross Unicode character */}
      </button>
      <h1 className='mb-[20px] text-[24px]  font-bold'>
        Profile
        </h1>
      <label htmlFor='fileupload' className='relative'>

<img src={`${url.length==0?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s":url}`} className='h-[110px] w-[110px] adjusturl  mt-[25px] m-auto mb-[45px]' alt="Profile-circle" />
<FaPen className='right-[-64px] bottom-[-109px] absolute' />
</label>    
  <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {/* Username input */}
        <input type='file' id='fileupload' style={{display:"none"}} onChange={handlefilechange}></input>
        <div className="mb-[15px] mt-[20px] relative">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            className=' p-[10px]   text-black outline-none borderinput ml-0 w-[100%]'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* Password input */}
        <div  className="mb-[15px] mt-[20px] relative">

          <input
            type={`${showPassword?"text":"password"}`}
            placeholder="Password"
            value={password}
            className=' p-[10px]  text-black outline-none borderinput ml-0 w-[100%]'

            onChange={(e) => setPassword(e.target.value)}
            required
          />
         {showPassword ? 
         <FaEye className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle}/>
         :
         <FaEyeSlash className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle}/>}
        </div>
        {/* Confirm password input */}
        <div  className="mb-[25px] mt-[20px] relative">
          <input
            type={`${showConfirmPassword?"text":"password"}`}
            placeholder="Confirm Password"
            value={confirmPassword}
            className=' p-[10px]  text-black outline-none borderinput ml-0 w-[100%]'

            onChange={(e) =>
               setConfirmPassword(e.target.value)}
            required
          />
                  
                   {showConfirmPassword ? <FaEye className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle1}/>:<FaEyeSlash className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle1}/>}

        </div>
        {/* Submit button */}
        <button type="submit" onClick={handleSubmit} className="w-[190px]  h-[52px] flex justify-center content-center items-center p-2 relative  bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer margin-auto gap-[18px] m-auto text-[19px] font-semibold hover:bg-[#024d82]">Create Account &nbsp;{loading && <div className="loader3">
            <div className="circle">
            <div className="dot"></div>
              <div className="outline"></div>
        </div></div>
 }</button>
      </form>
    </div>
  );
};

export default Profile;