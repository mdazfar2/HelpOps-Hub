"use client";
import React, { useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Context } from "@context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faGraduationCap,
  faMessage,
  faSearch,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
function CreateForum() {
  const { theme } = useContext(Context);
  const [activeSection, setActiveSection] = useState("title");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.style.visibility = 'visible';
      toolbar.style.background = 'transparent';
    }
  }, []);
  const renderSection = () => {
    switch (activeSection) {
      case "title":
        return (
          <div className="my-10 w-[80%] m-auto">
            <div className="text-xl my-5 px-3 text-center">
              What is Your Question About ?
            </div>
            <input
              type="text"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-gray-200 rounded-3xl focus:outline-none"
            />
            <div className="flex justify-between mt-4">
              <div></div>
              <div
                className="w-20 rounded-xl h-12 flex justify-center items-center text-white bg-[#6089a4] cursor-pointer"
                onClick={() => setActiveSection("content")}
              >
                Next
              </div>
            </div>
          </div>
        );
      case "content":
        return (
          <>
            <div className="my-10 w-[80%] m-auto">
              <div className="text-xl my-5 px-3 text-center">
                Ask Your Question
              </div>
              <div className="w-full bg-gray-200 min-h-96 rounded-3xl relative overflow-hidden">
                <ReactQuill
                  className="h-[340px] !visible !bg-transparent"
                  value={content}
                  onChange={setContent}
                />
              </div>
            </div>
            <div className="w-[80%] m-auto flex justify-between my-10 items-center cursor-pointer">
              <div className="underline">Save Draft</div>
              <div className="flex gap-4">
                <div
                  className="w-20 rounded-xl h-12 flex justify-center items-center text-[#6089a4] border-[#6089a4] border-2 cursor-pointer"
                  onClick={() => setActiveSection("title")}
                >
                  Prev
                </div>
                <div
                  className="w-20 rounded-xl h-12 flex justify-center items-center text-white bg-[#6089a4]"
                  onClick={() => setActiveSection("member")}
                >
                  Next
                </div>
              </div>
            </div>
          </>
        );
      case "member":
        return (
          <div className="my-10 w-[80%] m-auto text-center">
            <div className="text-sm mb-4 text-left bg-white leading-10 shadow-lg rounded-xl p-4">
              Thank you for sharing your DevOps-related query in our forum! We
              would appreciate it if you could:
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Become a Member:</strong> Join our community to unlock
                  full potential and enjoy exclusive benefits.
                </li>
                <li>
                  <strong>Give Us a Star on GitHub:</strong> Show your support
                  by starring our project on{" "}
                  <a
                    href="https://github.com/mdazfar2/HelpOps-Hub"
                    className="text-blue-500 underline"
                    target="__blank"
                  >
                    GitHub
                  </a>
                  .
                </li>
                <li>
                  <strong>Stay Connected:</strong> Follow us on social media to
                  stay updated with the latest news and updates.
                </li>
                <li>
                  <strong>Contribute:</strong> Share your knowledge and insights
                  with fellow DevOps enthusiasts.
                </li>
              </ul>
              Empower yourself with HelpOps-Hub—your comprehensive,
              community-driven platform for mastering DevOps.
            </div>

            <div className="flex justify-between mt-4">
              <div
                className="w-20 rounded-xl h-12 flex justify-center items-center text-white bg-[#6089a4] cursor-pointer"
                onClick={() => setActiveSection("content")}
              >
                Prev
              </div>
              <div
                className="w-20 rounded-xl h-12 flex justify-center items-center text-white bg-[#6089a4] cursor-pointer"
                onClick={() => setActiveSection("post")}
              >
                Next
              </div>
            </div>
          </div>
        );
      case "post":
        return (
          <div className="my-10 w-[80%] m-auto">
              <div className="text-xl my-5 px-3 text-center">
                Post Your Question
              </div>
            <div className="bg-white shadow-md rounded-xl p-4">
              <div className="mb-4">
                <strong>Title:</strong> {title}
              </div>
              <div className="mb-4">
                <strong>Content:</strong>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div
                className="w-20 rounded-xl h-12 flex justify-center items-center text-white bg-[#6089a4] cursor-pointer"
                onClick={() => setActiveSection("member")}
              >
                Prev
              </div>
              <div
                className="w-20 rounded-xl h-12 flex justify-center items-center text-white bg-[#6089a4] cursor-pointer"
                onClick={() => alert("Posted!")}
              >
                Post
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepClass = (section) =>
    activeSection === section
      ? "bg-[#6089a4] border-[#6089a4] text-white"
      : "bg-gray-200 border-gray-200 text-[#6089a4]";

  return (
    <div className="min-h-screen pt-24">
      <div className="w-full h-12 bg-[#6089a4] text-white text-lg flex justify-center items-center font-extralight">
        Join the Helpops Community and Receive Help from DevOps Experts
      </div>
      <div>
        <div className="w-full mt-10 gap-3 flex justify-center items-center">
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="text-gray-400 text-3xl"
          />
          <div className="text-2xl">Ask a Question</div>
        </div>
        <div className="text-sm flex justify-center items-center mb-10 mt-2">
          Curious? Ask away and unlock expert insights!
        </div>
        <div>
          <div className="w-full flex justify-center items-center gap-6 my-10">
            <div className="flex flex-col justify-center items-center gap-2">
              <div
                className={`rounded-full w-12 h-12 flex justify-center items-center relative ${getStepClass(
                  "title"
                )}`}
              >
                <FontAwesomeIcon icon={faSearch} className="text-sm absolute" />
                <FontAwesomeIcon icon={faMessage} className="text-2xl" />
              </div>
              <div className="font-bold">Ask a Question</div>
            </div>

            <div className="items-center justify-center w-96 border-[1px] border-blue-500 border-dashed flex"></div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div
                className={`border-2 rounded-full w-12 h-12 flex justify-center items-center relative ${getStepClass(
                  "member"
                )}`}
              >
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="text-sm absolute"
                />
              </div>
              <div className="font-bold">Become a Member</div>
            </div>
            <div className="items-center justify-center w-96 border-[1px] border-blue-500 border-dashed flex"></div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div
                className={`border-2 rounded-full w-12 h-12 flex justify-center items-center relative ${getStepClass(
                  "post"
                )}`}
              >
                <FontAwesomeIcon icon={faGlobe} className="text-sm absolute" />
              </div>
              <div className="font-bold">Post Publicly</div>
            </div>
          </div>
        </div>
        {renderSection()}
      </div>

      <footer
        className={`relative pt-16 pb-6 ${
          theme ? "bg-gray-200" : "bg-[#1e1d1d]"
        } max-sm:px-2 text-gray-600 px-10`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4 max-sm:px-0">
              <h4
                className={`text-3xl font-semibold ${
                  theme ? "" : "text-white"
                } text-blueGray-700`}
              >
                Let's keep in touch!
              </h4>
              <h5
                className={`text-lg ${
                  theme ? "" : "text-white"
                } mt-0 mb-2 text-blueGray-600`}
              >
                Find us on any of these platforms, we respond in 1-2 business
                days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </button>
                <button
                  className="bg-white text-red-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
                <button
                  className="bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faGlobe} />
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4 max-sm:px-0">
              <div className="flex flex-wrap items-top mb-6">
                <div
                  className={`w-full max-sm:flex flex-wrap lg:w-4/12 px-4 ml-auto ${
                    theme ? "" : "text-gray-200"
                  } `}
                >
                  <span className="block max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <span className="block max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      About Us
                    </a>
                  </span>
                  <span className="block max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Blog
                    </a>
                  </span>
                  <span className="block max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Github
                    </a>
                  </span>
                  <span className="block max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      DevOps Resources
                    </a>
                  </span>
                </div>
                <div
                  className={` max-sm:flex flex-wrap w-full lg:w-4/12 px-4 o ${
                    theme ? "" : "text-gray-200"
                  } `}
                >
                  <span className="block max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <span className="block  max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      MIT License
                    </a>
                  </span>
                  <span className="block  max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Terms &amp; Conditions
                    </a>
                  </span>
                  <span className="block  max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </span>
                  <span className="block  max-sm:w-[50%] uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div
                className={`text-sm text-blueGray-500 font-semibold py-1 o ${
                  theme ? "" : "text-gray-200"
                } `}
              >
                Copyright © <span id="get-current-year">2024</span>
                <a
                  href="#"
                  className="text-blueGray-500 hover:text-gray-800"
                  target="_blank"
                >
                  {" "}
                  HelpopsHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CreateForum;
