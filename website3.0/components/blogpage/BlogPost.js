"use client";
import { useState, useRef, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Context } from "@context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import {
  faHeart as regularHeart,
  faComment as regularComment,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { FaPaperPlane } from "react-icons/fa";
const regularIcons = {
  Heart: regularHeart,
  Comment: regularComment,
  Save: regularBookmark,
};

function BlogPost() {
  const [blog, setBlog] = useState({});
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const pathname = usePathname();
  const id = pathname.split("/blogs/")[1];
  const { theme } = useContext(Context);
  const { finalUser, isLogin, setIsPopup, setMsg,setFinalUser } = useContext(Context);
  const [hovered, setHovered] = useState(false);
  const iconRef = useRef(null);
  const panelRef = useRef(null);
  const [isFollowed,setIsFollowed]=useState(false)
  const timerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  let [commentCount,setCommentCount]=useState(0)
  const router = useRouter();
  console.log(finalUser);
  
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
  async function handleFollow() {
    if (!isLogin) {
      return;
    }
    if(blog.authorEmail){

      let updatedData = await fetch("/api/setfollow", {
        method: "POST",
        body: JSON.stringify({
          user_id: finalUser._id,
          other_user_id: blog.authorEmail,
        }),
      });
      updatedData = await updatedData.json();
      let d=await JSON.stringify(updatedData.user1)
      localStorage.setItem('finalUser',d)
      setFinalUser(updatedData.user1)
     
        setIsFollowed(true)
      
      // if (updatedData.user.followers.hasOwnProperty(finalUser._id)) {
      //   setIsFollowed(true);
      // }
    }
  }
  async function handleUnfollow() {
    if (!isLogin) {
      return;
    }
    if(blog.authorEmail){

      let updatedData = await fetch("/api/unfollow", {
        method: "POST",
        body: JSON.stringify({
          user_id: finalUser.email,
          other_user_id: blog.authorEmail
        }),
      });
      updatedData = await updatedData.json();
      let d=await JSON.stringify(updatedData.user1)
      localStorage.setItem('finalUser',d)
      setFinalUser(updatedData.user1)
        setIsFollowed(false)
  
      
    }
  }
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
          setComments(data.comments || []);
          updateTotalReactionCount(data.reactionList);
         let count=0
          data.reactionList.map((data1)=>{
            if(data1.type=="save"){
              count+=1
            }
          })
          setCommentCount(count)
        } else {
          setError("Failed to fetch blog.");
        }
      } catch (error) {
        setError("An error occurred while fetching the blog.");
      }
    };

    fetchBlog();
  }, [id]);

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
        user: {
          name: finalUser.name || "Unknown",
          image:
            finalUser.image1 ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
        },
        comment: newComment,
      };

      const updatedComments = [...comments, newCommentObject];
      setComments(updatedComments);
      setNewComment("");

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
  useEffect(()=>{
    console.log(finalUser)
  },[finalUser])
    async function handleClick(key){
      if (!isLogin) {
        setIsPopup(true);
        setMsg("Please Login ");
        return;
      }
      if(key=='2'){
     let data= await fetch('/api/setreaction',{
        method:"POST",
        body:JSON.stringify({
          user_id:finalUser._id,
          blog_id:id,
          reaction:'2'
        }) 
      })
      data=await data.json()
      let d=await JSON.stringify(data.user)
      localStorage.setItem('finalUser',d)
      setFinalUser(data.user)
    }
    }
  const handleReactionClick = async (reactionType) => {
    if (!isLogin) {
      setIsPopup(true);
      setMsg("Please Login to React");
      return;
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reactionType }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog(updatedBlog);
        updateTotalReactionCount(updatedBlog.reactionList);
      } else {
        setError("Failed to update reactions.");
      }
    } catch (error) {
      setError("An error occurred while updating reactions.");
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

  const handleMouseLeavePanel = (e) => {
    if (!iconRef.current.contains(e.relatedTarget)) {
      timerRef.current = setTimeout(() => setHovered(false), 1000);
    }
  };

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
  function handleOpenProfile(){
    if(blog._id){

      router.push(`/profile?id=${blog.id}`)
    }
  }
  return (
    <div
      className={`${
        theme ? "bg-[#F3F4F6]" : " bg-[#1e1d1d]"
      } transition-colors duration-500 pt-48 flex`}
    >
      <div className="w-[10%]">
        <div className="fixed left-24 top-60">
          <div className="relative flex flex-col items-center space-y-4">
            <div className="space-y-4">
              {
               panelIcons.slice(0, 3).map((panelIcon, index) => (
                <div
                  key={index}
                  onClick={()=>handleClick(index)} 
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
                  <FontAwesomeIcon
                    icon={panelIcon.regularIcon}
                    className={`${theme? `${isLogin&& index == 2 && id in JSON.parse( localStorage.getItem('finalUser')).reactions ? "text-blue-500  h-[30px]" : ""} `:" text-white "} \
        text-[20px]
      `}
                  />
                  <span
                    className={`${
                      theme ? "text-gray-900 " : " text-white "
                    } my-2 text-sm`}
                  >
                    {  index==2?commentCount: panelIcon.count}
                  </span>
                </div>
              ))}
            </div>
            {hovered && (
              <div
                className="absolute top-0 left-full flex bg-white shadow-lg rounded-lg p-4"
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
                    <img src="/icon1.png" width={100} height={100} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleReactionClick("Icon2")}
                  >
                    <img src="/icon2.png" width={100} height={100} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleReactionClick("Icon3")}
                  >
                    <img src="/icon3.png" width={100} height={100} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          theme ? "bg-white text-black " : " bg-[#0f0e0e] text-white "
        } transition-colors duration-500 w-[55%] shadow-lg rounded-lg`}
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover mb-5 rounded-lg"
        />
        <div className="px-10">
          <div className="flex items-center mb-5 cursor-pointer" onClick={handleOpenProfile}>
            <img
              src={blog.authorImage}
              alt={blog.authorName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="text-base font-bold">{blog.authorName}</div>
              <div className="text-gray-500 text-xs">
                Posted on{" "}
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-5 py-2 mb-5">
            <div className="flex cursor-pointer">
              <img src="/icon1.png" width={25} height={25} />
              <span>
                {blog.reactionList?.find(
                  (reaction) => reaction.type === "Icon1"
                )?.count || 0}
              </span>
            </div>
            <div className="flex cursor-pointer">
              <img src="/icon2.png" width={25} height={25} />
              <span>
                {blog.reactionList?.find(
                  (reaction) => reaction.type === "Icon2"
                )?.count || 0}
              </span>
            </div>
            <div className="flex cursor-pointer">
              <img src="/icon3.png" width={25} height={25} />
              <span>
                {blog.reactionList?.find(
                  (reaction) => reaction.type === "Icon3"
                )?.count || 0}
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-normal mb-5" dangerouslySetInnerHTML={{ __html: blog.title}}></h1>
          <div className="text-gray-600 mb-5">{blog.introduction}</div>
          <div className="mb-5">
            {blog.sections?.map((section, index) => (
              <div key={index} className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">
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
          <div className="pb-10" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
          <hr className="w-full h-1 pb-5" />
          <div className="text-2xl font-bold pb-5">Top Comments</div>
          <div className="flex items-center justify-center mb-4">
            <img
              src={
                finalUser.image1?.length > 0
                  ? finalUser.image1
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              }
              alt={blog.authorName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <input
              type="text"
              className="w-full p-4 border-[1px] border-gray-300 rounded-lg"
              placeholder="Add to the Discussion"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddComment();
              }}

            />
            <FaPaperPlane onClick={handleAddComment} className="relative right-[50px] cursor-pointer z-50" color="blue" size={'2rem'}/>
          </div>
          <div className="border-gray-300 rounded-xl mb-10 w-full h-[500px] p-5 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="bg-white text-black flex gap-4 p-4 mb-4 rounded-lg shadow"
                >
                  <img
                    src={comment.user.image}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-sm mb-1">
                      {comment.user.name}
                    </div>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-[25%] ml-5">
        <div
          className={`${
            theme ? "bg-white" : " bg-[#e2e2e2]"
          } h-[400px] rounded-xl overflow-hidden`}
        >
          {/* <img src="/banner.png" alt="" /> */}
          <div className="w-full bg-[#000000] h-10" ></div>
          <div className="flex px-5 cursor-pointer" onClick={handleOpenProfile}>
            <img
              src={blog.authorImage}
              alt={blog.authorName}
              className="w-12 h-12 rounded-full mr-3 relative -top-3"
            />
            <div className="py-1">
              <div className="text-xl font-bold">{blog.authorName}</div>
            </div>
          </div>
          <div className="w-full px-4">
        
         {

    isFollowed?<button onClick={handleUnfollow} className="py-2 px-5 w-full bg-[#5271ff] rounded-xl text-bold text-white">
    UnFollow
</button>:        <button onClick={handleFollow} className="py-2 px-5 w-full bg-[#5271ff] rounded-xl text-bold text-white">
                Follow
            </button>
         }
          </div>
          <div
            className={`${
              theme ? "bg-gray-100" : " bg-[#9d9d9d]"
            } flex flex-col items-center m-5 p-5 h-52 `}
          >
            <div className="text-lg font-bold mb-2">{blog.authorTitle}</div>
            <div className="text-lg text-center">{blog.authorCaption}</div>
            <div className="flex gap-5 mt-5 text-2xl">
              <a href={`${blog.github}`}>
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href={`${blog.linkedin}`}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`${
            theme ? "bg-white text-black " : " bg-[#0f0e0e] text-white "
          } my-5 rounded-xl p-5`}
        >
          <div className="text-xl font-bold flex">
            More From{" "}
            <span className="text-blue-500 ml-1" >{blog.authorName}</span>
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
                    dangerouslySetInnerHTML={{ __html: otherBlog.title}}    >
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;