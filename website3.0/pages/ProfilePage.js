"use client";
import React from "react";
import "@stylesheets/profilepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FaPlusCircle } from "react-icons/fa";

const ProfilePage = () => {
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
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt="Profile Picture"
            className="profile-img"
          />
       
        </div>
        <div className="profile-details">
        <p className="mail">mail: nishantkaushal0708@gmail.com</p>
          <h1 className="username">Nishant Kaushal</h1>
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
      </div>
    </div>
  );
};

export default ProfilePage;
