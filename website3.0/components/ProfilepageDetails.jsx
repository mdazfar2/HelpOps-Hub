"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "./EditProfileModal";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Context } from "@context/store";

export default function ProfilepageDetails() {
  // Extract user data from context
  const {
    userName,
    userEmail,
    userImage,
    designation,
    caption,
    github,
    linkedin,
    theme,
  } = useContext(Context);
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
    userImage:
      userImage.length > 0
        ? userImage
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
    designation,
    caption,
    github,
    linkedin,
  };

  return (
    <div className={`${theme ? "" : "bg-[#1c1a1a] text-white"}`}>
      <div className="relative flex justify-center">
        <div
          
          className={`relative flex flex-col items-center w-1/2 min-w-[350px] pt-20 py-10 px-4 md:p-20 mt-[250px] rounded-[10px]  ${theme?"":"bg-[#1c1a1a] text-white"}  ${theme?"shadow-[5px_5px_15px_rgba(0,0,0,0.195)]":"shadow-md shadow-white"}`}
        >
          <div onClick={handleOpenModal} className="absolute top-[20px] right-[20px] flex items-center gap-[5px] font-bold text-[13px] md:text-[20px] text-[rgb(29,29,201)] transition-all duration-300 ease-in-out cursor-pointer hover:text-[rgb(36,36,160)] hover:underline">
            <span className={`text-[10px] md:text-[14px] ${theme?"text-[#1d1dc9]":"text-white"}`}>
              <FontAwesomeIcon icon={faPen} />
            </span>
            <p className={`${theme ? "text-[#1d1dc9]" : "text-white"}`}>
              Edit Profile
            </p>
          </div>
          <div className="flex justify-center items-center mt-[-140px] md:mt-[-180px]">
            <img
              src={
                userImage.length > 0
                  ? userImage
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              }
              alt="Profile Picture"
              className="border-[15px] border-[rgb(162,160,160)] w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full object-cover overflow-hidden"
            />
          </div>
          <div className={`flex flex-col justify-center items-center  ${theme?"":"bg-[#1c1a1a] text-white"}`}>
            <p className="mt-[20px] text-[10px] md:text-[12px]">
              mail:{userEmail}
            </p>
            <h1 className="mt-[5px] text-[24px] md:text-[32px] font-bold ">
              {userName}
            </h1>
            <p className="mt-[5px] text-[18px] font-bold ">
              {designation}
            </p>
            <p className="mt-[10px] text-[14px] font-medium  text-center">
              {caption}
            </p>
            <div className="flex justify-around items-center w-full mt-[20px]">
              <div className="w-full border-r-[1px] border-[rgb(94,94,94)] flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px]">
                <p title={`${userEmail}`}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </p>
              </div>
              <div className="w-full border-r-[1px] border-[rgb(94,94,94)] flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px]">
                <p title="">
                  <FontAwesomeIcon icon={faGithub} />
                </p>
              </div>
              <div className="w-full flex flex-col items-center justify-center text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-[#1a1a1a] hover:translate-y-[-5px]">
                <p title="">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </p>
              </div>
            </div>
          </div>
          
          <EditProfileModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        userData={userData}
        onSave={handleSaveChanges}
        theme
      />
        </div>
      </div>
    </div>
  );
}
