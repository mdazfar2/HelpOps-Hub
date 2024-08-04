import React, { useContext, useEffect, useState } from "react";
import { Context } from "@context/store";

export default function FollowersTab({ setFollowTab, FollowTab, id }) {
 // Destructure necessary values from context
const { finalUser, setFinalUser, theme } = useContext(Context);

// State to manage the visibility of certain UI elements
const [firstShow, setFirstShow] = useState(true);

// State to store user details fetched from the server
const [userDetails, setUserDetails] = useState({});

// Fetch user data when the component mounts or `id` changes
useEffect(() => {
  fetchData();
}, [id]);

// Fetch user details from the server based on `id`
async function fetchData() {
  try {
    const response = await fetch('/api/getuser', {
      method: "POST",
      body: JSON.stringify({
        id: id || finalUser._id, // Use the provided `id` or fallback to `finalUser._id`
      }),
    });
    const data = await response.json();
    setUserDetails(data.msg);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Handle following a user
async function handleFollow(userId) {
  try {
    const updatedData = await fetch("/api/setfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        other_user_id: finalUser.email, // Use `finalUser.email` to identify the current user
      }),
    }).then(res => res.json());

    // Update context and local storage with the new user data
    setFinalUser(updatedData.user1);
    localStorage.setItem('finalUser', JSON.stringify(updatedData.user1));
  } catch (error) {
    console.error("Error following user:", error);
  }
}

// Handle unfollowing a user
async function handleUnFollow(userId) {
  try {
    const updatedData = await fetch("/api/unfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        other_user_id: finalUser.email, // Use `finalUser.email` to identify the current user
      }),
    }).then(res => res.json());

    // Update context and local storage with the new user data
    setFinalUser(updatedData.user1);
    localStorage.setItem('finalUser', JSON.stringify(updatedData.user1));
  } catch (error) {
    console.error("Error unfollowing user:", error);
  }
}

// Toggle the visibility of the follow tab
const handleClose = () => {
  setFollowTab(!FollowTab);
};
  return (
    <div className="auth-overlay">
      <div className="auth-modal flex justify-center">
        <div className={`w-[500px] overflow-hidden max-sm:w-[95vw] z-[1000000] ${theme ? "bg-slate-100 " : "bg-[#121111]"} opacityanimator h-[50vh] fixed m-auto top-[20%]  rounded-xl`}>
          <div className="flex min-h-[7vh] h-auto w-[100%] justify-center items-center">
            <div
              onClick={() => setFirstShow(true)}
              className={`h-[7vh] w-[50%] relative cursor-pointer flex justify-center border-r-[1px] items-center border-b-2 ${firstShow ? "bg-gray-300 border-gray-400" : "border-gray-400"} ${theme ? "text-black" : "text-white"}`}
            >
              {firstShow && <span className={`absolute bottom-[-1px] left-0 animate-first h-[2px] bg-black ${theme ? "text-black" : "text-white"}`}></span>}
              Followers
            </div>
            <div
              onClick={() => setFirstShow(false)}
              className={`w-[50%] relative cursor-pointer flex justify-center h-[7vh] items-center border-b-2 ${!firstShow ? "bg-gray-300 border-gray-500" : "border-gray-500"} ${theme ? "text-black" : "text-white"}`}
            >
              {!firstShow && <span className="absolute bottom-[-1px] left-0 animate-first h-[2px] bg-black"></span>}
              Following
            </div>
          </div>
          <div className="w-[100%] h-[42vh] overflow-hidden overflow-x-hidden">
            {firstShow ? (
              <div className="overflow-y-scroll h-[42vh] w-[100%]">
                {userDetails.followers && Object.entries(userDetails.followers).map(([userId, [userImg, userName]]) => (
                  userId !== finalUser._id && (
                    <div key={userId} className="w-[100%] mt-[20px] h-[60px] items-center flex justify-between pl-[10px] pr-[10px] overflow-hidden">
                      <img height='60px' width='60px' className="rounded-full" src={userImg} alt={userName} />
                      <h1 className={`text-wrap text-center ${theme ? "text-black" : "text-white"}`}>{userName}</h1>
                      {(userId in finalUser.following) ? (
                        <button className="boton-elegante" onClick={() => handleUnFollow(userId)}>UnFollow</button>
                      ) : (
                        <button className="boton-elegante" onClick={() => handleFollow(userId)}>Follow</button>
                      )}
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="overflow-y-scroll h-[42vh] w-[100%]">
                {userDetails.following && Object.entries(userDetails.following).map(([userId, [userImg, userName]]) => (
                  userId !== finalUser._id && (
                    <div key={userId} className="w-[100%] mt-[20px] h-[60px] items-center flex justify-between pl-[10px] pr-[10px] overflow-hidden">
                      <img height='60px' width='60px' className="rounded-full" src={userImg} alt={userName} />
                      <h1 className={`text-wrap text-center ${theme ? "text-black" : "text-white"}`}>{userName}</h1>
                      {(userId in finalUser.following) ? (
                        <button className="boton-elegante" onClick={() => handleUnFollow(userId)}>UnFollow</button>
                      ) : (
                        <button className="boton-elegante" onClick={() => handleFollow(userId)}>Follow</button>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] opacity-35 bg-black" onClick={handleClose}></div>
    </div>
  );
}
