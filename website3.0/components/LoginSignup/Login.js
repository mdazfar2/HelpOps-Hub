"use client";

import React, { useEffect, useState } from "react";
import "@stylesheets/login-signup.css";
import Popup from "@components/Popup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";

// Login component definition, receives onClose and onSignupClick as props from AuthButton
const Login = ({ onClose, onSignupClick }) => {
  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allShow, setAllShow] = useState(true);

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
  }, [email, password]);

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
        email: email,
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
        setEmail("");
        setPassword("");
      }, 1000);
      return;
    }

    // Save user details to localStorage
    localStorage.setItem("userName", data.user[0].name);
    localStorage.setItem("userEmail", data.user[0].email);
    localStorage.setItem("image", data.user[0].image1);

    setError(`${data.user[0].name} Welcome !!`);

    // Close the login popup and reload the page after 2 seconds
    setTimeout(() => {
      setError("");
      onClose();
      window.location.reload();
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
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email"
                />
                <div style={{ position: "relative" }}>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <FaEye className="eye1" onClick={toggle} />
                  ) : (
                    <FaEyeSlash className="eye1" onClick={toggle} />
                  )}
                </div>
              </div>
              <div>
                <p className="forgot-password" onClick={forgotPassword}>
                  Forgot Password
                </p>
                <p>New here? &nbsp;
                <span className="login-signup-link" onClick={onSignupClick}>
                  Sign up now
                </span>
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
              </button>
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
            &#10005;
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

export default Login;
