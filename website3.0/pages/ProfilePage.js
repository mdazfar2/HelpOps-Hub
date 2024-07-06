"use client";
import React, { useContext, useState } from "react";
import "@stylesheets/profilepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import { Context } from "@context/store";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  let {userName,userImage,userEmail,setUserEmail,setUserImage,setUserName,setIsLogin}=useContext(Context)
  let session=useSession()
  let router=useRouter()

  async function handleLogout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userImage');
    setUserEmail('')
    setUserImage('')
    setUserName('')
    if(session.status=="authenticated"){
      router.push('https://www.helpopshub.com/api/auth/signout?csrf=true')
    }else{
    setIsLogin(false)
    }
    }
  return (
    <div className="main">
      <div className="profile-page">
        <div className="edit-profile">
          <span className="pen-icon">
            <FontAwesomeIcon icon={faPen} />
          </span>
          <p >Edit Profile</p>
        </div>
        <div className="image-container">
          <img
            src={userImage.length>0?userImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s'}
            alt="Profile Picture"
            className="profile-img"
          />
       
        </div>
        <div className="profile-details">
        <p className="mail">mail: {userEmail}</p>
          <h1 className="username">{userName}</h1>
          <p className="user-designation">Software Engineer</p>
          
          <p className="user-caption">
            Creating visually appealing and highly functional software that bridges technology and user needs.
          </p>
          <div className="social-icons">
            <div className="social-icon-box" title="nishantkaushal0708@gmail.com">
              <p>
                <FontAwesomeIcon icon={faEnvelope} />
              </p>
         
            </div>
            <div className="social-icon-box" title="nishantkaushal0708@gmail.com">
              <p>
                <FontAwesomeIcon icon={faGithub} />
              </p>
           
            </div>
            <div className="social-icon-box" title="nishantkaushal0708@gmail.com">
              <p>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </p>
              
            </div>
          </div>
        </div>
        <button className='w-[200px]  h-[52px] flex justify-center content-center items-center p-2 relative  bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer  m-auto gap-[18px] text-[19px] font-semibold '  onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
