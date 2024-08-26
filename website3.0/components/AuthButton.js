"use client";

import React, { useState, useEffect, useContext } from 'react';
import Profile from '@pages/Profile';
import Login from './LoginSignup/Login';
import Signup from './LoginSignup/Signup';
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';
import { Context } from '@context/store';
import { useSession } from 'next-auth/react';

const AuthButton = () => {
 // State to control the visibility of the authentication modal
const [showAuth, setShowAuth] = useState(false);

// State to toggle between login and signup views
const [isLogin1, setIsLogin1] = useState(true);

// State to manage the profile visibility
const [profile, showProfile] = useState(false);

// State to store the username value for input
let [usernameValue, setusernameValue] = useState('');

// State to manage one-time operations
const [oneTime, setOneTime] = useState('');

// State to control the visibility of the username modal
let [usernameModal, setUsernameModal] = useState(false);

// State to manage the current modal view ('login', 'signup', etc.)
const [currentModal, setCurrentModal] = useState('login');

// State to manage another profile visibility
let [showProfile1, setShowProfile1] = useState(false);

// Context variables for managing user and admin states
let {
  setIsAdminShow,
  finalUser,
  isNotification,
  userName,
  setFinalUser,
  setIsLogin,
  setUserGithub,
  setUserName,
  setUserEmail,
  userImage,
  setUserImage,
  isLogin,
  theme,
  setIsPopup,
  setMsg
} = useContext(Context);

// Router instance for navigation
let router = useRouter();

// Effect to show profile if username is available
useEffect(() => {
  if (userName) {
    showProfile(true);
  }
}, [profile]);

// Handle session and authentication status
let session = useSession();
if (session.status === 'unauthenticated' && !isLogin) {
  setUserEmail('');
  setUserImage('');
  setUserName('');
}

// Function to fetch user data from local storage and server if logged in
async function fetchData1() {
  setIsLogin(true);
  let session = await JSON.parse(localStorage.getItem('finalUser'));

  // Fetch or create account on the server
  let response = await fetch("/api/createaccount", {
    method: "POST",
    body: JSON.stringify({ email: session.email })
  });

  let data = await response.json();
  setFinalUser(data.msg);

  // Update local storage with fetched user data
  localStorage.setItem('finalUser', JSON.stringify(data.msg));
  setIsLogin(true);
}

// Effect to fetch user data if logged in (based on local storage)
useEffect(() => {
  if (localStorage.getItem('loggedin')) {
    fetchData1();
  }
}, []);

// Function to fetch user data from server and handle account setup
async function fetchData() {
  let response = await fetch("/api/createaccount", {
    method: "POST",
    body: JSON.stringify({
      email: session.data.user.email,
      name: session.data.user.name,
      image: session.data.user.image,
      banner: 'https://res.cloudinary.com/dwgd3as6k/image/upload/v1721762646/f3wmliwhhqvwlh5yisnw.png'
    })
  });

  response = await fetch("/api/createaccount", {
    method: "POST",
    body: JSON.stringify({
      email: session.data.user.email,
      name: session.data.user.name,
      image: session.data.user.image,
      banner: 'https://res.cloudinary.com/dwgd3as6k/image/upload/v1721762646/f3wmliwhhqvwlh5yisnw.png'
    })
  });

  let data = await response.json();

  // Check if username is set, if not, show username modal
  if (!data.msg.username) {
    localStorage.setItem("userId1", data.msg._id);
    setUsernameModal(true);
    return;
  }

  // Check if the user is an admin
  if (data.msg.email === process.env.NEXT_PUBLIC_ADMIN_URL) {
    setIsAdminShow(true);
  }

  setFinalUser(data.msg);
  localStorage.setItem('finalUser', JSON.stringify(data.msg));
  setIsLogin(true);
}

// Effect to fetch user data if authenticated
useEffect(() => {
  if (session.status === 'authenticated') {
    if (!oneTime) {
      setOneTime(true);
      fetchData();
      setIsLogin1(true);
    }
  }
}, [session.status, oneTime]);

// Toggle the visibility of the authentication modal
const toggleAuth = () => {
  setShowAuth(!showAuth);
  setCurrentModal('login');
};

// Switch to the signup view
const switchToSignup = () => {
  setIsLogin1(false);
  setCurrentModal('signup');
};

// Switch back to the login view
const onBack = () => {
  setIsLogin1(true);
  setCurrentModal('login');
};

// Switch to the login view
const switchToLogin = () => {
  setIsLogin1(true);
  setCurrentModal('login');
};

// Handle logout and redirection
async function handleLogout() {
  if (session.status === "authenticated") {
    setUserEmail('');
    setUserImage('');
    setUserName('');
    router.push('https://www.helpopshub.com/api/auth/signout?csrf=true');
  }
  setUserEmail('');
  setUserImage('');
  setUserName('');
  window.location.reload();
}

// Close authentication modal
const closeAuth = () => {
  if (['login', 'signup'].includes(currentModal)) {
    setShowAuth(false);
    setIsLogin1(true);
    setCurrentModal('login');
  }
};

// Show profile modal
function handleProfileShow() {
  setShowProfile1(true);
}

// Close profile modal
function closeProfile() {
  setShowProfile1(false);
}

// Handle OTP modal display
const handleOTPStart = () => {
  setCurrentModal('otp');
};

// Handle profile modal display
const handleProfileStart = () => {
  setCurrentModal('profile');
};

// Fetch user data based on username and update profile
async function getUser(name) {
  let user = await fetch("/api/getuser", {
    method: "POST",
    body: JSON.stringify({ username: name })
  });

  let data = await user.json();

  // Check if username is set, if not, show username modal
  if (!data.msg.username) {
    localStorage.setItem("userId1", data.msg._id);
    setUsernameModal(true);
    return;
  }

  // Check if the user is an admin
  if (data.msg.email === process.env.NEXT_PUBLIC_ADMIN_URL) {
    setIsAdminShow(true);
  }

  setFinalUser(data.msg);
  localStorage.setItem('finalUser', JSON.stringify(data.msg));
  setIsLogin(true);
  setUsernameModal(false);
}

// Handle profile completion and modal close
const handleProfileComplete = () => {
  setShowAuth(false);
  setCurrentModal('login');
};

// Check if a username is available and handle account creation
async function handleCheckUsername() {
  let response = await fetch('/api/checkusername', {
    method: "POST",
    body: JSON.stringify({ username: usernameValue,id:finalUser._id})
  });

  let canCreate = await response.json();
  if (!canCreate.success) {
    setIsPopup(true);
    setMsg("This Username is Not Available");
    return;
  }

  // Update username if available
  response = await fetch('/api/checkusername', {
    method: "PUT",
    body: JSON.stringify({
      username: usernameValue,
      id: localStorage.getItem('userId1')
    })
  });

  localStorage.removeItem('userId1');
  getUser(usernameValue);
  return;
}

// Effect to monitor notifications (currently does nothing)
useEffect(() => {
}, [isNotification]);
  return (
    <>
      {!isLogin && userName.length == 0 && <button className={` ${theme ? "bg-gray-100/80 text-black border-none" : "text-white bg-black border-white border"} auth-btn`} onClick={toggleAuth}>Login/Signup</button>}
      {isLogin && <div className={`auth-btn relative ${theme ? "bg-gray-100/80 text-black border-none" : "text-white bg-black border-white border"}`} onClick={() => router.push(`/profile?id=${finalUser.username || finalUser._id}`)}>{isNotification && <span className='h-[14px] block rounded-full absolute top-[1%] right-[0px] w-[14px] bg-red-500'></span>}Profile</div>}
      {showProfile1 && isLogin && 
        <div className="auth-overlay">
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <UserProfile onClose={closeProfile} onLogout={handleLogout} />
          </div>
        </div>
      }
      {usernameModal && 
        <div className="auth-overlay" onClick={['login', 'signup'].includes(currentModal) ? closeAuth : undefined}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className={`bg-[rgba(255, 255, 255, 1)] border-dashed border-[2px] ${theme ? "bg-slate-100 border-black" : "bg-[#0f0c0c] whiteshadow border-white"} p-5 border-rounded1 lg:w-[500px] md:w-[500px] max-sm:h-auto w-[96vw] relative select`}>
              <h1 className={`text-center mt-[5px] ${theme ? "text-black" : "text-white"} text-[22px] font-bold max-sm:mt-[20px]`}>Please Enter Username</h1>
              <div>
                <input
                  type="text"
                  onChange={(e) => setusernameValue(e.target.value)}
                  value={usernameValue}
                  className={`md:w-[65%] p-[10px] mb-[10px] border-b-2 bg-none background-none text-black md:ml-[70px] max-sm:w-[100%] rounded-none ${theme ? "border-gray-500" : "border-white text-white"} border-[#837b7b] m-auto input-place`}
                  placeholder="Enter your Username"
                />
              </div>
              <button
                className={`w-[120px] h-[52px] flex justify-center content-center items-center p-2 relative md:left-[100px] bg-[#098CCD] text-white mt-4 rounded-[18px] cursor-pointer md:ml-[40%] gap-[18px] text-[19px] ${theme ? "bg-[#098CCD] border-none" : "bg-[#272525] border-white border whiteshadow"} max-sm:m-[auto] max-sm:mt-[20px] font-semibold`}
                onClick={handleCheckUsername}
              >
                Submit &nbsp;
              </button>
            </div>
          </div>
        </div>
      }
      {showAuth && !userName && (
        <div className="auth-overlay" onClick={['login', 'signup'].includes(currentModal) ? closeAuth : undefined}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            {isLogin1 ? (
              <Login onClose={closeAuth} onSignupClick={switchToSignup} />
            ) : (
              <Signup 
                onClose={closeAuth} 
                onBack={onBack} 
                onLoginClick={switchToLogin} 
                onOTPStart={handleOTPStart}
                onProfileStart={handleProfileStart}
                onProfileComplete={handleProfileComplete}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;
