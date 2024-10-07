import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
import ReactQuill, { Quill } from "react-quill";
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import "react-quill/dist/quill.snow.css";
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
const Tag = ({ name, theme }) => (
  <div
    className={`${
      theme ? "bg-gray-200 text-gray-700 " : "bg-[#2c303a] text-gray-100"
    } px-4 py-1 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-500`}
  >
    {name}
  </div>
);
function ForumPost({ theme, id, finalUser, setMsg, setIsPopup }) {
  const router = useRouter();
  let [isComment, setIsComment] = useState(false);
  let [issue, setIssue] = useState({});
  let content = useRef();
  let [isRelated, setIsRelated] = useState(false);
  let [relatedUsers, setRelatedUsers] = useState([]);
  let [isImg, setIsImg] = useState("");
  let comment = useRef();
  let [loading, setLoading] = useState(true);

  const [hoveredUser, setHoveredUser] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  let [users, setUsers] = useState([]);
  function handleAskQuestion() {
    if (!finalUser || !localStorage.getItem("finalUser")) {
      setIsPopup(true);
      setMsg("Please Login to Ask Question");
      setTimeout(() => {
        setIsPopup(false);
        setMsg("");
      }, 3000);
      return;
    }
    router.push("/createforum");
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  async function fetchData() {
    try {
      const response = await fetch("/api/getquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setIssue(data.data);
      setRelatedUsers(data.data.questionrelatedusers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Optionally, set an error state or display a message to the user
    }
  }

  async function handleCloseQuestion() {
    try {
      const response = await fetch("/api/closequestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedIssue = { ...issue, isCLose: !issue.isCLose };
      setIssue(updatedIssue);

      // Optionally, reload or navigate after updating state
      // window.location.reload(); // Avoid using reload; consider updating the state directly
    } catch (error) {
      console.error("Error closing question:", error);
      // Optionally, set an error state or display a message to the user
    }
  }

  async function handleAddSolution() {
    if (!finalUser || !localStorage.getItem("finalUser")) {
      setIsPopup(true);
      setMsg("Please Login to Add Solution");
      setTimeout(() => {
        setIsPopup(false);
        setMsg("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch("/api/addsolution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ans: content.current.value,
          id: id,
          authorImage: finalUser.image1,
          authorName: finalUser.name,
          userId: finalUser._id,
          image: isImg,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const date = Date.now();
      const formattedDate = formatDate(date);

      const newSolution = {
        ans: content.current.value,
        id: id,
        image: isImg,
        authorImage: finalUser.image1,
        authorName: finalUser.name,
        date: formattedDate,
      };

      const updatedSolutions = [newSolution, ...issue.solutions];
      const updatedIssue = { ...issue, solutions: updatedSolutions };

      setIssue(updatedIssue);
      content.current.value = "";
      setIsComment(false);
    } catch (error) {
      console.error("Error adding solution:", error);
      // Optionally, set an error state or display a message to the user
    }
  }

  function handleOpenProfile(id) {
    router.push(`/profile?id=${id}`);
  }
  async function handleAccept(index) {
    try {
      // Make the PUT request to update the solution on the server
      const response = await fetch("/api/addsolution", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: index,
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Create a new issue object with the updated state
      const updatedSolutions = issue.solutions.map((solution, i) =>
        i === index ? { ...solution, isAccepted: true } : solution
      );

      const updatedIssue = {
        ...issue,
        solutions: updatedSolutions,
      };

      // Update the state with the new issue object
      setIssue(updatedIssue);
    } catch (error) {
      console.error("Error accepting solution:", error);
    }
  }

  async function handleAddComment() {
    try {
      if (!finalUser) {
        setIsPopup(true);
        setMsg("Please Login to Add Solution");
        setTimeout(() => {
          setIsPopup(false);
          setMsg("");
        }, 3000);
        return;
      }
      // Send the POST request
      let response = await fetch("/api/questioncomment", {
        method: "POST",
        body: JSON.stringify({
          id: issue._id,
          comment: comment.current.value,
          user_id: finalUser._id,
          userEmail: finalUser.email,
          userName: finalUser.name,
          image: finalUser.image1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the state with a new object
      let date = new Date(Date.now());
      let newIssue = {
        ...issue, // Spread the existing properties
        comments: [
          {
            image: finalUser.image1,
            comment: comment.current.value,
            user: finalUser._id,
            userEmail: finalUser.email,
            userName: finalUser.name,
            date: date,
          },
          ...issue.comments, // Spread the existing comments
        ],
      };

      setIssue(newIssue);
      setIsComment(false);
      let arr = document.getElementsByClassName("ql-editor");
      Array.from(arr).map((data) => {
        data.innerHTML = "";
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  function formatDate(dateStr) {
    try {
      const date = new Date(dateStr);

      // Format the date using `toLocaleString`
      const options = {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = date.toLocaleString("en-US", options);

      // Split the formatted date into parts
      const [monthDay, time] = formattedDate.split(" at ");
      const [month, day] = monthDay.split(", ");
      const [hourMinute, period] = time.split(" ");
      const [hour, minute] = hourMinute.split(":");

      // Custom format
      const customFormattedDate = `${month}  at ${hour}:${minute} ${period}`;
      return customFormattedDate;
    } catch {
      return;
    }
  }
  useEffect(() => {
    fetch("/api/questionviews", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
  }, []);
  async function handlequestiontoo() {
    console.log("CLiking");
    setIsRelated(true);
    await fetch("/api/addrelated", {
      method: "POST",
      body: JSON.stringify({
        authorImage: finalUser.image1,
        authorName: finalUser.name,
        userId: finalUser._id,
        id: issue._id,
      }),
    });
    let arr = relatedUsers;
    arr.push({
      authorImage: finalUser.image1,
      authorName: finalUser.name,
      authorId: finalUser._id,
    });
    setRelatedUsers([...arr]);
  }
  const handleMouseEnter = async (event, userImg) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
    let obj = { ...userImg };
    console.log(userImg);
    let u = await fetch("/api/getuserbyid", {
      method: "POST",
      body: JSON.stringify({ id: userImg.authorId }),
    });
    u = await u.json();
    u = u.msg;
    console.log(u, "user");
    obj = {
      ...obj,
      count: Object.keys(u.followers).length,
      questions: u.questions,
      answers: u.answers,
    };
    setHoveredUser(obj);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };
  async function handleRemoveQuestion() {
    console.log("CLiking");
    setIsRelated(false);
    await fetch("/api/addrelated", {
      method: "DELETE",
      body: JSON.stringify({
        userId: finalUser._id,
        id: issue._id,
      }),
    });
    let arr = relatedUsers;
    arr = arr.filter((data) => {
      data.authorName !== finalUser.name;
    });
    //  arr.push({authorImage:finalUser.image1,authorName:finalUser.name,authorId:finalUser._id})
    setRelatedUsers([...arr]);
  }
  const imageHandler = async (e) => {
    const editor = content.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        try {
          const base64Url = await convertToBase64(file); // Convert image file to base64
          setIsImg(base64Url);
          editor.insertEmbed(editor.getSelection(), "image", base64Url); // Insert the base64 image into the editor
        } catch (error) {
          console.error("Error converting image to base64:", error);
          ErrorToast("Failed to convert image.");
        }
      } else {
        ErrorToast("You can only upload images.");
      }
    };
  };

  let quillRef = useRef();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <div className="mt-20 overflow-x-hidden">
      <div
        className={`h-80 ${
          theme ? "bg-gray-200" : "bg-[#212020]"
        }  px-10 max-md:px-5 max-sm:px-2 pt-20 relative`}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Search for Topics..."
            className="py-3 shadow-md px-4 border rounded-full w-full z-50 max-w-md focus:outline-none"
          />
          <div className={` ${theme ? "text-black" : "text-white"} mt-4`}>
            Popular Searches: Docker, Azure, CI/CD
          </div>
        </div>
        <img
          src="/forum.webp"
          alt="img"
          className="w-[95%] absolute bottom-0"
        />
      </div>
      <div
        className={`px-10 flex pt-24 pb-16 justify-center gap-10 min-h-screen w-full max-md:pl-[0.4rem] max-md:mr-[0.2rem] max-md:px-4 flex-wrap ${
          theme ? "bg-white" : "bg-[#1e1d1d]"
        }`}
      >
        <div className="w-[75%] min-w-[800px] max-xl:min-w-[99%] max-md:w-[99%]">
          <div className="flex w-full justify-between   max-md:flex-wrap">
            <div
              className="flex gap-5 cursor-pointer"
              onClick={() => handleOpenProfile(issue.authorId)}
            >
              {loading ? (
                <Skeleton height={60} width={60} borderRadius={100} />
              ) : (
                <img
                  src={issue.authorImage}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div className="text-lg">
                <div className={`${theme ? "" : "text-white"}`}>
                  {loading ? (
                    <Skeleton height={10} width={200} />
                  ) : (
                    issue.authorName
                  )}
                </div>
                <div className="flex gap-5 text-sm text-gray-500">
                  <div
                    className={`flex gap-1 mt-1 items-center ${
                      theme ? "" : "text-[#767677]"
                    }`}
                  >
                    <svg
                      version="1.1"
                      viewBox="0 0 2048 2048"
                      width="19"
                      height="19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        transform="translate(373,714)"
                        d="m0 0h25l20 3 24 8 19 10 12 9 10 9 10 10 11 15 11 21 7 21 3 19 1 18v305l8 5 52 30 24 14 52 30 21 12 24 14 26 15 28 16 24 14 16 8 16 7 15 5 20 4 22 2 427 1 27 3 27 6 24 8 20 9 16 8 21 14 13 10 14 12 12 12 7 8 12 15 11 16 10 17 11 23 8 22 6 24 3 17 2 21v399l-2 12-5 13-6 10-9 10-8 7-15 8-16 5h-849l-20-7-11-7-10-9-8-10-7-14-3-10-1-7-1-70v-401l-20-11-24-14-52-30-24-14-28-16-52-30-24-14-21-12-19-11-12-9-12-11-10-11-10-15-9-17-7-21-3-16-1-10v-404l2-18 5-20 5-13 10-18 8-11 9-10 12-12 17-12 23-11 17-5zm8 63v1h6v-1zm-9 1v1h5v-1zm-7 2m-4 1m55 3m4 2m4 2m2 1m4 3m3 2m1 1m1 1m3 3m4 4m1 1m1 1m2 3m2 3m2 3m1 2m1 2m9 82 1 2zm0 3v162h1v-162zm-152 41v223h1v-223zm152 223v20l2 4-1-24zm2 26m1 2m1 2m1 1m1 1m1 1m2 2m2 2m8 6m-171 2v29h1v-29zm176 1m8 5m7 4m14 8m19 11m-223 2v8h1v-8zm2 18 1 3zm1 4 1 2zm1 3 1 2zm1 3m1 2m1 2m1 2m1 2m1 1 1 2zm1 2 1 2zm1 2m1 1 1 2zm1 2m1 1 1 3v-3zm2 3m1 1m1 1m1 1m1 1m1 1m1 1m1 1m1 1m1 1m1 1m2 1m1 1m2 1m1 1m1 1m2 1m2 1m1 1m2 1m3 2m2 1m1 1m2 1m2 1m2 1m1 1m2 1m2 1m2 1m2 1m3 2m2 1m1 1m2 1m2 1m2 1m1 1m2 1m2 1m3 2m2 1m2 1m1 1m2 1m4 2m2 1m1 1m2 1m5 3m2 1m3 2m2 1m4 2m1 1m2 1m5 3m2 1m3 2m2 1m2 1m3 2m2 1m2 1m5 3m2 1m6 4m2 1m2 1m3 2m4 2m10 6m7 4m2 1m5 3m4 2m1 1m2 1m7 4m7 4m3 2m4 2m5 3m2 1m7 4m1 1m2 1m4 2m3 2m2 1m827 1m-820 3m1 1m4 2m3 2m825 0m-823 1m2 1m3 2m824 0m-820 2m823 0m3 2m-817 3m821 0m-820 1m4 2m3 2m2 1m2 1m3 2m4 2m816 1m1 1m1 1m1 1m1 1m-810 1m812 1m1 1m1 1m-808 1m3 2m1 1m3 2m1 1m1 1m1 1m808 3m-804 1m805 0m1 2m2 3m1 1m-806 1 1 2zm807 0m6 10m1 1m1 2m4 7m8 16m4 9m13 118 1 2zm0 3v29h1v-29zm0 30 1 2zm-190 69m17 2m2 1m2 1m2 1m3 2m1 1m1 1m1 1m2 2m1 1m1 2m5 12v13h1v-13zm0 14 1 3zm0 5v187h1v-187zm-64 4v183h1v-183zm215 174 1 4z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1047)"
                        d="m0 0h698l19 8 12 8 11 11 8 13 5 14 1 6 1 21v472l-1 20-4 16-7 14-11 13-11 8-12 6-16 4-66 1h-259l-17 1-11 14-9 10-9 11-9 10-9 11-9 10-9 11-11 12-9 11-26 30-24 28-9 10-9 8-14 7-11 3-13 1-13-2-14-5-13-9-7-7-8-13-5-14-1-6-1-132h-72l-24-1-14-4-15-8-13-12-7-10-6-13-3-10-1-7v-507l4-16 8-16 9-11 10-8 12-7zm689 66m-681 1m-1 1 1 4zm683 0 1 2zm-344 41m4 0m-24 3m-4 1m50 0m-54 1m58 0m4 1m-71 2m-2 1m82 0m3 1m2 1m296 0v399h1v-399zm-684 1v435h1v-435zm293 0m100 1m2 1m2 1m3 2m2 1m2 1m-125 1m126 0m2 1m1 1m2 1m1 1m1 1m1 1m2 1m1 1m1 1m1 1m-153 1m154 0m-155 1m156 0m-157 1m158 0m-159 1m160 0m-161 1m-1 1m-1 1m166 0m-167 1m168 0m-169 1m-1 1m-1 1m174 0m1 1m1 1m1 1m-180 1m181 0m-182 1m183 0m-184 1m185 0 1 2zm1 2m1 1m-190 1m191 0 1 2zm1 2m-194 1m196 2m-198 1m199 1m1 2m2 3m-106 2m107 0m-118 2m27 0m92 0m-122 1m33 0m-35 1m37 0m88 0m-85 1m3 1m83 0m-81 1m1 1m2 1m80 2m1 2 1 2zm-73 2m74 1 1 2zm-71 3m1 1m2 3m1 1 1 2zm1 2m1 2m1 1 1 2zm68 3m-66 2m1 2 1 2zm-99 1m100 1 1 3zm-104 19m-1 4m-61 2m2 4m2 3m53 1m108 0m-159 2m2 2m46 0m-45 1m44 0m108 3m-147 1m4 2m141 0m-140 1m21 0m-18 1m135 1m70 1m-1 4m-81 6m-1 1m-2 1m-2 1m-1 1m-5 3m86 1m-93 3m-1 1m92 0m-1 2m-5 8m-2 3m-2 3m-1 1m-1 1m-2 3m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-2 1m-1 1m-1 1m-3 2m-1 1m-6 4m-5 3m-88 70 1 2zm62 0 1 2zm-61 2 1 3zm60 2m-59 1 1 2zm1 3m1 1m2 3m1 1m1 1m1 1m1 1m39 3m-34 1m2 1m1 1m26 0m-24 1m0 39m21 0m-22 1m25 0m2 1m2 1m1 1m1 1m1 1m-43 3m48 2m2 2 1 2zm1 2m1 1 1 2zm1 3 1 2zm1 3m-61 18 1 2zm1 3m1 2m2 3m1 1m51 0m-1 1m-1 1m-39 7m2 1m2 1m21 0m-19 1m-333 35 1 4zm1 6v5h1v-5zm3 6m3 0v1h41v-1zm348 0v1h12v-1zm317 0v1h11v-1zm-584 1v1h12v-1zm249 0v1h6v-1zm-228 2m219 0m-3 1m-210 1m5 2m7 4m1 1m2 1m1 1m165 11m-151 4m2 3m4 7m129 5m-1 1m-1 1m-1 1m-1 1m-4 5m-1 1m-15 18m-1 1m-1 1m-1 1m-1 1m-4 5m-1 1m-15 18m-1 1m-1 1m-1 1m-1 1m-4 5m-1 1m-16 19m-1 1m-1 1m-1 1m-4 5m-44 39v10l2-2-1-8z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(373,714)"
                        d="m0 0h25l20 3 24 8 19 10 12 9 10 9 10 10 11 15 11 21 7 21 3 19 1 18v305l8 5 52 30 24 14 52 30 21 12 24 14 26 15 28 16 24 14 16 8 16 7 15 5 20 4 22 2 427 1 27 3 27 6 24 8 20 9 16 8 21 14 13 10 14 12 12 12 7 8 12 15 11 16 10 17 11 23 8 22 6 24 3 17 2 21v399l-2 12-5 13-6 10-9 10-8 7-15 8-16 5h-849l-20-7-11-7-10-9-8-10-7-14-3-10-1-7-1-70v-401l-20-11-24-14-52-30-24-14-28-16-52-30-24-14-21-12-19-11-12-9-12-11-10-11-10-15-9-17-7-21-3-16-1-10v-404l2-18 5-20 5-13 10-18 8-11 9-10 12-12 17-12 23-11 17-5zm1 63-17 5-13 7-9 7-5 4-10 14-6 13-4 15-1 11-1 46v329l1 20 3 17 5 12 9 14 11 11 15 10 24 14 28 16 19 11 15 9 16 9 24 14 21 12 26 15 24 14 23 13 43 25 14 10 7 9 1 494 2 5 1 1 247 1h380v-185l1-24 3-9 5-6 9-6 6-2h13l9 4 6 4 2 3h2l2 5 3 10 1 12h1v6h-1v188h100l51-1 2-5v-377l-2-30-5-24-6-18-9-20-7-12-7-11-9-12-11-12-12-12-13-10-15-10-23-12-22-8-27-6-27-3-430-1-22-3-22-5-27-9-16-7-22-12-25-14-15-9-21-12-24-14-49-28-17-10-104-60-17-11-9-8-3-8-1-4-1-342-3-14-5-12-8-12-9-10-12-9-17-7-14-3zm955 1014 1 3z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1053,1402)"
                        d="m0 0h205v1h37l27 4 17 4 20 7 17 8 5 1 17 11 9 7 8 6 9 10 8 7 7 8v2l4 4 1 3 5 5 2 6 4 4 10 20 5 11 7 24 3 16 2 30v377l-2 5-51 1h-100l1-167v-36l-2-3-3-10-2-5-3-1-2-4-5-2v-2l-6-1-16-3v2l-9 4-7 5-5 7-2 7-1 24-1 1v166h1v18h-41l-168-1-7-2 4-2-1-3h-5l1-2-11-4-1-4 3-7-4-5-3-6-2-1 1-8 3-11 3-7 5-4 10-20 4-36v-10l2-12 2-7 1-9v-253l1-22 1-6-2-2v-12l1-19 1-7 1-9-3-6v-3l-3-1-2-5 1-6h2l-3-3v-2l-3-1 3-7 4-7 2-1-2-4-3-1 4-3 1-7 5-3-2-2-2-10v-1l-7-2v-4l4-4-3-5-159-1v-1zm337 32m6 4m44 42m12 18m28 476 1 4z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1047)"
                        d="m0 0h698l19 8 12 8 11 11 8 13 5 14 1 6 1 21v472l-1 20-4 16-7 14-11 13-11 8-12 6-16 4-66 1h-259l-17 1-11 14-9 10-9 11-9 10-9 11-9 10-9 11-11 12-9 11-26 30-24 28-9 10-9 8-14 7-11 3-13 1-13-2-14-5-13-9-7-7-8-13-5-14-1-6-1-132h-72l-24-1-14-4-15-8-13-12-7-10-6-13-3-10-1-7v-507l4-16 8-16 9-11 10-8 12-7zm9 64-3 9v494l2 3 13 1 86 1 13 3 14 7 10 9 8 10 7 14 2 9v111l1 21 4-2 13-14 7-8 12-14 7-8 11-13 24-28 13-15 11-13 13-15 11-13 13-15 9-10 10-8 11-5 11-3 338-1 10-1 1-3v-501l-3-2z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(832,1399)"
                        d="m0 0 12 1 443 1 27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40v-1h-202l127 1v1l-120 1 5 1-3 2 1 2h-3l-2 6 10 3-3 1 2 4 2 7 1 2-6 2v7l-4 3 5 5-3 2-6 12 2 4 3 1v2h-2v6l2 5 2 1 4 9-1 9-1 14-1 21 1 4 1 3-1 4-1 31v244l-2 15-1 1-2 14v8l-4 36-6 12-5 9-5 4-7 25 3 1 5 8 2 4-3 6v3l11 4 4 2v3l2 1v2l2 2-137 1h-34l-68-1v-1l79-1-8-1v-2l-5 1v-3l-11-1-4-2 2-1-9-3 1-5 3-3 1-4-3-5-5-3-1-6 1-1 1-7 3-5-1-5h-3l2-4 1-3h2v-2l3-2h3l2-5 4-4 3-17 2-4v-8l3-16 1-2 2-24 6-15 1-64 1-25 1-5v-99l2-50-3-16v-18l-1-14v-22l-5-4-2-9-3-3v-2h-4l-5-12-4-4-1-9 2-5h2l2-5 4-8 1-1-3-2h2l2-5 8-4-1-3h-2l-4-8 1-2-3 1-4-3-7-2v-4-4l-9-3-14-2h-11l-5-3z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(936,770)"
                        d="m0 0h32l20 2 23 4 22 6 22 8 27 13 19 12 16 12 13 11 15 14 7 8 11 13 14 20 13 23 9 20 7 20 6 22 4 24 2 21v26l-3 28-6 28-10 30-8 18-11 20-8 12-12 16-11 13-22 22-14 11-14 10-20 12-25 12-19 7-22 6-28 5-23 2h-20l-31-3-24-5-26-8-21-9-16-8-20-12-17-13-13-11-22-22-11-14-11-15-11-19-8-16-8-19-7-21-6-28-3-26v-32l3-27 5-24 7-23 11-26 9-17 10-16 14-19 11-12 7-8 8-8 8-7 15-12 18-12 16-9 16-8 26-10 27-7 26-4zm2 64-17 2-23 5-21 7-21 10-19 12-13 10-13 12-8 8v2h-2l-13 17-9 14-12 23-8 22-4 16-3 19-1 10v24l3 24 6 25 8 21 12 23 8 12 11 14 14 15 11 10 18 13 21 12 21 9 16 5 17 4 15 2 15 1h13l21-2 25-5 25-9 17-8 19-12 16-12 7-6v-2l4-2 12-13 11-14 12-19 10-21 8-24 5-24 2-23v-12l-2-22-4-21-9-27-11-23-11-17-10-13-11-12-10-10-17-13-15-10-24-12-27-9-25-5-13-1z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(832,1399)"
                        d="m0 0 12 1 443 1 27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40v-1h-202l127 1v1l-119 1h-151l33 2 5 2-1 6 6 1 11 4 4 5v6l2 1-4 4-3 5-5 3-4 8-5 9-5 3-1 9 3 8v7l2 1 2 4h2l4 12 3 11-1 5 1 4-1 3-1 13-2 10 1 9v175l-1 32-1 34-1 5-2 34-1 8v11l-2 8-1 8-1 9-1 14-3 4-1 5-2 3-3 3-3 6h-2l-1 4-3 3-4 8-4 1-1 12h2l5 9 1 1v5l-2 4 5 5 17 4 13 2 2 3 77 1v1l-117 1h-34l-68-1v-1l79-1-8-1v-2l-5 1v-3l-11-1-4-2 2-1-9-3 1-5 3-3 1-4-3-5-5-3-1-6 1-1 1-7 3-5-1-5h-3l2-4 1-3h2v-2l3-2h3l2-5 4-4 3-17 2-4v-8l3-16 1-2 2-24 6-15 1-64 1-25 1-5v-99l2-50-3-16v-18l-1-14v-22l-5-4-2-9-3-3v-2h-4l-5-12-4-4-1-9 2-5h2l2-5 4-8 1-1-3-2h2l2-5 8-4-1-3h-2l-4-8 1-2-3 1-4-3-7-2v-4-4l-9-3-14-2h-11l-5-3z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1383,111)"
                        d="m0 0h25l24 6 15 6 11 6 12 9 18 18 8 13 8 16 5 15 4 21v14l-4 20-5 15-8 17-10 14-9 10-9 8-15 10-15 9-5 5-4 10-1 45-7 14-10 8-9 4h-14l-10-6-7-6-5-8-2-6v-45l5-24 5-11 6-10 10-13 11-9 13-8 16-10 9-10 7-14 1-3 1-21-3-12-3-5v-3h-2l-6-9-8-7-10-5-13-4-11-1-12 3-16 8-2 4-4 1-7 9-5 12-1 4-1 13-2 3-2 9-6 10-9 6-8 2h-15l-9-5-6-5-6-10-2-5v-16l5-22 4-12 7-14 9-13 14-15 14-11 16-9 17-6z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1391,460)"
                        d="m0 0h9l11 4 8 7 5 6 4 10v12l-2 2-5 10-8 7-6 3-9 3h-6l-12-5-10-9-4-8-2-5v-10l4-11 9-10 7-4z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1055,163)"
                        d="m0 0 2 2v27l1-10 3 4 1 7 1 6 1 19v82l-1 107-1 25-4 1-1-14-1 102h-1l-1-67v-275z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(858,1401)"
                        d="m0 0h429l27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40v-1h-202l-153 1h-32l-9-1z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1205,608)"
                        d="m0 0 2 2 4 14 1 6v114l-1 8 4-1-4 5-2-1 1-2-2-21v-108l-2-9-2-6z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1258,1401)"
                        d="m0 0h29l27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40l3-1z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1055,68)"
                        d="m0 0 2 1-1 29v22l-2 2-1-1v-48z"
                        fill="#A672FE"
                      />
                      <path
                        transform="translate(1252,706)"
                        d="m0 0 1 3-7 7-9 11-10 11-7 8-2 1 2-4 12-14 11-12 8-10z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1055,525)"
                        d="m0 0h1l1 40 1 4h-4l-1-2v-11z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1058,160)"
                        d="m0 0 2 1v20l-3-1v-15z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1275,679)"
                        d="m0 0 2 2-11 12-4 5-2-1 11-13z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1441,335)"
                        d="m0 0 2 1-10 10-3 6-1-3 5-9z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1185,583)"
                        d="m0 0h2v2l4 2 8 9v2l-4-2-7-8-3-3z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1252,706)"
                        d="m0 0 1 3-7 7-6 8-3-1 10-11z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1323,623)"
                        d="m0 0 2 2-10 11-4 5-2-1 11-13z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1298,652)"
                        d="m0 0 3 1-11 12-3 4-2-1 11-13z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(758,1372)"
                        d="m0 0 6 1 9 4-1 3-9-4v-2l-5-1z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1331,129)"
                        d="m0 0v3l-9 7-3 2v-3z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1359,188)"
                        d="m0 0h2l-1 3h-2l-2 4-5 7-1-3z"
                        fill="#6b7280"
                      />
                      <path
                        transform="translate(1392,173)"
                        d="m0 0 11 1 5 2-2 1-13-2z"
                        fill="#6b7280"
                      />
                    </svg>
                    {loading ? (
                      <Skeleton height={10} width={100} />
                    ) : (
                      "Question Owner"
                    )}
                  </div>
                  <div className={`mt-1 ${theme ? "" : "text-[#767677]"}`}>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    {loading ? (
                      <Skeleton height={10} width={100} />
                    ) : (
                      formatDate(issue.createdAt)
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={`max-md:mt-[30px] max-md:mr-[0px]`}>
              <div
                className="bg-[#6089a4] px-5 py-3 text-white cursor-pointer"
                onClick={handleAskQuestion}
              >
                Ask Question
              </div>
            </div>
          </div>
          <div className="mt-10 flex  text-gray-600 gap-4">
            <div className="text-5xl font-bold max-md:hidden">Q:</div>
            <div className="mt-2 w-[100%]">
              <div
                className={`${
                  theme ? "" : "text-white"
                } text-3xl max-md:flex font-bold`}
              >
                <span className="text-4xl hidden max-md:block font-bold w-[100px]">
                  Q :
                </span>
                {loading ? (
                  <Skeleton height={30} width={400} />
                ) : (
                  <>
                    <div
                      className="break-words" // Ensure long words wrap to the next line
                      dangerouslySetInnerHTML={{ __html: issue?.title }}
                    />
                  </>
                )}
              </div>

              {hoveredUser && (
                <label htmlFor="id">
                  <div
                    className={`forummodal ease-out fixed  border  p-4 w-[400px] h-[200px] rounded-lg ${
                      theme
                        ? "bg-white border-gray-300"
                        : "bg-[#2b2b2b] border-slate-50 border-[1px] text-gray-400"
                    } shadow-lg`}
                    style={{
                      top: cursorPosition.y + 10,
                      left: cursorPosition.x,
                    }}
                  >
                    <div className="w-[100%] flex gap-4 items-center">
                      <img
                        src={hoveredUser.authorImage}
                        alt="Hovered User"
                        className="w-20 h-20 rounded-full"
                      />
                      <div className="flex w-[100%] items-start gap-2 h-[100%] justify-center flex-col ">
                        <p>{hoveredUser.authorName}</p>
                        <button
                          className={`bg-transparent pt-1 pb-1 pl-3 pr-3 rounded-md border-[1px] border-gray-500 `}
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                    <div className="p-[20px] mt-4 flex gap-6 w-[100%] justify-center">
                      <p className="flex flex-col h-[100%] items-center">
                        <h2>Answers</h2>
                        <p>{hoveredUser && hoveredUser.answers}</p>
                      </p>
                      <p className="flex h-[100%] flex-col items-center">
                        <h2>Questions</h2>
                        <p>{hoveredUser && hoveredUser.questions}</p>
                      </p>
                      <p className="flex h-[100%] items-center flex-col">
                        <h2>Followers</h2>
                        <p>{hoveredUser && hoveredUser.count}</p>
                      </p>
                    </div>
                  </div>
                </label>
              )}
              <div className="mt-[30px] flex gap-3">
                {issue.tags?.map(
                  (data) =>
                    data.length > 0 && (
                      <span className="bg-gray-200 px-4 py-1 text-gray-700 cursor-pointer hover:bg-[#deecf5] hover:text-[#6089a4] transition-all duration-200">
                        {data}
                      </span>
                    )
                )}
              </div>

              {loading ? (
                <div className="flex flex-col gap-1">
                  <Skeleton height={10} width={200} />
                  <Skeleton height={10} width={300} />
                  <Skeleton height={10} width={400} />
                  <Skeleton height={10} width={500} />
                  <Skeleton height={10} width={600} />
                  <Skeleton height={10} width={700} />
                </div>
              ) : (
                <div
                  className={`${
                    theme ? "" : "text-gray-300"
                  } max-md:pl-[64px] text-base mt-5  text-justify`}
                  dangerouslySetInnerHTML={{ __html: issue?.content }}
                />
              )}

              <div className="mt-10 flex gap-2 text-gray-500 items-center">
                <FontAwesomeIcon icon={faTags} />
                Bug,Feature,Error
              </div>
              <hr className="border-[1px] border-gray-300 mt-5" />
              <div className="flex gap-5 mt-5">
                <div
                  onClick={() =>
                    isComment ? setIsComment(false) : setIsComment(true)
                  }
                  className="bg-[#6089a4] px-4 py-1 rounded-md text-base text-white cursor-pointer"
                >
                  Reply
                </div>

                {!finalUser?.questiontoo?.includes(issue._id) &&
                !isRelated &&
                issue.authorId !== finalUser._id ? (
                  <div
                    onClick={handlequestiontoo}
                    className="border-[#6089a4] px-4 py-1 cursor-pointer rounded-md text-base text-[#6089a4] border-2"
                  >
                    I have this Question Too
                  </div>
                ) : (
                  finalUser._id !== issue.authorId && (
                    <div
                      onClick={handleRemoveQuestion}
                      className="border-[#6089a4] px-4 py-1 cursor-pointer rounded-md text-base text-[#6089a4] border-2"
                    >
                      I Don't Have This Question Too
                    </div>
                  )
                )}
                {issue?.questionrelatedusers?.length > 4 ? (
                  <span>+{issue?.questionrelatedusers?.length - 4}</span>
                ) : (
                  <span></span>
                )}
                {loading ? (
                  <Skeleton height={10} width={200} />
                ) : (
                  issue?.questionrelatedusers
                    ?.slice(
                      0,
                      issue?.questionrelatedusers.length > 4
                        ? 4
                        : issue?.questionrelatedusers.length
                    )
                    .map((user, idx) => {
                      return (
                        <img
                          key={idx}
                          onClick={() =>
                            router.push(`/profile?id=${user.authorId}`)
                          }
                          src={user.authorImage}
                          id="img"
                          alt="Discussion User"
                          className="rounded-full mt-1 w-5 h-5"
                          onMouseEnter={(event) =>
                            handleMouseEnter(event, user)
                          }
                          onMouseLeave={handleMouseLeave}
                        />
                      );
                    })
                )}
              </div>
              {isComment && (
                <div className="mt-[25px] flex flex-col gap-10 mb-[25px] w-[100%]">
                  <ReactQuill
                    className="h-[200px]"
                    ref={content}
                    modules={modules}
                  />

                  <button
                    onClick={handleAddSolution}
                    className="border mt-16 bg-blue-500 ml-[20px] p-[15px]  border-blue-500 text-white w-[150px] rounded-md cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              )}
              {issue?.solutions && (
                <div className="text-xl mt-[20px]">
                  {issue.solutions.length} Answers
                </div>
              )}
              {loading ? (
                <div className="mt-10">
                  <div
                    className={`min-h-20 w-full ${
                      theme ? "bg-[#eeeeee]" : "bg-[#383838] rounded-md "
                    } p-8`}
                  >
                    <div className="flex w-full justify-between flex-wrap">
                      <div className="flex gap-5 cursor-pointer">
                        <Skeleton
                          baseColor="white"
                          height={50}
                          width={50}
                          borderRadius={100}
                        />
                        <div className="text-lg">
                          <div className={`${theme ? "" : "text-white"}`}>
                            {<Skeleton height={10} width={200} />}
                          </div>
                          <div className="flex gap-5 text-sm text-gray-500">
                            <div className={`${theme ? "" : "text-gray-300"}`}>
                              <FontAwesomeIcon icon={faCoffee} /> Solution
                              Provider
                            </div>
                            <div className={`${theme ? "" : "text-gray-300"}`}>
                              <Skeleton
                                baseColor="white"
                                height={10}
                                width={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex text-gray-600 gap-4">
                      <div
                        className={`${
                          theme ? "" : "text-white"
                        } text-5xl font-bold`}
                      >
                        A:
                      </div>

                      <div className="flex flex-col gap-1">
                        <Skeleton height={10} width={100} baseColor="white" />
                        <Skeleton baseColor="white" height={10} width={200} />
                        <Skeleton baseColor="white" height={10} width={300} />
                        <Skeleton baseColor="white" height={10} width={400} />
                        <Skeleton
                          baseColor="white"
                          height={10}
                          width={500}
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                issue?.solutions?.map((data, index) => {
                  return (
                    <div
                      className="mt-10 sm:mr-0"
                    >
                      <div
                        className={`min-h-20 w-full break-all ${
                          theme ? "bg-[#eeeeee]" : "bg-[#383838] rounded-md "
                        } p-8 `}
                      >
                        <div className="flex w-full justify-between flex-wrap">
                          <div
                            className="flex gap-5 cursor-pointer"
                            onClick={() => handleOpenProfile(data.authorId)}
                          >
                            <img
                              src={
                                data.authorImage
                                  ? data.authorImage
                                  : "https://randomuser.me/api/portraits/men/6.jpg"
                              }
                              alt="User"
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="text-lg">
                              <div className={`${theme ? "" : "text-white"}`}>
                                {data.authorName ? data.authorName : "Jack"}
                              </div>
                              <div className="flex gap-5 text-sm text-gray-500">
                                <div
                                  className={`${theme ? "" : "text-gray-300"}`}
                                >
                                  <FontAwesomeIcon icon={faCoffee} /> Solution
                                  Provider
                                </div>
                                <div
                                  className={`${theme ? "" : "text-gray-300"}`}
                                >
                                  <FontAwesomeIcon icon={faCalendar} />{" "}
                                  {formatDate(data.date)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`max-md:mt-[20px] text-green text-sm flex gap-2 items-center ${
                              data.isAccepted
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {data.isAccepted && (
                              <FontAwesomeIcon icon={faCheck} />
                            )}
                            {!data.isAccepted
                              ? issue.authorId == finalUser._id && (
                                  <button onClick={() => handleAccept(index)}>
                                    Mark as Accepted
                                  </button>
                                )
                              : "Accepted Solution"}
                          </div>
                        </div>
                        <div className="mt-10 flex text-gray-600 gap-4">
                          <div
                            className={`${
                              theme ? "" : "text-white"
                            } hidden md:block text-5xl font-bold`}
                          >
                            A:
                          </div>

                          <div className="flex flex-col gap-2">
                            <div
                              className={`${
                                theme ? "" : "text-gray-300"
                              } text-base text-justify pr-7`}
                              dangerouslySetInnerHTML={{ __html: data.ans }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {issue.authorId == finalUser._id && (
                <div
                  onClick={handleCloseQuestion}
                  className="cursor-pointer border-[#6089a4] px-4 py-1 w-[200px] text-center mt-[30px] hover:bg-[#78b3ce] hover:text-white  rounded-md text-base text-[#6089a4] border-2"
                >
                  {issue.isCLose ? "Mark As UnSolved" : "Mark As Solved"}
                </div>
              )}
              {/* <div className="mt-10">
                <div className={`text-xl font-medium ${theme?"":"text-gray-200"}` }>All Replies</div>
                <div className={`min-h-16 rounded-md border border-[#d3cabd] flex items-center px-10 mt-10 justify-between w-full ${theme?"bg-[#e3e3e3]":"bg-[#383838]"}`}>
                  <div className={`${theme?"":"text-gray-300"}`}>Sort By</div>
                  <div className={`${theme?"":"text-gray-300"}`}>Page 1 to 4</div>
                </div>
              </div> */}
              {/* <div className="mt-[25px] h-[100px] mb-[65px] items-center flex w-[100%]">
                  
                    <ReactQuill className="h-[50px]  w-[82%] "
                  ref={comment}
                />
                    <button onClick={handleAddComment}  className="border bg-blue-500 ml-[20px] h-[50px] p-[15px] pt-2 text-xl  border-blue-500 text-white w-[150px] rounded-md cursor-pointer">
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
                            <FontAwesomeIcon icon={faCalendar} /> {formatDate(com?.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${theme?"":"text-gray-300"} mt-5`} dangerouslySetInnerHTML={{__html:com.comment}}/>
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
                {/* {replies.map((reply, index) => (
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
                ))} */}
              {/* <div onClick={handleCloseQuestion} className="cursor-pointer border-[#6089a4] px-4 py-1 w-[200px] text-center mt-[30px] hover:bg-[#78b3ce] hover:text-white  rounded-md text-base text-[#6089a4] border-2">
                 {issue?.isCLose ?"Mark As UnSolved": "Mark As Solved"}
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className="w-[20%] max-md:w-[100%]">
          <div className={`${theme ? "" : "text-white"} text-2xl font-bold`}>
            Tags
          </div>
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
      <footer
        className={` relative pt-16 pb-6 ${
          theme ? "bg-gray-200" : "bg-[#1e1d1d]"
        } text-gray-600 px-10`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div
              className={`w-full lg:w-6/12 px-4 ${theme ? "" : "text-white"} `}
            >
              <h4
                className={`text-3xl font-semibold text-blueGray-700 ${
                  theme ? "" : "text-white"
                } `}
              >
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
                  <a
                    href="https://www.linkedin.com/in/md-azfar-alam/"
                    target="blank"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="group-hover:brightness-0 group-hover:invert"
                    />
                  </a>
                </button>
                <button
                  className={`group ${
                    theme ? "text-lightBlue-600" : "text-black"
                  } bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]`}
                  type="button"
                >
                  <a href="https://www.github.com/mdazfar2" target="blank">
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
                  <a href="mailto:helpopshub@gmail.com" target="blank">
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
                  <a href="https://www.helpopshub.com/" target="blank">
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
                <div
                  className={`w-full lg:w-4/12 px-4 ml-auto ${
                    theme ? "" : "text-white"
                  } `}
                >
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
                        }`}
                        href="/about"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
                        }`}
                        href="/blogs"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
                        }`}
                        href="/resources"
                      >
                        Devops Resources
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
                        }`}
                        href="https://github.com/mdazfar2/HelpOps-Hub"
                      >
                        Github
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className={`${
                    theme ? "" : "text-white"
                  }  w-full lg:w-4/12 px-4`}
                >
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
                        }`}
                        href="https://github.com/mdazfar2/HelpOps-Hub/blob/main/LICENSE"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
                        }`}
                        href="#"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
                        }`}
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className={`text-blueGray-600 hover:text-blueGray-800 font-semibold inline-block pb-2 text-sm relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-2 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          theme
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-300 hover:text-white"
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
              <div
                className={`text-sm text-blueGray-500 font-semibold py-1 ${
                  theme ? "" : "text-white"
                } `}
              >
                Copyright © <span id="get-current-year">2024</span>
                <a
                  href="#"
                  className={`text-blueGray-500 ${
                    theme ? "hover:text-gray-800" : "hover:text-gray-500"
                  }`}
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
