"use client";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Context } from "@context/store";
import { usePathname } from "next/navigation";
function Footer() {
  const pathname = usePathname(); // Get current path
  const isAdmin = pathname && pathname.startsWith("/admin"); // Check if path starts with '/admin'
  const isProfile = pathname && pathname.startsWith("/profile"); // Check if path starts with '/admin'
  const isDevopsForum = pathname && pathname.startsWith("/devopsforum");
  const isCreateForum = pathname && pathname.startsWith("/createforum");
  const isPremium = pathname && pathname.startsWith("/infrawise");

  let { theme } = useContext(Context);
  return (
    <div
      className={`${theme ? "bg-gray-100" : "bg-[#1e1d1d]"} ${
        isAdmin || isProfile || isDevopsForum || isCreateForum ||isPremium? "hidden" : "block"
      } pt-12 pb-6 flex flex-col items-center justify-center text-center w-full transition-colors duration-500`}
    >
      {/* Social media icons */}
      <div className="flex items-center justify-center gap-5 w-full mb-0">
        <a
          href="https://www.linkedin.com/company/HelpOps-Hub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className={`${
              theme
                ? "text-black hover:text-gray-300 hover:shadow-lg"
                : "text-white"
            } p-1 rounded-full text-xl transition-colors duration-500`}
          />
        </a>
        <a
          href="https://discord.gg/UWTrRhqywt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faDiscord}
            className={`${
              theme
                ? "text-black hover:text-gray-300 hover:shadow-lg"
                : "text-white"
            } p-1 rounded-full text-xl transition-colors duration-500`}
          />
        </a>
        <a
          href="https://github.com/mdazfar2/HelpOps-Hub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className={`${
              theme
                ? "text-black hover:text-gray-300 hover:shadow-lg"
                : "text-white"
            } p-1 rounded-full text-xl transition-colors duration-500`}
          />
        </a>
      </div>
      {/* Copyright notice */}
      <p
        className={`${
          theme ? "text-black" : "text-gray-100"
        } font-sans text-xs py-2 font-normal mb-0 transition-colors duration-500`}
      >
        © {new Date().getFullYear()} HelpOps-Hub | MIT License
      </p>
      {/* Developer and contributors */}
      <p
        className={`${
          theme ? "text-black" : "text-gray-100"
        } font-sans text-xs font-normal mb-0 transition-colors duration-500`}
      >
        Developed by{" "}
        <a
          href="https://github.com/mdazfar2"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Azfar Alam
        </a>{" "}
        &{" "}
        <a className="underline" rel="noopener noreferrer" href="/team">
          Open Source Community
        </a>
      </p>
    </div>
  );
}

export default Footer;
