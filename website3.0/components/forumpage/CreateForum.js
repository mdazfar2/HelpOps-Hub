"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
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
import { useRouter } from "next/navigation";
function CreateForum() {
  let [selectedTags,setSelectedTags]=useState([])

  const { theme ,finalUser} = useContext(Context);
  const [activeSection, setActiveSection] = useState("title");
  let router=useRouter()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.style.visibility = 'visible';
      toolbar.style.background = 'transparent';
    }
  }, []);
  const Tag = ({ name }) => {
  
  return  <div onClick={()=>{
    if(selectedTags.includes(name)){let arr=selectedTags;
      arr=arr.filter((data)=>data!==name)
      setSelectedTags([...arr])
    }else{setSelectedTags(prev=>[...prev,name])}}} className={` ${selectedTags.includes(name)?"bg-gray-400":"bg-gray-200"} px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-200`}>
      {name}
    </div>
  };
  const Tag1 = ({ name }) => {
  
    return  <div  className="bg-gray-200 px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-200">
        {name}
      </div>
    };
  async function postQuestion(){
 
    let payload={
      title:title,
      content:content,
      authorUsername:finalUser.username,
      authorEmail:finalUser.email,
      authorId:finalUser._id,
      authorName:finalUser.name,
      authorImage:finalUser.image1,
      tags:selectedTags
    }
    await fetch('/api/createquestion',{
      method:"POST",
      body:JSON.stringify(payload)
    })
    router.push("/devopsforum")
  }
  const renderSection = () => {
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
    ]
    let tagValue=useRef()
    function handleAddTag(){
      let a=tagValue.current.value
      setSelectedTags((prev)=>[...prev,a])
      tagValue.current.value=""
    }
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
                  onClick={() => setActiveSection("tags")}
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
                onClick={() => setActiveSection("tags")}
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
                onClick={() => postQuestion()}
              >
                Post
              </div>
            </div>
          </div>
        );
      case "tags":return (
        <div className="my-10 w-[80%] m-auto">
        <div className="text-xl my-5 px-3 text-center">
         Select Your Tags
        </div>
      <div className="bg-white shadow-md rounded-xl p-4">
        <div className="mb-4 ">
        <div className="flex justify-center flex-wrap mt-5 gap-4">
                {tags.map((tag, index) => (
                  <Tag key={index}  name={tag} />
                ))}
              </div>
               {selectedTags.length>0&& <h1 className="text-xl text-center mt-[20px] ">Selected Tags</h1>}
                <div className="w-[100%] mt-[25px] mb-[20px] justify-center flex gap-5"><input placeholder="Add Your Tag" className="border-b-gray-500 border-b-[1px]" ref={tagValue}/><button onClick={handleAddTag}>Add Tag</button></div>
              <div className="flex  flex-wrap mt-5 gap-4 justify-center">
                {selectedTags.map((tag, index) => (
                  <Tag1 key={index} name={tag} />
                ))}
              </div>
        </div>
        
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
          onClick={() => setActiveSection("member")}
        >
          Next
        </div>
      </div>
    </div>
      )
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

      <footer className={` relative pt-16 pb-6 ${theme?"bg-gray-200":"bg-[#1e1d1d]"} text-gray-600 px-10`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className={`w-full lg:w-6/12 px-4 ${theme?"":"text-white"} `}>
              <h4 className={`text-3xl font-semibold text-blueGray-700 ${theme?"":"text-white"} `}>
                Let's keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms, we respond in 1-2 business
                days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="group bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                  type="button"
                > 
                  <a href="https://www.linkedin.com/in/md-azfar-alam/" target="blank">
                  <FontAwesomeIcon icon={faLinkedin} className="group-hover:brightness-0 group-hover:invert" />
                  </a>
                </button>
                <button
                  className={`group ${theme ? "text-lightBlue-600" : "text-black"} bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]`}
                  type="button"
                > 
                  <a href="https://www.github.com/mdazfar2" target="blank">
                  <FontAwesomeIcon icon={faGithub} className="group-hover:brightness-0 group-hover:invert" />
                  </a>
                </button>
                <button
                  className="group bg-white text-red-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                  type="button"
                >
                  <a href="mailto:helpopshub@gmail.com" target="blank">
                  <FontAwesomeIcon icon={faEnvelope} className="group-hover:brightness-0 group-hover:invert" />
                  </a>
                </button>
                <button
                  className="group bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                  type="button"
                >
                  <a href="https://www.helpopshub.com/" target="blank">
                  <FontAwesomeIcon icon={faGlobe} className="group-hover:brightness-0 group-hover:invert" />
                  </a>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className={`w-full lg:w-4/12 px-4 ml-auto ${theme?"":"text-white"} `}>
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="/about"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="/blogs"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="/resources"
                      >
                        Devops Resources
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="https://github.com/mdazfar2/HelpOps-Hub"
                      >
                        Github
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={`${theme?"":"text-white"}  w-full lg:w-4/12 px-4`}>
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="https://github.com/mdazfar2/HelpOps-Hub/blob/main/LICENSE"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="#"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
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
              <div className={`text-sm text-blueGray-500 font-semibold py-1 ${theme?"":"text-white"} ` }>
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
