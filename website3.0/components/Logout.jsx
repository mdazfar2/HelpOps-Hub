"use client";
import React, { useContext } from "react";
import { Context } from "@context/store";
import { useScroll } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  let { setFinalUser, setIsAdminShow, setIsLogin, theme } = useContext(Context);
  let router = useRouter();
  let session = useSession();
  async function handleLogout() {
    setIsAdminShow(false);
    localStorage.removeItem("loggedin");
    localStorage.removeItem("finalUser");
    setFinalUser({});
    setIsLogin(false);
    if (session.status == "authenticated") {
      router.push("https://www.helpopshub.com/api/auth/signout?csrf=true");
    } else {
      router.push("https://www.helpopshub.com");
    }
  }
  return (
    <button
      className={`w-28 h-12 flex justify-center items-center p-2 relative  ${
        theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
      }  border-none rounded-2xl cursor-pointer m-auto text-base `}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
