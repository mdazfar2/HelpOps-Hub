"use client";

import React, { useEffect, useState } from "react";
import "../../stylesheets/login-signup.css";
import Popup from "../Popup";
import Popup1 from "../Popup1";
import { signIn, useSession } from "next-auth/react";
import OTP from "@pages/OTP";
import Profile from "@pages/Profile";

// Signup component definition, receives onClose and onLoginClick as props from AuthButton.js
const Signup = ({ onClose, onLoginClick }) => {
  const session = useSession(); // Retrieves the current session
  const [showOTP, setShowOTP] = useState(false); // State to show/hide OTP input
  const [showProfile, setShowProfile] = useState(false); // State to show/hide Profile input
  const [email, setEmail] = useState(""); // State to store user email input
  const [error, setError] = useState(""); // State to hold error messages
  const [errorOtp, setErrorOtp] = useState(false); // State to hold OTP error messages
  let [loading, setLoading] = useState(false); // State to indicate loading status
  const [popup, setPopup] = useState(false); // State to show/hide popup

  // useEffect hook to handle Enter key press for continue
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
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
      localStorage.setItem("email", email);
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
    return <Profile onSubmit={handleProfileSubmit} onClose={onClose} />;
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
        />
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
      <p> Already have an account? &nbsp;
        <span className="login-signup-link" onClick={onLoginClick}>
          Login
        </span>
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

export default Signup;
