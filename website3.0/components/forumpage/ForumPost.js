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
const Tag = ({ name }) => (
  <div className="bg-gray-200 px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-500">
    {name}
  </div>
);
function ForumPost() {
  return (
    <div className="mt-20 overflow-x-hidden">
      <div className="h-80 bg-gray-200 px-10 pt-20 relative">
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Search for Topics..."
            className="py-3 shadow-md px-4 border rounded-full w-full z-50 max-w-md focus:outline-none"
          />
          <div className="text-black mt-4">
            Popular Searches: Docker, Azure, CI/CD
          </div>
        </div>
        <img src="/forum.png" alt="img" className="w-[95%] absolute bottom-0" />
      </div>
      <div className="px-10 flex mt-24 justify-center gap-10 min-h-screen w-full">
        <div className="w-[75%]">
          <div className="flex w-full justify-between">
            <div className="flex gap-5">
              <img
                src="https://randomuser.me/api/portraits/men/5.jpg"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div className="text-lg">
                <div>Billy Woosh</div>
                <div className="flex gap-5 text-sm text-gray-500">
                  <div>
                    <FontAwesomeIcon icon={faCoffee} /> Conversation Starter
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCalendar} /> January 16 at 10:32 PM
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#6089a4] px-5 py-3 text-white">
                Ask Question
              </div>
            </div>
          </div>
          <div className="mt-10 flex text-gray-600 gap-4">
            <div className="text-5xl font-bold">Q:</div>
            <div className="mt-2">
              <div className="text-3xl font-bold">
                Sticky navbar is shown, but state is inactive
              </div>
              <div className="text-base mt-5 text-justify">
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
                <div className="min-h-96 w-full bg-[#eeeeee] p-8">
                  <div className="flex w-full justify-between">
                    <div className="flex gap-5">
                      <img
                        src="https://randomuser.me/api/portraits/men/6.jpg"
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-lg">
                        <div>Jack Frost</div>
                        <div className="flex gap-5 text-sm text-gray-500">
                          <div>
                            <FontAwesomeIcon icon={faCoffee} /> Conversation
                            Starter
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faCalendar} /> January 16 at
                            10:32 PM
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" text-green text-sm flex gap-2 items-center text-green-500">
                      <FontAwesomeIcon icon={faCheck} /> Accepted Solution
                    </div>
                  </div>
                  <div className="mt-10 flex text-gray-600 gap-4">
                    <div className="text-5xl font-bold">A:</div>
                    <div className="">
                      <div className="text-base text-justify">
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
                <div className="text-xl font-medium">All Replies</div>
                <div className="min-h-16 rounded-md border border-[#d3cabd] flex items-center px-10 mt-10 justify-between w-full bg-[#e3e3e3]">
                  <div>Sort By</div>
                  <div>Page 1 to 4</div>
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
                        <div>{reply.username}</div>
                        <div className="flex gap-5 text-sm text-gray-500">
                          <div>
                            <FontAwesomeIcon icon={faCoffee} /> {reply.role}
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faCalendar} /> {reply.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">{reply.replyText}</div>
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
        <div className="w-[20%]">
          <div className="text-2xl font-bold">Tags</div>
          <div>
            <div className="mt-10 max-xl:hidden">
              <div className="flex flex-wrap mt-5 gap-4">
                {tags.map((tag, index) => (
                  <Tag key={index} name={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="relative pt-16 pb-6 bg-gray-200 text-gray-600 mt-16 px-10">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap text-left lg:text-left">
            <div class="w-full lg:w-6/12 px-4">
              <h4 class="text-3xl font-semibold text-blueGray-700">
                Let's keep in touch!
              </h4>
              <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms, we respond in 1-2 business
                days.
              </h5>
              <div class="mt-6 lg:mb-0 mb-6">
                <button
                  class="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </button>
                <button
                  class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </button>
                <button
                  class="bg-white text-red-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
                <button
                  class="bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <FontAwesomeIcon icon={faGlobe} />
                </button>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="flex flex-wrap items-top mb-6">
                <div class="w-full lg:w-4/12 px-4 ml-auto">
                  <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul class="list-unstyled">
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
                  </ul>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul class="list-unstyled">
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-300" />
          <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
              <div class="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2024</span>
                <a
                  href="#"
                  class="text-blueGray-500 hover:text-gray-800"
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
