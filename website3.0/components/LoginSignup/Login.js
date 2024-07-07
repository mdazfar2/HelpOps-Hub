"use client";

import React, { useContext, useEffect, useState } from "react";
import "@stylesheets/login-signup.css";
import Popup from "@components/Popup";
import { FaEye, FaEyeSlash , FaGit, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Context } from "@context/store";

// Login component definition, receives onClose and onSignupClick as props from AuthButton
const Login = ({ onClose, onSignupClick }) => {
  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [email2, setEmail2] = useState("");
  const [email1, setEmail1] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allShow, setAllShow] = useState(true);
  let {setUserName,setUserEmail,setUserImage,setIsLogin,theme,setTheme}=useContext(Context)
  // useEffect hook to handle Enter key press for login
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleLogin(); // Call handleLogin when Enter is pressed
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [email2, password]);

  // Toggle function to show or hide password
  function toggle() {
    setShowPassword(!showPassword);
  }

  // Function to handle login process
  async function handleLogin() {
    setLoading(true);
    let res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: email2,
        password: password,
      }),
    });
    let data = await res.json();
    setLoading(false);

    // Handle login errors
    if (!data.success) {
      setError(data.msg);
      setTimeout(() => {
        setError("");
        setEmail2("");

        setPassword("");
      }, 1000);
      return;
    }

    // Save user details to localStorage
    setUserName( data.user[0].name);
    setUserEmail( data.user[0].email);
    setUserImage(data.user[0].image1);
    localStorage.setItem('userName', data.user[0].name);
    localStorage.setItem('userEmail', data.user[0].email);
    localStorage.setItem('userImage',data.user[0].image1);
    setIsLogin(true)
console.log('setting data')
    setError(`${data.user[0].name} Welcome !!`);

    // Close the login popup and reload the page after 2 seconds
    setTimeout(() => {
      setError("");
      onClose();
    }, 2000);
  }

  // Function to handle forgot password process
  async function handleForgotPass() {
    setLoading(true);
    let res = await fetch("/api/forgotpassword", {
      method: "POST",
      body: JSON.stringify({
        email: email1,
      }),
    });
    res = await res.json();
    setLoading(false);

    // Handle forgot password errors
    if (!res.success) {
      setError(`User Doesn't Exist`);
      setTimeout(() => {
        setError("");
        onClose();
      }, 2000);
    } else {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 2000);
    }
  }

  // Function to show forgot password input field
  const forgotPassword = () => {
    setAllShow(false);
  };

  return (
    <>
      {!isSent && (
        <div className={` bg-[rgba(255, 255, 255, 1)] border-dashed  border-[2px] ${theme? "bg-slate-100 border-black":"bg-[#0f0c0c] whiteshadow border-white"} p-5 border-rounded1 lg:w-[500px] md:w-[500px] sm:w-[400px] relative select`}>
          {error && (
            <Popup
              msg={error}
              error={`${
                error == "User Doesn't Valid" || error == "Incorrect Password"
                  ? "red1"
                  : "green1"
              }`}
            />
          )}

          <h1 className={`text-center mt-[5px] ${theme?"text-black":"text-white"} text-[22px] font-bold`}>
            {allShow ? "Login to HelpOps-Hub" : "Please Enter Your Email"}
          </h1>
          {!allShow && (
            <input
              type="text"
              onChange={(e) => setEmail1(e.target.value)}
              value={email1}
              className={`w-[65%] p-[10px] mb-[10px]  border-b-2  bg-none background-none text-black ml-[70px] rounded-none border-[#837b7b] input-place mt-[20px]  ${theme?"border-gray-500":"border-white text-white"}`}

              placeholder="Enter your email"
            />
          )}
          {allShow && (
            <>
              <button className={`google-btn mt-[50px] w-3/5 p-2   rounded-[18px]  ${theme?"bg-white  google-btn1 border-none":"bg-[black] google-btn2 border-solid border-white border text-white "}  cursor-pointer flex justify-center items-center m-auto gap-[18px]  font-semibold`} onClick={() => signIn("google")}>
                <img className="w-[30px] h-[30px] ml-[5px]" src="google.png" alt="Google" />
                Sign in with Google
              </button>
              <button className={`github-btn w-3/5 p-2 mt-4  rounded-[18px] ${theme?"bg-white  google-btn1 border-none":"bg-[black] google-btn2 border-solid border-white border text-white "} cursor-pointer flex justify-center items-center m-auto gap-[18px]  font-semibold`} onClick={() => signIn("github")}>
             
             {theme?   <img className="w-[35px] h-[30px] ml-[5px] " src="github.png" alt="GitHub" />:<FaGithub size={'2rem'}/>}
                Sign in with Github
              </button>
              <p className="text-center text-[16px] mt-[15px] font-Itim ">Or</p>
              <br />
              <div>
                <input
                  type="text"
                  onChange={(e) => setEmail2(e.target.value)}
                  value={email2}
                  className={`w-[65%] p-[10px] mb-[10px]  border-b-2  bg-none background-none text-black ml-[70px] rounded-none ${theme?"border-gray-500":"border-white text-white"} border-[#837b7b] input-place`} 
                  placeholder="Enter your email"
                />
                <div style={{ position: "relative" }}>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={`w-[65%] p-[10px] mb-[10px]  border-b-2  bg-none background-none text-black ml-[70px] rounded-none ${theme?"border-gray-500":"border-white  text-white"} border-[#837b7b] input-place`}
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <FaEye color={`${theme?"black":"white"}`} className={`absolute bottom-[24%] right-[22%] text-[1.5rem]  cursor-pointer`} onClick={toggle} />
                  ) : (
                    <FaEyeSlash color={`${theme?"black":"white"}`} className="absolute bottom-[24%] right-[22%] text-[1.5rem] cursor-pointer" onClick={toggle} />
                  )}
                </div>
              </div>
              <div className="flex w-[69%] m-auto justify-between">
                <p className={`text-center ${theme?"":"hover:text-gray-500"} text-[13px] mt-[15px] regular forgot-password ${theme?"text-black":"text-white"}`} onClick={forgotPassword}>
                  Forgot Password
                </p>
                <p className={`text-center text-[13px] mt-[15px] regular  ${theme?"text-black":"text-white"}`}>New here? &nbsp;
                <span className={`login-signup-link ${theme?"":"hover:text-gray-500"}`} onClick={onSignupClick}>Sign up now</span>
                </p>
              </div>
              <button className={`w-[120px]  h-[52px] flex justify-center content-center items-center p-2 relative left-[100px] bg-[#098CCD] text-white mt-4 rounded-[18px] cursor-pointer  ml-[40%] gap-[18px] text-[19px] ${theme?"bg-[#098CCD] border-none ":"bg-[#272525] border-white border whiteshadow" } font-semibold`} onClick={handleLogin}>
                Login &nbsp;
                {loading && (
                  <div className="loader3">
                    <div className="circle">
                      <div className="dot"></div>
                      <div className="outline"></div>
                    </div>
                  </div>
                )}
              </button>
            </>
          )}
          {!allShow && (
            <button className={`w-[200px]  h-[52px] flex justify-center content-center items-center p-2 relative  bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer  m-auto gap-[18px] text-[19px] font-semibold  ${theme?"bg-[#098CCD] border-none ":"bg-[#272525] border-white border whiteshadow" } `} onClick={handleForgotPass}>
              Submit &nbsp;
              {loading && (
                <div className="loader3">
                  <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                  </div>
                </div>
              )}
            </button>
          )}
          <button className="close-btn absolute top-[5px] right-[22px] bg-none border-none text-[20px] cursor-pointer " onClick={onClose}>
            &#10005;
          </button>
        </div>
      )}
      {isSent && (
        <div className={` ${theme? "bg-slate-100 border-black":"bg-[#0f0c0c] whiteshadow border-white"} w-[400px] text-2xl rounded-lg p-[40px]`}>
          <h1 className={`${theme?"text-black":"text-white"} text-center`}>Verification Link Has Been Sent to Your Email</h1>
        </div>
      )}
    </>
  );
};

export default Login;