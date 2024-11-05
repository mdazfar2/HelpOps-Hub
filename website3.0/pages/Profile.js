"use client";
import React, {  useRef, useState, useEffect, useContext } from 'react';
import "@stylesheets/profile.css"
import {FaEye,FaEyeSlash, FaPen} from 'react-icons/fa'
const Profile = ({ onClose,theme, setFinalUser,setIsLogin,setMsg, setIsPopup, onProfileComplete}) => {
  const [username, setUsername] = useState('');
  const [username1, setUsername1] = useState('');

  const [password, setPassword] = useState('');
  const [loading , setLoading ]=useState(false)
  const [showPassword,setShowPassword]=useState(false)
  let [url,setUrl]=useState('')
  const [showConfirmPassword,setConfirmShowPassword]=useState(false)
  let ref=useRef()
  const [confirmPassword, setConfirmPassword] = useState('');
  function validateDetails(){
   // for checking the password validation 
    if(password==confirmPassword){
      if(password.length < 8 || 
        !/[0-9]/.test(password) || 
        !/[a-z]/.test(password) || 
        !/[A-Z]/.test(password) || 
        !/[@#$%^&*()\-_=+{}[\]\|\\;:'",.<>\/?~`!]/.test(password)){
        setMsg('password must be 8 characters long must contains 1 lowercase, 1 uppercase and 1 special charachter')
        setIsPopup(true)
        return false
      }else{
        if(username.length==0){
          // if username not entered 
          setMsg("Please Enter Name")
        setIsPopup(true)
          return false
        }else if(username1.length==0){
          setMsg("Please Enter Username")
          setIsPopup(true)
          return false
        }else{
          return true
        }

      }
    }else{
      setMsg("Please enter same password and confirm password")
        setIsPopup(true)
      return false
    }
  }
  async function fetchData(id){
    let a=await    fetch("/api/getuser",{
         method:"POST",
         body:JSON.stringify({
           username :username1
         })
       })

      let  e=await a.json()
      let data1=await JSON.stringify(e.msg)
      localStorage.setItem('finalUser',data1)
      setFinalUser(e.msg)
      setIsLogin(true)
      localStorage.setItem("loggedin",true)
      onClose()
     }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
     // TODO: Add account creation logic here
    if(validateDetails()){
      // Check if the username already exists
      let canCreate=await fetch('/api/checkusername',{
        method:"POST",
        body:JSON.stringify({ 
          username:username1 
        }),
      })
      canCreate=await canCreate.json()
      // If the username already exists, show a message and stop the process
      if (!canCreate.success){
        setMsg("This username is already taken. Please choose a different username.");
        setIsPopup(true)
        setLoading(false)
        return
      }
      let d= await fetch('/api/createaccount', {
        method: 'POST',
        body: JSON.stringify({
          email:localStorage.getItem('useremail1'),
          name: username,
          username:username1,
          password: password,
          image:url.length>0?url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s'
        })
      })
    // to top loading on button 
    setLoading(false)

    d=await d.json()
   
    fetchData(d.user._id)
    onProfileComplete();
  }else{
    setLoading(true)
      setTimeout(() => {
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

  // New refs for input fields
  const usernameRef = useRef(null);
  const usernameRef1 = useRef(null);

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // New useEffect for global Enter key handling
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (!username) {
          usernameRef.current.focus();
        }else if (!username1){
          usernameRef1.current.focus()
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
  }, [username, password, confirmPassword,username1]);

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
    }
  }
  return (
    <div  className={` border-dashed  border-black border-[2px]  ${theme? "bg-slate-100 border-black":"bg-[#0f0c0c] whiteshadow border-white"}  md:pl-[70px] md:pt-[10px] md:pr-[70px] rounded-lg text-center md:w-[500px] md:h-[550px] max-sm:w-[96vw] max-sm:h-auto relative pb-[35px]`}>

      <h1 className={`${theme?"text-black":"text-white"} mb-[20px] text-[24px]  font-bold`}>
        Profile
        </h1>
      <label htmlFor='fileupload' className='relative'>

      <img src={`${url.length==0?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s":url}`}  className={`h-[110px] w-[110px] adjusturl  mt-[25px] m-auto mb-[45px] ${theme?"":"border border-white"}`}  alt="Profile-circle" />
      <FaPen color={`${theme?"black":"white"}`} className={`$ md:right-[124px] max-sm:right-6 bottom-[-9px] absolute`} />
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
            className={` p-[10px]  ${theme?"border-gray-500":"border-white  text-white"}   text-black outline-none borderinput ml-0 md:w-[100%] max-sm:w-[70%]`}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={`mb-[15px] mt-[20px] relative`}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username1}
          ref={usernameRef1} // Added ref
          className={` p-[10px]  ${theme?"border-gray-500":"border-white  text-white"}   text-black outline-none borderinput ml-0 md:w-[100%] max-sm:w-[70%]`}
          onChange={(e) => {
            const newUsername = e.target.value;
            // Check if the new username contains any spaces
            if (/\s/.test(newUsername)) {
                setMsg("Usernames cannot contain spaces. Please enter a valid username without spaces.");
                setIsPopup(true);
            } else {
                // If no spaces, update the username state
                setUsername1(newUsername);
            }
          }}
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
            className={` p-[10px]  ${theme?"border-gray-500":"border-white  text-white"}   text-black outline-none borderinput ml-0 md:w-[100%] max-sm:w-[70%]`}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         {showPassword ? 
         <FaEye color={`${theme?"black":"white"}`} className='absolute md:right-[5%] max-sm:right-[10%] bottom-[9%] text-[1.5rem] cursor-pointer'onClick={toggle}/>
         :
         <FaEyeSlash color={`${theme?"black":"white"}`} className='absolute md:right-[5%] max-sm:right-[16%] bottom-[9%] text-[1.5rem] cursor-pointer' onClick={toggle}/>}
        </div>
        {/* Confirm password input */}
        <div className={`mb-[25px] mt-[20px] relative`}>
          <input
            type={`${showConfirmPassword?"text":"password"}`}
            placeholder="Confirm Password"
            value={confirmPassword}
            ref={confirmPasswordRef} // Added ref
            className={` p-[10px]  ${theme?"border-gray-500":"border-white  text-white"}   text-black outline-none borderinput ml-0 md:w-[100%] max-sm:w-[70%]`}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {showConfirmPassword ? <FaEye color={`${theme?"black":"white"}`} className='absolute md:right-[5%] max-sm:right-[16%] bottom-[9%] text-[1.5rem] cursor-pointer'  onClick={toggle1}/>:<FaEyeSlash color={`${theme?"black":"white"}`} className='absolute md:right-[5%] max-sm:right-[16%] bottom-[9%] text-[1.5rem] cursor-pointer'  onClick={toggle1}/>}
        </div>
        {/* Submit button */}
        <button type="submit" onClick={handleSubmit} className={` ${theme?"bg-[#098CCD] border-none ":"bg-[#272525] border-white border whiteshadow" }  w-[190px]  h-[52px] flex justify-center content-center items-center p-2 relative  bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer margin-auto gap-[18px] m-auto text-[19px] font-semibold hover:bg-[#024d82] `}>Create Account &nbsp;{loading && <div className={`loader3`}>
            <div className={`circle`}>
            <div className={`dot`}></div>
              <div className={`outline`}></div>
        </div></div>
    }</button>
      </form>
    </div>
  );
};

export default Profile;