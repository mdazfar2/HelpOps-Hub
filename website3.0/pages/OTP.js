"use client";
import React, { useState, useRef } from 'react';
import "@stylesheets/otp.css";
import Popup from "@components/Popup";
import Popup1 from '@components/Popup1';

const OTP = ({ onClose, onOTPSubmit, onBack ,isError}) => {
  // State to store the 6-digit OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  let [error,setError]=useState(false);

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
    } else if (e.key === 'Enter' && !otp.includes('')) {
      handleSubmit();
    }
  };

  // Handle OTP submission
  const handleSubmit = () => {
    if(otp[otp.length-1]==''){
      setError("Please Enter Valid Otp")
      setTimeout(() => {
        setError('')
      }, 2000);
    console.log('sdsdsd')
      return
    }

    onOTPSubmit(otp.join(''));(otp.join(''));
    setError('')
    return
  };

  return (
    <div className="otp-container">
     {error&& <Popup msg={error} error={`${error=='Subscribed Successfully'?"green1":"red1"}`} />}
     {isError&& <Popup1 msg={'Wrong Otp'} error={`${error=='Subscribed Successfully'?"green1":"red1"}`} />}

      {/* Back arrow */}
      <button className="back-arrow" onClick={onBack}>
        &#8592; {/* Left arrow Unicode character */}
      </button>
      {/* Close button */}
      <button className="close-btn" onClick={onClose}>
        &#10005; {/* Cross Unicode character */}
      </button>
      <h5>To continue, enter the OTP sent to your registered email address.</h5>
      <p>This helps us keep your account secure.</p>
      {/* OTP input fields */}
      <div className="otp-input">
        {otp.map((data, index) => {
          return (
            <input
              className="otp-field"
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
      <button className="continue-btn" onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default OTP;