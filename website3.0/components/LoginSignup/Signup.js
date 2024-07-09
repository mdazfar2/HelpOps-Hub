"use client";

import React, { useContext, useEffect, useState } from "react";
import "../../stylesheets/login-signup.css";
import Popup from "../Popup";
import Popup1 from "../Popup1";
import { signIn, useSession } from "next-auth/react";
import OTP from "@pages/OTP";
import Profile from "@pages/Profile";
import { Context } from "@context/store";

// Signup component definition, receives onClose and onLoginClick as props from AuthButton.js
const Signup = ({ onClose, onLoginClick , onBack }) => {
  const session = useSession(); // Retrieves the current session
  const [showOTP, setShowOTP] = useState(false); // State to show/hide OTP input
  const [showProfile, setShowProfile] = useState(false); // State to show/hide Profile input
  const [email, setEmail] = useState(""); // State to store user email input
  const [error, setError] = useState(""); // State to hold error messages
  const [errorOtp, setErrorOtp] = useState(false); // State to hold OTP error messages
  let [loading, setLoading] = useState(false); // State to indicate loading status
  const [popup, setPopup] = useState(false); // State to show/hide popup
  let {userName,setUserName,userEmail,setUserEmail,theme,setIsLogin,setFinalUser,userImage,setUserImage}=useContext(Context)

  // useEffect hook to handle Enter key press for continue
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        console.log('sdfffffffffffffffffff')
        handleContinue(); // Call handleContinue when Enter is pressed
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [email]);

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to handle continue process (sign up)
  const handleContinue = async () => {
    setLoading(true);
    // Validating email
    if (validateEmail(email)) {
      let data = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          isSend: true,
        }),
      });
      localStorage.setItem('useremail1',email)
      data = await data.json();
      // Check for any types of error
      if (!data.success) {
        setError("User Already Exist");
        setPopup(true);
        setTimeout(() => {
          setError("");
          setLoading(false);
          setPopup(false);
        }, 2000);
        return;
      }
      // Store the user email
      setUserEmail(email);
      setShowOTP(true); // Show OTP input
      setLoading(false);
    } else {
      // Show error for invalid email
      setError("Please Enter a valid Email address");
      setPopup(true);
      setTimeout(() => {
        setError("");
        setPopup(false);
        setLoading(false);
        setEmail("");
      }, 2000);
    }
  };

  // Function to handle OTP submission
  const handleOTPSubmit = async (otp,email1) => {
    try {
      let response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email1, isSend: false }),
      });

      let data = await response.json();

      // Verify the OTP
      if (data.otp == otp) {
        setShowProfile(true); // Show Profile input
        


      } else {
        setErrorOtp(true);
        setPopup(true);
        setTimeout(() => {
          setErrorOtp(false);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      setErrorOtp("An error occurred");
      setTimeout(() => {
        setErrorOtp("");
      }, 2000);
    }
  };

  // Function to handle profile submission
  const handleProfileSubmit = (profileData) => {
    // Handle profile submission
    console.log("Profile data:", profileData);
    onClose(); // Close the signup process
  };

  // Function to go back to signup from OTP input
  const handleBackToSignup = () => {
    setShowOTP(false);
  };

  // Conditional rendering based on state
  if (showProfile) {
    return <Profile onSubmit={handleProfileSubmit} setFinalUser={setFinalUser} setIsLogin={setIsLogin}  onClose={onClose}  theme={theme}/>;
  }

  if (showOTP) {
    return (
      <>
        <OTP
          onClose={onClose}
          isError={errorOtp}
          setError={setError}
          onOTPSubmit={handleOTPSubmit}
          onBack={handleBackToSignup}
          email={email}
          theme={!theme}
        />
      </>
    );
  }

  console.log(session);

  return (
    <div className={`bg-[rgba(255, 255, 255, 1)] border-dashed border-black border-[2px]  ${theme? "bg-slate-100 border-black":"bg-[#0f0c0c]  border-white"}  p-5 border-rounded1 lg:w-[500px] md:w-[500px] h-[530px] sm:w-[90vw] sm:m-[20px] md:m-auto sm:h-auto  relative select pt-16`}>
      {popup && (
        <Popup
          msg={error}
          error={`${error == "Subscribed Successfully" ? "green1" : "red1"}`}
        />
      )}
      {errorOtp && (
        <Popup1
          msg={errorOtp}
          error={`${errorOtp == "Subscribed Successfully" ? "green1" : "red1"}`}
        />
      )}
{/* Back arrow */}
<button className={`absolute top-[0.5rem] left-[1.5rem] bg-transparent border-none ${theme?"text-black":"text-white"} text-2xl cursor-pointer h-auto hover:text-[#666]`} onClick={onBack}>
        &#8592; {/* Left arrow Unicode character */}
      </button>
      <h1 className={`text-center ${theme?"text-black":"text-white"} mt-[5px] font-semibold text-[22px] `}>Create Your HelpOps-Hub Account</h1>
      <h5 className={`text-center ${theme?"text-black":"text-white"} mt-[60px] pl-[22px] pr-[22px]`}>
        Join the HelpOps-Hub community by registering for a new account and
        unlock the world of DevOps resources.
      </h5>
      {/* <button className={`google-btn" onClick={() => signIn("google")}>
        <img src="/google.png" alt="Google" />
        Sign up with Google
      </button>
      <button className={`github-btn`} onClick={() => signIn("github")}>
        <img src="/github.png" alt="GitHub" />
        Sign up with Github
      </button> */}
      {/* <p>Or</p> */}
      <br />
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        className={`md:w-[65%] ${theme?"border-gray-500 text-black":"border-white text-white"} p-[10px] mb-[10px]  border-b-2  bg-none background-none text-black md:ml-[70px] sm:w-[100%] rounded-none border-[#837b7b] input-place`} 

        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      
      <p className={`text-end text-[12px] relative sm:text-center md:right-[80px] ${theme?"text-black":"text-white"}`}>
        Already have an account? &nbsp;
        <span className={`login-signup-link  ${theme?"":"hover:text-gray-500"} `} onClick={onLoginClick}>Login</span>
      </p>
      <br />
<br />
      <button className={`w-[190px] ${theme?"text-black bg-[#098CCD]":"text-white bg-[#272525] whiteshadow"} h-[52px] flex justify-center content-center items-center p-2 relative  bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer  m-auto gap-[18px] text-[19px] font-semibold`} onClick={handleContinue}>
        Send Otp &nbsp;
        {loading && (
          <div className={`loader3`}>
            <div className={`circle`}>
              <div className={`dot`}></div>
              <div className={`outline`}></div>
            </div>
          </div>
        )}
      </button>
      <button className={`absolute top-[5px] right-[22px] bg-none border-none text-[20px] ${theme?"text-black":"text-white"} cursor-pointer hover:text-[#666]`} onClick={onClose}>
            &#10005;
          </button>
    </div>
  );
};

export default Signup;