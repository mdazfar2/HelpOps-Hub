'use client'
import React, { useContext } from 'react'
import "@stylesheets/profilepage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Context } from '@context/store';
export default function ProfilepageDetails() {
    let {userName,userEmail,userImage}=useContext(Context)
  return (
   <>
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
   </>
  )
}
