import React, { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";
import { comment } from "postcss";
// import ReactQuill from "react-quill";
import ReactQuill, { Quill } from 'react-quill';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
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
function ForumPost({theme,id,finalUser}) {
  const router = useRouter();
  let [isComment,setIsComment]=useState(false)
  let [issue,setIssue]=useState({})
  let content=useRef()
  let comment=useRef()
  function handleAskQuestion(){
    router.push("/createforum")
  }
  useEffect(()=>{
    fetchData()
  },[id])
  async function fetchData(){
    
    let data=await fetch("/api/getquestion",{
      method:"POST",
      body:JSON.stringify({id:id})
    })
    data=await data.json()
 
    console.log(data)
    setIssue(data.data)
  }
  async function handleCloseQuestion(){
    let ques=await fetch("/api/closequestion",{
      method:"POST",
      body:JSON.stringify({id:id})

    })
    let issue1=issue
    if(issue1.isCLose){
      issue1.isCLose=false
    }else{
      issue1.isCLose=true
    }
    window.location.reload()
  }
  async function handleAddSolution(){
    let data=await fetch("/api/addsolution",{
      method:"POST",
      body:JSON.stringify({
        ans:content.current.value,
        id:id,
        authorImage:finalUser.image1,
        authorName:finalUser.name
      })
    })
    window.location.reload()
  }
  async function handleAddComment(){
      let data=await fetch("/api/questioncomment",{
        method:"POST",
        body:JSON.stringify({
          id:issue._id,
          comment:comment.current.value,
          user_id:finalUser._id,
          userEmail:finalUser.email,
          userName:finalUser.name,image:finalUser.image1
        })
      })
      setIsComment(false)
      let obj=issue
      let date=new Date(Date.now())
      obj.comments.push({image:finalUser.image1,comment:comment.current.value,user:finalUser._id,userEmail:finalUser.email,userName:finalUser.name,date:date})
      setIssue(obj)
    }
    function formatDate(dateStr) {
      const date = new Date(dateStr);
    
      // Format the date using `toLocaleString`
      const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      const formattedDate = date.toLocaleString('en-US', options);
    
      // Split the formatted date into parts
      const [monthDay, time] = formattedDate.split(' at ');
      const [month, day] = monthDay.split(', ');
      const [hourMinute, period] = time.split(' ');
      const [hour, minute] = hourMinute.split(':');
    
      // Custom format
      const customFormattedDate = `${month}  at ${hour}:${minute} ${period}`;
      return customFormattedDate;
    }
    useEffect(()=>{
      fetch("/api/questionviews",{method:"POST",body:JSON.stringify({id:id})})
      
    },[])
    async function handleAccept(index){
      await fetch('/api/addsolution',{
        method:"PUT",
        body:JSON.stringify({
          index:index,
          id:id
        })
      })
      let iss=issue
      iss.solutions[index].isAccepted=true
      setIssue(iss)
      window.location.reload()
    } 
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
              <div className="bg-[#6089a4] px-5 py-3 text-white cursor-pointer" onClick={handleAskQuestion}>
                Ask Question
              </div>
            </div>
          </div>
          <div className="mt-10 flex text-gray-600 gap-4">
            <div className="text-5xl font-bold max-md:hidden">Q:</div>
            <div className="mt-2">
              <div className={`${theme?"":"text-white"} text-3xl max-md:flex font-bold`}>
              <span className="text-4xl hidden max-md:block font-bold w-[100px]">Q :</span>  <p dangerouslySetInnerHTML={{__html:issue?.title}}/>
              </div>
              <div className={`${theme?"":"text-gray-300"} max-md:pl-[64px] text-base mt-5  text-justify`} dangerouslySetInnerHTML={{__html:issue?.content}}/>
              

              <div className="mt-10 flex gap-2 text-gray-500 items-center">
                <FontAwesomeIcon icon={faTags} />
                Bug,Feature,Error
              </div>
              <hr className="border-[1px] border-gray-300 mt-5" />
              <div className="flex gap-5 mt-5">
                <div onClick={()=>isComment?setIsComment(false):setIsComment(true)} className="bg-[#6089a4] px-4 py-1 rounded-md text-base text-white">
                  Reply
                </div>
                
                <div className="border-[#6089a4] px-4 py-1 rounded-md text-base text-[#6089a4] border-2">
                  I have this Question Too
                </div>
                
              </div>
              {
                  isComment &&<div className="mt-[25px] mb-[25px] w-[100%]">
                  
                  <ReactQuill className="h-[200px]"
                  ref={content}
                />
                    <button  onClick={handleAddSolution}  className="border mt-16 bg-blue-500 ml-[20px] p-[15px]  border-blue-500 text-white w-[150px] rounded-md cursor-pointer">
                      Submit
                    </button>
                    </div>
                }
       {                            issue?.solutions?.map((data,index)=>{

      return  <div className="mt-10">
                <div className={`min-h-20 w-full ${theme?"bg-[#eeeeee]":"bg-[#383838] rounded-md "} p-8`}>
                  <div className="flex w-full justify-between flex-wrap">
                    <div className="flex gap-5">
                      <img
                        src={data.authorImage?data.authorImage:"https://randomuser.me/api/portraits/men/6.jpg"}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-lg">
                        <div className={`${theme?"":"text-white"}`}>{data.authorName?data.authorName:"Jack"}</div>
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
                    <div className={`max-md:mt-[20px] text-green text-sm flex gap-2 items-center ${data.isAccepted?"text-green-500":"text-red-500"}`}>
                    {data.isAccepted &&  <FontAwesomeIcon icon={faCheck} />}{!data.isAccepted?(issue.authorId==finalUser._id&&<button onClick={()=>handleAccept(index)}>Mark as Accepted</button>): "Accepted Solution"}
                    </div>
                  </div>
                  <div className="mt-10 flex text-gray-600 gap-4">
                    <div className={`${theme?"":"text-white"} text-5xl font-bold`}>A:</div>
                   
                      <div className="">

                    <div className={`${theme?"":"text-gray-300"} text-base text-justify`} dangerouslySetInnerHTML={{__html:data.ans}}/>
                    </div>
                 
                   
                  </div>
                </div>
              </div>   })
}
              <div className="mt-10">
                <div className={`text-xl font-medium ${theme?"":"text-gray-200"}` }>All Replies</div>
                <div className={`min-h-16 rounded-md border border-[#d3cabd] flex items-center px-10 mt-10 justify-between w-full ${theme?"bg-[#e3e3e3]":"bg-[#383838]"}`}>
                  <div className={`${theme?"":"text-gray-300"}`}>Sort By</div>
                  <div className={`${theme?"":"text-gray-300"}`}>Page 1 to 4</div>
                </div>
              </div>
             <div className="mt-[25px] mb-[25px] w-[100%]">
                   <input
                      type="text"
                      className="w-[82%] p-4 border-[1px] border-gray-300 rounded-lg"
                      placeholder="Add a Reply"
                      ref={comment}
                   /> 
                   
                    <button onClick={handleAddComment}  className="border bg-blue-500 ml-[20px] p-[15px]  border-blue-500 text-white w-[150px] rounded-md cursor-pointer">
                      Submit
                    </button>
                    </div>
                
              <div className="mt-10 min-h-96">
                {
                  issue?.comments?.map((com,index)=>{
                  return  <div
                    key={index}
                    className="relative group mt-8 cursor-pointer"
                  >
                    <div className="flex gap-5">
                      <img
                        src={com?.image}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-lg">
                        <div className={`${theme?"":"text-white"}`}>{com.userName}</div>
                        <div className="flex gap-5 text-sm text-gray-500">
                          <div className={`${theme?"":"text-gray-300"}`}>
                            <FontAwesomeIcon icon={faCoffee} /> {"Converstaion Starter"}
                          </div>
                          <div className={`${theme?"":"text-gray-300"}`}>
                            <FontAwesomeIcon icon={faCalendar} /> {formatDate(com.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${theme?"":"text-gray-300"} mt-5`}>{com.comment}</div>
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
                  }
                )
                }
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
                <div onClick={handleCloseQuestion} className="cursor-pointer border-[#6089a4] px-4 py-1 w-[200px] text-center mt-[30px] hover:bg-[#78b3ce] hover:text-white  rounded-md text-base text-[#6089a4] border-2">
                 {issue?.isCLose ?"Mark As UnSolved": "Mark As Solved"}
                </div>
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

export default ForumPost;
