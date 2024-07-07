"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";

// The EditProfileModal component handles the editing of the user's profile information.
// It accepts the following props:
// - isOpen: Boolean to control the modal visibility
// - onRequestClose: Function to close the modal
// - userData: Object containing the user's current profile data
// - onSave: Function to save the updated profile data
export default function EditProfileModal({
  isOpen,
  onRequestClose,
  userData,
  onSave,
  theme,
}) {
  // Initialize the form state with userData and add a password field with an empty string
  const [formData, setFormData] = useState({ ...userData, password: "" });

  // Handle changes in form inputs and update the formData state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle the save changes button click, call onSave with formData and close the modal
  const handleSaveChanges = () => {
    onSave(formData);
    onRequestClose();
  };

  // Handle clicks outside the modal to close it
  const handleClickOutside = (e) => {
    if (e.target.className.includes("modal-overlay")) {
      onRequestClose();
    }
  };

  // Add event listener for clicks when the modal is open, and clean up when it closes
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // If the modal is not open, return null to render nothing
  if (!isOpen) {
    return null;
  }

  return (
    // Modal overlay to cover the entire screen
    <div className={`fixed inset-0 z-500 flex items-center justify-center  bg-black bg-opacity-75 modal-overlay`}>
      <div className={`relative w-11/12 max-w-md p-5 bg-white rounded-lg   shadow-lg max-h-[500px] overflow-auto`}>
        {/* Close button */}
        <span
          className="absolute text-2xl text-black cursor-pointer top-2 right-5"
          onClick={onRequestClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h2 className="text-lg  text-black font-bold">Edit Profile</h2>

        {/* Profile picture section */}
        <div className="relative text-center modal-image-container">
          <img
            src={formData.userImage}
            alt="Profile Picture"
            className="w-36 h-36 mx-auto mt-4 rounded-full object-cover modal-profile-img"
          />
          <span className="absolute flex items-center  text-black justify-center w-9 h-9 p-1 bg-white rounded-full cursor-pointer top-2/3 left-2/3 camera-icon">
            <FontAwesomeIcon icon={faCamera} />
          </span>
        </div>

        {/* Form for editing profile details */}
        <form className="flex flex-col gap-4 mt-5 edit-form">
          <label className="flex flex-col  text-black">
            Username:
            <input
              type="text"
              name="userName"
              placeholder="Nishant Kaushal"
              value={formData.userName}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded"
            />
          </label>
          <label className="flex flex-col  text-black">
            Email:
            <input
              type="email"
              name="userEmail"
              placeholder="Nishantkaushal0708@gmail.com"
              value={formData.userEmail}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded"
            />
          </label>
          <label className="flex flex-col  text-black">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded"
            />
          </label>
          <label className="flex flex-col  text-black">
            Designation:
            <input
              type="text"
              name="designation"
              placeholder="Software Engineer"
              value={formData.designation}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded"
            />
          </label>
          <label className="flex flex-col  text-black">
            Caption:
            <textarea
              type="text"
              name="caption"
              placeholder="Creating visually appealing and highly functional software that bridges technology and user needs."
              value={formData.caption}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded resize-none h-24"
            />
          </label>
          <label className="flex flex-col  text-black">
            GitHub:
            <input
              type="text"
              name="github"
              placeholder="Enter Your Github Link"
              value={formData.github}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded"
            />
          </label>
          <label className="flex flex-col  text-black">
            LinkedIn:
            <input
              type="text"
              name="linkedin"
              placeholder="Enter Your LinkedIn Link"
              value={formData.linkedin}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded"
            />
          </label>

          {/* Buttons for saving changes or cancelling */}
          <div className="flex justify-between mt-5 form-buttons">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="px-4 py-2 text-white bg-black rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="px-4 py-2 text-white bg-black rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
