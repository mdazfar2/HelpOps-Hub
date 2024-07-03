"use client";

import React, { useEffect, useState } from "react";
import "@stylesheets/login-signup.css";
import OTP from "@pages/OTP";
import Profile from "@pages/Profile";
import Popup from "@components/Popup";
import Popup1 from "./Popup1";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
export const Login = ({ onClose, onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState(""); //for storing the email
  let [email1, setEmail1] = useState(""); //for storing the email
  let [isSent, setIsSent] = useState(false);
  let [password, setPassword] = useState(""); //for storing the password
  let [error, setError] = useState(false); // for showing the popup on error
  const [loading, setLoading] = useState(false);
  let [allShow, setAllShow] = useState(true);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [email, password]);

  // for toggling the password on clicking on eye button
  function toggle() {
    setShowPassword(!showPassword);
  }
  //for login functionality
  async function handleLogin() {
    // to show the loader
    setLoading(true);
    let res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let data = await res.json();
    // to stop the loader after loading
    setLoading(false);
    // if password is incorrect or no user found with that email
    if (!data.success) {
      setError(data.msg);
      setTimeout(() => {
        // to hide the pop up and empty msg
        setError("");
        setEmail("");
        setPassword("");
      }, 1000);
      return;
    }
    // to store the username and email after login in local storage
    localStorage.setItem("userName", data.user[0].name);
    localStorage.setItem("userEmail", data.user[0].email);
    setError(`${data.user[0].name} Welcome !!`);

    setTimeout(() => {
      setError("");
      onClose();
    }, 2000);
  }
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
    console.log(res.success);
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

  const forgotPassword = () => {
    setAllShow(false);
  };
  return (
    <>
      {!isSent && (
        <div className="login-auth-container">
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

          <h1>
            {allShow ? "Login to HelpOps-Hub" : "Please Enter Your Email"}
          </h1>
          {!allShow && (
            <input
              type="text"
              onChange={(e) => setEmail1(e.target.value)}
              value={email1}
              placeholder="Enter your email"
            />
          )}
          {allShow && (
            <>
              <button className="google-btn" onClick={() => signIn("google")}>
                <img src="google.png" alt="Google" />
                Sign in with Google
              </button>
              <button className="github-btn" onClick={() => signIn("github")}>
                <img src="github.png" alt="GitHub" />
                Sign in with Github
              </button>
              <p>Or</p>
              <br />
              <div>
              <div>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
              />
           </div>
           <div style={{position:"relative"}}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
              />{" "}
              {showPassword ? (
                <FaEye className="eye1" onClick={toggle} />
              ) : (
                <FaEyeSlash className="eye1" onClick={toggle} />
              )}
              </div>
              </div>
              <div
              
              >
                <p  style={{cursor:"pointer"}} onClick={forgotPassword}>
                  Forgot Password
                </p>
               

                <p style={{cursor:"pointer"}} onClick={onSignupClick}>
                  New here? Sign up now
                </p>
               
              </div>
              <button className="login-btn" onClick={handleLogin}>
                Login &nbsp;
                {loading && (
                  <div className="loader3">
                    <div className="circle">
                      <div className="dot"></div>
                      <div className="outline"></div>
                    </div>
                  </div>
                )}
              </button>{" "}
            </>
          )}
          {!allShow && (
            <button className="login-btn" onClick={handleForgotPass}>
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
          <button className="close-btn" onClick={onClose}>
            &#10005; {/* Cross Unicode character */}
          </button>
        </div>
      )}
      {isSent && (
        <div className="login-auth-container">
          <h1>Verification Link Has Been Sent to Your Email</h1>
        </div>
      )}
    </>
  );
};

export const Signup = ({ onClose, onLoginClick }) => {
  const session = useSession();
  const [showOTP, setShowOTP] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const [errorOtp, setErrorOtp] = useState(false); // State to hold error messages
  let [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleContinue();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [email]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  const handleContinue = async () => {
    setLoading(true);
    // validating email
    if (validateEmail(email)) {
      let data = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          isSend: true,
        }),
      });
      data = await data.json();
      //for checking any types of error
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
      //for storing the user
      localStorage.setItem("email", email);
      setShowOTP(true);
      // Here you would typically trigger sending an OTP to the provided email
      setLoading(false);
    } else {
      //for giving error
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

  const handleOTPSubmit = async (otp) => {
    try {
      let email = localStorage.getItem("email");
      let response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, isSend: false }),
      });

      let data = await response.json();

      // Here you would typically verify the OTP
      if (data.otp == otp) {
        setShowProfile(true);
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

  const handleProfileSubmit = (profileData) => {
    // Handle profile submission
    console.log("Profile data:", profileData);
    onClose(); // Close the signup process
  };

  const handleBackToSignup = () => {
    setShowOTP(false);
  };

  if (showProfile) {
    return <Profile onSubmit={handleProfileSubmit} onClose={onClose} />;
  }

  if (showOTP) {
    return (
      <>
        {" "}
        <OTP
          onClose={onClose}
          isError={errorOtp}
          setError={setError}
          onOTPSubmit={handleOTPSubmit}
          onBack={handleBackToSignup}
        />
        ;
      </>
    );
  }
  console.log(session);
  return (
    <div className="signup-auth-container">
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

      <h1>Create Your HelpOps-Hub Account</h1>
      <h5>
        Join the HelpOps-Hub community by registering for a new account and
        unlock the world of DevOps resources.
      </h5>
      <button className="google-btn" onClick={() => signIn("google")}>
        <img src="/google.png" alt="Google" />
        Sign up with Google
      </button>
      <button className="github-btn" onClick={() => signIn("github")}>
        <img src="/github.png" alt="GitHub" />
        Sign up with Github
      </button>
      <p>Or</p>
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <p style={{cursor:"pointer"}} onClick={onLoginClick}>
        Already have an account? Login
      </p>
      <br />

      <button className="continue-btn" onClick={handleContinue}>
        Continue &nbsp;
        {loading && (
          <div className="loader3">
            <div className="circle">
              <div className="dot"></div>
              <div className="outline"></div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};
