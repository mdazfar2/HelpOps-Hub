"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  <div className="bg-gray-200 px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-200">
    {name}
  </div>
);

const RecentTopics = ({ topic, img, user, theme }) => (
  <div
    className={`${
      theme ? "text-gray-500" : "text-white"
    } flex flex-wrap items-center gap-2 text-[13px] `}
  >
    <span className="inline">
      <FontAwesomeIcon icon={faComments} /> {topic}
    </span>
    <span className="inline">Question By -</span>
    <span className="flex items-center gap-2">
      <img src={img} alt="User" className="rounded-full w-5 h-5" />
      <span className={`${theme ? "text-black" : "text-white"} `}>{user}</span>
    </span>
    <hr className="w-full border-gray-300 border-1" />
  </div>
);

const HelpfulUser = ({ user }) => (
  <div>
    <div className="flex items-center justify-between gap-2 mt-6">
      <div className="flex gap-2 items-center">
        <img src={user.img} alt="User" className="rounded-full w-8 h-8" />
        <div>{user.name}</div>
      </div>
      <div className="text-sm text-gray-500 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCheckCircle} />
        {user.issuesSolved}
      </div>
    </div>
    <hr className="border-gray-200 border-[1px] mt-2" />
  </div>
);
const TopIssue = ({ title, index }) => (
  <div className="flex items-center 2xl:justify-between max-md:gap-2 ">
    <span className=" text-base mr-4 max-sm:mr-0 border-gray-300 border-[1px] px-2 py-1 rounded-full ">
      {index + 1 < 10 ? `0${index + 1}` : index + 1}
    </span>
    <span className="text-[12px]" style={{ lineHeight: "17px" }}>
      {title}
    </span>
  </div>
);

function ForumPage({ theme,finalUser }) {
  const [activeMenuItem, setActiveMenuItem] = useState("View All");
  const router = useRouter();
  const [hoveredUser, setHoveredUser] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event, userImg) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
    setHoveredUser(userImg);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };
  const handleSidebar01 = (title) => {
    setActiveMenuItem(title);
    if(title=="View All"){
      setIssues([...originalIssues])
      return
    }
    let arr=[...originalIssues]
    arr=arr.filter((data)=>data.type==title)
    setIssues([...arr])
  };
 let [issues,setIssues]=useState([])
 let [originalIssues,setOriginalIssues]=useState([])

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
  async function fetchData(){
    let data=await fetch("/api/createquestion",{method:"GET"})
    data=await data.json()
    data=data.data
    let originalIssues= [
      {
        userImage: "https://randomuser.me/api/portraits/men/1.jpg",
        title: "Kubernetes Pod Scaling Issue",
        type: "General",
        dateTime: "26 minutes ago",
        reactions: { likes: 5, views: 420, comments: 70 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/2.jpg",
          "https://randomuser.me/api/portraits/men/3.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/2.jpg",
        title: "Database Connection Failure",
        type: "Ideas",
        dateTime: "1 hour ago",
        reactions: { likes: 12, views: 600, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/3.jpg",
          "https://randomuser.me/api/portraits/men/4.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/3.jpg",
        title: "UI Layout Misalignment",
        type: "User Feedback",
        dateTime: "2 hours ago",
        reactions: { likes: 7, views: 350, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/1.jpg",
          "https://randomuser.me/api/portraits/men/5.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/4.jpg",
        title: "Security Vulnerability in Authentication",
        type: "Ideas",
        dateTime: "3 hours ago",
        reactions: { likes: 19, views: 800, comments: 55 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/2.jpg",
          "https://randomuser.me/api/portraits/men/6.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/5.jpg",
        title: "Feature Request: Dark Mode",
        type: "Feature Request",
        dateTime: "4 hours ago",
        reactions: { likes: 8, views: 450, comments: 20 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/3.jpg",
          "https://randomuser.me/api/portraits/men/7.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/6.jpg",
        title: "API Rate Limiting Issue",
        type: "Ideas",
        dateTime: "5 hours ago",
        reactions: { likes: 25, views: 950, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/4.jpg",
          "https://randomuser.me/api/portraits/men/8.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/7.jpg",
        title: "Optimize Load Times",
        type: "User Feedback",
        dateTime: "6 hours ago",
        reactions: { likes: 15, views: 500, comments: 10 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/5.jpg",
          "https://randomuser.me/api/portraits/men/9.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/8.jpg",
        title: "Update Documentation",
        type: "User Feedback",
        dateTime: "7 hours ago",
        reactions: { likes: 3, views: 200, comments: 5 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/6.jpg",
          "https://randomuser.me/api/portraits/men/10.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/9.jpg",
        title: "Integration with Payment Gateway",
        type: "Feature Request",
        dateTime: "8 hours ago",
        reactions: { likes: 9, views: 350, comments: 8 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/7.jpg",
          "https://randomuser.me/api/portraits/men/11.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/10.jpg",
        title: "Deployment Failure in Production",
        type: "Ideas",
        dateTime: "9 hours ago",
        reactions: { likes: 18, views: 700, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/8.jpg",
          "https://randomuser.me/api/portraits/men/12.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/11.jpg",
        title: "Refactor Codebase",
        type: "User Feedback",
        dateTime: "10 hours ago",
        reactions: { likes: 6, views: 270, comments: 15 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/9.jpg",
          "https://randomuser.me/api/portraits/men/13.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/12.jpg",
        title: "User Permissions Issue",
        type: "Ideas",
        dateTime: "11 hours ago",
        reactions: { likes: 22, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/10.jpg",
          "https://randomuser.me/api/portraits/men/14.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/13.jpg",
        title: "UI/UX Enhancements",
        type: "User Feedback",
        dateTime: "12 hours ago",
        reactions: { likes: 13, views: 430, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/11.jpg",
          "https://randomuser.me/api/portraits/men/15.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/14.jpg",
        title: "Ideas in Authentication Flow",
        type: "Ideas",
        dateTime: "13 hours ago",
        reactions: { likes: 24, views: 900, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/12.jpg",
          "https://randomuser.me/api/portraits/men/16.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/15.jpg",
        title: "Add User Feedback Feature",
        type: "Feature Request",
        dateTime: "14 hours ago",
        reactions: { likes: 10, views: 350, comments: 20 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/13.jpg",
          "https://randomuser.me/api/portraits/men/17.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/16.jpg",
        title: "Improve Search Functionality",
        type: "User Feedback",
        dateTime: "15 hours ago",
        reactions: { likes: 14, views: 600, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/14.jpg",
          "https://randomuser.me/api/portraits/men/18.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/17.jpg",
        title: "Fix Broken Links",
        type: "Ideas",
        dateTime: "16 hours ago",
        reactions: { likes: 17, views: 700, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/15.jpg",
          "https://randomuser.me/api/portraits/men/19.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/18.jpg",
        title: "Enhance Mobile Responsiveness",
        type: "User Feedback",
        dateTime: "17 hours ago",
        reactions: { likes: 20, views: 800, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/16.jpg",
          "https://randomuser.me/api/portraits/men/20.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/19.jpg",
        title: "Optimize Database Queries",
        type: "User Feedback",
        dateTime: "18 hours ago",
        reactions: { likes: 11, views: 550, comments: 22 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/17.jpg",
          "https://randomuser.me/api/portraits/men/21.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/20.jpg",
        title: "Update API Documentation",
        type: "User Feedback",
        dateTime: "19 hours ago",
        reactions: { likes: 8, views: 400, comments: 15 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/18.jpg",
          "https://randomuser.me/api/portraits/men/22.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/21.jpg",
        title: "Implement OAuth2 Authentication",
        type: "Feature Request",
        dateTime: "20 hours ago",
        reactions: { likes: 30, views: 1000, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/19.jpg",
          "https://randomuser.me/api/portraits/men/23.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/22.jpg",
        title: "Revise Error Handling Logic",
        type: "Ideas",
        dateTime: "21 hours ago",
        reactions: { likes: 12, views: 500, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/20.jpg",
          "https://randomuser.me/api/portraits/men/24.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/23.jpg",
        title: "Add User Roles Management",
        type: "Feature Request",
        dateTime: "22 hours ago",
        reactions: { likes: 17, views: 650, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/21.jpg",
          "https://randomuser.me/api/portraits/men/25.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/24.jpg",
        title: "Fix CSS Grid Issues",
        type: "Ideas",
        dateTime: "23 hours ago",
        reactions: { likes: 14, views: 550, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/22.jpg",
          "https://randomuser.me/api/portraits/men/26.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/25.jpg",
        title: "Improve Form Validation",
        type: "User Feedback",
        dateTime: "24 hours ago",
        reactions: { likes: 19, views: 700, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/23.jpg",
          "https://randomuser.me/api/portraits/men/27.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/26.jpg",
        title: "Add Search Autocomplete",
        type: "Feature Request",
        dateTime: "1 day ago",
        reactions: { likes: 8, views: 400, comments: 18 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/24.jpg",
          "https://randomuser.me/api/portraits/men/28.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/27.jpg",
        title: "Update Privacy Policy",
        type: "User Feedback",
        dateTime: "2 days ago",
        reactions: { likes: 11, views: 500, comments: 22 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/25.jpg",
          "https://randomuser.me/api/portraits/men/29.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/28.jpg",
        title: "Enhance Error Reporting",
        type: "User Feedback",
        dateTime: "3 days ago",
        reactions: { likes: 13, views: 600, comments: 28 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/26.jpg",
          "https://randomuser.me/api/portraits/men/30.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/29.jpg",
        title: "Review Code Quality",
        type: "User Feedback",
        dateTime: "4 days ago",
        reactions: { likes: 15, views: 700, comments: 32 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/27.jpg",
          "https://randomuser.me/api/portraits/men/31.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/30.jpg",
        title: "Fix Broken API Endpoints",
        type: "Ideas",
        dateTime: "5 days ago",
        reactions: { likes: 22, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/28.jpg",
          "https://randomuser.me/api/portraits/men/32.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/31.jpg",
        title: "Optimize Frontend Performance",
        type: "User Feedback",
        dateTime: "6 days ago",
        reactions: { likes: 17, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/29.jpg",
          "https://randomuser.me/api/portraits/men/33.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
        title: "Revise User Interface Design",
        type: "User Feedback",
        dateTime: "7 days ago",
        reactions: { likes: 20, views: 850, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/30.jpg",
          "https://randomuser.me/api/portraits/men/34.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/33.jpg",
        title: "Resolve Cross-Browser Issues",
        type: "Ideas",
        dateTime: "8 days ago",
        reactions: { likes: 24, views: 900, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/31.jpg",
          "https://randomuser.me/api/portraits/men/35.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/34.jpg",
        title: "Implement Caching Mechanism",
        type: "Feature Request",
        dateTime: "9 days ago",
        reactions: { likes: 12, views: 600, comments: 28 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/32.jpg",
          "https://randomuser.me/api/portraits/men/36.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/35.jpg",
        title: "Improve User Onboarding",
        type: "User Feedback",
        dateTime: "10 days ago",
        reactions: { likes: 14, views: 650, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/33.jpg",
          "https://randomuser.me/api/portraits/men/37.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/36.jpg",
        title: "Update Security Protocols",
        type: "Ideas",
        dateTime: "11 days ago",
        reactions: { likes: 18, views: 700, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/34.jpg",
          "https://randomuser.me/api/portraits/men/38.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/37.jpg",
        title: "Enhance Data Backup System",
        type: "Feature Request",
        dateTime: "12 days ago",
        reactions: { likes: 25, views: 800, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/35.jpg",
          "https://randomuser.me/api/portraits/men/39.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/38.jpg",
        title: "Resolve Memory Leak Issue",
        type: "Ideas",
        dateTime: "13 days ago",
        reactions: { likes: 30, views: 900, comments: 55 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/36.jpg",
          "https://randomuser.me/api/portraits/men/40.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/39.jpg",
        title: "Add Advanced Reporting",
        type: "Feature Request",
        dateTime: "14 days ago",
        reactions: { likes: 20, views: 750, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/37.jpg",
          "https://randomuser.me/api/portraits/men/41.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/40.jpg",
        title: "Improve Code Documentation",
        type: "User Feedback",
        dateTime: "15 days ago",
        reactions: { likes: 22, views: 800, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/38.jpg",
          "https://randomuser.me/api/portraits/men/42.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/41.jpg",
        title: "Fix Login Authentication",
        type: "Ideas",
        dateTime: "16 days ago",
        reactions: { likes: 18, views: 650, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/39.jpg",
          "https://randomuser.me/api/portraits/men/43.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/42.jpg",
        title: "Optimize API Response Times",
        type: "User Feedback",
        dateTime: "17 days ago",
        reactions: { likes: 25, views: 900, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/40.jpg",
          "https://randomuser.me/api/portraits/men/44.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/43.jpg",
        title: "Revise Frontend Code",
        type: "User Feedback",
        dateTime: "18 days ago",
        reactions: { likes: 15, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/41.jpg",
          "https://randomuser.me/api/portraits/men/45.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/44.jpg",
        title: "Add Support for Multiple Languages",
        type: "Feature Request",
        dateTime: "19 days ago",
        reactions: { likes: 20, views: 800, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/42.jpg",
          "https://randomuser.me/api/portraits/men/46.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/45.jpg",
        title: "Enhance Data Encryption",
        type: "Feature Request",
        dateTime: "20 days ago",
        reactions: { likes: 28, views: 850, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/43.jpg",
          "https://randomuser.me/api/portraits/men/47.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/46.jpg",
        title: "Update User Profile Features",
        type: "User Feedback",
        dateTime: "21 days ago",
        reactions: { likes: 19, views: 700, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/44.jpg",
          "https://randomuser.me/api/portraits/men/48.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/47.jpg",
        title: "Fix Backend Caching Ideass",
        type: "Ideas",
        dateTime: "22 days ago",
        reactions: { likes: 24, views: 750, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/45.jpg",
          "https://randomuser.me/api/portraits/men/49.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/48.jpg",
        title: "Improve Accessibility",
        type: "User Feedback",
        dateTime: "23 days ago",
        reactions: { likes: 30, views: 800, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/46.jpg",
          "https://randomuser.me/api/portraits/men/50.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/49.jpg",
        title: "Update User Permissions",
        type: "Ideas",
        dateTime: "24 days ago",
        reactions: { likes: 16, views: 700, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/47.jpg",
          "https://randomuser.me/api/portraits/men/51.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/50.jpg",
        title: "Add Push Notifications",
        type: "Feature Request",
        dateTime: "25 days ago",
        reactions: { likes: 22, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/48.jpg",
          "https://randomuser.me/api/portraits/men/52.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/51.jpg",
        title: "Refactor Legacy Code",
        type: "User Feedback",
        dateTime: "26 days ago",
        reactions: { likes: 18, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/49.jpg",
          "https://randomuser.me/api/portraits/men/53.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/52.jpg",
        title: "Fix Frontend Ideass",
        type: "Ideas",
        dateTime: "27 days ago",
        reactions: { likes: 25, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/50.jpg",
          "https://randomuser.me/api/portraits/men/54.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/53.jpg",
        title: "Enhance API Security",
        type: "Feature Request",
        dateTime: "28 days ago",
        reactions: { likes: 21, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/51.jpg",
          "https://randomuser.me/api/portraits/men/55.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/54.jpg",
        title: "Improve Data Visualization",
        type: "User Feedback",
        dateTime: "29 days ago",
        reactions: { likes: 23, views: 850, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/52.jpg",
          "https://randomuser.me/api/portraits/men/56.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/55.jpg",
        title: "Fix Mobile Layout Issues",
        type: "Ideas",
        dateTime: "30 days ago",
        reactions: { likes: 30, views: 900, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/53.jpg",
          "https://randomuser.me/api/portraits/men/57.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/56.jpg",
        title: "Implement User Analytics",
        type: "Feature Request",
        dateTime: "31 days ago",
        reactions: { likes: 20, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/54.jpg",
          "https://randomuser.me/api/portraits/men/58.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/57.jpg",
        title: "Optimize Image Loading",
        type: "User Feedback",
        dateTime: "32 days ago",
        reactions: { likes: 18, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/55.jpg",
          "https://randomuser.me/api/portraits/men/59.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/58.jpg",
        title: "Improve User Feedback System",
        type: "User Feedback",
        dateTime: "33 days ago",
        reactions: { likes: 15, views: 650, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/56.jpg",
          "https://randomuser.me/api/portraits/men/60.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/59.jpg",
        title: "Enhance Mobile User Experience",
        type: "User Feedback",
        dateTime: "34 days ago",
        reactions: { likes: 23, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/57.jpg",
          "https://randomuser.me/api/portraits/men/61.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/60.jpg",
        title: "Update Error Reporting System",
        type: "User Feedback",
        dateTime: "35 days ago",
        reactions: { likes: 25, views: 850, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/58.jpg",
          "https://randomuser.me/api/portraits/men/62.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/61.jpg",
        title: "Refactor API Logic",
        type: "Feature Request",
        dateTime: "36 days ago",
        reactions: { likes: 30, views: 900, comments: 55 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/59.jpg",
          "https://randomuser.me/api/portraits/men/63.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/62.jpg",
        title: "Improve Data Integrity Checks",
        type: "Ideas",
        dateTime: "37 days ago",
        reactions: { likes: 22, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/60.jpg",
          "https://randomuser.me/api/portraits/men/64.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/63.jpg",
        title: "Update API Rate Limiting",
        type: "Feature Request",
        dateTime: "38 days ago",
        reactions: { likes: 27, views: 850, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/61.jpg",
          "https://randomuser.me/api/portraits/men/65.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/64.jpg",
        title: "Add Advanced Search Features",
        type: "Feature Request",
        dateTime: "39 days ago",
        reactions: { likes: 18, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/62.jpg",
          "https://randomuser.me/api/portraits/men/66.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/65.jpg",
        title: "Update Documentation Guidelines",
        type: "User Feedback",
        dateTime: "40 days ago",
        reactions: { likes: 22, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/63.jpg",
          "https://randomuser.me/api/portraits/men/67.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/66.jpg",
        title: "Fix Broken User Profile",
        type: "Ideas",
        dateTime: "41 days ago",
        reactions: { likes: 17, views: 600, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/64.jpg",
          "https://randomuser.me/api/portraits/men/68.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/67.jpg",
        title: "Enhance API Error Handling",
        type: "User Feedback",
        dateTime: "42 days ago",
        reactions: { likes: 19, views: 650, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/65.jpg",
          "https://randomuser.me/api/portraits/men/69.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/68.jpg",
        title: "Add Custom Widgets",
        type: "Feature Request",
        dateTime: "43 days ago",
        reactions: { likes: 26, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/66.jpg",
          "https://randomuser.me/api/portraits/men/70.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/69.jpg",
        title: "Optimize Database Queries",
        type: "User Feedback",
        dateTime: "44 days ago",
        reactions: { likes: 22, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/67.jpg",
          "https://randomuser.me/api/portraits/men/71.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/70.jpg",
        title: "Improve User Feedback Mechanism",
        type: "User Feedback",
        dateTime: "45 days ago",
        reactions: { likes: 28, views: 800, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/68.jpg",
          "https://randomuser.me/api/portraits/men/72.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/71.jpg",
        title: "Update Backend Infrastructure",
        type: "Feature Request",
        dateTime: "46 days ago",
        reactions: { likes: 15, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/69.jpg",
          "https://randomuser.me/api/portraits/men/73.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/72.jpg",
        title: "Add User Segmentation",
        type: "Feature Request",
        dateTime: "47 days ago",
        reactions: { likes: 20, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/70.jpg",
          "https://randomuser.me/api/portraits/men/74.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/73.jpg",
        title: "Fix Payment Gateway Integration",
        type: "Ideas",
        dateTime: "48 days ago",
        reactions: { likes: 12, views: 650, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/71.jpg",
          "https://randomuser.me/api/portraits/men/75.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/74.jpg",
        title: "Enhance Payment Security",
        type: "Feature Request",
        dateTime: "49 days ago",
        reactions: { likes: 30, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/72.jpg",
          "https://randomuser.me/api/portraits/men/76.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/75.jpg",
        title: "Improve Session Management",
        type: "User Feedback",
        dateTime: "50 days ago",
        reactions: { likes: 25, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/73.jpg",
          "https://randomuser.me/api/portraits/men/77.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/76.jpg",
        title: "Fix Data Import Issues",
        type: "Ideas",
        dateTime: "51 days ago",
        reactions: { likes: 18, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/74.jpg",
          "https://randomuser.me/api/portraits/men/78.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/77.jpg",
        title: "Enhance Data Visualization Tools",
        type: "User Feedback",
        dateTime: "52 days ago",
        reactions: { likes: 20, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/75.jpg",
          "https://randomuser.me/api/portraits/men/79.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/78.jpg",
        title: "Add Real-time Notifications",
        type: "Feature Request",
        dateTime: "53 days ago",
        reactions: { likes: 28, views: 850, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/76.jpg",
          "https://randomuser.me/api/portraits/men/80.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/79.jpg",
        title: "Update User Onboarding Process",
        type: "User Feedback",
        dateTime: "54 days ago",
        reactions: { likes: 25, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/77.jpg",
          "https://randomuser.me/api/portraits/men/81.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/80.jpg",
        title: "Fix API Rate Limiting Issues",
        type: "Ideas",
        dateTime: "55 days ago",
        reactions: { likes: 22, views: 750, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/78.jpg",
          "https://randomuser.me/api/portraits/men/82.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/81.jpg",
        title: "Optimize Frontend Performance",
        type: "User Feedback",
        dateTime: "56 days ago",
        reactions: { likes: 18, views: 700, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/79.jpg",
          "https://randomuser.me/api/portraits/men/83.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/82.jpg",
        title: "Enhance User Privacy Features",
        type: "Feature Request",
        dateTime: "57 days ago",
        reactions: { likes: 30, views: 800, comments: 50 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/80.jpg",
          "https://randomuser.me/api/portraits/men/84.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/83.jpg",
        title: "Fix Data Synchronization Issues",
        type: "Ideas",
        dateTime: "58 days ago",
        reactions: { likes: 25, views: 850, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/81.jpg",
          "https://randomuser.me/api/portraits/men/85.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/84.jpg",
        title: "Improve Backend Logging",
        type: "User Feedback",
        dateTime: "59 days ago",
        reactions: { likes: 22, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/82.jpg",
          "https://randomuser.me/api/portraits/men/86.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/85.jpg",
        title: "Add Custom Analytics Dashboards",
        type: "Feature Request",
        dateTime: "60 days ago",
        reactions: { likes: 20, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/83.jpg",
          "https://randomuser.me/api/portraits/men/87.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/86.jpg",
        title: "Fix API Authentication Issues",
        type: "Ideas",
        dateTime: "61 days ago",
        reactions: { likes: 30, views: 900, comments: 55 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/84.jpg",
          "https://randomuser.me/api/portraits/men/88.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/87.jpg",
        title: "Update User Activity Tracking",
        type: "User Feedback",
        dateTime: "62 days ago",
        reactions: { likes: 25, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/85.jpg",
          "https://randomuser.me/api/portraits/men/89.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/88.jpg",
        title: "Add Support for Two-Factor Authentication",
        type: "Feature Request",
        dateTime: "63 days ago",
        reactions: { likes: 18, views: 650, comments: 25 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/86.jpg",
          "https://randomuser.me/api/portraits/men/90.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/89.jpg",
        title: "Improve API Documentation",
        type: "User Feedback",
        dateTime: "64 days ago",
        reactions: { likes: 22, views: 750, comments: 35 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/87.jpg",
          "https://randomuser.me/api/portraits/men/91.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/90.jpg",
        title: "Optimize Backend Performance",
        type: "User Feedback",
        dateTime: "65 days ago",
        reactions: { likes: 20, views: 700, comments: 30 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/88.jpg",
          "https://randomuser.me/api/portraits/men/92.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/91.jpg",
        title: "Fix Database Backup Issues",
        type: "Ideas",
        dateTime: "66 days ago",
        reactions: { likes: 15, views: 650, comments: 20 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/89.jpg",
          "https://randomuser.me/api/portraits/men/93.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/92.jpg",
        title: "Enhance Real-time Data Processing",
        type: "User Feedback",
        dateTime: "67 days ago",
        reactions: { likes: 25, views: 800, comments: 40 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/90.jpg",
          "https://randomuser.me/api/portraits/men/94.jpg",
        ],
      },
      {
        userImage: "https://randomuser.me/api/portraits/men/93.jpg",
        title: "Add Support for Custom User Roles",
        type: "Feature Request",
        dateTime: "68 days ago",
        reactions: { likes: 28, views: 850, comments: 45 },
        discussionUsers: [
          "https://randomuser.me/api/portraits/men/91.jpg",
          "https://randomuser.me/api/portraits/men/95.jpg",
        ],
      },]
   data.push(...originalIssues)
      console.log(data)
    setIssues([...data])

    setOriginalIssues([...data])
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
// useEffect(()=>{

//   setIssues( 
//     [
//     {
//       userImage: "https://randomuser.me/api/portraits/men/1.jpg",
//       title: "Kubernetes Pod Scaling Issue",
//       type: "General",
//       dateTime: "26 minutes ago",
//       reactions: { likes: 5, views: 420, comments: 70 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/2.jpg",
//         "https://randomuser.me/api/portraits/men/3.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/2.jpg",
//       title: "Database Connection Failure",
//       type: "Ideas",
//       dateTime: "1 hour ago",
//       reactions: { likes: 12, views: 600, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/3.jpg",
//         "https://randomuser.me/api/portraits/men/4.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/3.jpg",
//       title: "UI Layout Misalignment",
//       type: "User Feedback",
//       dateTime: "2 hours ago",
//       reactions: { likes: 7, views: 350, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/1.jpg",
//         "https://randomuser.me/api/portraits/men/5.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/4.jpg",
//       title: "Security Vulnerability in Authentication",
//       type: "Ideas",
//       dateTime: "3 hours ago",
//       reactions: { likes: 19, views: 800, comments: 55 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/2.jpg",
//         "https://randomuser.me/api/portraits/men/6.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/5.jpg",
//       title: "Feature Request: Dark Mode",
//       type: "Feature Request",
//       dateTime: "4 hours ago",
//       reactions: { likes: 8, views: 450, comments: 20 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/3.jpg",
//         "https://randomuser.me/api/portraits/men/7.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/6.jpg",
//       title: "API Rate Limiting Issue",
//       type: "Ideas",
//       dateTime: "5 hours ago",
//       reactions: { likes: 25, views: 950, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/4.jpg",
//         "https://randomuser.me/api/portraits/men/8.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/7.jpg",
//       title: "Optimize Load Times",
//       type: "User Feedback",
//       dateTime: "6 hours ago",
//       reactions: { likes: 15, views: 500, comments: 10 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/5.jpg",
//         "https://randomuser.me/api/portraits/men/9.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/8.jpg",
//       title: "Update Documentation",
//       type: "User Feedback",
//       dateTime: "7 hours ago",
//       reactions: { likes: 3, views: 200, comments: 5 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/6.jpg",
//         "https://randomuser.me/api/portraits/men/10.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/9.jpg",
//       title: "Integration with Payment Gateway",
//       type: "Feature Request",
//       dateTime: "8 hours ago",
//       reactions: { likes: 9, views: 350, comments: 8 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/7.jpg",
//         "https://randomuser.me/api/portraits/men/11.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/10.jpg",
//       title: "Deployment Failure in Production",
//       type: "Ideas",
//       dateTime: "9 hours ago",
//       reactions: { likes: 18, views: 700, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/8.jpg",
//         "https://randomuser.me/api/portraits/men/12.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/11.jpg",
//       title: "Refactor Codebase",
//       type: "User Feedback",
//       dateTime: "10 hours ago",
//       reactions: { likes: 6, views: 270, comments: 15 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/9.jpg",
//         "https://randomuser.me/api/portraits/men/13.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/12.jpg",
//       title: "User Permissions Issue",
//       type: "Ideas",
//       dateTime: "11 hours ago",
//       reactions: { likes: 22, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/10.jpg",
//         "https://randomuser.me/api/portraits/men/14.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/13.jpg",
//       title: "UI/UX Enhancements",
//       type: "User Feedback",
//       dateTime: "12 hours ago",
//       reactions: { likes: 13, views: 430, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/11.jpg",
//         "https://randomuser.me/api/portraits/men/15.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/14.jpg",
//       title: "Ideas in Authentication Flow",
//       type: "Ideas",
//       dateTime: "13 hours ago",
//       reactions: { likes: 24, views: 900, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/12.jpg",
//         "https://randomuser.me/api/portraits/men/16.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/15.jpg",
//       title: "Add User Feedback Feature",
//       type: "Feature Request",
//       dateTime: "14 hours ago",
//       reactions: { likes: 10, views: 350, comments: 20 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/13.jpg",
//         "https://randomuser.me/api/portraits/men/17.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/16.jpg",
//       title: "Improve Search Functionality",
//       type: "User Feedback",
//       dateTime: "15 hours ago",
//       reactions: { likes: 14, views: 600, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/14.jpg",
//         "https://randomuser.me/api/portraits/men/18.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/17.jpg",
//       title: "Fix Broken Links",
//       type: "Ideas",
//       dateTime: "16 hours ago",
//       reactions: { likes: 17, views: 700, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/15.jpg",
//         "https://randomuser.me/api/portraits/men/19.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/18.jpg",
//       title: "Enhance Mobile Responsiveness",
//       type: "User Feedback",
//       dateTime: "17 hours ago",
//       reactions: { likes: 20, views: 800, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/16.jpg",
//         "https://randomuser.me/api/portraits/men/20.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/19.jpg",
//       title: "Optimize Database Queries",
//       type: "User Feedback",
//       dateTime: "18 hours ago",
//       reactions: { likes: 11, views: 550, comments: 22 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/17.jpg",
//         "https://randomuser.me/api/portraits/men/21.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/20.jpg",
//       title: "Update API Documentation",
//       type: "User Feedback",
//       dateTime: "19 hours ago",
//       reactions: { likes: 8, views: 400, comments: 15 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/18.jpg",
//         "https://randomuser.me/api/portraits/men/22.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/21.jpg",
//       title: "Implement OAuth2 Authentication",
//       type: "Feature Request",
//       dateTime: "20 hours ago",
//       reactions: { likes: 30, views: 1000, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/19.jpg",
//         "https://randomuser.me/api/portraits/men/23.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/22.jpg",
//       title: "Revise Error Handling Logic",
//       type: "Ideas",
//       dateTime: "21 hours ago",
//       reactions: { likes: 12, views: 500, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/20.jpg",
//         "https://randomuser.me/api/portraits/men/24.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/23.jpg",
//       title: "Add User Roles Management",
//       type: "Feature Request",
//       dateTime: "22 hours ago",
//       reactions: { likes: 17, views: 650, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/21.jpg",
//         "https://randomuser.me/api/portraits/men/25.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/24.jpg",
//       title: "Fix CSS Grid Issues",
//       type: "Ideas",
//       dateTime: "23 hours ago",
//       reactions: { likes: 14, views: 550, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/22.jpg",
//         "https://randomuser.me/api/portraits/men/26.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/25.jpg",
//       title: "Improve Form Validation",
//       type: "User Feedback",
//       dateTime: "24 hours ago",
//       reactions: { likes: 19, views: 700, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/23.jpg",
//         "https://randomuser.me/api/portraits/men/27.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/26.jpg",
//       title: "Add Search Autocomplete",
//       type: "Feature Request",
//       dateTime: "1 day ago",
//       reactions: { likes: 8, views: 400, comments: 18 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/24.jpg",
//         "https://randomuser.me/api/portraits/men/28.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/27.jpg",
//       title: "Update Privacy Policy",
//       type: "User Feedback",
//       dateTime: "2 days ago",
//       reactions: { likes: 11, views: 500, comments: 22 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/25.jpg",
//         "https://randomuser.me/api/portraits/men/29.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/28.jpg",
//       title: "Enhance Error Reporting",
//       type: "User Feedback",
//       dateTime: "3 days ago",
//       reactions: { likes: 13, views: 600, comments: 28 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/26.jpg",
//         "https://randomuser.me/api/portraits/men/30.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/29.jpg",
//       title: "Review Code Quality",
//       type: "User Feedback",
//       dateTime: "4 days ago",
//       reactions: { likes: 15, views: 700, comments: 32 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/27.jpg",
//         "https://randomuser.me/api/portraits/men/31.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/30.jpg",
//       title: "Fix Broken API Endpoints",
//       type: "Ideas",
//       dateTime: "5 days ago",
//       reactions: { likes: 22, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/28.jpg",
//         "https://randomuser.me/api/portraits/men/32.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/31.jpg",
//       title: "Optimize Frontend Performance",
//       type: "User Feedback",
//       dateTime: "6 days ago",
//       reactions: { likes: 17, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/29.jpg",
//         "https://randomuser.me/api/portraits/men/33.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/32.jpg",
//       title: "Revise User Interface Design",
//       type: "User Feedback",
//       dateTime: "7 days ago",
//       reactions: { likes: 20, views: 850, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/30.jpg",
//         "https://randomuser.me/api/portraits/men/34.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/33.jpg",
//       title: "Resolve Cross-Browser Issues",
//       type: "Ideas",
//       dateTime: "8 days ago",
//       reactions: { likes: 24, views: 900, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/31.jpg",
//         "https://randomuser.me/api/portraits/men/35.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/34.jpg",
//       title: "Implement Caching Mechanism",
//       type: "Feature Request",
//       dateTime: "9 days ago",
//       reactions: { likes: 12, views: 600, comments: 28 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/32.jpg",
//         "https://randomuser.me/api/portraits/men/36.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/35.jpg",
//       title: "Improve User Onboarding",
//       type: "User Feedback",
//       dateTime: "10 days ago",
//       reactions: { likes: 14, views: 650, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/33.jpg",
//         "https://randomuser.me/api/portraits/men/37.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/36.jpg",
//       title: "Update Security Protocols",
//       type: "Ideas",
//       dateTime: "11 days ago",
//       reactions: { likes: 18, views: 700, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/34.jpg",
//         "https://randomuser.me/api/portraits/men/38.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/37.jpg",
//       title: "Enhance Data Backup System",
//       type: "Feature Request",
//       dateTime: "12 days ago",
//       reactions: { likes: 25, views: 800, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/35.jpg",
//         "https://randomuser.me/api/portraits/men/39.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/38.jpg",
//       title: "Resolve Memory Leak Issue",
//       type: "Ideas",
//       dateTime: "13 days ago",
//       reactions: { likes: 30, views: 900, comments: 55 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/36.jpg",
//         "https://randomuser.me/api/portraits/men/40.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/39.jpg",
//       title: "Add Advanced Reporting",
//       type: "Feature Request",
//       dateTime: "14 days ago",
//       reactions: { likes: 20, views: 750, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/37.jpg",
//         "https://randomuser.me/api/portraits/men/41.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/40.jpg",
//       title: "Improve Code Documentation",
//       type: "User Feedback",
//       dateTime: "15 days ago",
//       reactions: { likes: 22, views: 800, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/38.jpg",
//         "https://randomuser.me/api/portraits/men/42.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/41.jpg",
//       title: "Fix Login Authentication",
//       type: "Ideas",
//       dateTime: "16 days ago",
//       reactions: { likes: 18, views: 650, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/39.jpg",
//         "https://randomuser.me/api/portraits/men/43.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/42.jpg",
//       title: "Optimize API Response Times",
//       type: "User Feedback",
//       dateTime: "17 days ago",
//       reactions: { likes: 25, views: 900, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/40.jpg",
//         "https://randomuser.me/api/portraits/men/44.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/43.jpg",
//       title: "Revise Frontend Code",
//       type: "User Feedback",
//       dateTime: "18 days ago",
//       reactions: { likes: 15, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/41.jpg",
//         "https://randomuser.me/api/portraits/men/45.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/44.jpg",
//       title: "Add Support for Multiple Languages",
//       type: "Feature Request",
//       dateTime: "19 days ago",
//       reactions: { likes: 20, views: 800, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/42.jpg",
//         "https://randomuser.me/api/portraits/men/46.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/45.jpg",
//       title: "Enhance Data Encryption",
//       type: "Feature Request",
//       dateTime: "20 days ago",
//       reactions: { likes: 28, views: 850, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/43.jpg",
//         "https://randomuser.me/api/portraits/men/47.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/46.jpg",
//       title: "Update User Profile Features",
//       type: "User Feedback",
//       dateTime: "21 days ago",
//       reactions: { likes: 19, views: 700, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/44.jpg",
//         "https://randomuser.me/api/portraits/men/48.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/47.jpg",
//       title: "Fix Backend Caching Ideass",
//       type: "Ideas",
//       dateTime: "22 days ago",
//       reactions: { likes: 24, views: 750, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/45.jpg",
//         "https://randomuser.me/api/portraits/men/49.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/48.jpg",
//       title: "Improve Accessibility",
//       type: "User Feedback",
//       dateTime: "23 days ago",
//       reactions: { likes: 30, views: 800, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/46.jpg",
//         "https://randomuser.me/api/portraits/men/50.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/49.jpg",
//       title: "Update User Permissions",
//       type: "Ideas",
//       dateTime: "24 days ago",
//       reactions: { likes: 16, views: 700, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/47.jpg",
//         "https://randomuser.me/api/portraits/men/51.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/50.jpg",
//       title: "Add Push Notifications",
//       type: "Feature Request",
//       dateTime: "25 days ago",
//       reactions: { likes: 22, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/48.jpg",
//         "https://randomuser.me/api/portraits/men/52.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/51.jpg",
//       title: "Refactor Legacy Code",
//       type: "User Feedback",
//       dateTime: "26 days ago",
//       reactions: { likes: 18, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/49.jpg",
//         "https://randomuser.me/api/portraits/men/53.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/52.jpg",
//       title: "Fix Frontend Ideass",
//       type: "Ideas",
//       dateTime: "27 days ago",
//       reactions: { likes: 25, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/50.jpg",
//         "https://randomuser.me/api/portraits/men/54.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/53.jpg",
//       title: "Enhance API Security",
//       type: "Feature Request",
//       dateTime: "28 days ago",
//       reactions: { likes: 21, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/51.jpg",
//         "https://randomuser.me/api/portraits/men/55.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/54.jpg",
//       title: "Improve Data Visualization",
//       type: "User Feedback",
//       dateTime: "29 days ago",
//       reactions: { likes: 23, views: 850, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/52.jpg",
//         "https://randomuser.me/api/portraits/men/56.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/55.jpg",
//       title: "Fix Mobile Layout Issues",
//       type: "Ideas",
//       dateTime: "30 days ago",
//       reactions: { likes: 30, views: 900, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/53.jpg",
//         "https://randomuser.me/api/portraits/men/57.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/56.jpg",
//       title: "Implement User Analytics",
//       type: "Feature Request",
//       dateTime: "31 days ago",
//       reactions: { likes: 20, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/54.jpg",
//         "https://randomuser.me/api/portraits/men/58.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/57.jpg",
//       title: "Optimize Image Loading",
//       type: "User Feedback",
//       dateTime: "32 days ago",
//       reactions: { likes: 18, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/55.jpg",
//         "https://randomuser.me/api/portraits/men/59.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/58.jpg",
//       title: "Improve User Feedback System",
//       type: "User Feedback",
//       dateTime: "33 days ago",
//       reactions: { likes: 15, views: 650, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/56.jpg",
//         "https://randomuser.me/api/portraits/men/60.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/59.jpg",
//       title: "Enhance Mobile User Experience",
//       type: "User Feedback",
//       dateTime: "34 days ago",
//       reactions: { likes: 23, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/57.jpg",
//         "https://randomuser.me/api/portraits/men/61.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/60.jpg",
//       title: "Update Error Reporting System",
//       type: "User Feedback",
//       dateTime: "35 days ago",
//       reactions: { likes: 25, views: 850, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/58.jpg",
//         "https://randomuser.me/api/portraits/men/62.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/61.jpg",
//       title: "Refactor API Logic",
//       type: "Feature Request",
//       dateTime: "36 days ago",
//       reactions: { likes: 30, views: 900, comments: 55 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/59.jpg",
//         "https://randomuser.me/api/portraits/men/63.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/62.jpg",
//       title: "Improve Data Integrity Checks",
//       type: "Ideas",
//       dateTime: "37 days ago",
//       reactions: { likes: 22, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/60.jpg",
//         "https://randomuser.me/api/portraits/men/64.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/63.jpg",
//       title: "Update API Rate Limiting",
//       type: "Feature Request",
//       dateTime: "38 days ago",
//       reactions: { likes: 27, views: 850, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/61.jpg",
//         "https://randomuser.me/api/portraits/men/65.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/64.jpg",
//       title: "Add Advanced Search Features",
//       type: "Feature Request",
//       dateTime: "39 days ago",
//       reactions: { likes: 18, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/62.jpg",
//         "https://randomuser.me/api/portraits/men/66.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/65.jpg",
//       title: "Update Documentation Guidelines",
//       type: "User Feedback",
//       dateTime: "40 days ago",
//       reactions: { likes: 22, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/63.jpg",
//         "https://randomuser.me/api/portraits/men/67.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/66.jpg",
//       title: "Fix Broken User Profile",
//       type: "Ideas",
//       dateTime: "41 days ago",
//       reactions: { likes: 17, views: 600, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/64.jpg",
//         "https://randomuser.me/api/portraits/men/68.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/67.jpg",
//       title: "Enhance API Error Handling",
//       type: "User Feedback",
//       dateTime: "42 days ago",
//       reactions: { likes: 19, views: 650, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/65.jpg",
//         "https://randomuser.me/api/portraits/men/69.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/68.jpg",
//       title: "Add Custom Widgets",
//       type: "Feature Request",
//       dateTime: "43 days ago",
//       reactions: { likes: 26, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/66.jpg",
//         "https://randomuser.me/api/portraits/men/70.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/69.jpg",
//       title: "Optimize Database Queries",
//       type: "User Feedback",
//       dateTime: "44 days ago",
//       reactions: { likes: 22, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/67.jpg",
//         "https://randomuser.me/api/portraits/men/71.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/70.jpg",
//       title: "Improve User Feedback Mechanism",
//       type: "User Feedback",
//       dateTime: "45 days ago",
//       reactions: { likes: 28, views: 800, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/68.jpg",
//         "https://randomuser.me/api/portraits/men/72.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/71.jpg",
//       title: "Update Backend Infrastructure",
//       type: "Feature Request",
//       dateTime: "46 days ago",
//       reactions: { likes: 15, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/69.jpg",
//         "https://randomuser.me/api/portraits/men/73.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/72.jpg",
//       title: "Add User Segmentation",
//       type: "Feature Request",
//       dateTime: "47 days ago",
//       reactions: { likes: 20, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/70.jpg",
//         "https://randomuser.me/api/portraits/men/74.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/73.jpg",
//       title: "Fix Payment Gateway Integration",
//       type: "Ideas",
//       dateTime: "48 days ago",
//       reactions: { likes: 12, views: 650, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/71.jpg",
//         "https://randomuser.me/api/portraits/men/75.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/74.jpg",
//       title: "Enhance Payment Security",
//       type: "Feature Request",
//       dateTime: "49 days ago",
//       reactions: { likes: 30, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/72.jpg",
//         "https://randomuser.me/api/portraits/men/76.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/75.jpg",
//       title: "Improve Session Management",
//       type: "User Feedback",
//       dateTime: "50 days ago",
//       reactions: { likes: 25, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/73.jpg",
//         "https://randomuser.me/api/portraits/men/77.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/76.jpg",
//       title: "Fix Data Import Issues",
//       type: "Ideas",
//       dateTime: "51 days ago",
//       reactions: { likes: 18, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/74.jpg",
//         "https://randomuser.me/api/portraits/men/78.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/77.jpg",
//       title: "Enhance Data Visualization Tools",
//       type: "User Feedback",
//       dateTime: "52 days ago",
//       reactions: { likes: 20, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/75.jpg",
//         "https://randomuser.me/api/portraits/men/79.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/78.jpg",
//       title: "Add Real-time Notifications",
//       type: "Feature Request",
//       dateTime: "53 days ago",
//       reactions: { likes: 28, views: 850, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/76.jpg",
//         "https://randomuser.me/api/portraits/men/80.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/79.jpg",
//       title: "Update User Onboarding Process",
//       type: "User Feedback",
//       dateTime: "54 days ago",
//       reactions: { likes: 25, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/77.jpg",
//         "https://randomuser.me/api/portraits/men/81.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/80.jpg",
//       title: "Fix API Rate Limiting Issues",
//       type: "Ideas",
//       dateTime: "55 days ago",
//       reactions: { likes: 22, views: 750, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/78.jpg",
//         "https://randomuser.me/api/portraits/men/82.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/81.jpg",
//       title: "Optimize Frontend Performance",
//       type: "User Feedback",
//       dateTime: "56 days ago",
//       reactions: { likes: 18, views: 700, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/79.jpg",
//         "https://randomuser.me/api/portraits/men/83.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/82.jpg",
//       title: "Enhance User Privacy Features",
//       type: "Feature Request",
//       dateTime: "57 days ago",
//       reactions: { likes: 30, views: 800, comments: 50 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/80.jpg",
//         "https://randomuser.me/api/portraits/men/84.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/83.jpg",
//       title: "Fix Data Synchronization Issues",
//       type: "Ideas",
//       dateTime: "58 days ago",
//       reactions: { likes: 25, views: 850, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/81.jpg",
//         "https://randomuser.me/api/portraits/men/85.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/84.jpg",
//       title: "Improve Backend Logging",
//       type: "User Feedback",
//       dateTime: "59 days ago",
//       reactions: { likes: 22, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/82.jpg",
//         "https://randomuser.me/api/portraits/men/86.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/85.jpg",
//       title: "Add Custom Analytics Dashboards",
//       type: "Feature Request",
//       dateTime: "60 days ago",
//       reactions: { likes: 20, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/83.jpg",
//         "https://randomuser.me/api/portraits/men/87.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/86.jpg",
//       title: "Fix API Authentication Issues",
//       type: "Ideas",
//       dateTime: "61 days ago",
//       reactions: { likes: 30, views: 900, comments: 55 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/84.jpg",
//         "https://randomuser.me/api/portraits/men/88.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/87.jpg",
//       title: "Update User Activity Tracking",
//       type: "User Feedback",
//       dateTime: "62 days ago",
//       reactions: { likes: 25, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/85.jpg",
//         "https://randomuser.me/api/portraits/men/89.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/88.jpg",
//       title: "Add Support for Two-Factor Authentication",
//       type: "Feature Request",
//       dateTime: "63 days ago",
//       reactions: { likes: 18, views: 650, comments: 25 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/86.jpg",
//         "https://randomuser.me/api/portraits/men/90.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/89.jpg",
//       title: "Improve API Documentation",
//       type: "User Feedback",
//       dateTime: "64 days ago",
//       reactions: { likes: 22, views: 750, comments: 35 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/87.jpg",
//         "https://randomuser.me/api/portraits/men/91.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/90.jpg",
//       title: "Optimize Backend Performance",
//       type: "User Feedback",
//       dateTime: "65 days ago",
//       reactions: { likes: 20, views: 700, comments: 30 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/88.jpg",
//         "https://randomuser.me/api/portraits/men/92.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/91.jpg",
//       title: "Fix Database Backup Issues",
//       type: "Ideas",
//       dateTime: "66 days ago",
//       reactions: { likes: 15, views: 650, comments: 20 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/89.jpg",
//         "https://randomuser.me/api/portraits/men/93.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/92.jpg",
//       title: "Enhance Real-time Data Processing",
//       type: "User Feedback",
//       dateTime: "67 days ago",
//       reactions: { likes: 25, views: 800, comments: 40 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/90.jpg",
//         "https://randomuser.me/api/portraits/men/94.jpg",
//       ],
//     },
//     {
//       userImage: "https://randomuser.me/api/portraits/men/93.jpg",
//       title: "Add Support for Custom User Roles",
//       type: "Feature Request",
//       dateTime: "68 days ago",
//       reactions: { likes: 28, views: 850, comments: 45 },
//       discussionUsers: [
//         "https://randomuser.me/api/portraits/men/91.jpg",
//         "https://randomuser.me/api/portraits/men/95.jpg",
//       ],
//     },])
// },[])

  const [currentPage, setCurrentPage] = useState(1);
  let [sortModal,setShowSortModal]=useState(false)
  const issuesPerPage = 10; // Number of issues per page
  const totalPages = Math.ceil(issues.length / issuesPerPage);
// Get current issues
let [currentIssues,setCurrentIssues]=useState([])
useEffect(()=>{
setCurrentIssues(issues.slice(
  (currentPage - 1) * issuesPerPage,
  currentPage * issuesPerPage
))
},[issues,currentPage])

// Handle page change
const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return; // Prevent invalid pages
  setCurrentPage(page);
};
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
  const devopsIssues = [
    "Issue with Kubernetes Pod Scaling",
    "Troubleshooting Docker Container Networking",
    "Configuring AWS IAM Roles for EKS",
    "Azure DevOps Pipeline Failure",
    "Docker Compose Not Starting Services",
    "Kubernetes Cluster Authentication Issue",
  ];
  function handleOnClick(id){
    // router.push(`/devopsforum?id=${id}`)
    window.location.href=`/devopsforum?id=${id}`
  }
  function handleReset(){
    setIssues([...originalIssues])
  }
  const handleSortClick = (title) => {
    let arr = [...issues];
    switch (title) {
      case 'Most Commented':
        arr.sort((a, b) => b.reactions.comments - a.reactions.comments);
        break;
      case 'Least Commented':
        arr.sort((a, b) => a.reactions.comments - b.reactions.comments);
        break;
      case 'Most liked':
        arr.sort((a, b) => b.reactions.likes - a.reactions.likes);
        break;
      case 'Least liked':
        arr.sort((a, b) => a.reactions.likes - b.reactions.likes);
        break;
      case 'Most Viewed':
        arr.sort((a, b) => b.reactions.views - a.reactions.views);
        break;
      case 'Least Viewed':
        arr.sort((a, b) => a.reactions.views - b.reactions.views);
        break;
      case 'Oldest':
        arr.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'Recently Updated':
        arr.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
        break;
      default:
        break;
    }
    setIssues(arr);
    // setCurrentIssues(arr.slice((currentPage - 1) * issuesPerPage, currentPage * issuesPerPage));
  };

  function handleAskQuestion(){
    router.push("/createforum")
  }
  async function handleLike(e,question){
    e.preventDefault()
    if(!finalUser){
      return
    }
    let data=await fetch("/api/questionlikes",{
      method:"POST",
      body:JSON.stringify({
        id:question._id,
        user_id:finalUser._id
      })

    })

    let arr=issues
  arr.map((data)=>{
    if(data._id==question._id){
      if(data.likes.includes(finalUser._id)){
        data.likes=data.likes.filter((d)=>d!==finalUser._id)
      }else{
        data.likes.push(finalUser._id)
      }
    }
    setIssues([...arr])
    setOriginalIssues([...arr])
  })
    

  }
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
                {tags.map((tag, index) => (
                  <Tag key={index} name={tag} />
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
                {recent.map((item, index) => (
                  <RecentTopics
                    theme={theme}
                    key={index}
                    topic={item.topic}
                    img={item.img}
                    user={item.user}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[85%] max-xl:w-[100%]  max-lg:w-[100%] gap-10 pl-16 pr-16 max-xl:pl-0 max-xl:pr-0 max-lg:flex-col flex">
            <div className="w-[80%] max-lg:w-[100%]">
              <div className="border-[1px] border-gray-300  min-h-[150vh]">
                <div className="h-16 bg-[#6089a4] text-white px-12 max-md:px-2 max-sm:px-0 max-md:h-20">
                  <div className="flex justify-between items-center h-full flex-wrap max-md:justify-start">
                    <div className="max-sm:relative max-sm:top-1 flex  max-sm:px-2 gap-5 max-sm:gap-6 max-sm:w-[100%] items-center ">
                      <div className="flex items-center gap-2 max-sm:text-[14px] cursor-pointer">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <span>15 Open</span>
                      </div>
                      <div className="flex items-center gap-2 max-sm:text-[14px] cursor-pointer">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span>202 Closed</span>
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
                  {currentIssues.map((issue, index) => (
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
                            {issue?.discussionUsers?.map((userImg, idx) => (
                              <img
                                key={idx}
                                src={userImg}
                                alt="Discussion User"
                                className="rounded-full w-5 h-5"
                                onMouseEnter={(event) => handleMouseEnter(event, userImg)}
                                onMouseLeave={handleMouseLeave}
                              />
                            ))}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                   {hoveredUser && (
        <div
          className={`forummodal ease-out fixed  border  p-4 w-[400px] h-[200px] rounded-lg ${theme?"bg-white border-gray-300": "bg-[#2b2b2b] border-slate-50 border-[1px] text-gray-400"} shadow-lg`}
          style={{ top: cursorPosition.y + 10, left: cursorPosition.x - 400 }}
        >
         <div className="w-[100%] flex gap-4 items-center">
           <img src={hoveredUser} alt="Hovered User" className="w-20 h-20 rounded-full" />
          <div className="flex w-[100%] items-start gap-2 h-[100%] justify-center flex-col ">
            <p>User Name</p>
            <button className={`bg-transparent pt-1 pb-1 pl-3 pr-3 rounded-md border-[1px] border-gray-500 `}>Follow</button>
            </div>
          </div>
          <div className="p-[20px] mt-4 flex gap-6 w-[100%] justify-center">
            <p className="flex flex-col h-[100%] items-center"><h2>Answers</h2><p>40</p></p>
            <p className="flex h-[100%] flex-col items-center"><h2>Questions</h2><p>40</p></p>
            <p className="flex h-[100%] items-center flex-col"><h2>Followers</h2><p>40</p></p>
          </div>
        </div>
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
                  {helpfulUsers.map((user, index) => (
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
                  {devopsIssues.map((issue, index) => (
                    <TopIssue key={index} title={issue} index={index} />
                  ))}
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
            <div className="mt-10 ">
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
                {recent.map((item, index) => (
                  <RecentTopics
                    theme={theme}
                    key={index}
                    topic={item.topic}
                    img={item.img}
                    user={item.user}
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

export default ForumPage;
