import React, { useContext, useEffect, useState } from "react";
import styles from '@stylesheets/followers.css'
import { Context } from "@context/store";

export default function Followers({ onClose, id }) {
  const {
    finalUser,
    setFinalUser,
    theme,
  } = useContext(Context);

  useEffect(()=>{
    console.log(finalUser)
  },[])
  let [firstShow, setFirstShow] = useState(true);
  let [firstAnimate, setFirstAnimate] = useState(true);
  let [userDetails, setUserDetails] = useState({});

  function forOne() {
    setFirstShow(true);
    setFirstAnimate(true);
  }

  function forTwo() {
    setFirstShow(false);
    setFirstAnimate(false);
  }

  async function fetchData1() {
    let response = await fetch('/api/getuser', {
      method: "POST",
      body: JSON.stringify({
        id: id || finalUser._id
      })
    });
    let data = await response.json();
    setUserDetails(data.msg);
  }

  useEffect(() => {
    fetchData1();
  }, [id]);

  async function handleFollow(userId) {
    let updatedData = await fetch("/api/setfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        other_user_id: finalUser.email,
      }),
    });
    updatedData = await updatedData.json();

    setFinalUser(updatedData.user1);
    localStorage.setItem('finalUser', JSON.stringify(updatedData.user1));
  }

  async function handleUnFollow(userId) {
    let updatedData = await fetch("/api/unfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        other_user_id: finalUser.email,
      }),
    });
    updatedData = await updatedData.json();
    setFinalUser(updatedData.user1);
    localStorage.setItem('finalUser', JSON.stringify(updatedData.user1));
  }

  return (
    <>
      <div className="auth-overlay">
        <div className="auth-modal flex justify-center">
          <div className={`w-[500px] overflow-hidden max-sm:w-[95vw] z-[1000000] ${theme ? "bg-slate-100 border-black " : "bg-[#121111] border-white"} border-dashed opacityanimator h-[50vh] fixed m-auto top-[20%] border rounded-xl`}>
            <div className="flex min-h-[7vh] h-auto w-[100%] justify-center items-center">
              <div
                onClick={forOne}
                className={`${theme ? "text-black" : "text-white"} h-[7vh] w-[50%] relative cursor-pointer flex justify-center border-r-[1px] items-center border-b-2 border-gray-400 `}
              >
                {firstAnimate && <span className={`absolute bottom-[-1px] left-0 animate-first h-[2px] bg-black ${theme ? "text-black" : "text-white"}`}></span>}
                Followers
              </div>
              <div
                onClick={forTwo}
                className={`${theme ? "text-black" : "text-white"} w-[50%] relative cursor-pointer flex justify-center h-[7vh] items-center border-b-2 border-gray-500`}
              >
                {!firstAnimate && <span className="absolute bottom-[-1px] left-0 animate-first h-[2px] bg-black"></span>}
                Following
              </div>
            </div>
            <div className="w-[100%] h-[42vh] overflow-hidden overflow-x-hidden">
              <div className={`${firstShow ? "coming " : "coming2"} overflow-y-scroll h-[42vh] w-[100%]`}>
                {userDetails.followers && Object.entries(userDetails.followers).map(([userId, [userImg, userName]]) =>{ 
                  if(userId!==finalUser._id){

               return   <div id={userId} className="w-[100%] mt-[20px] h-[60px] font-cursive items-center flex justify-between pl-[10px] pr-[10px] overflow-hidden">
                    <img height='60px' width='60px' className="rounded-full" src={userImg}></img>
                    <h1 className={`text-wrap text-center ${theme ? "text-black" : "text-white"}`}>{userName}</h1>
                    {(userId in finalUser.following) ? 
                      <button className="boton-elegante" onClick={() => handleUnFollow(userId)}>UnFollow</button> : 
                      <button className="boton-elegante" onClick={() => handleFollow(userId)}>Follow</button>}
                  </div>
                  }
})}
              </div>

              <div className={`${firstShow ? "coming3" : "coming1"} h-[42vh] overflow-y-scroll w-[100%] div-animate`}>
                {userDetails.following && Object.entries(userDetails.following).map(([userId, [userImg, userName]]) => (
                  userId !== finalUser._id &&
                  <div key={userId} className="w-[100%] h-[60px] font-cursive items-center flex justify-between pl-[10px] pr-[10px] overflow-hidden">
                    <img height='60px' width='60px' className="rounded-full" src={userImg}></img>
                    <h1 className={`text-wrap text-center ${theme ? "text-black" : "text-white"}`}>{userName}</h1>
                    {(userId in finalUser.following) ? 
                      <button className="boton-elegante" onClick={() => handleUnFollow(userId)}>UnFollow</button> : 
                      <button className="boton-elegante" onClick={() => handleFollow(userId)}>Follow</button>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-0 left-0 h-[100vh] w-[100vw] opacity-35 bg-black" onClick={onClose}></div>
      </div>
    </>
  );
}
