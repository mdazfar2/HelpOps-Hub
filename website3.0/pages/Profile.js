"use client";
import React, { useRef, useState, useEffect } from 'react'; // Added useEffect
import "@stylesheets/profile.css"
import Popup from "@components/Popup";
import {FaEye,FaEyeSlash, FaPen} from 'react-icons/fa'

const Profile = ({ theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  let [url,setUrl] = useState('')
  const [showConfirmPassword,setConfirmShowPassword] = useState(false)
  let [error,setError] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');

  // New refs for input fields
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // New useEffect for global Enter key handling
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (!username) {
          usernameRef.current.focus();
        } else if (!password) {
          passwordRef.current.focus();
        } else if (!confirmPassword) {
          confirmPasswordRef.current.focus();
        } else {
          handleSubmit(event);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [username, password, confirmPassword]);

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
          email:localStorage.getItem('useremail1'),
          name: username,
          password: password,
          image:url.length>0?url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s'
        })
      })
      // to top loading on button 
      setLoading(false)
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
    <div className={`border-dashed border-black border-[2px] ${theme? "bg-slate-100 border-black":"bg-[#0f0c0c] whiteshadow border-white"} pl-[70px] pt-[40px] pr-[70px] rounded-lg text-center w-[500px] h-[550px] relative pb-[35px]`}>
      {error&& <Popup msg={error} error={`${error=='Subscribed Successfully'?"green1":"red1"}`} />}

      <h1 className={`${theme?"text-black":"text-white"} mb-[20px] text-[24px] font-bold`}>
        Profile
      </h1>
      <label htmlFor='fileupload' className='relative'>
        <img src={`${url.length==0?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s":url}`} className={`h-[110px] w-[110px] adjusturl mt-[25px] m-auto mb-[45px] ${theme?"":"border border-white"}`} alt="Profile-circle" />
        <FaPen color={`${theme?"black":"white"}`} className={`absolute right-[10%] bottom-[-70px]`} />
      </label>    
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <input type='file' id='fileupload' style={{display:"none"}} onChange={handlefilechange}></input>
        <div className={`mb-[15px] mt-[20px] relative`}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            ref={usernameRef} // Added ref
            className={`p-[10px] ${theme?"border-gray-500":"border-white text-white"} text-black outline-none borderinput ml-0 w-[100%]`}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* Password input */}
        <div className={`mb-[15px] mt-[20px] relative`}>
          <input
            type={`${showPassword?"text":"password"}`}
            placeholder="Password"
            value={password}
            ref={passwordRef} // Added ref
            className={`p-[10px] ${theme?"border-gray-500":"border-white text-white"} text-black outline-none borderinput ml-0 w-[100%]`}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         {showPassword ? 
         <FaEye color={`${theme?"black":"white"}`} className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle}/>
         :
         <FaEyeSlash color={`${theme?"black":"white"}`} className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle}/>}
        </div>
        {/* Confirm password input */}
        <div className={`mb-[25px] mt-[20px] relative`}>
          <input
            type={`${showConfirmPassword?"text":"password"}`}
            placeholder="Confirm Password"
            value={confirmPassword}
            ref={confirmPasswordRef} // Added ref
            className={`p-[10px] ${theme?"border-gray-500":"border-white text-white"} text-black outline-none borderinput ml-0 w-[100%]`}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {showConfirmPassword ? <FaEye color={`${theme?"black":"white"}`} className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle1}/>:<FaEyeSlash color={`${theme?"black":"white"}`} className='absolute right-[5%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle1}/>}
        </div>
        {/* Submit button */}
        <button type="submit" onClick={handleSubmit} className={`${theme?"bg-[#098CCD] border-none ":"bg-[#272525] border-white border whiteshadow"} w-[190px] h-[52px] flex justify-center content-center items-center p-2 relative bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer margin-auto gap-[18px] m-auto text-[19px] font-semibold hover:bg-[#024d82]`}>
          Create Account &nbsp;
          {loading && 
            <div className={`loader3`}>
              <div className={`circle`}>
                <div className={`dot`}></div>
                <div className={`outline`}></div>
              </div>
            </div>
          }
        </button>
      </form>
    </div>
  );
};

export default Profile;