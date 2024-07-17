"use client";
import React, { useContext, useRef, useState } from "react";
import { Context } from "@context/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    let ans = true;
    if (finalUser.password.length > 0) {
      let a = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: finalUser.email,
          password: passwordRef.current.value,
        }),
      });
      a = await a.json();
      if (!a.success) {
        ans = false;
      }
    }
    if (ans) {
      await fetch("/api/deleteaccount", {
        method: "POST",
        body: JSON.stringify({
          email: finalUser.email,
        }),
      });
      setIsAdminShow(false);
      localStorage.removeItem("loggedin");
      localStorage.removeItem("finalUser");
      setFinalUser({});
      setIsLogin(false);
      if (session.status === "authenticated") {
        session.status = "unauthenticated";
        router.push("https://www.helpopshub.com/");
      } else {
        router.push("https://www.helpopshub.com/");
      }
    }
  }

  async function handleGoogleDeleteAccount() {
    let ans = true;
    if (finalUser.email ? finalUser.email.length > 0 : false) {
      let a = await fetch("/api/getuserbyemail", {
        method: "POST",
        body: JSON.stringify({
          email: finalUser.email,
        }),
      });
      a = await a.json();
      if (!a.success) {
        ans = false;
      }
    }
    if (ans) {
      await fetch("/api/deleteaccount", {
        method: "POST",
        body: JSON.stringify({
          email: finalUser.email,
        }),
      });
      setIsAdminShow(false);
      localStorage.removeItem("loggedin");
      localStorage.removeItem("finalUser");
      setFinalUser({});
      setIsLogin(false);
      if (session.status === "authenticated") {
        session.status = "unauthenticated";
        router.push("https://www.helpopshub.com/");
      } else {
        router.push("https://www.helpopshub.com/");
      }
    }
  }

  function passwordClose() {
    setIsPassword(false);
  }

  function confirmClose() {
    setDeleteConfirm(false);
  }

  return (
    <div className="relative overflow-hidden w-full h-full bg-gray-100">
      <div className="flex flex-col p-10 w-full h-72 gap-5">
        <div className="text-center text-2xl">
            Profile Settings
        </div>
        <div className="flex mt-5 bg-gray-200 items-center h-20 p-5 w-full justify-between">
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
            <div className="z-500 w-[500px] gap-6 rounded-lg p-6 bg-slate-100 flex flex-col items-center ">
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
