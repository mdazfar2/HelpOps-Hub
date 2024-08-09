"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  faList,
  faExclamationCircle,
  faSyncAlt,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faGlobe,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faLightbulb,
  faComments,
  faCheckCircle,
  faHeart,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import styles from '../stylesheets/forumanimation.css'

const Sidebar01Item = ({ title, isActive, onClick, icon, theme }) => {
  return (
    <div
      className={`${theme ? "" : "text-white"} ${
        isActive
          ? "bg-[#6089a4] hover:bg-[#6089a4] text-white"
          : "hover:bg-[#deecf5] hover:text-[#6089a4]"
      } text-sm min-h-3 text-gray-800 px-3 transition-all duration-500 py-2 w-full max-xl:w-auto cursor-pointer`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" /> {title}
    </div>
  );
};

const Tag = ({ name }) => (
  <div onClick={()=>{
    if(selectedTags.includes(name)){let arr=selectedTags;
      arr=arr.filter((data)=>data!==name)
      setSelectedTags([...arr])
    }else{setSelectedTags(prev=>[...prev,name])}}} className="bg-gray-200 px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-200">
    {name}
  </div>
);

const RecentTopics = ({ topic, img, user, theme }) => (
  <div
    className={`${
      theme ? "text-gray-500" : "text-white"
    } flex flex-wrap items-center gap-2 text-[13px] w-[240px] max-xl:w-[96vw] `}
  >
    <span className="block  w-[200px] overflow-hidden text-ellipsis ">
      <FontAwesomeIcon icon={faComments} /> {topic}
    </span><br/>
    <span className="inline">Question By -</span>
    <span className="flex items-center gap-2 w-[200px] overflow-hidden text-ellipsis">
      <img src={img?img:"data:image/jpeg;base64,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"} onError={(e)=>{e.target.src="data:image/jpeg;base64,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"}} alt="User" className="rounded-full w-5 h-5" />
      <span className={`${theme ? "text-black" : "text-white"} `}>{user}</span>
    </span>
    <hr className="w-full border-gray-300 border-1" />
  </div>
);

const HelpfulUser = ({ user }) => {
return <div>
    <div className="flex items-center justify-between gap-2 mt-6">
      <div className="flex gap-2 items-center">
        <img src={user.image1} alt="User" className="rounded-full w-8 h-8" />
        <div>{user.name}</div>
      </div>
      <div className="text-sm text-gray-500 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCheckCircle} />
        {user.answers}
      </div>
    </div>
    <hr className="border-gray-200 border-[1px] mt-2" />
  </div>
};
const TopIssue = ({ title, index }) => (
  <div className="flex items-center 2xl:justify-between max-md:gap-2 ">
    <span className=" text-base mr-4 max-sm:mr-0 border-gray-300 border-[1px] px-2 py-1 rounded-full ">
      {index + 1 < 10 ? `0${index + 1}` : index + 1}
    </span>
    <span className="text-[12px] w-[80%] overflow-hidden text-ellipsis" style={{ lineHeight: "17px" }}>
      {title}
    </span>
  </div>
);

function ForumPage({ theme,finalUser,setIsPopup,setMsg }) {
  const [activeMenuItem, setActiveMenuItem] = useState("View All"); // Tracks the currently selected menu item
  const router = useRouter(); // Provides access to router functions and properties
  const [hoveredUser, setHoveredUser] = useState(null); // Stores the user being hovered over for displaying additional info
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Tracks the cursor position for positioning user info display
  const [users, setUsers] = useState([]); // Holds the list of users
  const [top, setTop] = useState([]); // Stores top users or data, based on context
  const [loading, setLoading] = useState(true); // Indicates loading state
  const [isClosed, setIsClosed] = useState(false); // Indicates if a particular UI element or feature is closed
  const [sortedArray, setSortedArray] = useState([]); // Stores an array of sorted data
  const [mostHelpful, setMostHelpful] = useState([]); // Holds the most helpful data or users
  const [selectedTags, setSelectedTags] = useState([]); // Stores the tags that have been selected by the user
  const [openCount,setOpenCount]=useState(0)
  // Function to handle mouse entering an element (e.g., user profile)
  const handleMouseEnter = async (event, userImg) => {
      // Update cursor position for positioning additional info display
      setCursorPosition({ x: event.clientX, y: event.clientY });
  
      // Create a copy of the user image object
      let obj = { ...userImg };
      console.log(userImg); // Debugging: Log the user image object
  
      // Fetch user details by user ID from the API
      let u = await fetch("/api/getuserbyid", {
          method: "POST",
          body: JSON.stringify({ id: userImg.authorId }), // Send user ID to fetch details
      });
      u = await u.json();
      u = u.msg; // Extract the user details from the response
      console.log(u, "user"); // Debugging: Log the fetched user details
  
      // Update the user object with additional information
      obj = {
          ...obj,
          count: Object.keys(u.followers).length, // Count of followers
          questions: u.questions, // User's questions
          answers: u.answers, // User's answers
      };
      setHoveredUser(obj); // Update the state to display user info
  };
  
  // Function to handle mouse leaving the element
  const handleMouseLeave = () => {
      setHoveredUser(null); // Clear the hovered user info
  };
  
  // Function to handle sidebar menu item clicks
  const handleSidebar01 = (title) => {
      setActiveMenuItem(title); // Update the active menu item
  
      if (title === "View All") {
          // If "View All" is selected, reset to the original issues list
          setIssues([...originalIssues]);
          return;
      }
  
      // Filter the issues based on the selected title/type
      let arr = [...originalIssues];
      arr = arr.filter((data) => data.type === title);
      setIssues([...arr]); // Update the issues state with the filtered list
  };
  
  // State and variables related to issues
  const [issues, setIssues] = useState([]); // Stores the list of issues to display
  const [originalIssues, setOriginalIssues] = useState([]); // Holds the original list of issues for resetting
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
  useEffect(()=>{
    fetchData()
  },[])
  async function fetchData() {
    try {
        // Fetch initial data
        let response = await fetch("/api/createquestion", { method: "GET" });
        let data = await response.json();
        data = data.data;
        let count=0
        data.map((d)=>{
          if(!d.isCLose){
            count++
          }
        })
        setOpenCount(count)
        // Filter out items without 'createdAt'
        let arr = data.filter(item => item.createdAt !== undefined);

        // Create an empty object to store user messages
        let obj1 = [];

        // Collect all user IDs to fetch in parallel
        let userPromises = data.flatMap(item =>
            item.relatedUser.map(async (userRef) => {
             setUsers(prev=>[...prev,userRef.authorId])
                
            })
          );      
        // Sort and update state
        arr = arr.sort((a, b) => a.createdAt - b.createdAt);
        setSortedArray([...arr]);

        let arr1 = [...arr].sort((a, b) => b.views - a.views);
        setTop([...arr1]);

        // Reverse the data and update state
        data.reverse();
        let a1=[...data]
        a1=a1.filter((data)=>!data.isCLose)
        console.log("A!!!!!!!!!!!!!!!!",a1)
        setIssues([...a1]);
        setOriginalIssues([...data]);
        let a=data.sort((c,b)=>b.solutions.length-c.solutions.length)
        let ar=[]
        for(let i=0;i<a.length;i++){
          ar.push({image1:a[i].authorImage,name:a[i].authorName,answers:a[i].solutions.length})
        }
        setMostHelpful([...ar])
        setLoading(false)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

  let search=useRef()
function handleSearch(){
    let arr=originalIssues
    let value=search.current.value
    if(value.length==0){
      setIssues([...originalIssues])
    }
    value=value.toLowerCase()
    arr=arr.filter((data)=>data.title.toLowerCase().includes(value))
    setIssues([...arr])
}
  let sortLabels=[
    'Newest','Oldest','Most liked','Most Viewed','Most Commented','Recently Updated','Least Commented']


  const recent = [
    {
      topic: "Issue with Kubernetes Pod Scaling",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      user: "Alice",
    },
    {
      topic: "Troubleshooting Docker Container Networking",
      img: "https://randomuser.me/api/portraits/men/2.jpg",
      user: "Bob",
    },
    {
      topic: "Configuring AWS IAM Roles for EKS",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      user: "Charlie",
    },
  ];

const helpfulUsers = [
    {
      name: "cleo-parra",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
      issuesSolved: 10,
    },
    {
      name: "roy_marin",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
      issuesSolved: 8,
    },
    {
      name: "hellen.austin",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
      issuesSolved: 5,
    },
    {
      name: "erna.may",
      img: "https://randomuser.me/api/portraits/men/16.jpg",
      issuesSolved: 3,
    },
  ];
// State and variables initialization
const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
let [sortModal, setShowSortModal] = useState(false); // Manages the visibility of the sort modal
const issuesPerPage = 10; // Number of issues displayed per page
const totalPages = Math.ceil(issues.length / issuesPerPage); // Total number of pages based on issues count

// State to manage current issues being displayed based on pagination
let [currentIssues, setCurrentIssues] = useState([]);

// Effect to update current issues when issues list or current page changes
useEffect(() => {
    setCurrentIssues(issues.slice(
        (currentPage - 1) * issuesPerPage, // Start index of issues for current page
        currentPage * issuesPerPage // End index (exclusive) for current page
    ));
}, [issues, currentPage]);

// Function to handle page changes
const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(page); // Update current page
};

// Array of sample DevOps issues for demonstration or testing
const devopsIssues = [
    "Issue with Kubernetes Pod Scaling",
    "Troubleshooting Docker Container Networking",
    "Configuring AWS IAM Roles for EKS",
    "Azure DevOps Pipeline Failure",
    "Docker Compose Not Starting Services",
    "Kubernetes Cluster Authentication Issue",
];

// Function to handle click event on a question
function handleOnClick(id) {
    // Redirects to the DevOps forum page with the question ID
    window.location.href = `/devopsforum?id=${id}`;
}

// Function to reset issues to the original list
function handleReset() {
    setIssues([...originalIssues]);
}

// Function to handle sorting of issues based on various criteria
const handleSortClick = (title) => {
    let arr = [...issues]; // Create a copy of the issues array to sort
    switch (title) {
        case 'Most Commented':
            arr.sort((a, b) => b.reactions.comments - a.reactions.comments); // Sort by most comments
            break;
        case 'Least Commented':
            arr.sort((a, b) => a.reactions.comments - b.reactions.comments); // Sort by least comments
            break;
        case 'Most liked':
            arr.sort((a, b) => b.reactions.likes - a.reactions.likes); // Sort by most likes
            break;
        case 'Least liked':
            arr.sort((a, b) => a.reactions.likes - b.reactions.likes); // Sort by least likes
            break;
        case 'Most Viewed':
            arr.sort((a, b) => b.reactions.views - a.reactions.views); // Sort by most views
            break;
        case 'Least Viewed':
            arr.sort((a, b) => a.reactions.views - b.reactions.views); // Sort by least views
            break;
        case 'Oldest':
            arr.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by oldest date
            break;
        case 'Recently Updated':
            arr.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)); // Sort by most recent update
            break;
        default:
            break;
    }
    setIssues(arr); // Update issues with sorted array
    // Update currentIssues based on the new sorted order
    // setCurrentIssues(arr.slice((currentPage - 1) * issuesPerPage, currentPage * issuesPerPage));
};

// Function to handle asking a question
function handleAskQuestion() {
    if (!finalUser || !localStorage.getItem('finalUser')) {
        setIsPopup(true);
        setMsg("Please Login to Ask Question");
        setTimeout(() => {
            setIsPopup(false);
            setMsg('');
        }, 3000);
        return;
    }
    router.push("/createforum"); // Redirect to the forum creation page
}

// Function to handle liking a question
async function handleLike(e, question) {
    e.preventDefault(); // Prevent default link behavior
    if (!finalUser) return; // If no user is logged in, do nothing

    // Send like data to the server
    let data = await fetch("/api/questionlikes", {
        method: "POST",
        body: JSON.stringify({
            id: question._id, // Question ID
            user_id: finalUser._id // Logged-in user ID
        }),
    });

    let arr = issues;
    arr.map((data) => {
        if (data._id === question._id) {
            // Toggle like status
            if (data.likes.includes(finalUser._id)) {
                data.likes = data.likes.filter((d) => d !== finalUser._id);
            } else {
                data.likes.push(finalUser._id);
            }
        }
        return data;
    });
    setIssues([...arr]); // Update issues with new like status
    setOriginalIssues([...arr]); // Also update original issues list
}

// Effect to filter issues based on selected tags
useEffect(() => {
    let arr = [];
    if (selectedTags.length === 0) {
        setIssues([...originalIssues]); // Reset issues if no tags are selected
        return;
    }
    // Filter issues based on selected tags
    originalIssues.forEach((data) => {
        let ans = false;
        data.tags.forEach((name) => {
            if (selectedTags.includes(name)) {
                ans = true;
            }
        });
        if (ans) {
            arr.push(data);
        }
    });
    setIssues([...arr]); // Update issues with filtered data
}, [selectedTags]); // Re-run effect when selectedTags changes
useEffect(()=>{
if(isClosed){
  let arr=originalIssues
  arr=arr.filter((data)=>data.isCLose)
  setCurrentIssues([...arr])
}else{

  let arr=originalIssues
  arr=arr.filter((data)=>!data.isCLose)
  setCurrentIssues([...arr])
}
},[isClosed])

  return (
    <div className="mt-20 overflow-x-hidden">
      <div
        className={`h-80 ${
          theme ? "bg-gray-200" : "bg-[#1e1d1d]"
        } px-10 pt-20 relative`}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            ref={search}
            onChange={handleSearch}
            placeholder="Search for Topics..."
            className={` py-3 shadow-md px-4 border rounded-full w-full z-50 max-w-md focus:outline-none`}
          />
          <div className={`${theme ? "" : "text-white"} mt-4`}>
            Popular Searches: Docker, Azure, CI/CD
          </div>
        </div>
        <img src="/forum.webp" alt="img" className="w-[95%] absolute bottom-0" />
      </div>
      <div
        className={`w-full h-12 ${theme ? "bg-[#dbe2e8]" : "bg-[#1e1d1d]"}`}
      ></div>
      <div className="min-h-screen w-full">
        <div
          className={`flex  max-xl:flex-col w-full gap-10 p-16 max-xl:pl-5 max-xl:pr-5 ${
            theme ? "" : "bg-[#1e1d1d]"
          }`}
        >
          <div className="w-[15%]">
            <div>
              <div
                className={`${theme ? "" : "text-white"} text-lg font-semibold`}
              >
                Forums
              </div>
              <div
                className={`${theme ? "" : "text-white"} flex flex-col max-xl:flex-row max-xl:w-[100vw]  gap-1 mt-4 flex-wrap`}
              >
                <Sidebar01Item
                  title="View All"
                  onClick={() => handleSidebar01("View All")}
                  isActive={activeMenuItem === "View All"}
                  icon={faList}
                  theme={theme}
                />
                <Sidebar01Item
                  title="General"
                  onClick={() => handleSidebar01("General")}
                  isActive={activeMenuItem === "General"}
                  icon={faUser}
                  theme={theme}
                />
                <Sidebar01Item
                  title="Ideas"
                  onClick={() => handleSidebar01("Ideas")}
                  isActive={activeMenuItem === "Ideas"}
                  icon={faLightbulb}
                  theme={theme}
                />
                <Sidebar01Item
                  title="User Feedback"
                  onClick={() => handleSidebar01("User Feedback")}
                  isActive={activeMenuItem === "User Feedback"}
                  icon={faComments}
                  theme={theme}
                />
              </div>
            </div>
            <div className="mt-10 max-xl:hidden">
              <div
                className={`${theme ? "" : "text-white"} text-lg font-semibold`}
              >
                Tags
              </div>
              <div className="flex flex-wrap mt-5 gap-4">
                {tags.map((name, index) => (
                    <div onClick={()=>{
    if(selectedTags.includes(name)){let arr=selectedTags;
      arr=arr.filter((data)=>data!==name)
      setSelectedTags([...arr])
    }else{
      setSelectedTags(prev=>[...prev,name])}
  }
    } className={` ${selectedTags.includes(name)?"bg-gray-400":"bg-gray-200"} px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-200`}>
    {name}
  </div>
                ))}
              
              </div>
            </div>
            <div className="mt-10 max-xl:hidden">
              <div
                className={`${theme ? "" : "text-white"} text-lg font-semibold`}
              >
                Recent Topics
              </div>
              <div
                className={`${
                  theme ? "" : "text-white"
                } flex flex-wrap mt-5 gap-4 cursor-pointer`}
              >
                {sortedArray.slice(0,4).map((item, index) => (
                  <RecentTopics
                    theme={theme}
                    key={index}
                    topic={item.title}
                    img={item.authorImage}
                    user={item.authorName}
                  />
                ))} {sortedArray.length<4&&recent.map((item, index) => {
                  if(index<4-sortedArray.length){

                  return  <RecentTopics
                      theme={theme}
                      key={index}
                      topic={item.topic}
                      img={item.img}
                      user={item.user}
                    />
                  }
})}
              </div>
            </div>
          </div>
          <div className="w-[85%] max-xl:w-[100%]  max-lg:w-[100%] gap-10 pl-16 pr-16 max-xl:pl-0 max-xl:pr-0 max-lg:flex-col flex">
            <div className="w-[80%] max-lg:w-[100%]">
              <div className="border-[1px] border-gray-300  min-h-[150vh]">
                <div className="h-16 bg-[#6089a4] text-white px-12 max-md:px-2 max-sm:px-0 max-md:h-20">
                  <div className="flex justify-between items-center h-full flex-wrap max-md:justify-start">
                    <div className="max-sm:relative max-sm:top-1 flex  max-sm:px-2 gap-5 max-sm:gap-6 max-sm:w-[100%] items-center ">
                      <div  onClick={()=>setIsClosed(false)}className="flex items-center gap-2 max-sm:text-[14px] cursor-pointer">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <span>{openCount} Open</span>
                      </div>
                      <div onClick={()=>setIsClosed(true)} className="flex items-center gap-2 max-sm:text-[14px] cursor-pointer">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span>{originalIssues.length-openCount} Closed</span>
                      </div>
                      <div onClick={handleReset} className="flex items-center gap-2 max-sm:text-[14px] cursor-pointer">
                        <FontAwesomeIcon icon={faSyncAlt} />
                        <span>Reset</span>
                      </div>
                    </div>
                    <div
                      className={`flex  ${
                        theme
                          ? "max-sm:bg-white max-sm:text-black"
                          : "max-sm:bg-black max-sm:text-white"
                      } max-sm:h-[41px] max-sm:top-1 max-sm:border-b-[1px] max-sm:border-t-[1px] max-sm:relative  max-sm:w-[100%]  max-sm:px-2 gap-12   items-center`}
                    >
                      <div className="flex gap-2 items-center cursor-pointer">
                        Author{" "}
                        <FontAwesomeIcon icon={faChevronDown} size="xs" />
                      </div>
                      <div className="flex gap-2 items-center cursor-pointer">
                        Label <FontAwesomeIcon icon={faChevronDown} size="xs" />
                      </div>
                      <div onClick={()=>sortModal?setShowSortModal(false):setShowSortModal(true)} className="flex gap-2 relative items-center cursor-pointer">
                        Sort <FontAwesomeIcon icon={faChevronDown} size="xs" />
                     {sortModal &&
                        <div className="absolute h-[200px] bg-white  top-11 pt-0 text-black w-[160px] rounded-lg flex flex-col overflow-scroll right-[-10px] items-center">
                          {
                            sortLabels.map((data)=>{
                           return   <p onClick={()=>handleSortClick(data)} className="p-2 hover:bg-gray-200  text-sm border-t-gray-500 border-t-[1px] w-[100%]">{data}</p>
                            })
                          }
                        </div>
                     }</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
           {
            loading?Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="mb-10">
                <div className="flex max-md:flex-col items-end gap-5">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-2 w-full h-full ">
                      <Skeleton height={80} width={80} borderRadius={100} />
                     <div className="flex flex-col">
                      <Skeleton height={10} width={170} />
                      <Skeleton height={10} width={400} />
                      <Skeleton height={10} width={600} />
                      </div>
                    </div>
                    
                  </div>
                
                </div>
                <hr className="w-full mt-5 mb-5 border-gray-200" />
              </div>
            )):
           
                  currentIssues.map((issue, index) => (
             (!isClosed&&
                !issue.isCLose)||(issue.discussionUsers)? 
                   <div
                      key={index}
                      className="p-4 mb-4 border-b-[1px] border-gray-200 cursor-pointer"
                    >
                      <div className=" flex max-md:flex-col max-md:items-start  items-center justify-between">
                        <div                       onClick={()=>handleOnClick(issue._id)}
 className="flex items-center gap-4">
                          <img
                            src={issue.authorImage?issue.authorImage:"https://www.google.com/imgres?q=image%20placeholder&imgurl=https%3A%2F%2Fpomerancedentalcare.com%2Fwp-content%2Fuploads%2F2024%2F06%2Fplaceholder-image-person-jpg-1.jpg&imgrefurl=https%3A%2F%2Fpomerancedentalcare.com%2Fplaceholder-image-person-jpg-2%2F&docid=qbWGHcHhlJt70M&tbnid=Cn7x48J0PlsGsM&vet=12ahUKEwj-2r_Ahs6HAxULslYBHbpnPZUQM3oECCcQAA..i&w=820&h=678&hcb=2&ved=2ahUKEwj-2r_Ahs6HAxULslYBHbpnPZUQM3oECCcQAA"}
                            onError={(e)=>{
                              e.target.src=issue.userImage
                            }}
                            className="rounded-full w-10 h-10"
                          />
                          <div>
                            <div
                              className={`${
                                theme ? "" : "text-white"
                              } font-medium overflow-hidden max-w-[370px] text-ellipsis`}
                            >
                              {issue.title}
                            </div>
                            <div  className="text-gray-500 flex gap-2 text-sm mt-2">
                              {
                                issue.tags.slice(0,tags.length>4?4:tags.length).map((data)=>{
                                  return <span>{data}</span>
                                })
                              }
                            </div>
                            <div className="text-gray-500 text-sm mt-2">
                              {issue.type} • {issue.dateTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex max-md:pl-[50px] max-sm:gap-[1rem] max-sm:items-center items-center gap-6 max-sm:mt-2 text-gray-500 flex-wrap">
                          <div className="flex items-center gap-1 hover:gap-2  transition-all duration-500 mt-2 max-sm:mt-0">
                        {
                          issue?.relatedUser.length>4&&<span>+ {issue?.relatedUser.length-4}</span>
                        } 
                         {issue?.relatedUser.slice(0,issue?.relatedUser.length>4?4:issue?.relatedUser.length).map((user, idx) => {
                        return  <img
                              key={idx} 
                              onClick={()=>router.push(`/profile?id=${user.authorId}`)}
                              src={user.authorImage}
                              id="img"
                              alt="Discussion User"
                              className="rounded-full w-5 h-5"
                              onMouseEnter={(event) => handleMouseEnter(event, user)}
                              onMouseLeave={handleMouseLeave}
                            />
})}
                          </div>
                          <div onClick={(e)=>handleLike(e,issue)} className=" flex items-center gap-2 max-sm:text-[11px]">
                            <FontAwesomeIcon color={`${finalUser&&issue?.likes?.includes(finalUser._id)?"blue":""}`} icon={faHeart} />
                            <span >{issue?.likes?.length}</span>
                          </div>
                          <div className="flex items-center gap-2 max-sm:text-[11px]">
                            <FontAwesomeIcon icon={faComments} />
                            <span>{issue?.comments?.length}</span>
                          </div>
                          <div className="flex items-center gap-2 max-sm:text-[11px]">
                            <FontAwesomeIcon icon={faEye} />
                            <span>{issue&&issue.views?(Math.ceil(issue?.views/2)):0}</span>

                          </div>
                        </div>
                      </div>
                    </div>:
                   
                 issue.isCLose&&  <div
                    key={index}
                    className="p-4 mb-4 border-b-[1px] border-gray-200 cursor-pointer"
                  >
                    <div className=" flex max-md:flex-col max-md:items-start  items-center justify-between">
                      <div                       onClick={()=>handleOnClick(issue._id)}
className="flex items-center gap-4">
                        <img
                          src={issue.authorImage?issue.authorImage:"https://www.google.com/imgres?q=image%20placeholder&imgurl=https%3A%2F%2Fpomerancedentalcare.com%2Fwp-content%2Fuploads%2F2024%2F06%2Fplaceholder-image-person-jpg-1.jpg&imgrefurl=https%3A%2F%2Fpomerancedentalcare.com%2Fplaceholder-image-person-jpg-2%2F&docid=qbWGHcHhlJt70M&tbnid=Cn7x48J0PlsGsM&vet=12ahUKEwj-2r_Ahs6HAxULslYBHbpnPZUQM3oECCcQAA..i&w=820&h=678&hcb=2&ved=2ahUKEwj-2r_Ahs6HAxULslYBHbpnPZUQM3oECCcQAA"}
                          onError={(e)=>{
                            e.target.src=issue.userImage
                          }}
                          className="rounded-full w-10 h-10"
                        />
                        <div>
                          <div
                            className={`${
                              theme ? "" : "text-white"
                            } font-medium`}
                          >
                            {issue.title}
                          </div>
                          <div className="text-gray-500 text-sm mt-2">
                            {issue.type} • {issue.dateTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex max-md:pl-[50px] max-sm:gap-[1rem] max-sm:items-center items-center gap-6 max-sm:mt-2 text-gray-500 flex-wrap">
                        <div className="flex items-center gap-1 hover:gap-2  transition-all duration-500 mt-2 max-sm:mt-0">
                          {issue?.relatedUser.map((user, idx) => {
                        return  <img
                              key={idx}
                              src={user.authorImage}
                              alt="Discussion User"
                              className="rounded-full w-5 h-5"
                              onMouseEnter={(event) => handleMouseEnter(event, user)}
                              onMouseLeave={handleMouseLeave}
                            />
})}
                        </div>
                        <div onClick={(e)=>handleLike(e,issue)} className=" flex items-center gap-2 max-sm:text-[11px]">
                          <FontAwesomeIcon color={`${finalUser&&issue?.likes?.includes(finalUser._id)?"blue":""}`} icon={faHeart} />
                          <span >{issue?.likes?.length}</span>
                        </div>
                        <div className="flex items-center gap-2 max-sm:text-[11px]">
                          <FontAwesomeIcon icon={faComments} />
                          <span>{issue?.comments?.length}</span>
                        </div>
                        <div className="flex items-center gap-2 max-sm:text-[11px]">
                          <FontAwesomeIcon icon={faEye} />
                          <span>{issue&&issue.views?(Math.ceil(issue?.views/2)):0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                   {hoveredUser && (
        <label htmlFor="id">

        <div
          className={`forummodal ease-out fixed  border  p-4 w-[400px] h-[200px] rounded-lg ${theme?"bg-white border-gray-300": "bg-[#2b2b2b] border-slate-50 border-[1px] text-gray-400"} shadow-lg`}
          style={{ top: cursorPosition.y + 10, left: cursorPosition.x - 400 }}
        >
         <div className="w-[100%] flex gap-4 items-center">
           <img src={hoveredUser.authorImage} alt="Hovered User" className="w-20 h-20 rounded-full" />
          <div className="flex w-[100%] items-start gap-2 h-[100%] justify-center flex-col ">
            <p>{hoveredUser.authorName}</p>
            <button className={`bg-transparent pt-1 pb-1 pl-3 pr-3 rounded-md border-[1px] border-gray-500 `}>Follow</button>
            </div>
          </div>
          <div className="p-[20px] mt-4 flex gap-6 w-[100%] justify-center">
            <p className="flex flex-col h-[100%] items-center"><h2>Answers</h2><p>{hoveredUser&&hoveredUser.answers}</p></p>
            <p className="flex h-[100%] flex-col items-center"><h2>Questions</h2><p>{hoveredUser&&hoveredUser.questions}</p></p>
            <p className="flex h-[100%] items-center flex-col"><h2>Followers</h2><p>{hoveredUser&&hoveredUser.count}</p></p>
          </div>
        </div>
        </label>
      )}
                </div>
              </div>
              <div className="mt-10 flex justify-between mb-20 max-sm:flex-col max-md:gap-4 max-md:justify-center">
          <div className={`max-md:text-center ${theme ? "" : "text-white"}`}>
            Total: {issues.length}
          </div>
          <div
            className={`flex gap-5 items-center max-sm:gap-2 max-sm:justify-center ${theme ? "" : "text-white"}`}
          >
            <button
              className={`flex items-center ${currentPage===1 ? "hidden" : ""}`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <div>Previous</div>
            </button>
            <div className="bg-[#6089a4] px-2 rounded-lg text-white">
              {currentPage}
            </div>
         {

        currentPage<totalPages-1&& <>
           <div>{currentPage + 1}</div>
            <div>......</div>
         </>
         } 
           {

          !(currentPage==totalPages) && <div>{totalPages}</div>
           }
            <button
              className={`flex items-center ${currentPage===totalPages ? "hidden" : ""}`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <div>Next</div>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div onClick={()=>setCurrentPage(totalPages)} className={`cursor-pointer max-md:text-center ${theme ? "" : "text-white"}`}>
            Go {"->"}
          </div>
        </div>
            </div>
            <div className="max-lg:w-[100%] w-[25%]">
              <div className="bg-[#6089a4] rounded-full text-white py-5 px-3 text-center text-base cursor-pointer" onClick={handleAskQuestion}>
                <FontAwesomeIcon icon={faComments} /> Ask Question{" "}
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className="border-[1px] border-gray-200 mt-10 text-lg rounded-lg p-4">
                <div className={`${theme ? "" : "text-white"}`}>
                  Most Helpful
                </div>
                <div
                  className={`text-sm cursor-pointer ${
                    theme ? "" : "text-[#c4bbbb]"
                  }`}
                >
                  {mostHelpful.slice(0,mostHelpful.length>=4?4:mostHelpful.length).map((user, index) => (
                    <HelpfulUser key={index} user={user} />
                  ))}
                </div>
              </div>
              <div className="border-[1px] border-gray-200 mt-10 text-lg rounded-lg p-4">
                <div className={`${theme ? "" : "text-white"}`}>Top</div>
                <div
                  className={`space-y-4 mt-2 cursor-pointer ${
                    theme ? "" : "text-[#c4bbbb]"
                  }`}
                >
                  {top.slice(0,6).map((issue, index) => (
                    <TopIssue key={index} title={issue.title} index={index} />
                  ))}
                  
                  {top.length<6&&devopsIssues.map((issue, index) => {
                    if(index<6-top.length){
                    
                    return  <TopIssue key={index} title={issue} index={index} />
                    }
})}
                </div>
              </div>
            </div>
          </div>

          <div className="max-xl:block hidden">
            <div className="mt-10 ">
              <div
                className={`${theme ? "" : "text-white"} text-lg font-semibold`}
              >
                Tags
              </div>
              <div className="flex flex-wrap mt-5 gap-4">
                {tags.map((tag, index) => (
                  <Tag key={index} name={tag} />
                ))}
              </div>
            </div>
            <div className="mt-10  w-[96vw]">
              <div
                className={`${theme ? "" : "text-white"} text-lg font-semibold`}
              >
                Recent Topics
              </div>
              <div
                className={`${
                  theme ? "" : "text-white"
                } flex flex-wrap mt-5 gap-4  cursor-pointer`}
              >
               {sortedArray.slice(0,4).map((item, index) => (
                  <RecentTopics
                    theme={theme}
                    key={index}
                    topic={item.title}
                    img={item.authorImage}
                    user={item.authorName}
                  />
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
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="/about"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="/blogs"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="/resources"
                      >
                        Devops Resources
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
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
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="https://github.com/mdazfar2/HelpOps-Hub/blob/main/LICENSE"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="#"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${theme ? "text-gray-600 hover:text-gray-800" : "text-gray-300 hover:text-white"}`}
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
                  className={`text-blueGray-500 ${theme?"hover:text-gray-800": "hover:text-gray-500"}`}
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

export default ForumPage;
