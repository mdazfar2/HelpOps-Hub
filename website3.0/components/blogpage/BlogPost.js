"use client";
import { useState, useRef, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Context } from "@context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { FacebookShareButton,FacebookIcon , LinkedinShareButton,LinkedinIcon} from "react-share";
import {
  faHeart as regularHeart,
  faComment as regularComment,
  faBookmark as regularBookmark,

} from "@fortawesome/free-regular-svg-icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tooltip } from 'react-tooltip'

import { FaTrashCan,FaShare,FaLink,FaArrowUpFromBracket, FaHandsClapping, FaEllipsisVertical, FaEllipsis} from "react-icons/fa6";
import {
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import {FaHeart,FaPen} from 'react-icons/fa6'
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import { comment } from "postcss";
import { createGlobalStyle } from "styled-components";
const regularIcons = {
  Heart: regularHeart,
  Comment: regularComment,
  Save: regularBookmark,
};

const GlobalStyle = createGlobalStyle`
  @media not all and (min-width: 1024px) {
    body {
      padding-bottom: 80px;
    }
  }
  
  @media not all and (min-width: 640px) {
    body {
      padding-bottom: 60px;
    }
  }
`;

function BlogPost() {
  const [blog, setBlog] = useState({});
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const pathname = usePathname();
  let [replyIndex,setReplyIndex]=useState(-1)
  const id = pathname.split("/blogs/")[1];
  const [reply, setReply] = useState({});
  let [users,setUsers]=useState([])
  const [showUserList, setShowUserList] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef(null);
  const authorid = blog.authorId;
  let [isSHare,setIsShare]=useState(false)
  const [isReact,setIsReact]=useState(false)
  const { theme } = useContext(Context);
  const { finalUser,setColor, isLogin, setIsPopup, setMsg, setFinalUser } =
    useContext(Context);
  const [hovered, setHovered] = useState(false);
  const iconRef = useRef(null);
  let [canLike,setCanLike]=useState(true)
  const panelRef = useRef(null);
  const [isFollowed, setIsFollowed] = useState(false);
  let [isTagModal,setIsTagModal]=useState(false)
  const timerRef = useRef(null);
  let [startTime,setStartTime]=useState('')
  const [loading, setLoading] = useState(true);
  let [commentCount, setCommentCount] = useState(0);
  const [fetchedUser, setFetchedUser] = useState(null);
  let [isLiked,setIsLiked]=useState([])
  const router = useRouter();
  let [relatedUsers,setRelatedUsers]=useState([])
  let [editCommentNumber,setEditCommentNumber]=useState(-1)
  let [editValue,setEditValue]=useState('')
  let [showOptions,setShowOptions]=useState(false)
  let [optionsIndex,setOptionIndex]=useState(-1)
  let [relatedBlogs,setRelatedBlogs]=useState([])
  const [panelIcons, setPanelIcons] = useState([
    {
      regularIcon: regularIcons.Heart,
      label: "Heart",
      count: 0,
    },
    {
      regularIcon: regularIcons.Comment,
      label: "Comment",
      count: comments.length,
    },
    {
      regularIcon: regularIcons.Save,
      label: "Save",
      count: 0,
    },
  ]);
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else if (e.key === "@") {
      const input = inputRef.current;
      const { x, y } = input.getBoundingClientRect();
      
      // Get the caret position
      const caretPosition = input.selectionStart;
      
      // Create a temporary span to measure the caret position
      const span = document.createElement("span");
      const inputText = input.value.substring(0, caretPosition);
      span.textContent = inputText;
      
      // Apply input field styles to the span
      const inputStyle = window.getComputedStyle(input);
      span.style.font = inputStyle.font;
      span.style.visibility = "hidden";
      span.style.whiteSpace = "pre";

      document.body.appendChild(span);

      const spanRect = span.getBoundingClientRect();
      const caretX = spanRect.width + x;
      const caretY = y;

      document.body.removeChild(span);

      setCursorPosition({ x: caretX, y: caretY + window.scrollY-20 });
      setShowUserList(true);
    }else{
      setShowUserList(false);

    }
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      sendData();
    };
    const handleUserSelect = (user) => {
      // Logic to handle user selection from the list
      setShowUserList(false);
    };
  
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendData();
      }
    };

    const handlePopstate = () => {
      sendData();
    };
    async function handleBlockBlog(data){
      let user=finalUser
      user.blockedBlogs=[...user.blockedBlogs,data]
      updateUser(user)
    let res=await fetch("/api/blockblog",{
      method:"POST",
      body:JSON.stringify({
        user_id:finalUser._id,
        blog_id:data
      })
    })
    window.location.reload()
    
  }
    const sendData = () => {
      const payload = JSON.stringify({ id: id, time: 1, views: blog.views });
      navigator.sendBeacon('/api/averagetime', payload);
    };

    setStartTime(performance.now());

   let a= setInterval(()=>{
      sendData()
      
    },1000)

    // Cleanup function to remove event listeners on component unmount
    return () => {
      clearInterval(a)
    };
  }, [id, blog]);
  



  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          await fetch("/api/viewincrease",{
            method:"POST",
            body:JSON.stringify({id:id})
          })
          setBlog(data);
          let arr=[]
          let arr1=[]
          arr1.push(data.authorName)
          data.comments.map((res,index)=>{
              arr.push(res.replies)
              arr1.push(res.user.username)
              res.replies.map((r)=>{
                arr1.push(r.username)

              })
            })
            let set=new Set()
            let finalarr=[]
            arr1.map(da=>{
              if(!set.has(da)&&da!==undefined){
                set.add(da)
                finalarr.push(da)
              }
            })
            
            setRelatedUsers([...finalarr])
          setReply(arr)
          setComments(data.comments || []);
          updateTotalReactionCount(data.reactionList);
          let userid=JSON.parse(localStorage.getItem('finalUser'))?._id || ""
          data.comments.map((res)=>{
            let ans=false
            res.likeusers.map(r=>{
              
              if(r==userid){
                ans=true
              }
            })

            setIsLiked((prev)=>[...prev,ans])
          })
          let count = 0;
          data.reactionList.map((data1) => {
            if (data1.type == "save") {
              count += 1;
            }
          });
          setCommentCount(count);
          let relatedBlogs1=await fetch('/api/blog')
          relatedBlogs1=await relatedBlogs1.json()
          relatedBlogs1=relatedBlogs1.data
          let arr2=[]
          relatedBlogs1.map((res)=>{
            if(res.authorId==data.authorId && res._id!==data._id){
              arr2.push(res)
            }
          })
          setRelatedBlogs([...arr2])
        } else {
          setError("Failed to fetch blog.");
        }
      } catch (error) {
        setError("An error occurred while fetching the blog.");
      }
    };

    fetchBlog();
  }, [id]);
useEffect(()=>{
},[relatedUsers])
  useEffect(() => {
    if (!authorid) {
      console.warn("authorid is not defined");
      return;
    }

    const fetchUserInfoById = async (idauth) => {
      try {

        const response = await fetch("/api/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: idauth }),
        });

        if (response.ok) {
          const result = await response.json();

          if (result.success) {
            setFetchedUser(result.msg);
          } else {
            throw new Error("Failed to fetch user info");
          }
        } else {
          throw new Error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfoById(authorid);
  }, [authorid]);

  async function handleFollow() {
    if (!isLogin) {
      return;
    }
    if (blog.authorEmail) {
      let updatedData = await fetch("/api/setfollow", {
        method: "POST",
        body: JSON.stringify({
          user_id: finalUser._id,
          other_user_id: blog.authorEmail,
        }),
      });
      updatedData = await updatedData.json();
      let d = await JSON.stringify(updatedData.user1);
      localStorage.setItem("finalUser", d);
      setFinalUser(updatedData.user1);

      setIsFollowed(true);

      // if (updatedData.user.followers.hasOwnProperty(finalUser._id)) {
      //   setIsFollowed(true);
      // }
    }
  }
  async function handleAddReply(index) {
    try {
      const input = document.getElementById(index);
  
      // Check if input value is not empty
      if (!input || !input.value.trim()) {
        console.error('Comment cannot be empty');
        return;
      }
  
      // Perform the POST request to add the reply
      const response = await fetch('/api/addreply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: finalUser.name,
          index: index,
          blog_id: id,
          username: finalUser.username,
          image: finalUser.image1 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
          comment: input.value
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error adding reply: ${response.statusText}`);
      }
  
      // Update local reply state
      const newReply = {
        name: finalUser.name,
        index: index,
        blog_id: id,
        image: finalUser.image1 || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
        comment: input.value
      };
  
      // Update replies state immutably
      setReply(prevReplies => {
        const updatedReplies = [...prevReplies];
        if (!updatedReplies[index]) {
          updatedReplies[index] = [];
        }
        updatedReplies[index].push(newReply);
        return updatedReplies;
      });
  
      // Clear the input field
      input.value = '';
    } catch (error) {
      console.error('Error in handleAddReply:', error);
    }
  }
  

  async function handleUnfollow() {
    if (!isLogin) {
      return;
    }
    if (blog.authorEmail) {
      let updatedData = await fetch("/api/unfollow", {
        method: "POST",
        body: JSON.stringify({
          user_id: finalUser.email,
          other_user_id: blog.authorEmail,
        }),
      });
      updatedData = await updatedData.json();
      let d = await JSON.stringify(updatedData.user1);
      localStorage.setItem("finalUser", d);
      setFinalUser(updatedData.user1);
      setIsFollowed(false);
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort blogs by date in descending order
          const sortedBlogs = data.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setOtherBlogs(sortedBlogs);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        } else {
          setError("Failed to fetch blogs.");
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      } catch (err) {
        setError("An error occurred while fetching blogs.");
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchBlogs();
  }, []);
  async function handleDeleteComment(index){
    let arr=comments
     arr=arr.filter((data,index1)=>index1!==index)
     setComments([...arr])
    let res= await fetch("/api/commentoperations",{
       method:"DELETE",
       body:JSON.stringify({
         id:id,
         index:index,
         id_user:finalUser._id
       })
     })
     res=await res.json()
     setBlog(res.blog)
    
   }
   let edit=useRef()
   async function handleEditComment(index,value){
    setEditCommentNumber(index)
    setEditValue(value)
    setShowOptions(false)
    setOptionIndex(-1)
   }
   async function handleEditSubmit(index){
    let arr=comments
     arr[index].comment=editValue
     setComments([...arr])
    let res= await fetch("/api/commentoperations",{
       method:"PUT",
       body:JSON.stringify({
         id:id,
         index:index,
         comment:editValue
       })
     })
     res=await res.json()
     setBlog(res.blog)
     setEditCommentNumber(-1)
     setEditValue('')
    
   }
  const otherBlogsByAuthor = otherBlogs.filter(
    (b) => b.authorName === blog.authorName
  );
  const handleAddComment = async () => {
    if (!isLogin) {
      setIsPopup(true);
      setMsg("Please Login ");
      return;
    }
    if (newComment.trim() !== "") {
      const newCommentObject = {
        user1: {
          name: finalUser.name || "Unknown",
          username:finalUser.username,
          image:
            finalUser.image1 ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
        },
        comment: newComment,
      };
      let duplicate={
        user: {
          name: finalUser.name || "Unknown",
          image:
            finalUser.image1 ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
        },
        comment: newComment,
      };
      const updatedComments = [...comments, duplicate];
      setNewComment("");
      setReply((prev)=>[...prev,[]])
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentObject),
        });

        if (response.ok) {
          const updatedBlog = await response.json();
          setComments(updatedBlog.comments);
        } else {
          setError("Failed to update comments.");
        }
      } catch (error) {
        setError("An error occurred while updating the comments.");
      }
    }
  };
  useEffect(() => {
  }, [finalUser]);
  async function handleClick(key) {
    if (!isLogin) {
      setIsPopup(true);
      setMsg("Please Login ");
      return;
    }
    if (key == "2") {
      let data = await fetch("/api/setreaction", {
        method: "POST",
        body: JSON.stringify({
          user_id: finalUser._id,
          blog_id: id,
          reaction: "2",
        }),
      });
      data = await data.json();
      let d = await JSON.stringify(data.user);
      localStorage.setItem("finalUser", d);
      setFinalUser(data.user);
    }
  }
  useEffect(()=>{
    if(finalUser&&finalUser.likedBlogs){
      let map = new Map(Object.entries(finalUser.likedBlogs));
      if(map.size>0){
        setIsReact(true)
      }else{
        setIsReact(false)
      }
    }
  },[finalUser])

  const handleReactionClick = async (reactionType) => {
    if(!canLike){
      return
    }
    if (!isLogin) {
      setIsPopup(true);
      setMsg("Please Login to React");
      return;
    }
    setCanLike(false)
    try {
      let map = new Map(Object.entries(finalUser.likedBlogs));
      
      if (map.has(id)) {
        let map1 = new Map(Object.entries(map.get(id)));
  
        if (map1.has(reactionType)) {
          // Reaction exists, so delete it
          const response = await fetch(`/api/blog/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reactionType: reactionType, user1: finalUser }),
          });
  
          if (response.ok) {
            const updatedBlog = await response.json();
            setBlog(updatedBlog);
            await updateUser(finalUser._id);
            updateTotalReactionCount(updatedBlog.reactionList);
          } else {
            setError("Failed to delete reaction.");
          }
        } else {
          // Reaction does not exist, so add it
          const response = await fetch(`/api/blog/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reactionType: reactionType, user1: finalUser }),
          });
  
          if (response.ok) {
            const updatedBlog = await response.json();
            setBlog(updatedBlog);
            await updateUser(finalUser._id);
            updateTotalReactionCount(updatedBlog.reactionList);
          } else {
            setError("Failed to add reaction.");
          }
        }
      } else {
        // No reactions for this blog yet, so add the reaction
        const response = await fetch(`/api/blog/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reactionType: reactionType, user1: finalUser }),
        });
  
        if (response.ok) {
          const updatedBlog = await response.json();
          setBlog(updatedBlog);
          await updateUser(finalUser._id);
          updateTotalReactionCount(updatedBlog.reactionList);
        } else {
          setError("Failed to add reaction.");
        }
      }
     
    } catch (error) {
      setError("An error occurred while updating reactions.");
    }
    setCanLike(true)
  };
  function handleSetUser(data){
    setNewComment((prev)=>prev+data)
    inputRef.current.focus()
    setShowUserList(false)
  }
  // Function to update user state and local storage
  const updateUser = async (userId) => {
    try {
      let response = await fetch('/api/getuser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
  
      if (response.ok) {
        let user = await response.json();
        setFinalUser(user.msg);
        localStorage.setItem('finalUser', JSON.stringify(user.msg));
      } else {
        console.error("Failed to fetch updated user data.");
      }
    } catch (error) {
      console.error("An error occurred while updating user state.", error);
    }
  };
  

  const updateTotalReactionCount = (reactionList) => {
    const totalCount = reactionList.reduce(
      (sum, reaction) => sum + reaction.count,
      0
    );

    setPanelIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.label === "Heart" ? { ...icon, count: totalCount } : icon
      )
    );
  };

  useEffect(() => {
    updatePanelIconsCommentCount();
  }, [comments]);

  const updatePanelIconsCommentCount = () => {
    setPanelIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.label === "Comment" ? { ...icon, count: comments.length } : icon
      )
    );
  };

  useEffect(() => {
    if (blog.reactionList) {
      updateTotalReactionCount(blog.reactionList);
    }
  }, [blog.reactionList]);

  const handleMouseEnterIcon = () => {
    clearTimeout(timerRef.current);
    setHovered(true);
  };

  const handleMouseLeaveIcon = (e) => {
    if (!panelRef.current.contains(e.relatedTarget)) {
      timerRef.current = setTimeout(() => setHovered(false), 1000);
    }
  };

  const handleMouseEnterPanel = () => {
    clearTimeout(timerRef.current);
    setHovered(true);
  };
  async function handleCommentLike(index) {
    try {
      const commentId = comments[index]._id; // Assuming each comment has a unique _id
      const isCurrentlyLiked = isLiked[index];
      
      // Update the local liked state
      const updatedIsLiked = [...isLiked];
      updatedIsLiked[index] = !isCurrentlyLiked;
      setIsLiked(updatedIsLiked);
  
      // Prepare the request body
      const requestBody = {
        comment_id: commentId,
        blog_id: id,
        isDelete: isCurrentlyLiked, // If it was liked, it will be unliked now
        index: index,
        user_id: finalUser._id
      };
  
      // Make the request to update the like status
      const response = await fetch('/api/commentlike', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update like status: ${response.statusText}`);
      }
  
      // Update the comments state
      const updatedComments = [...comments];
      updatedComments[index] = {
        ...updatedComments[index],
        likes: updatedComments[index].likes + (isCurrentlyLiked ? -1 : 1)
      };
      setComments(updatedComments);
    } catch (error) {
      console.error('Error handling comment like:', error);
      // Optionally, show an error message to the user
    }
  }
  
  const handleMouseLeavePanel = (e) => {
    if (!iconRef.current.contains(e.relatedTarget)) {
      timerRef.current = setTimeout(() => setHovered(false), 1000);
    }
  };
  function handleScroll(){
    setTimeout(()=>{
  
      document.getElementById('comment').scrollIntoView({behavior:"smooth"})
    },300)  
    }
  
  useEffect(() => {
    if (iconRef.current) {
      const iconElement = iconRef.current;

      const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      iconElement.addEventListener("click", handleClick);

      return () => {
        iconElement.removeEventListener("click", handleClick);
      };
    }
  }, [iconRef.current]);

  if (error) {
    return <p>{error}</p>;
  }
 
  const navigateToBlogDetails = (blogId) => {
    router.push(`/blogs/id=${blogId}`);
  };
  function handleOpenProfile() {
    if (blog._id) {
      router.push(`/profile?id=${blog.authorId}`);
    }
  }
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
  async function handleBlogDelete() {
    try {
      // Set a loading state if needed
      // setLoading(true);
  
      // Check if the blog ID is defined
      if (!blog || !blog._id) {
        throw new Error("Invalid blog data");
      }
  
      // Send the DELETE request
      const response = await fetch('/api/blog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: blog._id
        })
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Failed to delete blog: ${response.statusText}`);
      }
  
      // Optionally, handle successful deletion
      // setSuccessMessage('Blog deleted successfully');
  
      // Redirect to the blogs page
      router.push('/blogs');
    } catch (error) {
      // Handle errors, show messages to the user
      console.error('Error deleting blog:', error);
      // setErrorMessage('Failed to delete blog. Please try again.');
    } finally {
      // Reset loading state if used
      // setLoading(false);
    }
  }
  
  function handleLinkCopy(){
    navigator.clipboard.writeText(`https://www.helpopshub.com/blogs/${id}`)
    setIsPopup(true)
    setMsg("Link Copied")
    setColor('green')
    setTimeout(()=>{

      setIsShare(false)
    },1000)
  }

  function dateFormat(createdAtString){
    const createdAtDate = new Date(createdAtString);

const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};

const formattedDate = createdAtDate.toLocaleDateString('en-US', options);
return formattedDate
  }
let [modalIndex,setModalIndex]=useState(false)
function handleError(){
  
  document.getElementById("image-section").src='https://dummyimage.com/600x300'
}
  return (
    <>
    <GlobalStyle />
    <div
      className={`${
        theme ? "bg-[#F3F4F6]" : " bg-[#1e1d1d]"
      } transition-colors duration-500 pt-48 flex flex flex-wrap flex-col lg:flex-row max-lg:pt-24 max-md:pt-16`}
    >
      <div className="w-[10%] max-lg:w-full max-lg:order-3">
        <div className={`fixed left-24 top-60 max-lg:flex max-lg:fixed max-lg:justify-center max-lg:mt-8 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:bottom-0 ${ theme ? "max-lg:bg-[#ccc]" : "max-lg:bg-[#3a3a3a]"} max-lg:pt-[9px] max-lg:z-[100]`}>
          <div className="relative flex flex-col items-center space-y-4 max-lg:flex-row max-lg:space-y-0 max-lg:space-x-4 max-lg:gap-[70px] max-md:gap-[50px] max-[425px]:gap-[40px]">
            <div className="space-y-4 max-lg:flex max-lg:flex-row max-lg:space-y-0 max-lg:space-x-4 max-lg:gap-[70px] max-md:gap-[50px] max-[425px]:gap-[40px]">
              {panelIcons.slice(0, 3).map((panelIcon, index) => (
               
               <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className="flex cursor-pointer flex-col justify-center items-center"
                  onMouseEnter={
                    panelIcon.label === "Heart"
                      ? handleMouseEnterIcon
                      : undefined
                  }
                  onMouseLeave={
                    panelIcon.label === "Heart"
                      ? handleMouseLeaveIcon
                      : undefined
                  }
                  ref={panelIcon.label === "Heart" ? iconRef : null}
                >
             {panelIcon.label!=="Heart" ?    
              <FontAwesomeIcon
                    icon={panelIcon.regularIcon}
                    data-tooltip-id={panelIcon.label}
                    data-tooltip-content={panelIcon.label}
                    onClick={()=>{
                      if(index==1){
                        handleScroll()
                      }
                      return
                    }}  
                    className={`    ${
                      theme
                        ? `${
                            isLogin &&
                            index == 2 &&
                            id in
                              JSON.parse(localStorage.getItem("finalUser"))
                                .reactions
                              ? "text-blue-500  h-[30px]"
                              : ""
                          } `
                        : " text-white "
                    } \
        text-[20px]  max-[635px]:text-[25px] max-sm:text-[35px]
      `}

                  />
                :isReact?<FaHeart data-tooltip-id="heart"
                data-tooltip-content="Reaction" color="red" className="bg-transparent"/>:  <FontAwesomeIcon
                  icon={panelIcon.regularIcon}
                  
                  className={`    ${
                    theme
                      ? `${
                          isLogin &&
                          index == 2 &&
                          id in
                            JSON.parse(localStorage.getItem("finalUser"))
                              .reactions
                            ? "text-blue-500  h-[30px]"
                            : ""
                        } `
                      : " text-white "
                  } \
      text-[20px] max-[425px]:text-[25px] max-sm:text-[35px]
    `}data-tooltip-id="heart"
data-tooltip-content="Reaction"
                />}
                <Tooltip id="heart"/>
                  <span
                    className={`${
                      theme ? "text-gray-900 " : " text-white "
                    } my-2 text-sm s`}
                  >
                    
                    {index == 2 ? commentCount : panelIcon.count}
                  </span>
                  <Tooltip id={panelIcon.label}/>
                </div>
                ))}
            </div>
            {hovered && (
              <div
                className="absolute top-0 left-full flex bg-white shadow-lg rounded-lg p-4 max-lg:left-0"
                onMouseEnter={handleMouseEnterPanel}
                onMouseLeave={handleMouseLeavePanel}
                ref={panelRef}
                style={{ width: "auto", minWidth: "150px" }} // Fixed width to avoid resizing
              >
                <div className="flex gap-5 py-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleReactionClick("Icon1")}
                  >
                    <img src="/icon1.webp" width={100} height={100} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleReactionClick("Icon2")}
                  >
                    <img src="/icon2.webp" width={100} height={100} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleReactionClick("Icon3")}
                  >
                    <img src="/icon3.webp" width={100} height={100} />
                  </div>
                </div>
              </div>
            )}
            {
              isSHare&&<div className="w-[240px] pl-[20px] flex flex-col pt-[10px] gap-3 h-[140px] bg-slate-100  rounded-lg absolute left-10 top-20">
                                <p onClick={handleLinkCopy} className=" hover:cursor-pointer  font-semibold text-gray-600 flex gap-6 items-center">
                            <FaLink/>    Copy Link</p>
                <p className="flex  hover:cursor-pointer font-semibold text-gray-600 gap-2 items-center">
                  <FacebookShareButton className="hover:cursor-pointer flex items-center gap-[10px]" url={`https://www.helpopshub.com/blogs/${id}`}>
                    <FacebookIcon borderRadius={50} size={30}/>

                   Share on Facebook </FacebookShareButton></p>
                    <p className="flex hover:cursor-pointer  font-semibold text-gray-600 gap-2 items-center">
                    <LinkedinShareButton  className="hover:cursor-pointer flex items-center gap-[10px]"  url={`https://www.helpopshub.com/blogs/${id}`}>
                    <LinkedinIcon borderRadius={50} size={30}/>

                   Share On Linkedin </LinkedinShareButton></p>
                  </div>}
                  <div>
           <FaArrowUpFromBracket  data-tooltip-id="aa" data-tooltip-content="Share" size={'1.5rem'} color={`${theme?"black":"white"} `} className="cursor-pointer max-lg:mb-[29px] max-lg:w-[2rem] max-lg:h-[2rem] max-sm:w-[1.5rem] max-sm:h-[1.5rem]" onClick={()=>isSHare?setIsShare(false):setIsShare(true)}/>
           {blog.authorId==finalUser._id &&      <FaEllipsis className="mt-[20px] ml-[4px] cursor-pointer " size={'1.2rem'} onClick={()=>modalIndex?setModalIndex(false):setModalIndex(true)}/>
                             } 
                              { modalIndex &&  <div className="absolute h-[auto] w-[200px]  flex flex-col gap-[20px]  p-[20px] rounded-lg bg-white">
                  <> <div className="flex flex-row gap-[10px] justify-center cursor-pointer" onClick={()=>handleBlogDelete(blog)}> <FaTrash className="hover:cursor-pointer" color="red" onClick={()=>handleBlogDelete(blog)}/>Delete Post</div>
                   <div className="z-[100000] flex w-[100%] gap-[10px] items-center justify-center cursor-pointer"> 
                  <div onClick={(e)=>{
                   e.preventDefault();
                   let res=confirm("Are you sure that you want to edit this blog ")
                   if(res){ router.push(`/editblog?id=${blog._id}`)}else{
                    return
                   }}} className=" flex gap-[10px] cursor-pointer">
                 <FaPen color="#5a6370"/>
                </div>
                <span  onClick={(e)=>{
                   e.preventDefault();
                   let res=confirm("Are you sure that you want to edit this blog ")
                   if(res){ router.push(`/editblog?id=${blog._id}`)}else{
                    return
                   }}}  className="max-md:hidden text-[#5a6370] font-semibold">Edit Blog</span></div>
                   <p className="w-[100%] flex justify-center items-center cursor-pointer"  onClick={()=>handleBlockBlog(blog._id)}>Block Blog</p></>
                   </div>}
           </div>
           <Tooltip id="aa"/>

          </div>
        </div>
      </div>

      <div
        className={`${
          theme ? "bg-white text-black " : " bg-[#0f0e0e] text-white "
        } transition-colors duration-500 w-[55%] shadow-lg rounded-lg max-lg:w-full max-lg:order-1`}
      >
       {loading?<Skeleton height={"30%"} width={"100%"}  />: <img
          src={blog.image}
          alt={blog.title}
          onError={handleError}
          id="image-section"
          className="w-full h-96 object-cover mb-5 rounded-lg max-md:mt-[30px] max-md:p-[8px]"
        />}
        <div className="px-10 max-[425px]:px-8">
          <div
            className="flex items-center mb-5 cursor-pointer"
            
          >
         {
          loading? <Skeleton  borderRadius={100} height={40} width={40}  />:
            <img onClick={handleOpenProfile}

              src={
                fetchedUser
                  ? fetchedUser.image1
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              }
              alt={fetchedUser?fetchedUser.name:"User Image"}
              className="w-10 h-10 rounded-full mr-3"
            />}
            <div onClick={handleOpenProfile}>
              <div className="text-base font-bold">{loading? <Skeleton height={10} width={200}  />:blog.authorName}</div>
              <div className="text-gray-500 text-xs">
                Posted on{" "}
                {loading? <Skeleton   height={10} width={200}  />: new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            
          </div>
          <div className="flex gap-5 py-2 mb-5">
            <div className="flex cursor-pointer">
              <img src="/icon1.webp" width={25} height={25} />
              <span>
                {blog.reactionList?.find(
                  (reaction) => reaction.type === "Icon1"
                )?.count || 0}
              </span>
            </div>
            <div className="flex cursor-pointer">
              <img src="/icon2.webp" width={25} height={25} />
              <span>
                {blog.reactionList?.find(
                  (reaction) => reaction.type === "Icon2"
                )?.count || 0}
              </span>
            </div>
            <div className="flex cursor-pointer">
              <img src="/icon3.webp" width={25} height={25} />
              <span>
                {blog.reactionList?.find(
                  (reaction) => reaction.type === "Icon3"
                )?.count || 0}
              </span>
            </div>
          </div>
       {
        loading? <Skeleton  height={10} width={400}  />:
          <h1 className="text-4xl max-md:text-3xl max-[425px]:text-2xl font-normal mb-5" dangerouslySetInnerHTML={{ __html: blog.title}}></h1>}
          {loading? <div className="flex flex-col gap-1"><Skeleton height={10} width={400}  />
          </div>:<div className="text-gray-600 mb-5">{blog.introduction}</div>}
          <div className="mb-5">
    {
      loading? blog.sections?.map((section, index) => (
        <div key={index} className="mb-5">
          <h2 className="text-2xl max-[425px]:text-xl font-semibold mb-3">
          <Skeleton height={10} width={100} />      

          </h2>
          
          <p className="text-gray-600 mb-3">          <Skeleton height={10} width={100} /> 
          <Skeleton height={10} width={200} />      
          <Skeleton height={10} width={300} />      
          <Skeleton height={10} width={400} />      
          <Skeleton height={10} width={500} />      
     
          </p>
          
            <div key={subIndex} className="ml-5 mb-3">
              <h3 className="text-xl font-semibold mb-2">
              <Skeleton height={10} width={100} />      

              </h3>
              <p className="text-gray-600">          <Skeleton height={10} width={200} />      
              </p>
            </div>
      
          
        </div>
      )):
            blog.sections?.map((section, index) => (
              <div key={index} className="mb-5">
                <h2 className="text-2xl max-[425px]:text-xl font-semibold mb-3">
                  {section.heading}
                </h2>
                
                <p className="text-gray-600 mb-3">{section.content}</p>
                {section.subsections?.map((sub, subIndex) => (
                  <div key={subIndex} className="ml-5 mb-3">
                    <h3 className="text-xl font-semibold mb-2">
                      {sub.subheading}
                    </h3>
                    <p className="text-gray-600">{sub.content}</p>
                  </div>
                ))}
                
              </div>
            ))}
          </div>
          <div className="flex items-center mb-5">
            <div className="text-sm font-medium bg-blue-100 text-blue-500 px-2 py-1 rounded">
              {blog.type}
            </div>
            <div className="ml-3 text-sm text-gray-500">{blog.length}</div>
            {blog.mustRead && (
              <div className="ml-3 text-sm text-red-500 font-semibold">
                Must Read
              </div>
            )}
            {blog.editorsPick && (
              <div className="ml-3 text-sm text-green-500 font-semibold">
                Editor's Pick
              </div>
            )}
          </div>
          <div className="flex gap-[20px] mb-[30px] ">
                           {blog.tags && blog.tags.map(data=>{
                        return <div className="text-[14px] max-sm:text-[13px] max-[425px]:text-[12px]">{"#"+data}</div>})}
                          </div>
                          {loading? <div className="flex flex-col gap-1"><Skeleton height={10} width={250}  />
                          <Skeleton height={10} width={300}  />
                          <Skeleton height={10} width={350}  />
                          <Skeleton height={10} width={400}  />
                          <Skeleton height={10} width={450}  />
                          <Skeleton height={10} width={500}  />
                          </div>:  <div className="pb-10 " dangerouslySetInnerHTML={{ __html: blog.description }}></div>}
          <hr className="w-full h-1 pb-5" />
          <div className="text-2xl font-bold pb-5 max-[425px]:text-xl" id="comment">Top Comments</div>
             <div className="flex items-center justify-center mb-4 max-[425px]:mb-2">
              <img
                src={
                  finalUser.image1?.length > 0
                    ? finalUser.image1
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
                }
                alt={blog.authorName}
                className="w-10 h-10 rounded-full mr-3 max-[425px]:mb-2 max-[425px]:mr-6"
              />
              <input
                type="text"
                ref={inputRef}
                className={`w-full p-4 border-[1px] border-gray-300 rounded-lg max-[425px]:mb-2 ${theme?"text-black bg-white":"text-white bg-gray-900"}`}
                placeholder="Add to the Discussion"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <FaPaperPlane
                onClick={handleAddComment}
                className="relative right-[50px] cursor-pointer z-50 max-[425px]:right-[35px]"
                color="blue"
                size={"2rem"}
              />
               {showUserList && (
                <div
                  style={{
                    position: "absolute",
                    top: cursorPosition.y-relatedUsers.length*30,
                    left: cursorPosition.x,
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    borderRadius:"20px",
                    padding:"15px",
                    zIndex: 1000,
                    height:"auto"
                  }}
                >
                  {/* Your modal content goes here */}
                  { relatedUsers.map(data=>   <p className="cursor-pointer border-b-[1px] pb-[5px] pt-[5px] border-b-gray-200 border-b-solid"  onClick={()=>handleSetUser(data)}>{data}</p>)}
               </div>
                )}
          </div>
          <div className="border-gray-300 rounded-xl mb-10 w-full h-[500px] p-5 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
         <>
          <>
                <div
                  key={comment._id || index}
                  className={`  flex flex-col gap-4 p-4 mb-4 rounded-lg shadow ${theme?"bg-white text-black":"bg-black border-[1px] text-white border-white"}`}
                >
             <div className="flex relative">
                   <img src={comment?.user?.image } className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="font-medium text-sm mb-1">
                      {comment.user.name}
                    </div>
                {!editCommentNumber==index ?    <p>{comment.comment}</p>:<><input value={editValue} className="p-3 w-[300px] border-gray-400 border-[1px]"   onChange={(e)=>setEditValue(e.target.value)}></input><button className="p-3 bg-blue-500 text-white rounded-lg ml-[20px]" onClick={()=>handleEditSubmit(index)}>Submit</button></>}
                  </div>
              {finalUser.username==comment.user.username && <><FaEllipsisVertical  onClick={()=>{showOptions?setShowOptions(false):setShowOptions(true);setOptionIndex(index)}} size={"1.3rem"} className="cursor-pointer absolute top-[10px] right-[20px]"/></>}
                {showOptions && optionsIndex==index&& <div className="absolute bg-slate-100 h-[100px] flex flex-col justify-center pl-[20px] gap-3 rounded-lg w-[200px] right-0 top-[1.8rem]"><p className="flex gap-2 cursor-pointer"  onClick={()=>handleDeleteComment(index)}><FaTrashCan size={"1rem"} color="red" className=" cursor-pointer "/>Delete Comment</p><p className="flex gap-2 cursor-pointer"  onClick={()=>handleEditComment(index,comment.comment)}><FaPen className=" cursor-pointer " color="black" size={'1rem'}/>Edit Comment</p></div> }
              </div>
                  <div className="flex gap-4 text-gray-600 font-medium">
                    <div className="cursor:pointer" onClick={()=>handleCommentLike(index)}><FaHandsClapping size={'1.5rem'} color={`${isLiked[index]?"blue":`${theme?"":"#5d636f"}`}`}  className="cursor-pointer" /></div>{comment.likes && <p className={`${theme?"":"text-white"}`}>{comment.likes}</p>}
                    <span className={`cursor-pointer ${theme?"":"text-gray-400"}`} onClick={()=>replyIndex!==-1?setReplyIndex(-1):setReplyIndex(index)}>Reply</span>
                    </div>
                </div>
               {

               replyIndex==index&& <>
               
                   <div className="flex gap-2  pl-[50px]">
                   <input
                      type="text"
                      className="w-full p-4 border-[1px] border-gray-300 rounded-lg"
                      placeholder="Add a Comment"
                      id={index}
                   /> 
                    <button onClick={()=>handleAddReply(index)} className="border bg-blue-500  border-blue-500 text-white w-[150px] rounded-md cursor-pointer">
                      Submit
                    </button>
                    </div>
                    <div className="h-[auto]  pl-[50px]">
                    {
                      reply[index].map(data=>{
                        return <div className={`flex flex-col pb-3 pt-2 gap-1 border-b-[1px] border-b-gray-300 ${theme?"bg-white":"bg-black "}`}>
                          <p className="flex items-center gap-4 "><img height={'40px'} width={'40px'} className="rounded-full" src={data.image?data.image:""}></img>{data.name}</p>
                          <span className="ml-[60px]">{data.comment}</span></div>
                      })
                    }
                    </div>
                    </>
               }
          </>
         </>
              ))
            ) : (
              <p className="text-center text-gray-500">No comments yet.</p>
            )}
          </div>

        </div>
      </div>

      <div className="w-[25%] ml-5 max-lg:w-full max-lg:ml-0 max-lg:mt-5 max-lg:order-2 max-lg:p-[15px] ">
        <div
          className={`${
            theme ? "bg-white" : " bg-[#e2e2e2]"
          } h-auto rounded-xl overflow-hidden`}
        >
          {/* <img src="/banner.png" alt="" /> */}
          <div className="w-full  h-10"></div>
          <div className="flex px-5 cursor-pointer" onClick={handleOpenProfile}>
           {loading?<Skeleton height={40} width={40}  borderRadius={100}/>: <img
              src={
                fetchedUser
                  ? fetchedUser.image1
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              }
              alt={fetchedUser?fetchedUser.name:"User Image"}
              className="w-12 h-12 rounded-full mr-3 relative -top-3"
            />}
            <div className="py-1 ml-3">
              <div className="text-xl font-bold">{loading?<Skeleton height={10} width={200}  />:blog.authorName}</div>
            </div>
          </div>
          <div className="w-full px-4">
            {isFollowed ? (
              <button
                onClick={handleUnfollow}
                className="py-2 px-5 w-full bg-[#5271ff] rounded-xl text-bold text-white"
              >
                UnFollow
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="py-2 px-5 w-full bg-[#5271ff] rounded-xl text-bold text-white"
              >
                Follow
              </button>
            )}
          </div>
          <div
            className={`${
              theme ? "bg-gray-100" : "bg-[#9d9d9d]"
            } flex flex-col m-5 p-5 h-52`}
          >
            {/* Conditionally render fetchedUser content if it exists */}
            {fetchedUser ? (
              <>
                  <div className="overflow-hidden flex text-[15px] flex-col items-start gap-2 text-gray-600 font-bold mb-2">
              <span>Designation</span>
              {
  fetchedUser.designation.length > 30 && (
    <div className="flex flex-col overflow-hidden">
      <span className="font-medium">{fetchedUser.designation.substring(0, 31)}</span>
      <span key="truncated" className="font-medium ">
        {fetchedUser.designation.substring(31,fetchedUser.designation.length>60?60:fetchedUser.designation.length)}{fetchedUser.designation.length>60?"...":''}
      </span>
    </div>
  ) 
 }
 {!fetchedUser.designation.length>30 && (
    <span key="full" className="font-medium">
      {fetchedUser.designation}
    </span>
  )
}

                </div>
                <div className="flex text-[15px] flex-col items-start gap-2 text-gray-600 font-bold mb-2">
                  <span>Joined</span>
                  <span className="font-medium">{dateFormat(fetchedUser.createdAt)}</span>

                </div>
                {/* <div className="text-lg text-center">{fetchedUser.caption}</div> */}
                <div className="flex gap-5 mt-5 text-2xl">
                  {fetchedUser.github && (
                    <a
                      href={fetchedUser.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                  {fetchedUser.linkedin && (
                    <a
                      href={fetchedUser.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="text-lg font-bold mb-2">Loading...</div> // Fallback content while fetching
            )}
          </div>
        </div>
        <div
          className={`${
            theme ? "bg-white text-black " : " bg-[#0f0e0e] text-white "
          } my-5 rounded-xl p-5`}
        >
          <div className="text-xl font-bold flex">
            More From{" "}
            <span className="text-blue-500 ml-1">{blog.authorName}</span>
          </div>
          {loading ? (
            <>
              <div
                className={`${
                  theme
                    ? "bg-gray-100  text-black "
                    : " bg-[#9d9d9d] text-white "
                } my-5 h-16 rounded-xl p-5`}
              ></div>
              <div
                className={`${
                  theme
                    ? "bg-gray-100 text-black "
                    : " bg-[#9d9d9d] text-white "
                } my-5 h-16 rounded-xl p-5`}
              ></div>
              <div
                className={`${
                  theme
                    ? "bg-gray-100  text-black "
                    : " bg-[#9d9d9d] text-white "
                } my-5 h-16 rounded-xl p-5`}
              ></div>
            </>
          ) : (
            <div>
              <ul>
                {otherBlogsByAuthor.map((otherBlog) => (
                  <li
                    key={otherBlog.id}
                    className={`${
                      theme
                        ? "bg-[#f5f5f5] text-black "
                        : " bg-[#0f0e0e] text-white "
                    } my-5 rounded-xl p-5 cursor-pointer`}
                    onClick={() => navigateToBlogDetails(otherBlog._id)}
                    dangerouslySetInnerHTML={{ __html: otherBlog.title}}
                  >
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={`h-[300px] overflow-scroll  max-lg:hidden ml-[10%] w-[55%] mt-[40px] pl-[60px]  pt-[40px]  rounded-lg ${theme?"bg-white":"bg-[#0f0e0e] border-white border-[1px]"} `}>
        <h1 className={`${theme?"":"text-white"} text-2xl font-semibold mb-[30px]`}>Read Next</h1>
        {

        relatedBlogs.map((data)=>{

        return <div className="flex gap-6 items-center mt-[10px]">
            <img src={data.image} className="h-[80px] w-[80px]" style={{borderRadius:"50%"}}></img>
            <div className="flex flex-col gap-1 h-[100%]  justify-center">
            <p className={`${theme?"":"text-white"} font-bold text-2xl hover:cursor-pointer hover:text-blue-600 `} onClick={()=>router.push(`/blogs/${data._id}`)} dangerouslySetInnerHTML={{__html:data.title}}/>
            <p className={`${theme?"":"text-white"}`}>{formatDate(data.date)}</p>
              </div>
          </div>
        })
        } 

      </div>

    </div>
    <div className={`h-[300px] max-lg:block hidden overflow-scroll  max-sm:pl-[10px]  w-[96%] m-auto  pl-[60px]  pt-[40px]  rounded-lg ${theme?"bg-white":"bg-[#0f0e0e] border-white border-[1px]"} `}>
        <h1 className={`${theme?"":"text-white"} text-2xl font-semibold mb-[30px]`}>Read Next</h1>
        {

        relatedBlogs.map((data)=>{

        return <div className="flex gap-6 items-center mt-[10px]">
            <img src={data.image} className="h-[80px] w-[80px]" style={{borderRadius:"50%"}}></img>
            <div className="flex flex-col gap-1 h-[100%]  justify-center">
            <p className={`${theme?"":"text-white"} font-bold text-2xl hover:cursor-pointer hover:text-blue-600 `} onClick={()=>router.push(`/blogs/${data._id}`)} dangerouslySetInnerHTML={{__html:data.title}}/>
            <p className={`${theme?"":"text-white"}`}>{formatDate(data.date)}</p>
              </div>
          </div>
        })
        } 

      </div>
    </>
  );
}

export default BlogPost;
