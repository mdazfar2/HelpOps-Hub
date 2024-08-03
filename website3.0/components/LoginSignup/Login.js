"use client";

import React, { useContext, useEffect, useState } from "react";
import "@stylesheets/login-signup.css";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Context } from "@context/store";
import Image from 'next/image';

// Login component definition, receives onClose and onSignupClick as props from AuthButton
const Login = ({ onClose, onSignupClick }) => {
  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [email2, setEmail2] = useState("");
  const [email1, setEmail1] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [allShow, setAllShow] = useState(true);
  let { setIsLogin, setIsPopup,setMsg,setColor
,    setIsAdminShow, theme, setFinalUser } = useContext(Context);

  // Modified useEffect hook to handle Enter key press for form navigation and login
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (email2 === "") {
          // If email is empty, focus on the email input
        } else if (password === "") {
          // If email is filled but password is empty, focus on the password input
          document.getElementById("password-input").focus();
        } else {
          // If both email and password are filled, proceed with login
          handleLogin();
        }
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
  async function fetchData(email) {
    let a = await fetch("/api/createaccount", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    });

    let e = await a.json();
    if (e.msg.email == process.env.NEXT_PUBLIC_ADMIN_URL) {
      setIsAdminShow(true);
    }
    let data1 = await JSON.stringify(e.msg);
    localStorage.setItem("finalUser", data1);
    setFinalUser(e.msg);
    setIsLogin(true);
    localStorage.setItem("loggedin", true);
    onClose();
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

    // Handle login errors
    if (!data.success) {
      setMsg(data.msg)
      setIsPopup(true)
      if (data.msg === "User Doesn't Valid" || data.msg === "Invalid Email") {
        // If username/email is invalid, clear both fields
        setEmail2("");
        setPassword("");
      } else if (data.msg === "Incorrect Password") {
        // If only password is incorrect, clear just the password field
        setPassword("");
      }
setLoading(false)
   
      return;
    }

    await fetchData(data.user[0].email);
    setLoading(false);

    // Save user details to localStorage
    // setUserName(data.user[0].name);
    // setUserEmail(data.user[0].email);
    // setUserImage(data.user[0].image1);
    // localStorage.setItem('userName', data.user[0].name);
    // localStorage.setItem('userEmail', data.user[0].email);
    // localStorage.setItem('userImage',data.user[0].image1);
    // setIsLogin(true)
    // setError(`${data.user[0].name} Welcome !!`);

    // // Close the login popup and reload the page after 2 seconds
    // setTimeout(() => {
    //   setError("");
    //   onClose();
    // }, 2000);
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
      setMsg(`User Doesn't Exist`)
        setIsPopup(true)
      setTimeout(() => {
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

  // Function to go back to login from forgot password page
  const handleBackToLogin = () => {
    setAllShow(true);
  };

  return (
    <>
      {!isSent && (
        <div
          className={`bg-[rgba(255, 255, 255, 1)] border-dashed border-[2px] ${
            theme
              ? "bg-slate-100 border-black"
              : "bg-[#0f0c0c] whiteshadow border-white"
          } p-5 border-rounded1 lg:w-[500px] md:w-[500px] max-sm:h-auto  w-[96vw] relative select`}
        >
         

          <h1
            className={`text-center mt-[5px] ${
              theme ? "text-black" : "text-white"
            } text-[22px] font-bold max-sm:mt-[20px]`}
          >
            {allShow ? "Login to HelpOps-Hub" : "Please Enter Your Email"}
          </h1>
          {!allShow && (
            <>
              <button
                className={`absolute top-[0.5rem] left-[1.5rem] bg-transparent border-none ${
                  theme ? "text-black" : "text-white"
                } text-2xl cursor-pointer h-auto hover:text-[#666]`}
                onClick={handleBackToLogin}
              >
                &#8592; {/* Left arrow Unicode character */}
              </button>
              <input
                type="text"
                onChange={(e) => setEmail1(e.target.value)}
                value={email1}
                className={`w-[65%] p-[10px] mb-[10px] border-b-2 bg-none background-none text-black ml-[70px] rounded-none border-[#837b7b] input-place mt-[20px] max-sm:w-[90%] max-sm:left-0 max-sm:ml-0 ${
                  theme ? "border-gray-500" : "border-white text-white"
                }`}
                placeholder="Enter your emaill"
              />
            </>
          )}
          {allShow && (
            <>
              <button
                className={`google-btn mt-[50px] md:w-3/5 max-sm:text-[13px] max-sm:max-w-[240px] lg:max-w-[270px] max-sm:w-[75%] p-2 rounded-[18px] ${
                  theme
                    ? "bg-white google-btn1 border-none"
                    : "bg-[black] google-btn2 border-solid border-white border text-white"
                } cursor-pointer flex justify-center items-center m-auto gap-[18px] font-semibold`}
                onClick={() => signIn("google")}
              >
               <Image
        src="/google.webp" // The path to your image file
        alt="Google"
        width={30}         // Width of the image
        height={30}        // Height of the image
        className="ml-[5px]" // Apply margin-left
        draggable="false"  // Prevents image dragging
      />
                Sign in with Google
              </button>
              <button
                className={`github-btn md:w-3/5 max-sm:w-[75%] max-sm:text-[13px] max-sm:max-w-[240px] lg:max-w-[270px] p-2 mt-4 rounded-[18px] ${
                  theme
                    ? "bg-white google-btn1 border-none"
                    : "bg-[black] google-btn2 border-solid border-white border text-white"
                } cursor-pointer flex justify-center items-center m-auto gap-[18px] font-semibold`}
                onClick={() => signIn("github")}
              >
                {theme ? (
                  <Image
                  src="/github.webp" // Path to your image file
                  alt="GitHub"
                  width={35}         // Width of the image
                  height={30}        // Height of the image
                  draggable="false"  // Prevents image dragging
                />
                ) : (
                  <FaGithub size={"2rem"} />
                )}
                Sign in with Github
              </button>
              <p className="text-center text-[16px] mt-[15px] font-Itim">Or</p>
              <br />
              <div>
                {/* Added id attribute to email input for focus functionality */}
                <input
                  id="email-input"
                  type="text"
                  onChange={(e) => setEmail2(e.target.value)}
                  value={email2}
                  className={`md:w-[65%] p-[10px] mb-[10px] border-b-2 bg-none background-none text-black md:ml-[70px] max-sm:w-[100%] rounded-none ${
                    theme ? "border-gray-500" : "border-white text-white"
                  } border-[#837b7b] m-auto input-place`}
                  placeholder="Enter your email"
                />
                <div style={{ position: "relative" }}>
                  {/* Added id attribute to password input for focus functionality */}
                  <input
                    id="password-input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={`md:w-[65%] p-[10px] mb-[10px] border-b-2 bg-none background-none text-black md:ml-[70px] max-sm:w-[100%]  rounded-none ${
                      theme ? "border-gray-500" : "border-white text-white"
                    } border-[#837b7b] input-place`}
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <FaEye
                      color={`${theme ? "black" : "white"}`}
                      className={`absolute bottom-[24%] md:right-[22%] text-[1.5rem] max-sm:right-[20px] cursor-pointer`}
                      onClick={toggle}
                    />
                  ) : (
                    <FaEyeSlash
                      color={`${theme ? "black" : "white"}`}
                      className="absolute bottom-[24%] md:right-[22%] text-[1.5rem] max-sm:right-[20px] cursor-pointer"
                      onClick={toggle}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-[69%] md:flex-row m-auto justify-between max-sm:flex-col">
                <p
                  className={`text-center ${
                    theme ? "" : "hover:text-gray-500"
                  } text-[13px] mt-[15px] regular forgot-password ${
                    theme ? "text-black" : "text-white"
                  }`}
                  onClick={forgotPassword}
                >
                  Forgot Password
                </p>
                <p
                  className={`text-center text-[13px] mt-[15px] regular ${
                    theme ? "text-black" : "text-white"
                  }`}
                >
                  New here? &nbsp;
                  <span
                    className={`login-signup-link ${
                      theme ? "" : "hover:text-gray-500"
                    }`}
                    onClick={onSignupClick}
                  >
                    Sign up now
                  </span>
                </p>
              </div>
              <button
                className={`w-[120px] h-[52px] flex justify-center content-center items-center p-2 relative md:left-[100px] bg-[#098CCD] text-white mt-4 rounded-[18px] cursor-pointer md:ml-[40%] gap-[18px] text-[19px] ${
                  theme
                    ? "bg-[#098CCD] border-none"
                    : "bg-[#272525] border-white border whiteshadow"
                } max-sm:m-[auto] max-sm:mt-[20px]  font-semibold`}
                onClick={handleLogin}
              >
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
            <button
              className={`w-[200px] h-[52px] flex justify-center content-center items-center p-2 relative bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer m-auto gap-[18px] text-[19px] font-semibold ${
                theme
                  ? "bg-[#098CCD] border-none"
                  : "bg-[#272525] border-white border whiteshadow"
              }`}
              onClick={handleForgotPass}
            >
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

          <button
            className={`absolute top-[5px] right-[22px] bg-none border-none text-[20px] cursor-pointer ${
              theme ? "" : "text-white"
            }`}
            onClick={onClose}
          >
            &#10005;
          </button>
        </div>
      )}
      {isSent && (
        <div
          className={`${
            theme
              ? "bg-slate-100 border-black"
              : "bg-[#0f0c0c] whiteshadow border-white"
          } w-[400px] text-2xl rounded-lg p-[40px]`}
        >
          <h1 className={`${theme ? "text-black" : "text-white"} text-center`}>
            Verification Link Has Been Sent to Your Email
          </h1>
        </div>
      )}
    </>
  );
};

export default Login;
