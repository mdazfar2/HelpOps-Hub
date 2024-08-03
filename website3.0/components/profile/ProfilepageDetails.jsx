"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import "@stylesheets/profilepage.css";
import { FaShareFromSquare } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Context } from "@context/store";
import EditProfileModal from "./EditProfileModal";
import { useSession } from "next-auth/react";
import FollowersTab from "./FollowersTab";
import Image from 'next/image';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const TabHeader = ({ selectedTab, setSelectedTab, theme }) => (
  <div className={`flex border-b ${theme ? "text-black" : "text-white"}`}>
    <button
      className={`px-4 py-2 ${
        selectedTab === "Posts"
          ? "text-[#6089a4] border-[#6089a4] border-b-2"
          : ""
      }`}
      onClick={() => setSelectedTab("Posts")}
    >
      Posts
    </button>
    <button
      className={`px-4 py-2 ${
        selectedTab === "About Me"
          ? "text-[#6089a4] border-[#6089a4] border-b-2"
          : ""
      }`}
      onClick={() => setSelectedTab("About Me")}
    >
      About Me
    </button>
  </div>
);

const TabContent = ({
  selectedTab,
  isViewProfile,
  viewUserDetails,
  finalUser,
  theme,
  blogs,
}) => {
  let [loading,setLoading]=useState(true)
  useEffect(()=>{
    if(blogs.length>0){
      setLoading(false)
    }
  },[blogs])
  return (
    <div className="p-4">
      {selectedTab === "Posts" && (
        <div className={`${theme ? "text-black" : "text-white"}`}>
      {loading?  
      <div  className="flex mt-5 gap-5 items-center">
        <Skeleton  height={100} width={100}  />
        <div className="flex flex-col gap-1"
                    
                  >        <Skeleton  height={10} width={200}  />
                    <Skeleton  height={10} width={250}  />
                    <Skeleton  height={10} width={300}  />
                    <Skeleton  height={10} width={350}  />
                    <Skeleton  height={10} width={400}  />
</div>
                </div>:   
                 blogs && blogs.length > 0 ? (
            blogs
              .filter(
                (blog) =>
                  blog.authorId ===
                  (isViewProfile ? viewUserDetails._id : finalUser._id)
              )
              .map((blog) => (
                <div key={blog.id} className="flex mt-5 gap-5 items-center">
  <Image
        src={blog.image}  // The path to your image
        alt="blog"        // Alt text for accessibility
        width={150}       // Width of the image
        height={150}      // Height of the image
        className="rounded-xl" // Optional: Apply additional styles
        draggable="false" // Prevents image dragging
      />                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.title,
                    }}
                  ></div>
                </div>
              ))
          ) : (
            <div className="flex mt-5 gap-5 items-center">
              <div>
                <h2>No Blogs Available</h2>
              </div>
            </div>
      )}
        </div>
      )}

      {selectedTab === "About Me" && (
        <div className={`${theme ? "bg-white" : "bg-[#1e1d1d]"}`}>
          <p
            className={`text-lg font-light ${
              theme ? "text-[#000000]" : "text-white"
            }`}
          >
            {isViewProfile ? viewUserDetails.caption : finalUser.caption}
          </p>
        </div>
      )}
    </div>
  );
};
export default function ProfilepageDetails({ isViewProfile, id }) {
  // Extract user data from context
  const {
    userName,
    finalUser,
    userEmail,
    userDesignation,
    userCaption,
    github,
    linkedin,
    setFinalUser,
    theme,
    isLogin,
  } = useContext(Context);
  let [isShare, setIsShare] = useState(false);
  const password = useRef();
  const [isModalFollow, setIsModalFollow] = useState(false);
  const [viewUserDetails, setViewUserDetails] = useState({});
  let [isFollowed, setIsFollowed] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [selectedTab, setSelectedTab] = useState("Posts");
  let [loading,setLoading]=useState(true)
  const [FollowTab,setFollowTab] = useState(false);
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
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
          fetchAuthorDetails(sortedBlogs);
        } else {
          setError("Failed to fetch blogs.");
        }
     setLoading(false) } catch (err) {
      setLoading(false)   
      setError("An error occurred while fetching blogs.");

      }
    };
    setTimeout(() => {
      fetchBlogs();
    }, 2000);
  }, [sortBy]);

  useEffect(() => {
    if (isViewProfile) {
      fetchUserData(isLogin);
    }
  }, [isViewProfile, isLogin]);
  async function fetchUserData(isLogin1) {
    let data = await fetch("/api/getuser", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        username:id
      }),
    });
    data = await data.json();
    if (data.success) {
      console.log(data.msg,finalUser,'user')
      setViewUserDetails(data.msg);
      if (isLogin1) {
        if (data.msg.followers.hasOwnProperty(finalUser._id)) {
          setIsFollowed(true);
        }
      }
    }
    setLoading(false)
  }
  // State to control the visibility of the edit profile modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function handleUnfollow() {
    if (!isLogin) {
      return;
    }
    let updatedData = await fetch("/api/unfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: id,
        other_user_id: finalUser.email,
      }),
    });
    updatedData = await updatedData.json();
    let d = await JSON.stringify(updatedData.user1);
    localStorage.setItem("finalUser", d);
    setFinalUser(updatedData.user1);

    setViewUserDetails(updatedData.user);
    setIsFollowed(false);
  }
  async function handleFollow() {
    if (!isLogin) {
      return;
    }
    let updatedData = await fetch("/api/setfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: id,
        other_user_id: finalUser.email,
      }),
    });
    updatedData = await updatedData.json();
    setViewUserDetails(updatedData.user);
    let d = await JSON.stringify(updatedData.user1);
    localStorage.setItem("finalUser", d);
    setFinalUser(updatedData.user1);
    if (updatedData.user.followers.hasOwnProperty(finalUser._id)) {
      setIsFollowed(true);
    }
  }
  // Function to handle saving changes from the modal
  const handleSaveChanges = (updatedData) => {
  
  };
  let userIma =
    finalUser.image1?.length > 0
      ? finalUser.image1
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s";
  // Prepare user data for the modal
  const userData = {
    userName,
    userEmail,
    userImage: userIma,
    userDesignation,
    userCaption,
    github,
    linkedin,
  };
  let session = useSession();

  const renderBlogDescription = (description) => {
    if (typeof description !== "string") {
      return null;
    }
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
  function handleClose() {
    setIsModalFollow(false);
  }
  function handleFollowersModalOpen() {
    setIsModalFollow(true);
  }

  function handleIsSHare() {
    setIsShare(true);
  }
  function handleIsSHareclose() {
    setIsShare(false);
  }
  function handlefollowTab(){
    setFollowTab(true);
  }
  return (
    <div className="relative overflow-hidden w-full h-full bg-gray-200">
      <div className="absolute left-4 top-4">
        <FaShareFromSquare
          color="#1e1d1d"
          className="cursor-pointer"
          onClick={handleIsSHare}
          size={20}
        />
      </div>
      <div
        className={`w-full ${theme ? "bg-white" : "bg-[#1e1d1d]  text-white "}`}
      >
        {/* Edit Profile button */}
        {!isViewProfile && (
          <div
            className="absolute top-[20px] gap-1 right-[20px] flex items-center font-bold text-xs transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleOpenModal}
          >
            <span className={`${theme ? "text-[#000000]" : "text-white"}`}>
              <FontAwesomeIcon icon={faPen} />
            </span>
            <p className={`${theme ? "text-[#000000]" : "text-white"}`}>
              Edit Profile
            </p>
          </div>
        )}

        <div className="w-full h-72 overflow-hidden">
          <img
            src={isViewProfile?viewUserDetails.banner:finalUser.banner}
            alt="banner"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="mx-10 flex my-4 max-sm:flex-col max-sm:relative max-sm:-top-20 gap-5 justify-between max-sm:h-[300px]">
          <div className="flex max-sm:flex-col max-sm:items-center gap-5">
          {loading?<Skeleton height={100} width={100} borderRadius={100}/>:   <img
              src={
                isViewProfile
                  ? viewUserDetails.image1
                  : finalUser.image1?.length > 0
                  ? finalUser.image1
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              }
              alt="Profile Picture"
              className="w-36 h-36 relative -top-20 max-sm:top-0 rounded-full object-cover overflow-hidden"
            />}
            <div>
              <h1 className={`text-2xl font-bold max-sm:text-center`}>
               {loading?<Skeleton height={10} width={200}/>: isViewProfile ? viewUserDetails.name : finalUser.name
  }  </h1>
              <p
                className={`mt-1 text-sm ${
                  theme ? "text-[#5a5151]" : "text-white"
                } max-sm:text-center`}
              >
                {isViewProfile
                  ? viewUserDetails.designation
                  : finalUser.designation}
              </p>
              {FollowTab && (
                    <FollowersTab setFollowTab={setFollowTab} FollowTab={FollowTab} id={id} />
                  )}
              <div className="flex gap-2 mt-2 items-center cursor-pointer" onClick={handlefollowTab}>
                <p
                  className={`text-center flex gap-2 items-center ${
                    theme ? "text-[#5a5151]" : "text-white"
                  }`}
                >
                  <span className="text-sm cursor-pointer" >
                    {isViewProfile
                      ? viewUserDetails.followers
                        ? Object.keys(viewUserDetails.followers).length
                        : 0
                      : finalUser.followers
                      ? Object.keys(finalUser.followers).length
                      : 0}
                  </span>
                  <span className="text-sm">Followers</span>
                </p>
                <span
                  className={`text-center items-center flex gap-2 ${
                    theme ? "text-[#5a5151]" : "text-white"
                  }`}
                >
                  
                  <span className="text-sm">
                    {isViewProfile
                      ? viewUserDetails.following
                        ? Object.keys(viewUserDetails.following).length
                        : 0
                      : finalUser.following
                      ? Object.keys(finalUser.following).length
                      : 0}
                  </span>
                  <p className="text-sm">Following </p>
                </span>
              </div>
              <div className="flex gap-5 text-left items-center max-sm:justify-center w-full mt-2">
                <div
                  className={`w-8 h-8 p-3 border-[1px] rounded-xl border-[rgb(211,211,211)] flex flex-col items-center justify-center text-base cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
                    theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
                  }`}
                  title={
                    isViewProfile ? viewUserDetails.email : finalUser.email
                  }
                >
                  <a
                    href={`mailto:${
                      isViewProfile ? viewUserDetails.email : finalUser.email
                    }`}
                    className="rounded-full bg-blue-600 text-white px-[5px] py-[1px]"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </div>
                <div
                  className={`w-8 h-8 p-3 border-[1px] rounded-xl border-[rgb(211,211,211)] flex flex-col items-center justify-center text-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
                    theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
                  }`}
                  title={
                    isViewProfile ? viewUserDetails.github : finalUser.github
                  }
                >
                  <a href={`${finalUser.github}`}>
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </div>
                <div
                  className={`w-8 h-8 p-3 border-[1px] rounded-xl border-[rgb(211,211,211)] flex flex-col items-center justify-center text-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
                    theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
                  }`}
                  title={
                    isViewProfile
                      ? viewUserDetails.linkedin
                      : finalUser.linkedin
                  }
                >
                  <a href={`${isViewProfile?viewUserDetails.linkedin:finalUser.linkedin}`}>
                    <FontAwesomeIcon icon={faLinkedinIn} color="#0072b1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {finalUser
            ? finalUser._id
              ? isViewProfile &&
                (isFollowed ? (
                  <button
                    onClick={handleUnfollow}
                    className={` w-28 h-12 p-2 ${
                      theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
                    }  border-none rounded-2xl cursor-pointer text-base ${
                      isModalFollow ? "hidden" : ""
                    }`}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className={` w-28 h-12 p-2 ${
                      theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
                    }  border-none rounded-2xl cursor-pointer text-base ${
                      isModalFollow ? "hidden" : ""
                    }`}
                  >
                    Follow
                  </button>
                ))
              : ""
            : ""}
        </div>
        <div
          className={`flex flex-col justify-center items-center   ${
            theme ? "" : "bg-[#1e1d1d] text-white"
          }`}
        >
          {/* Edit Profile Modal component */}

          {isModalOpen && (
            <EditProfileModal
              isOpen={true}
              finalUserData={{name:finalUser.name,designation:finalUser.designation,caption:finalUser.caption,linkedin:finalUser.linkedin,github:finalUser.github}}
              onRequestClose={handleCloseModal}
              userData={userData}
              onSave={handleSaveChanges}
              img={finalUser.image1}
              banner={finalUser.banner}
            />
          )}
          {isShare && (
            <div className="auth-overlay">
              <div
                className="auth-modal z-500"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`z-500 w-[500px] gap-6 rounded-lg p-6 border-2 flex flex-col items-center ${
                    theme
                      ? "border-black bg-slate-100 text-black"
                      : "border-white bg-[#1e1d1d] text-white"
                  }`}
                >
                  <h1 className="text-xl font-bold">User Profile Link</h1>
                  <input
                    className={`w-[90%] bg-transparent border-b-[1px] outline-none ${
                      theme
                        ? "border-b-black text-black"
                        : "border-b-white text-white"
                    }`}
                    ref={password}
                    value={`https://www.helpopshub.com/profile?id=${
                      isViewProfile ? id : finalUser._id
                    }`}
                    readOnly
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(password.current.value);
                    }}
                    className={` w-28 h-12 p-2 ${
                      theme ? "bg-[#6089a4] text-white" : "bg-white text-black"
                    }  border-none rounded-2xl cursor-pointer text-base`}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
              <div
                onClick={handleIsSHareclose}
                className="fixed z-0 top-0 left-0 h-[100vh] w-[100vw] opacity-35 bg-black"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex max-[900px]:flex-col gap-6">
        <div className="w-[30%] max-[900px]:w-full py-5">
          <div
            className={`min-h-96 p-4 mt-2 rounded-lg ${
              theme ? "bg-white text-black" : "bg-[#1e1d1d] text-white"
            }`}
          >
            <div className="text-lg font-medium">Blog Highlights</div>
            <div className="mt-4 min-h-52 flex items-center">
              <img
                src={
                  blogs.length == 0
                    ? "https://i0.wp.com/motiongraphicsphoebe.wordpress.com/wp-content/uploads/2018/10/8ee212dac057d412972e0c8cc164deee.gif?w=2500&h=&ssl=1"
                    : blogs[0].image
                }
                alt="Blog"
                className={`rounded-xl ${
                  blogs.length == 0 ? "border-2 border-gray-100" : ""
                }`}
              />
            </div>
            <div
              className={`mt-4 w-full min-h-6 font font-medium ${
                blogs.length == 0 ? "border-2 border-gray-100 rounded-xl" : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: blogs.length == 0 ? "" : blogs[0].title,
              }}
            ></div>
            <div className="mt-2 text-sm">
              {blogs.length == 0
                ? ""
                : renderBlogDescription(blogs[0].description)}
            </div>
          </div>
        </div>
        <div className="w-[70%] max-[900px]:w-full py-5">
          <div
            className={`min-h-96 p-4 mt-2 rounded-lg ${
              theme ? "bg-white" : "bg-[#1e1d1d]"
            }`}
          >
            <TabHeader
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              theme={theme}
            />
            <TabContent
              selectedTab={selectedTab}
              theme={theme}
              isViewProfile={isViewProfile}
              viewUserDetails={viewUserDetails}
              finalUser={finalUser}
              blogs={blogs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
