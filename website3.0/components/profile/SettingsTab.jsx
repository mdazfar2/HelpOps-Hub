"use client";
import React, { useContext, useRef, useState } from "react";
import { Context } from "@context/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logout from "./Logout";

function SettingsTab() {
  const {
    theme,
    finalUser,
    setFinalUser,
    setIsAdminShow,
    setIsLogin,
    setMsg,
    setIsPopup,
  } = useContext(Context);
  const confirmRef = useRef();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const passwordRef = useRef();
  const session = useSession();
  const router = useRouter();

  async function handle() {
    if (finalUser && finalUser.password) {
      setIsPassword(true);
    } else {
      setDeleteConfirm(true);
    }
  }

  async function handleDeleteAccount() {
    try {
      let ans = true;
  
      // Verify user password if provided
      if (finalUser.password.length > 0) {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: finalUser.email,
            password: passwordRef.current.value,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        if (!result.success) {
          ans = false;
        }
      }
  
      // Proceed with account deletion if verification is successful
      if (ans) {
        const deleteResponse = await fetch("/api/deleteaccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: finalUser.email,
          }),
        });
  
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
        }
  
        setIsAdminShow(false);
        localStorage.removeItem("loggedin");
        localStorage.removeItem("finalUser");
        setFinalUser({});
        setIsLogin(false);
  
        if (session.status === "authenticated") {
          session.status = "unauthenticated";
        }
        
        router.push("https://www.helpopshub.com/");
      }
    } catch (error) {
      console.error('Error handling account deletion:', error);
      // Optionally, you can set an error state here to display a message to the user
      // setError(error.message); // Example of setting an error state
    }
  }
  

  async function handleGoogleDeleteAccount() {
    try {
      let ans = true;
  
      // Verify user email if provided
      if (finalUser.email?.length > 0) {
        const response = await fetch("/api/getuserbyemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: finalUser.email,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        if (!result.success) {
          ans = false;
        }
      }
  
      // Proceed with account deletion if verification is successful
      if (ans) {
        const deleteResponse = await fetch("/api/deleteaccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: finalUser.email,
          }),
        });
  
        if (!deleteResponse.ok) {
          throw new Error(`HTTP error! Status: ${deleteResponse.status}`);
        }
  
        setIsAdminShow(false);
        localStorage.removeItem("loggedin");
        localStorage.removeItem("finalUser");
        setFinalUser({});
        setIsLogin(false);
  
        if (session.status === "authenticated") {
          session.status = "unauthenticated";
        }
        
        router.push("https://www.helpopshub.com/");
      }
    } catch (error) {
      console.error('Error handling Google account deletion:', error);
      // Optionally, you can set an error state here to display a message to the user
      // setError(error.message); // Example of setting an error state
    }
  }
  

  function passwordClose() {
    setIsPassword(false);
  }

  function confirmClose() {
    setDeleteConfirm(false);
  }

  return (
    <div className={`${theme? "bg-gray-100 text-black": "bg-[#111111] text-white"} relative overflow-hidden w-full h-full`}>
      <div className="flex flex-col p-10 w-full h-84 gap-5">
        <div className="text-center text-2xl">
            Profile Settings
        </div>
        <div className={`${theme? "bg-gray-200 text-black": "bg-[#393939] text-white"} flex mt-5 items-center h-20 p-5 w-full justify-between`}>
          <div className="text-xl">Logout</div>
          <div className="">{<Logout />}</div>
        </div>
        <div className={`${theme? "bg-gray-200 text-black": "bg-[#393939] text-white"} flex mt-5 items-center h-20 p-5 w-full justify-between`}>
          <div className="text-xl">Delete Your Account</div>
          <button
            className={` w-28 text-center h-12 p-2 ${
              theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
            }  border-none rounded-2xl cursor-pointer text-base`}
            onClick={handle}
          >
            Delete
          </button>
        </div>
      </div>
      {isPassword && (
        <div className="auth-overlay">
          <div
            className="auth-modal z-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="z-500 w-[500px] gap-6 rounded-lg p-6 bg-slate-100 flex flex-col items-center ">
              <h1>Please Enter Password</h1>
              <input
                className="w-[90%] bg-transparent border-b-black border-b-[1px] focus:outline-none"
                ref={passwordRef}
                type="password"
              ></input>
              <button
                onClick={handleDeleteAccount}
                className={` w-28 h-12 p-2 ${
                  theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
                }  border-none rounded-2xl cursor-pointer text-base`}
              >
                Submit
              </button>
            </div>
          </div>
          <div
            onClick={passwordClose}
            className="fixed  z-0 top-0 left-0 h-[100vh] w-[100vw] opacity-35 bg-black"
          ></div>
        </div>
      )}
      {deleteConfirm && (
        <div className="auth-overlay">
          <div
            className="auth-modal z-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${theme ? "bg-white text-black" : "bg-[#1e1d1d] "}z-500 w-[500px] gap-6 rounded-lg p-6 flex flex-col items-center`}>
              <h1>Type "Confirm" to Delete Your Account</h1>
              <input
                className="w-[90%] bg-transparent border-b-black border-b-[1px] focus:outline-none"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              ></input>
              <button
                onClick={() => {
                  if (confirmText.toLowerCase() === "confirm") {
                    handleGoogleDeleteAccount();
                  } else {
                    setMsg("Please type 'confirm' to proceed.");
                    setIsPopup(true);
                  }
                }}
                className={` w-28 h-12 p-2 ${
                  theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
                }  border-none rounded-2xl cursor-pointer text-base`}
              >
                Submit
              </button>
            </div>
          </div>
          <div
            onClick={confirmClose}
            className="fixed  z-0 top-0 left-0 h-[100vh] w-[100vw] opacity-35 bg-black"
          ></div>
        </div>
      )}
    </div>
  );
}

export default SettingsTab;
