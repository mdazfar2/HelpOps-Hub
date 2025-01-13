import React, { useEffect, useState, useRef, useContext } from "react";
import "@stylesheets/blogspage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPlus,
  faHands,
  faBars,
  faTimes,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from '../stylesheets/tags-cards.css'
import ReactTooltip from 'react-tooltip';

import Confetti from "react-confetti";

import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import {FaEllipsis,FaTrash} from 'react-icons/fa6'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaEye, FaPen } from "react-icons/fa";
import { motion } from "framer-motion";

function BlogPage({ theme,finalUser,searchedBlog,setFinalUser,subject,updateUser }) {
  const [blogs, setBlogs] = useState([]);
  const [authorDetails, setAuthorDetails] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [editorsChoiceCount, setEditorsChoiceCount] = useState(3);
  const [sortBy, setSortBy] = useState("date");
  let [showTags,setShowTags]=useState(false)
  const [filter, setFilter] = useState("");
  const [modalIndex,setModalIndex]=useState(-1)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  let [top3,setTop3]=useState([])
  let tagSearch=useRef()
  const [confetti,setShowConfetti]=useState(false)
  let [tags,setTags]=useState([])
  const router = useRouter();
  const [followedTags, setFollowedTags] = useState([]);
  const [hiddenTags, setHiddenTags] = useState([]);
  let tagsData=[
    {
      "tagName": "CI/CD",
      "tagDescription": "Continuous Integration and Continuous Delivery (CI/CD) practices for automating software release processes."
    },
    {
      "tagName": "Infrastructure as Code",
      "tagDescription": "Managing and provisioning computing infrastructure through machine-readable definition files."
    },
    {
      "tagName": "Containerization",
      "tagDescription": "Encapsulating applications into lightweight containers for easy deployment and scalability."
    },
    {
      "tagName": "Orchestration",
      "tagDescription": "Automating the management, coordination, and deployment of complex software systems."
    },
    {
      "tagName": "Monitoring and Logging",
      "tagDescription": "Tools and practices for monitoring system performance, detecting issues, and logging events."
    },
    {
      "tagName": "Configuration Management",
      "tagDescription": "Automating the configuration and coordination of software applications and systems."
    },
    {
      "tagName": "DevSecOps",
      "tagDescription": "Integrating security practices into the DevOps lifecycle to deliver secure software faster."
    },
    {
      "tagName": "Microservices",
      "tagDescription": "Architectural style that structures an application as a collection of loosely coupled services."
    },
    {
      "tagName": "Cloud Native",
      "tagDescription": "Designing and running applications that leverage cloud computing principles and services."
    },
    {
      "tagName": "Agile",
      "tagDescription": "Software development methodology emphasizing collaboration, flexibility, and continuous improvement."
    }
  ]
  let [allTags,setAllTags]=useState([])
  async function fetchTagsData() {
    try {
      // Retrieve user data from localStorage
      const user = JSON.parse(localStorage.getItem('finalUser'));
      if (!user) {
        // Handle the case where user data is not found
        console.warn('User not found in localStorage');
        return;
      }
  
      // Filter tags based on hidden tags
      const visibleTags = tagsData.filter(data => !user.hidedTags.includes(data.tagName));
      setTags([...visibleTags]);
      setHiddenTags([...user.hidedTags]);
      setFollowedTags([...user.followedTags]);
    } catch (error) {
      console.error('Error fetching tags data:', error);
    }
  }
  
  useEffect(() => {
    fetchTagsData();
  }, []); // The empty dependency array ensures this runs once when the component mounts
  
  async function handleBlockBlog(data) {
    try {
      // Update local user data
      let user = { ...finalUser, blockedBlogs: [...finalUser.blockedBlogs, data] };
      await updateUser(user); // Assuming updateUser is a function that updates user data
  
      // Send request to block the blog
      const response = await fetch("/api/blockblog", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: finalUser._id,
          blog_id: data
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to block blog: ${response.statusText}`);
      }
  
      // Optionally handle the successful blocking of the blog here
  
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error blocking blog:', error);
      // Optionally show an error message to the user
    }
  }
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let response;
        if(subject){
           response = await fetch("/api/filterblogs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({id:subject})      
          });
        }else{
           response = await fetch("/api/blog", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "isId":subject
            },
          });
        }
       
        if (response.ok) {
          const data = await response.json();
          const sortedBlogs = data.data.sort((a, b) => {
            const totalReactionsA = a.reactionList.reduce(
              (sum, reaction) => sum + reaction.count,
              0
            );
            const totalReactionsB = b.reactionList.reduce(
              (sum, reaction) => sum + reaction.count,
              0
            );

            return sortBy === "reactions"
              ? totalReactionsB - totalReactionsA
              : new Date(b.date) - new Date(a.date);
          });
          setBlogs(sortedBlogs);
          let arr1=[...sortedBlogs]

          arr1=arr1.sort((a,b)=>b.reactionList.length-a.reactionList.length)
          console.log(arr1)
          setTop3([...arr1])
          // console.log([...arr1[0],...arr1[1],...arr1[2]],'sddddddddddddddddddddddd')
          fetchAuthorDetails(sortedBlogs);
        } else {
          setError("Failed to fetch blogs.");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs.");
      }
    };
    const fetchAuthorDetails = async (blogs) => {
      const authorIds = [...new Set(blogs.map((blog) => blog.authorId))];
      const authorData = {};

      for (const authorId of authorIds) {
        try {
          const response = await fetch("/api/getuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: authorId }),
          });

          if (response.ok) {
            const result = await response.json();
            authorData[authorId] = result.msg;
          }
        } catch (err) {
          console.error(
            `Failed to fetch author data for authorId ${authorId}`,
            err
          );
        } finally {
          setLoading(false);
          setShowContent(true);
        }
      }
      setAuthorDetails(authorData);
    };

    fetchBlogs();
  }, [sortBy,subject]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
useEffect(()=>{
  if(localStorage.getItem('showConfetti')){
    setShowConfetti(true)
    setTimeout(()=>{
      localStorage.removeItem('showConfetti')
      setShowConfetti(false)
    },6000)
  }

},[])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleImageError = (e) => {
    const src = e.target.src;
    e.target.onerror = null;
    e.target.src = "https://dummyimage.com/600x300"
 
  };

  const mustReadBlogs = blogs.filter((blog) => blog.mustRead);
  const editorsPickBlogs = blogs.filter((blog) => blog.editorsPick);
  const recentBlogs = blogs.filter(
    (blog) => !blog.mustRead && !blog.editorsPick
  );

  const finalEditorsPick = [
    ...editorsPickBlogs,
    ...recentBlogs.slice(
      0,
      Math.max(0, editorsChoiceCount - editorsPickBlogs.length)
    ),
  ].slice(0, editorsChoiceCount);

  const finalMustRead = [
    ...mustReadBlogs,
    ...recentBlogs.slice(0, Math.max(0, 2 - mustReadBlogs.length)),
  ].slice(0, 2);

  const topBlogs = blogs
    .map((blog) => ({
      ...blog,
      totalReactions: blog.reactionList.reduce(
        (sum, reaction) => sum + reaction.count,
        0
      ),
    }))
    .sort((a, b) => b.totalReactions - a.totalReactions)
    .slice(0, 4);

  const renderBlogDescription = (description) => {
    const words = description.split(" ");
    const limitedDescription = words.slice(0, 10).join(" ");
    const hasMore = words.length > 10;

    // Check if description contains HTML tags
    const containsHTML = /<[a-z][\s\S]*>/i.test(description);

    return containsHTML ? (
      <div
        dangerouslySetInnerHTML={{
          __html: limitedDescription + (hasMore ? ".... Read more" : ""),
        }}
      />
    ) : (
      <React.Fragment>
        {limitedDescription}
        {hasMore && ".... Read more"}
      </React.Fragment>
    );
  };

  const navigateToBlogDetails = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  const authorBlogCounts = {};
  blogs.forEach((blog) => {
    const { authorId } = blog;
    if (!authorBlogCounts[authorId]) {
      authorBlogCounts[authorId] = { count: 0, authorId };
    }
    authorBlogCounts[authorId].count += 1;
  });

  const topAuthors = Object.entries(authorBlogCounts)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 3)
    .map(([authorId, { count }]) => {
      const author = authorDetails[authorId];
      return {
        authorName: author?.name || "Unknown",
        authorCaption: author?.caption || "",
        authorImage: author?.image1 || "",
        count,
      };
    });
  const handleTopPostsClick = () => {
    setSortBy("reactions");
    setFilter("topPosts");
  };
  const eventVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  const handleMustReadClick = () => {
    setFilter("mustRead");
  };

  const handleRecentBlogsClick = () => {
    setFilter("recentBlogs");
    setSortBy("date"); // Ensure recent blogs are sorted by date
  };
  const handleBookmarkedClick = () => {
    setFilter("bookmarked");
  };
 useEffect(()=>{
  if(filter!=="Tags"){

    setShowTags(false)
  }
 },[filter])
  const filteredBlogs = () => {
   let filtered=[];
   
  filtered = blogs;
  
    if (filter === "mustRead") {
      filtered = mustReadBlogs.filter((data)=>!data.isDeleted);
    } else if (filter === "bookmarked") {
      const reactionIds = finalUser && finalUser.reactions ? Object.keys(finalUser.reactions) : [];
      filtered = blogs.filter((blog) => reactionIds.includes(blog._id));
    }else if(filter=="delete"){
      filtered=blogs.filter((data)=>data.isDeleted&& data.authorId==finalUser._id)
      
    }
    if (searchedBlog) {
      filtered = filtered.filter((blog) => {
        const title = blog.title ? blog.title.toLowerCase() : "";
        return title.includes(searchedBlog.toLowerCase());
      });
    }

    return filtered;
  };

  async function handleBlogDelete(blog){
    let res=confirm('Are You Sure that you want to delete this Blog')
    if(res){

      let data= await fetch('/api/blog',{
         method:"DELETE",
         body:JSON.stringify({
           id:blog._id
         })
       })
       data=await data.json()
       window.location.reload()
    }else{
      return
    }
  }
  function handleTagsClick(){
    setFilter("Tags")
    setShowTags(true)
  }
  function handleDeleteTabClick(){
    setFilter("delete")
    filteredBlogs()
  }


  function handleSearchChange(){
    let value=tagSearch.current.value.toLowerCase()
    if(value==""){
      setTags(tagsData)
      return
    }
    let arr=tagsData.filter((value1)=>{
      if(value1.tagName.toLowerCase().includes(value)){
        return value1
      }
    })
    setTags([...arr])
  }

  const toggleFollow =async (tagName) => {
    // Check if tag is already followed
    
   
     
      // Perform API call or any other action to follow the tag
      // Example: API call to follow the tag
      // followTag(tagName);
      if(followedTags.includes(tagName)){
        let arr=[...followedTags]    
        arr=arr.filter((data)=>data!==tagName)
        setFollowedTags([...arr])  
        if(isShowFollow){
            arr=tagsData.filter((data)=>arr.includes(data.tagName))
          setTags([...arr])
        }
      let res=  await fetch('/api/tagfollow',{
          method:"PUT",
          body:JSON.stringify({
            id:finalUser._id,
            tagname:tagName
          })
        })
        res=await res.json()
        setFinalUser(res.user)
        res=JSON.stringify(res.user)
        localStorage.setItem("finalUser",res)
        return
      }
  
      setFollowedTags([...followedTags, tagName]);
     let res= await fetch('/api/tagfollow',{
        method:"POST",
        body:JSON.stringify({
          id:finalUser._id,
          tagname:tagName
        })
      })
      res=await res.json()

      setFinalUser(res.user)
      res=JSON.stringify(res.user)
      localStorage.setItem("finalUser",res)
  };

  const hideTag =async (tagName) => {

    if(hiddenTags.includes(tagName)){
      let arr=[...hiddenTags]    
      arr=arr.filter((data)=>data!==tagName)
      setHiddenTags([...arr])  
      if(isShowHide){
        arr=tagsData.filter((data)=>arr.includes(data.tagName))
        setTags([...arr])
      }

     let res= await fetch('/api/taghide',{
        method:"PUT",
        body:JSON.stringify({
          id:finalUser._id,
          tagname:tagName
        })
      })
      res=await res.json()
      setFinalUser(res.user)
      res=JSON.stringify(res.user)
      localStorage.setItem("finalUser",res)
      return
    }

    setHiddenTags([...hiddenTags, tagName]);
    let arr1=tagsData.filter((data)=>![...hiddenTags,tagName].includes(data.tagName))
      setTags(arr1)
   let res= await fetch('/api/taghide',{
      method:"POST",
      body:JSON.stringify({
        id:finalUser._id,
        tagname:tagName
      })
    })
    res=await res.json()
    setFinalUser(res.user)
    res=JSON.stringify(res.user)
    localStorage.setItem("finalUser",res)
    // Perform API call or any other action to hide the tag
    // Example: API call to hide the tag
    // hideTag(tagName);
  };
  let [isShowFollow,setIsShowFollow]=useState(false)
  let [isShowHide,setIsShowHide]=useState(false)

  // Function to toggle between showing followed tags and all tags
function showFollow() {
  if (isShowFollow) {
      // If currently showing followed tags, filter out hidden tags and set the tag list to all tags excluding hidden ones
      let arr = tagsData.filter((data) => !hiddenTags.includes(data.tagName));
      setIsShowFollow(false);  // Update state to indicate that followed tags are no longer being shown
      setIsShowHide(false);    // Ensure that hidden tags view is also turned off
      setTags([...arr]);       // Update the tags displayed
  } else {
      // If not currently showing followed tags, filter tags to only include followed ones
      let arr = tagsData.filter((data) => followedTags.includes(data.tagName));
      setTags([...arr]);       // Update the tags displayed to only show followed tags
      setIsShowHide(false);    // Ensure that hidden tags view is turned off
      setIsShowFollow(true);   // Update state to indicate that followed tags are now being shown
  }
}

// Function to toggle between showing hidden tags and all tags
function showHide() {
  if (isShowHide) {
      // If currently showing hidden tags, filter out hidden tags and set the tag list to all tags excluding hidden ones
      let arr = tagsData.filter((data) => !hiddenTags.includes(data.tagName));
      setTags([...arr]);       // Update the tags displayed to exclude hidden tags
      setIsShowHide(false);    // Update state to indicate that hidden tags are no longer being shown
      setIsShowFollow(false);  // Ensure that followed tags view is also turned off
  } else {
      // If not currently showing hidden tags, filter tags to only include hidden ones
      let arr = tagsData.filter((data) => hiddenTags.includes(data.tagName));
      setTags([...arr]);       // Update the tags displayed to only show hidden tags
      setIsShowHide(true);     // Update state to indicate that hidden tags are now being shown
      setIsShowFollow(false);  // Ensure that followed tags view is turned off
  }
}

// Function to handle the recovery of a blog
async function handleRecoverBlog(id) {
  // Send a request to the server to recover a blog with the given ID
  let res = await fetch('/api/recoverblog', {
      method: "PUT",
      body: JSON.stringify({
          id: id
      }),
      headers: {
          "Content-Type": "application/json",  // Ensure the request body is treated as JSON
      }
  });
  
  // Reload the page to reflect the changes after recovering the blog
  window.location.reload();
}
  return (
   <>
    {confetti && <Confetti/>}
    <div
      className={`${
        theme ? "" : "bg-[#1e1d1d] text-white"
      } pt-24 transition-all duration-200`}
    >
      <div
        className={`${
          theme ? "bg-[#6089a4] text-white" : "bg-[#ffffff] text-black"
        } w-full h-9 mb-20 py-2 text-center font-medium max-[425px]:font-[400] max-[425px]:text-[13px] max-[425px]:py-3 transition-all duration-200`}
      >
        Ensuring You Never Get Stuck in Devops Again !!
      </div>
      <div className="flex gap-32 px-40 max-lg:flex-col max-lg:gap-16 max-lg:px-20 max-md:px-10 max-sm:px-5">
        <div className="duration-500 min-h-screen w-full">
          <div
            className={`${
              theme ? "text-gray-500" : "text-gray-300"
            } text-sm flex gap-5 mb-6 cursor-pointer items-center font-semibold max-sm:flex-wrap max-[500px]:text-[12px] max-[500px]:gap-2 transition-all duration-200`}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <div
              className={`${
                theme
                  ? filter === "recentBlogs"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "recentBlogs"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
              onClick={handleRecentBlogsClick}
            >
              Recent Blogs
            </div>
            <div
              onClick={handleTopPostsClick}
              className={`${
                theme
                  ? filter === "topPosts"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "topPosts"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
            >
              Top Posts
            </div>
            <div
              className={`${
                theme
                  ? filter === "bookmarked"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "bookmarked"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
              onClick={handleBookmarkedClick}
            >
              Book Marked
            </div>
            <div
              className={`${
                theme
                  ? filter === "mustRead"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "mustRead"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
              onClick={handleMustReadClick}
            >
              Must Read
            </div>
            <div
              className={`w-[100px] ${
                theme
                  ? filter === "Tags"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "Tags"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
              onClick={handleTagsClick}
            >
              Tags
            </div>
           
            <div className="lg:hidden ml-auto" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          <hr className="w-full border-[1px] border-gray-200" />
          <div className="mt-10 w-full">
            { !showTags &&(  loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="mb-10">
                    <div className="flex max-md:flex-col items-end gap-5">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex gap-2 w-full h-full ">
                          <Skeleton height={30} width={30} borderRadius={100} />
                          <Skeleton height={30} width={100} />
                        </div>
                        <Skeleton height={30} />
                        <Skeleton height={100} />
                      </div>
                      <div className="max-md:w-full w-1/2">
                        <Skeleton height={150} />
                      </div>
                    </div>
                    <hr className="w-full mt-5 mb-5 border-gray-200" />
                  </div>
                ))
              :
              filteredBlogs().length==0?<div className="m-auto relative text-xl font-bold top-[17vh] text-center">No more blogs </div>: filteredBlogs().map((blog, index) => {
                  const author = authorDetails[blog.authorId];
                  if (!author) return null;
                  const isBookmarked = finalUser
                  ? finalUser.reactions && finalUser.reactions.hasOwnProperty(blog._id)
                  : false;
                
                  if((finalUser&&(!finalUser?.blockedBlogs?.includes(blog._id))&&(filter=="delete"?blog.isDeleted:(!blog.isDeleted)))||!finalUser){


                    return (
                      <div
                        className="cursor-pointer relative"
                        key={index}
                        
                      >
                        <div className="flex items-center mb-2" onClick={() => navigateToBlogDetails(blog._id)}>
                          <img
                            src={blog.authorImage}
                            onError={handleImageError}
                            className="w-6 h-6 rounded-full mr-3"
                          />
                          <div className="text-sm">{blog.authorName}</div>
                        </div>
                        <div  className="flex gap-10 items-center max-md:flex-col max-md:items-start">
                          <div className="flex-1">
                            <div onClick={() => navigateToBlogDetails(blog._id)}
                              className="text-2xl mb-2 font-normal max-sm:text-xl"
                              dangerouslySetInnerHTML={{ __html: blog.title }}
                            ></div>
                           <div className="flex gap-[10px] mb-[10px] flex-wrap">
                             {blog.tags && blog.tags.map(data=>{
                          return <div className="text-[14px]">{"#"+data}</div>})}
                            </div>
                            <div onClick={() => navigateToBlogDetails(blog._id)}
                              className={`${
                                theme ? "text-gray-600" : "text-gray-300"
                              } font-medium max-sm:text-sm transition-all duration-200`}
                            >
                              {renderBlogDescription(blog.description)}
                            </div>
                            <div
                              className={`${
                                theme ? "text-gray-500" : "text-gray-300"
                              } flex text-sm justify-between items-center max-sm:flex-wrap max-sm:gap-2 transition-all duration-200`}
                            >
                              <div className="flex gap-5 items-center max-sm:flex-wrap" onClick={() => navigateToBlogDetails(blog._id)}>
                                <div className="my-2 font-medium">
                                  {formatDate(blog.date)}
                                </div>
                                <div>
                                  <FontAwesomeIcon onClick={() => navigateToBlogDetails(blog._id)}
                                    icon={faHands} 
                                    className="mr-2"
                                  />
                                  {blog.reactionList.reduce(
                                    (sum, reaction) => sum + reaction.count,
                                    0
                                  )}
                                </div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faComment}
                                    className="mr-2"
                                  />
                                  {blog.comments.length}
                                </div>
                              <div className="flex gap-2 items-center">
                                <FaEye/> {Math.ceil(blog.views/2)} &nbsp; &nbsp;
                                {blog.average?Math.ceil(Math.ceil(blog.average/Math.ceil((blog.views/2)))/60):0 }&nbsp;min read
                                </div>
                              </div>
                          <div className="flex gap-4">
                                <FontAwesomeIcon
                                  icon={
                                    isBookmarked ? solidBookmark : regularBookmark
                                  }
                                  className="mr-2"
                                />
                        {blog.authorId==finalUser._id &&      <FaEllipsis onClick={()=>modalIndex==index?setModalIndex(-1):setModalIndex(index)}/>
                             } </div>
                            
                            </div>
                          </div>
                          <img onClick={() => navigateToBlogDetails(blog._id)}
                            src={blog.image}
                            onError={handleImageError}
                            className="h-[150px] w-[200px] bg-white object-cover object-center max-md:w-full max-md:h-[200px]"
                          />
                        </div>
                  {finalUser && index == modalIndex &&  !blog.isDeleted &&     <div className="absolute h-[auto] w-[200px]  flex flex-col gap-[20px] right-36 p-[20px] bottom-20 rounded-lg bg-white">
                  <> <div className="flex flex-row gap-[10px] justify-center" onClick={()=>handleBlogDelete(blog)}> <FaTrash className="hover:cursor-pointer" color="red" onClick={()=>handleBlogDelete(blog)}/>Delete Post</div>
                   <div className="z-[100000] flex w-[100%] gap-[10px] items-center justify-center"> 
                  <div onClick={(e)=>{
                   e.preventDefault();
                   let res=confirm("Are you sure that you want to edit this blog ")
                   if(res){ router.push(`/editblog?id=${blog._id}`)}else{
                    return
                   }}} className=" flex gap-[10px] ">
                 <FaPen color="#5a6370"/>
                </div>
                <span  onClick={(e)=>{
                   e.preventDefault();
                   let res=confirm("Are you sure that you want to edit this blog ")
                   if(res){ router.push(`/editblog?id=${blog._id}`)}else{
                    return
                   }}}  className="max-md:hidden text-[#5a6370] font-semibold">Edit Blog</span></div>
                   <p className="w-[100%] flex justify-center items-center"  onClick={()=>handleBlockBlog(blog._id)}>Block Blog</p></>
                   </div>}
                    {finalUser && blog.isDeleted && <p onClick={()=>handleRecoverBlog(blog._id)}>Recover Blog</p>}    
                    
                        <hr className="w-full mt-5 mb-5 border-gray-200" />
                      </div>
                    );
                  }
                }))}
                {
                  showTags && <div className="w-[100%] flex flex-wrap max-sm:justify-center justify-between">
                    <div className="flex w-[100%]  gap-[30px] flex-wrap justify-center">
                      <button className={`${theme?"bg-white":"bg-black border-[1px] border-white "} rounded-2xl shadow-md p-[10px] `} onClick={showFollow}>Following Tags</button>
                      <button className={`${theme?"bg-white":"bg-black border-[1px] border-white "} rounded-2xl shadow-md p-[10px] `} onClick={showHide}>Hidden Tags</button>
                      <input onChange={handleSearchChange} className="p-[10px] placeholder:text-xl rounded-lg" placeholder="Search For Tag" ref={tagSearch}/>
                      </div>
           {
            tags.map((data)=>{
                return  <motion.div 
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.06 }}
                viewport={{ once: true }}
                variants={eventVariants}
                
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`${theme?"light-cookieCard":""}  cookieCard mt-[50px]`}>

  <p className="cookieHeading cursor-pointer hover:text-blue-500 hover:underline" onClick={()=>{router.push(`/blogs?subject=${data.tagName}`);window.location.reload()}}>#{data.tagName}</p>
  <p className="cookieDescription">{data.tagDescription}</p>
  <div className="flex justify-between w-[100%]">

  <button
                className="acceptButton rounded-lg"
                onClick={() => toggleFollow(data.tagName)}
              >
                {followedTags.includes(data.tagName) ? 'Unfollow' : 'Follow'}
              </button>
              {/* Hide button */}
              <button
                className="acceptButton rounded-lg"
                onClick={() => hideTag(data.tagName)}
              >
                                {hiddenTags.includes(data.tagName) ? 'UnHide' : 'Hide'}

              </button>
   </div> 

</motion.div>
            })
           }  



                  </div>
                }
          </div>
        </div>

        {/* Sidebar for larger screens */}
        <div className="hidden  lg:flex flex-col gap-5 border-l-[1px] w-[40%] pl-10 border-gray-300">
          <div
            className={`${
              theme ? "text-black" : "text-gray-300"
            } text-sm font-semibold transition-all duration-200`}
          >
            Editor's Choice
          </div>
          <div>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-6">
                    <Skeleton height={20} />
                    <Skeleton count={2} />
                  </div>
                ))
              : finalEditorsPick.length==0?<div className="text-center w-[100%] relative m-auto ">No more Editor's Choice</div>:top3.slice(0,3).map((blog, index) => {
                  // if (!author) return null;

                  return (
                    <div
                      className="cursor-pointer mb-6"
                      key={index}
                      onClick={() => navigateToBlogDetails(blog._id)}
                    >
                      <div className="flex items-center mb-2">
                        <img
                          src={blog.authorImage}
                          onError={handleImageError}
                          className="w-5 h-5 rounded-full mr-3"
                        />
                        <div className="text-xs font-bold">{blog.authorName}</div>
                      </div>
                      <div
                        className="text-sm font-normal"
                        dangerouslySetInnerHTML={{ __html: blog.title }}
                      ></div>
                    </div>
                  );
                })}
          </div>
          <div className="flex flex-col gap-5">
            <div
              className={`${
                theme ? "text-black" : "text-gray-300"
              } text-sm font-semibold`}
            >
              Key Influencers
            </div>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <Skeleton height={20} />
                    <Skeleton width={100} />
                  </div>
                ))
              :topAuthors.length==0?<div className="text-center w-[100%] relative m-auto ">No more Key Influencers </div>: topAuthors.slice(0,topAuthors.length>6?6:topAuthors.length).map((author, index) => (
                  <div key={index}>
                    <div className="flex gap-2 items-center mb-2">
                      <img
                        src={author.authorImage}
                        onError={handleImageError}
                        className="w-5 h-5 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-xs font-bold">
                          {author.authorName}
                        </div>
                        {/* <div
                          className={`${
                            theme ? "text-gray-500" : "text-gray-300"
                          } text-xs`}
                        >
                          {author.authorCaption}
                        </div> */}
                      </div>
                      <div>
                        <button className="px-3 py-2 bg-[#6089a4] rounded-3xl font-light text-sm text-white">
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Sidebar for smaller screens */}
        {sidebarOpen && (
          <div
            className={`fixed lg:hidden flex flex-col gap-5 ${theme?"bg-[#f4f4f4]":"bg-black"} h-full w-64 top-0 right-0 z-50 transition-transform duration-200 ${
              sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4">
              <button
                onClick={toggleSidebar}
                className="text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold mb-4">Editor's Choice</div>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton height={20} />
                      <Skeleton count={2} />
                    </div>
                  ))
                : finalEditorsPick.map((blog, index) => {
                    const author = authorDetails[blog.authorId];
                    if (!author) return null;

                    return (
                      <div
                        className="cursor-pointer mb-6"
                        key={index}
                        onClick={() => navigateToBlogDetails(blog._id)}
                      >
                        <div className="flex items-center mb-2">
                          <img
                            src={author.image1}
                            onError={handleImageError}
                            className="w-5 h-5 rounded-full mr-3"
                          />
                          <div className="text-xs font-bold">{author.name}</div>
                        </div>

                        <div
                          className="text-sm font-normal"
                          dangerouslySetInnerHTML={{ __html: blog.title }}
                        ></div>
                      </div>
                    );
                  })}
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold mb-4">Key Influencers</div>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton height={20} />
                      <Skeleton width={100} />
                    </div>
                  ))
                : topAuthors.map((author, index) => (
                    <div key={index}>
                      <div className="flex gap-2 items-center mb-2">
                        <img
                          src={author.authorImage}
                          onError={handleImageError}
                          className="w-5 h-5 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-xs font-bold">
                            {author.authorName}
                          </div>
                          <div
                            className={`${
                              theme ? "text-gray-500" : "text-gray-300"
                            } text-xs`}
                          >
                            {author.authorCaption}
                          </div>
                        </div>
                        <div>
                          <button className="px-3 py-2 bg-[#6089a4] text-white rounded-3xl font-light text-sm">
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div></>
  );
}

export default BlogPage;
