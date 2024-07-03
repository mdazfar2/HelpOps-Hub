"use client";

import React, { useEffect, useState } from "react";
import "@stylesheets/login-signup.css";

import Profile from "@pages/Profile";
import Popup from "../Popup";
import Popup1 from "../Popup1";
import { signIn, useSession } from "next-auth/react";
import OTP from "@pages/OTP";

const Signup = ({ onClose, onLoginClick }) => {
  const session = useSession();
  const [showOTP, setShowOTP] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorOtp, setErrorOtp] = useState(false);
  const [loading, setLoading] = useState(false);
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
    if (validateEmail(email)) {
      let data = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          isSend: true,
        }),
      });
      data = await data.json();
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
      localStorage.setItem("email", email);
      setShowOTP(true);
      setLoading(false);
    } else {
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
      let data = await fetch("/api/verifyotp", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });
      data = await data.json();

      if (!data.success) {
        setErrorOtp(true);
        return;
      }
      setErrorOtp(false);
      setShowProfile(true);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileSubmit = async (profileData) => {
    try {
      const email = localStorage.getItem("email");
      let data = await fetch("/api/addprofile", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          ...profileData,
        }),
      });
      data = await data.json();

      if (!data.success) {
        return;
      }
      onClose();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!showOTP && !showProfile && (
        <div className="signup-auth-container">
          {popup && <Popup1 msg={error} error="red1" />}
          <h1>Sign Up to HelpOps-Hub</h1>
          <button className="google-btn" onClick={() => signIn("google")}>
            <img src="google.png" alt="Google" />
            Sign up with Google
          </button>
          <button className="github-btn" onClick={() => signIn("github")}>
            <img src="github.png" alt="GitHub" />
            Sign up with Github
          </button>
          <p>Or</p>
          <br />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
          <div>
            <p style={{ cursor: "pointer" }} onClick={onLoginClick}>
              Already have an account? Login now
            </p>
          </div>
          <button className="signup-btn" onClick={handleContinue}>
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
          <button className="close-btn" onClick={onClose}>
            &#10005;
          </button>
        </div>
      )}
      {showOTP && <OTP onOTPSubmit={handleOTPSubmit} errorOtp={errorOtp} />}
      {showProfile && <Profile onProfileSubmit={handleProfileSubmit} />}
    </>
  );
};

export default Signup;
