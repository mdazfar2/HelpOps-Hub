"use client";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
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
    <footer
      className={`relative pt-16 pb-6 px-10 ${theme ? "bg-gray-200" : "bg-[#1e1d1d]"} text-gray-600 transition-colors duration-500 ${
        isAdmin || isProfile || isDevopsForum || isCreateForum || isPremium
          ? "hidden"
          : "block"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className={`w-full lg:w-6/12 px-4 ${theme ? "" : "text-white"}`}>
            <h4 className={`text-3xl font-semibold ${theme ? "" : "text-white"}`}>
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond in 1-2 business days.
            </h5>

            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="group bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                type="button"
              >
                <a href="https://www.linkedin.com/in/md-azfar-alam/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>

              <button
                className="group bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                type="button"
              >
                <a href="https://www.github.com/mdazfar2" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>

              <button
                className="group bg-white text-red-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                type="button"
              >
                <a href="mailto:helpopshub@gmail.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>

              <button
                className="group bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                type="button"
              >
                <a href="https://www.helpopshub.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className={`w-full lg:w-4/12 px-4 ml-auto ${theme ? "" : "text-white"}`}>
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="/about"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="/blogs"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="/resources"
                    >
                      Devops Resources
                    </a>
                  </li>
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="https://github.com/mdazfar2/HelpOps-Hub"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>

              <div className={`w-full lg:w-4/12 px-4 ${theme ? "" : "text-white"}`}>
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="https://github.com/mdazfar2/HelpOps-Hub/blob/main/LICENSE"
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="#"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className={`font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                        theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"
                      }`}
                      href="/contact"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className={`text-sm font-semibold py-1 ${theme ? "text-blueGray-500" : "text-white"}`}>
              Copyright © <span id="get-current-year">{new Date().getFullYear()}</span>
              <a
                href="https://www.helpopshub.com"
                className={`${theme ? "hover:text-gray-800" : "hover:text-gray-500"} ml-1`}
                target="_blank"
                rel="noopener noreferrer"
              >
                HelpopsHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
