"use client";
import React, { useState, useRef, useEffect } from 'react';
import "@stylesheets/otp.css";

const OTP = ({ onClose, onOTPSubmit, onBack ,isError,email,theme,setMsg, setIsPopup}) => {
  // State to store the 6-digit OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6); // Get the pasted data and limit it to 6 characters
    if (pasteData) {
      const newOtp = otp.map((char, idx) => pasteData[idx] || '');
      setOtp(newOtp);

      // Move focus to the last filled input
      const lastFilledIndex = pasteData.length - 1;
      if (inputRefs.current[lastFilledIndex]) {
        inputRefs.current[lastFilledIndex].focus();
      }
    }
    e.preventDefault(); // Prevent default paste action
  };
  // Handle input change for OTP fields
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    // Update the OTP state
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move focus to the next input field if value is entered
    if (element.value !== '') {
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {

    
    // Move focus to the previous input field if backspace is pressed and the field is empty
    if (e.key === 'Backspace' && index > 0 && otp[index] === '' && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'Enter' && !e.shiftKey && !otp.includes('')) {
      handleSubmit();
    }
  };

  // Handle OTP submission
  const handleSubmit = () => {
    if(otp[otp.length-1]==''){
      setMsg("Please Enter Valid Otp")
        setIsPopup(true)
     
      return
    }
    onOTPSubmit(otp.join(''));
    return
  };
  useEffect(()=>{
    if(isError){
      setMsg('Wrong Otp')
      setIsPopup(true)
    }
  },[isError])
  return (
    <div className={`border-dashed border-black border-[2px] ${!theme? "bg-slate-100 border-black":"bg-[#0f0c0c] whiteshadow border-white"} otp-container relative  text-center md:h-[500px] md:w-[650px] max-sm:w-[96vw] max-sm:h-auto max-sm:m-[20px] max-sm:p-[10px] md:pt-[60px] max-sm:pl-0   pt-[60px] md:pl-[40px] md:pr-[40px]`}>
     {/* {isError&& <Popup msg={'Wrong Otp'} error={`${error=='Subscribed Successfully'?"green1":"red1"}`} />} */}

      {/* Back arrow */}
      <button className={`absolute top-[0.5rem]  ${!theme?"text-black":"text-white"}  left-[1.5rem] bg-transparent border-none text-2xl cursor-pointer h-auto hover:text-[#666]`} onClick={onBack}>
        &#8592; {/* Left arrow Unicode character */}
      </button>
      <h5 className={` ${!theme?"text-black":"text-white"} max-sm:mt-[40px]  `}>To continue, enter the OTP sent to your registered email address.</h5>
      <p  className={` ${!theme?"text-black":"text-white"} `}>This helps us keep your account secure.</p>
      {/* OTP input fields */}
      <div className={`mt-[20px] max-sm:w-[104%]   max-sm:m-auto md:w-[100%] max-sm:h-[auto] flex-wrap mb-[20px] ml-0 mr-0 flex justify-center md:gap-[6px] max-sm:gap-[1px]`} onPaste={handlePaste}>
        {otp.map((data, index) => {
          return (
            <input
              className={`w-[49px] h-[57px]  mb-0 ml-[5px] mr-[5px] text-center text-[18px] otp-field mt-[40px] ${!theme?"":"bg-gray-600 border-white border "} text-[#f5f5f5]`}
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={e => handleChange(e.target, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onFocus={e => e.target.select()}
              ref={el => inputRefs.current[index] = el}
            />
          );
        })}
      </div>
      {/* Continue button */}
      <button className={`${theme?"bg-black text-white whiteshadow":"bg-[#098CCD]"} h-[50px] w-[118px] p-[10px] font-semibold text-white border-none px-5 py-2 rounded-[16px] cursor-pointer mt-5 b-18`} onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default OTP;