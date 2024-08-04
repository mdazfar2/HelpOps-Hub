"use client";
import React, { useContext } from "react";
import { Context } from "@context/store";
import { useScroll } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  // Destructure necessary functions and values from context
let { setFinalUser, setIsAdminShow, setIsLogin, theme } = useContext(Context);

// Initialize Next.js router for navigation
let router = useRouter();

// Get the current session status from NextAuth
let session = useSession();

// Function to handle user logout
async function handleLogout() {
  // Hide admin show status
  setIsAdminShow(false);

  // Clear user session and data from local storage
  localStorage.removeItem("loggedin");
  localStorage.removeItem("finalUser");

  // Reset context states related to user and login status
  setFinalUser({});
  setIsLogin(false);

  // Check session status and navigate to appropriate URL
  if (session.status === "authenticated") {
    // If the user is authenticated, log them out on the external authentication service
    router.push("https://www.helpopshub.com/api/auth/signout?csrf=true");
  } else {
    // If the user is not authenticated, redirect them to the home page
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
