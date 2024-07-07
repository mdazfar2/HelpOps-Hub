'use client'
import React, { useContext, useState } from 'react'
import "@stylesheets/profilepage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Context } from '@context/store';
import EditProfileModal from './EditProfileModal';
export default function ProfilepageDetails() {
   // Extract user data from context
  const { userName, userEmail, userImage, designation, caption, github, linkedin ,theme} = useContext(Context);

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
    // Function to handle saving changes from the modal
    const handleSaveChanges = (updatedData) => {
      // Update the user data logic here
      console.log(updatedData);
    };

    // Prepare user data for the modal
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
   <div className={`${theme?"":"bg-[#1e1d1d]  text-white " }`}>
    {/* Edit Profile button */}
   <div className="edit-profile" onClick={handleOpenModal}>
          <span className="pen-icon">
            <FontAwesomeIcon icon={faPen} />
          </span>
          <p className={`${theme?"text-[#1d1dc9]":"text-white"}`}>Edit Profile</p>
        </div>
        {/* Profile picture section */}
        <div className="image-container">
          <img
            src={userImage.length>0?userImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s'}
            alt="Profile Picture"
            className="profile-img"
          />
       
        </div>
         {/* Profile details section */}
        <div className={` profile-details ${theme?"":"bg-[#1e1d1d] text-white"}`}>
        <p className="mail">mail: {userEmail}</p>
          <h1 className={`text-2xl ${theme?"text-black":"text-white"} font-semibold mt-1`}>{userName}</h1>
          <p className={` user-designation ${theme?"text-[#5a5151]":"text-white"}`}>Software Engineer</p>
          
          <p className={` user-caption ${theme?"text-[#5a5151]":"text-white"}`}>
            Creating visually appealing and highly functional software that bridges technology and user needs.
          </p>
           {/* Social media icons */}
          <div className="social-icons">
            <div className={`social-icon-box ${theme?"hover:text-[#1a1a1a]":"hover:text-[#635e5e]"}`} title="nishantkaushal0708@gmail.com">
              <p>
                <FontAwesomeIcon icon={faEnvelope} />
              </p>
         
            </div>
            <div className={`social-icon-box ${theme?"hover:text-[#1a1a1a]":"hover:text-[#635e5e]"}`} title="nishantkaushal0708@gmail.com">
              <p>
                <FontAwesomeIcon icon={faGithub} />
              </p>
           
            </div>
            <div className={`social-icon-box ${theme?"hover:text-[#1a1a1a]":"hover:text-[#635e5e]"}`}  title="nishantkaushal0708@gmail.com">
              <p>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </p>
              
            </div>
          </div>
           {/* Edit Profile Modal component */}
          <EditProfileModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        userData={userData}
        onSave={handleSaveChanges}
      />
        </div>
   </div>
  )
}