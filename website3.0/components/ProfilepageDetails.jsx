'use client'
import React, { useContext, useState } from 'react'
import "@stylesheets/profilepage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Context } from '@context/store';
import EditProfileModal from './EditProfileModal';
export default function ProfilepageDetails() {
  const { userName, userEmail, userImage, designation, caption, github, linkedin } = useContext(Context);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const handleSaveChanges = (updatedData) => {
      // Update the user data logic here
      console.log(updatedData);
    };
    const userData = {
      userName,
      userEmail,
      userImage: userImage.length > 0 ? userImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s',
      designation,
      caption,
      github,
      linkedin
    };
  return (
   <>
   <div className="edit-profile" onClick={handleOpenModal}>
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
        <p className="mail">mail: nishantkaushal0708@gmail.com</p>
          <h1 className="username">Nishant kaushal</h1>
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
          <EditProfileModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        userData={userData}
        onSave={handleSaveChanges}
      />
        </div>
   </>
  )
}