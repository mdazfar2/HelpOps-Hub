"use client";
import React, { useState, useRef } from 'react';
import "@stylesheets/otp.css";

const OTP = ({ onClose, onOTPSubmit, onBack }) => {
  // State to store the 6-digit OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

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
    }
  };

  // Handle OTP submission
  const handleSubmit = () => {
    onOTPSubmit(otp.join(''));(otp.join(''));
  };

  return (
    <div className="otp-container">
      {/* Back arrow */}
      <button className="back-arrow" onClick={onBack}>
        &#8592; {/* Left arrow Unicode character */}
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