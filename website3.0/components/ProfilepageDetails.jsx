"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "@stylesheets/profilepage.css";
import { FaUsers,FaShare, FaUserCheck, FaTrashCan , FaShareFromSquare } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Context } from "@context/store";
import EditProfileModal from "./EditProfileModal";
import { useRouter } from "next/navigation";
import { useSession} from "next-auth/react";
import Followers from "./Followers";
export default function ProfilepageDetails({ isViewProfile, id }) {
  // Extract user data from context
  const {
    userName,
    finalUser,
    userEmail,
    setIsAdminShow,
    userGithub,
    userImage,
    userDesignation,
    userCaption,
    github,
    linkedin,
    setFinalUser,
    setIsLogin,
    theme,
    isLogin,
  } = useContext(Context);
  const [isPassword, setIsPassword] = useState(false);
  let [isShare,setIsShare]=useState(false)
  let password = useRef();
  const [isModalFollow, setIsModalFollow] = useState(false);
  let router = useRouter();
  const [viewUserDetails, setViewUserDetails] = useState({});
  let [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    console.log("sdddddddddddddddddddddddd", viewUserDetails, isViewProfile);
    console.log(finalUser);
    if (isViewProfile) {
      fetchUserData(isLogin);
    }
  }, [isViewProfile, isLogin]);
  async function fetchUserData(isLogin1) {
    console.log("fetchuing rhe dppadisdsd", id);
    let data = await fetch("/api/getuser", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    data = await data.json();
    console.log(data);
    if (data.success) {
      setViewUserDetails(data.msg);
      if (isLogin1) {
        if (data.msg.followers.hasOwnProperty(finalUser._id)) {
          setIsFollowed(true);
        }
      }
    }
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
    let d=await JSON.stringify(updatedData.user1)
    localStorage.setItem('finalUser',d)
    setFinalUser(updatedData.user1)


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
    console.log("sdddddddddddddd", updatedData);
    setViewUserDetails(updatedData.user);
    let d=await JSON.stringify(updatedData.user1)
    localStorage.setItem('finalUser',d)
    setFinalUser(updatedData.user1)
    if (updatedData.user.followers.hasOwnProperty(finalUser._id)) {
      setIsFollowed(true);
    }
  }
  // Function to handle saving changes from the modal
  const handleSaveChanges = (updatedData) => {
    // Update the user data logic here
    console.log(updatedData);
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

  async function handle() {
    setIsPassword(true);
  }
  async function handleDeleteAccount() {
    let ans = true;
    if (finalUser.password.length > 0) {
      let a = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: finalUser.email,
          password: password.current.value,
        }),
      });
      a = await a.json();
      if (!a.success) {
        ans = false;
      }
    }
    if (ans) {
      await fetch("/api/deleteaccount", {
        method: "POST",
        body: JSON.stringify({
          email: finalUser.email,
        }),
      });
      setIsAdminShow(false);
      localStorage.removeItem("loggedin");
      localStorage.removeItem("finalUser");
      setFinalUser({});
      setIsLogin(false);
      if (session.status == "authenticated") {
        router.push("https://www.helpopshub.com/api/auth/signout?csrf=true");
      } else {
        router.push("https://www.helpopshub.com/");
      }
    }
  }
  function handleClose() {
    setIsModalFollow(false);
  }
  function handleFollowersModalOpen() {
    setIsModalFollow(true);
  }
  function passwordClose() {
    setIsPassword(false);
  }
  function handleIsSHare(){
    setIsShare(true)
  }
  function handleIsSHareclose(){
    setIsShare(false)
  }
  return (
    <>
      {isModalFollow && <Followers onClose={handleClose} id={id} />}
      {isViewProfile &&
        (isFollowed ? (
          <button
            onClick={handleUnfollow}
            className={` z-0 absolute pl-2 pr-2 pt-2 pb-2 border rounded-md text-white flex justify-center items-center font-[20px] bg-[#3d44be] top-[10px] right-10 ${
              isModalFollow ? "hidden" : ""
            }`}
          >
            UNFOLLOW
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className={`z-0 absolute pl-6 pr-6 pt-2 pb-2 border rounded-md text-white flex justify-center items-center font-[20px] bg-[#3d44be] top-[10px] right-10 ${
              isModalFollow ? "hidden" : ""
            }`}
          >
            Follow
          </button>
        ))}
      {!isViewProfile && (
        <div className="absolute left-[10px] top-[10px]">
          <FaTrashCan
            color="#c40000"
            className="cursor-pointer"
            onClick={handle}
            size={"2rem"}
          />
        </div>
      )}
      <div className={`absolute  ${isViewProfile?"left-[20px]":"left-[70px]"} top-[10px]`}>
          <FaShareFromSquare
            color="blue"
          
            className="cursor-pointer"
            onClick={handleIsSHare}
            size={"2rem"}
          />
        </div>
      <div className={`${theme ? "" : "bg-[#1e1d1d]  text-white "}`}>
        {/* Edit Profile button */}
        {!isViewProfile && (
          <div
            className="absolute top-[20px] right-[20px] flex items-center gap-[5px] font-bold text-[13px] md:text-[20px] text-[rgb(29,29,201)] transition-all duration-300 ease-in-out cursor-pointer hover:text-[rgb(36,36,160)] hover:underline"
            onClick={handleOpenModal}
          >
            <span
              className={`text-[10px] md:text-[14px] ${
                theme ? "text-[#1d1dc9]" : "text-white"
              }`}
            >
              <FontAwesomeIcon icon={faPen} />
            </span>
            <p className={`${theme ? "text-[#1d1dc9]" : "text-white"}`}>
              Edit Profile
            </p>
          </div>
        )}

        {/* Profile picture section */}
        <div className="flex justify-center items-center mt-[-140px] md:mt-[-180px]">
          <img
            src={
              isViewProfile
                ? viewUserDetails.image1
                : finalUser.image1?.length > 0
                ? finalUser.image1
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
            }
            alt="Profile Picture"
            className="border-[15px] border-[rgb(162,160,160)] w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full object-cover overflow-hidden"
          />
        </div>
        {/* Profile details section */}
        <div
          className={`flex flex-col justify-center items-center   ${
            theme ? "" : "bg-[#1e1d1d] text-white"
          }`}
        >
          <p className="mt-[20px] text-[10px] md:text-[12px]">
            mail:{isViewProfile ? viewUserDetails.email : `${finalUser.email}`}
          </p>
          <h1 className={`mt-[5px] text-[24px] md:text-[32px] font-bold `}>
            {isViewProfile ? viewUserDetails.name : finalUser.name}
          </h1>
          <p
            className={`mt-[5px] text-[18px] font-bold ${
              theme ? "text-[#5a5151]" : "text-white"
            }`}
          >
            {isViewProfile
              ? viewUserDetails.designation
              : finalUser.designation}
          </p>

          <p
            className={`mt-[10px] w-[200px] text-[14px] font-medium  text-center ${
              theme ? "text-[#5a5151]" : "text-white"
            }`}
          >
            {isViewProfile ? viewUserDetails.caption : finalUser.caption}
          </p>
          <div className="w-[120%] flex flex-row max-sm:flex-col gap-6 justify-center items-center">
            <p
              className={`w-[200px] mt-[10px] text-[14px] font-medium  text-center flex gap-6 items-center ${
                theme ? "text-[#5a5151]" : "text-white"
              }`}
            >
              <FaUsers size={"2rem"} onClick={handleFollowersModalOpen} className="cursor-pointer" />
              <span className="font-cursive text-xl">Followers :</span>{" "}
              <span className="text-2xl">
                {" "}
                {isViewProfile
                  ? viewUserDetails.followers
                    ? Object.keys(viewUserDetails.followers).length
                    : 0
                  : finalUser.followers
                  ? Object.keys(finalUser.followers).length
                  : 0}
              </span>
            </p>
            <span
              className={`mt-[10px] text-[14px] font-medium  text-center items-center flex gap-6 ${
                theme ? "text-[#5a5151]" : "text-white"
              }`}
            >
              <FaUserCheck size={"2rem"} onClick={handleFollowersModalOpen} className="cursor-pointer" />
              <p className="font-cursive text-xl">Following :</p>
              <span className="text-2xl">
                {" "}
                {isViewProfile
                  ? viewUserDetails.following
                    ? Object.keys(viewUserDetails.following).length
                    : 0
                  : finalUser.following
                  ? Object.keys(finalUser.following).length
                  : 0}
              </span>
            </span>
          </div>
          {/* Social media icons */}
          <div className="flex justify-around items-center w-full mt-[20px]">
          <div
           className={`w-full border-r-[1px] border-[rgb(94,94,94)] flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
               theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
             }`}
             title={isViewProfile ? viewUserDetails.email : finalUser.email}
          >
             <a href={`mailto:${isViewProfile ? viewUserDetails.email : finalUser.email}`}>
               <FontAwesomeIcon icon={faEnvelope} />
             </a>
          </div>
            <div
              className={`w-full border-r-[1px] border-[rgb(94,94,94)] flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
                theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
              }`}
              title="nishantkaushal0708@gmail.com"
            >
              <a href={`${finalUser.github}`}>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <div
              className={`w-full flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px] ${
                theme ? "hover:text-[#1a1a1a]" : "hover:text-[#635e5e]"
              }`}
              title="nishantkaushal0708@gmail.com"
            >
              <a href={`${finalUser.linkedin}`}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
          {/* Edit Profile Modal component */}

          {isModalOpen && (
            <EditProfileModal
              isOpen={true}
              onRequestClose={handleCloseModal}
              userData={userData}
              onSave={handleSaveChanges}
              img={finalUser.image1}
            />
          )}
          {isShare && (
            <div className="auth-overlay">
              <div
                className="auth-modal z-500"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`z-500 w-[500px] gap-6 border-dashed rounded-lg p-6 border-2 flex flex-col items-center ${
                  theme ? 'border-black bg-slate-100 text-black' : 'border-white bg-[#1e1d1d] text-white'
                }`}>
                  <h1 className="text-xl font-bold">User Profile Link</h1>
                  <input
                    className={`w-[90%] bg-transparent border-b-[1px] outline-none ${
                      theme ? 'border-b-black text-black' : 'border-b-white text-white'
                    }`}
                    ref={password}
                    value={`https://www.helpopshub.com/profile?id=${isViewProfile ? id : finalUser._id}`}
                    readOnly
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(password.current.value);
                    }}
                    className={`mt-2 px-4 py-2 rounded ${
                      theme
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-blue-700 text-white hover:bg-blue-800'
                    } transition duration-300 ease-in-out`}
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
          {isPassword && (
            <div className="auth-overlay">
              <div
                className="auth-modal z-500"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="z-500 w-[500px] gap-6 border-dashed border-black rounded-lg p-6 border-2 bg-slate-100 flex flex-col items-center ">
                  <h1>Please Enter Password</h1>
                  <input
                    className="w-[90%] bg-transparent border-b-black border-b-[1px]"
                    ref={password}
                  ></input>
                  <button onClick={handleDeleteAccount}>Submit</button>
                </div>
              </div>
              <div
                onClick={passwordClose}
                className="fixed  z-0 top-0 left-0 h-[100vh] w-[100vw] opacity-35 bg-black"
              ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
