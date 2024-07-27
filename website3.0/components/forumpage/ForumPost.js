import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCheck,
  faCoffee,
  faTags,
  faReply,
  faThumbsUp,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const tags = [
  "Docker",
  "Devops",
  "Azure",
  "Ubuntu",
  "NeedHelp",
  "Dockerization",
  "CI/CD",
  "AWS",
  "Kubernetes",
];
const replies = [
  {
    username: "Jimmy Williams",
    userImg: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Conversation Starter",
    date: "January 16 at 10:32 PM",
    replyText:
      "I had a similar issue with the sticky navbar. Make sure the CSS properties are correctly applied and there's no conflicting CSS.",
  },
  {
    username: "Linda Seph",
    userImg: "https://randomuser.me/api/portraits/men/2.jpg",
    role: "Moderator",
    date: "February 20 at 5:14 PM",
    replyText:
      "Check your JavaScript for errors and ensure that the scripts related to the navbar are functioning properly.",
  },
  {
    username: "Max Warner",
    userImg: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "Newbie",
    date: "February 27 at 3:00 PM",
    replyText:
      "I had to test my navbar in different browsers to find out it was a compatibility issue. Try that!",
  },
  {
    username: "Hunter Phillips",
    userImg: "https://randomuser.me/api/portraits/men/4.jpg",
    role: "Newbie",
    date: "January 16 at 10:32 PM",
    replyText:
      "If you're using a framework, ensure it supports sticky positioning. That was the fix in my case.",
  },
];
const Tag = ({ name ,theme}) => (
  <div className={`${theme?"bg-gray-200 text-gray-700 ":"bg-[#2c303a] text-gray-100"} px-4 py-1 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-500`}>
    {name}
  </div>
);
function ForumPost({theme}) {
  return (
    <div className="mt-20 overflow-x-hidden">
      <div className={`h-80 ${
          theme ? "bg-gray-200" : "bg-[#212020]"
        }  px-10 max-md:px-5 max-sm:px-2 pt-20 relative`}>
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Search for Topics..."
            className="py-3 shadow-md px-4 border rounded-full w-full z-50 max-w-md focus:outline-none"
          />
          <div className={` ${theme?"text-black":"text-white"} mt-4`}>
            Popular Searches: Docker, Azure, CI/CD
          </div>
        </div>
        <img src="/forum.webp" alt="img" className="w-[95%] absolute bottom-0" />
      </div>
      <div className={`px-10 flex pt-24 pb-16 justify-center gap-10 min-h-screen w-full max-md:pl-[0.4rem] max-md:mr-[0.2rem] max-md:px-4 flex-wrap ${theme?"bg-white":"bg-[#1e1d1d]"}`}>
        <div className="w-[75%] max-md:w-[99%]">
          <div className="flex w-full justify-between  max-md:flex-wrap">
            <div className="flex gap-5">
              <img
                src="https://randomuser.me/api/portraits/men/5.jpg"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div className="text-lg">
                <div className={`${theme?"":"text-white"}`}>Billy Woosh</div>
                <div className="flex gap-5 text-sm text-gray-500">
                  <div className={`${theme?"":"text-[#767677]"}`}>
                    <FontAwesomeIcon icon={faCoffee} /> Conversation Starter
                  </div>
                  <div  className={`${theme?"":"text-[#767677]"}`}>
                    <FontAwesomeIcon icon={faCalendar} /> January 16 at 10:32 PM
                  </div>
                </div>
              </div>
            </div>
            <div className={`max-md:mt-[30px] max-md:mr-[0px]`}>
              <div className="bg-[#6089a4] px-5 py-3 text-white">
                Ask Question
              </div>
            </div>
          </div>
          <div className="mt-10 flex text-gray-600 gap-4">
            <div className="text-5xl font-bold max-md:hidden">Q:</div>
            <div className="mt-2">
              <div className={`${theme?"":"text-white"} text-3xl max-md:flex font-bold`}>
              <span className="text-4xl hidden max-md:block font-bold w-[100px]">Q :</span>  Sticky navbar is shown, but state is inactive
              </div>
              <div className={`${theme?"":"text-gray-300"} max-md:pl-[64px] text-base mt-5  text-justify`}>
                The sticky navbar is displayed, but it remains inactive. This
                issue has been causing quite a bit of frustration. Despite
                attempting multiple solutions, the navbar stubbornly refuses to
                become functional. This seems to be a common issue, as others
                have reported similar problems in various forums. I've ensured
                that the CSS properties for the sticky behavior are correctly
                applied and have verified that the JavaScript is executed as
                expected. Despite these efforts, the state of the navbar doesn't
                change when it should, remaining static and unresponsive.
                <br />
                <br />
                To provide more context, I've tried various debugging
                techniques, including checking for conflicting CSS rules and
                ensuring that there are no JavaScript errors in the console.
                I've also experimented with different libraries and frameworks
                to see if they might offer a solution, but the problem persists.
                It's possible that there is an underlying issue in the way the
                components are structured or in the interaction between the
                different elements of the page. If anyone has encountered this
                issue before or has suggestions on how to resolve it, your
                assistance would be greatly appreciated. This has been a
                challenging problem, and any insights or advice would be
                invaluable. Thank you in advance for your help!
              </div>

              <div className="mt-10 flex gap-2 text-gray-500 items-center">
                <FontAwesomeIcon icon={faTags} />
                Bug,Feature,Error
              </div>
              <hr className="border-[1px] border-gray-300 mt-5" />
              <div className="flex gap-5 mt-5">
                <div className="bg-[#6089a4] px-4 py-1 rounded-md text-base text-white">
                  Reply
                </div>
                <div className="border-[#6089a4] px-4 py-1 rounded-md text-base text-[#6089a4] border-2">
                  I have this Question Too
                </div>
              </div>
              <div className="mt-10">
                <div className={`min-h-96 w-full ${theme?"bg-[#eeeeee]":"bg-[#383838] rounded-md "} p-8`}>
                  <div className="flex w-full justify-between flex-wrap">
                    <div className="flex gap-5">
                      <img
                        src="https://randomuser.me/api/portraits/men/6.jpg"
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-lg">
                        <div className={`${theme?"":"text-white"}`}>Jack Frost</div>
                        <div className="flex gap-5 text-sm text-gray-500">
                          <div className={`${theme?"":"text-gray-300"}`}>
                            <FontAwesomeIcon icon={faCoffee} /> Conversation
                            Starter
                          </div>
                          <div className={`${theme?"":"text-gray-300"}`}>
                            <FontAwesomeIcon icon={faCalendar} /> January 16 at
                            10:32 PM
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="max-md:mt-[20px] text-green text-sm flex gap-2 items-center text-green-500">
                      <FontAwesomeIcon icon={faCheck} /> Accepted Solution
                    </div>
                  </div>
                  <div className="mt-10 flex text-gray-600 gap-4">
                    <div className={`${theme?"":"text-white"} text-5xl font-bold`}>A:</div>
                    <div className="">
                      <div className={`${theme?"":"text-gray-300"} text-base text-justify`}>
                        Hi, I understand the frustration with the sticky navbar
                        remaining inactive. Here are a few steps you can follow
                        to troubleshoot and potentially fix the issue:
                        <br />
                        <br />
                        <strong>Step 1</strong> - Ensure that the CSS properties
                        for the sticky behavior are correctly applied. The CSS
                        should include <code>position: -webkit-sticky;</code>,{" "}
                        <code>position: sticky;</code>, and a top value like{" "}
                        <code>top: 0;</code>.
                        <br />
                        <strong>Step 2</strong> - Check for any conflicting CSS
                        rules that might be overriding the sticky behavior. Use
                        browser developer tools to inspect the navbar element
                        and ensure no other styles are interfering.
                        <br />
                        <strong>Step 3</strong> - Verify that JavaScript is not
                        interfering with the sticky behavior. Make sure there
                        are no JavaScript errors in the console and that any
                        scripts related to the navbar are functioning correctly.
                        <br />
                        <strong>Step 4</strong> - Test the navbar in different
                        browsers to rule out browser-specific issues. Sometimes,
                        sticky behavior might work in one browser but not in
                        another due to compatibility issues.
                        <br />
                        <strong>Step 5</strong> - If you are using a framework
                        or library, ensure that it supports sticky positioning
                        and that there are no known issues with the version you
                        are using.
                        <br />
                        <br />
                        I hope these steps help you resolve the issue. If the
                        problem persists, please provide more details or code
                        snippets, and I'll be happy to assist further.
                        <br />
                        <br />
                        Thanks!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className={`text-xl font-medium ${theme?"":"text-gray-200"}` }>All Replies</div>
                <div className={`min-h-16 rounded-md border border-[#d3cabd] flex items-center px-10 mt-10 justify-between w-full ${theme?"bg-[#e3e3e3]":"bg-[#383838]"}`}>
                  <div className={`${theme?"":"text-gray-300"}`}>Sort By</div>
                  <div className={`${theme?"":"text-gray-300"}`}>Page 1 to 4</div>
                </div>
              </div>
              <div className="mt-10 min-h-96">
                {replies.map((reply, index) => (
                  <div
                    key={index}
                    className="relative group mt-8 cursor-pointer"
                  >
                    <div className="flex gap-5">
                      <img
                        src={reply.userImg}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-lg">
                        <div className={`${theme?"":"text-white"}`}>{reply.username}</div>
                        <div className="flex gap-5 text-sm text-gray-500">
                          <div className={`${theme?"":"text-gray-300"}`}>
                            <FontAwesomeIcon icon={faCoffee} /> {reply.role}
                          </div>
                          <div className={`${theme?"":"text-gray-300"}`}>
                            <FontAwesomeIcon icon={faCalendar} /> {reply.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${theme?"":"text-gray-300"} mt-5`}>{reply.replyText}</div>
                    <div className="absolute bottom-0 right-0 flex gap-2 p-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white rounded-md shadow-md transition-all duration-300">
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-1">
                        <FontAwesomeIcon icon={faReply} /> Reply
                      </button>
                      <button className="bg-[#6089a4] text-white px-4 py-2 rounded-md flex items-center gap-1">
                        <FontAwesomeIcon icon={faThumbsUp} /> Helpful
                      </button>
                    </div>
                    <hr className="border-[1px] border-gray-200 mt-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20%] max-md:w-[100%]">
          <div className={`${theme?"":"text-white"} text-2xl font-bold`}>Tags</div>
          <div>
            <div className="mt-10 ">
              <div className="flex flex-wrap mt-5 gap-4">
                {tags.map((tag, index) => (
                  <Tag key={index} theme={theme} name={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className={`relative pt-16 pb-6 ${theme?"bg-gray-200":"bg-[#1e1d1d]"} max-sm:px-2 text-gray-600 px-10`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4 max-sm:px-0">
              <h4 className={`text-3xl font-semibold ${theme?"":"text-white"} text-blueGray-700`}>
                Let's keep in touch!
              </h4>
              <h5 className={`text-lg ${theme?"":"text-white"} mt-0 mb-2 text-blueGray-600`}>
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
                <div className={`w-full max-sm:flex flex-wrap lg:w-4/12 px-4 ml-auto ${theme?"":"text-gray-200"} ` }>
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
                        Devops Resources
                      </a>
                  </span>
                  {/* <ul class="list-unstyled">
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Devops Resources
                      </a>
                    </li>
                  </ul> */}
                </div>
                <div className={ ` max-sm:flex flex-wrap w-full lg:w-4/12 px-4 o ${theme?"":"text-gray-200"} ` }>
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
              <div className={`text-sm text-blueGray-500 font-semibold py-1 o ${theme?"":"text-gray-200"} ` }>
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

export default ForumPost;
