"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Context } from "@context/store";
import { FaPen } from "react-icons/fa";

export default function EditProfileModal({
  isOpen,
  onRequestClose,
  userData,
  onSave,
  img,
  banner,
  finalUserData
}) {
 // Initialize state for form data, including user details and an empty password field
const [formData, setFormData] = useState({ ...finalUserData, password: "" });

// Effect to log formData and finalUserData whenever formData changes
useEffect(() => {
  console.log(formData, finalUserData);
}, [formData]);

// Destructure context values and functions for managing user details and authentication
let {
  userName,
  finalUser,
  setFinalUser,
  setUserName,
  setUserGithub,
  userEmail,
  setUserCaption,
  setUserDesignation,
  setUserEmail,
  userImage,
  setUserImage,
  isLogin,
  theme,
} = useContext(Context);

// Initialize state for profile and banner image URLs
let [url, setUrl] = useState(img);
let [bannerUrl, setBannerUrl] = useState(banner);

// Refs for file inputs to handle image uploads
const profileImageInputRef = useRef(null);
const bannerImageInputRef = useRef(null);

// Handle changes to form inputs
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

// Save changes to the user's profile
const handleSaveChanges = async () => {
  try {
    // Send updated profile data to the server
    await fetch("/api/editaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        formData: formData,
        image: url,
        banner: bannerUrl,
        email: finalUser.email,
      }),
    });

    // Fetch the updated user data
    let response = await fetch("/api/createaccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: finalUser.email,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    
    // Update the context and localStorage with the new user data
    setFinalUser(data.msg);
    localStorage.setItem("finalUser", JSON.stringify(data.msg));
    setUrl(data.msg.image1);
    setBannerUrl(data.msg.banner);

    // Close the profile modal after saving changes
    onRequestClose();
  } catch (error) {
    console.error('Error saving changes:', error);
    // Optionally, you can set an error state here to display a message to the user
    // setError(error.message); // Example of setting an error state
  }
};


// Handle changes to profile image
async function handlefilechange(event) {
  try {
    let imageFile = event.target.files[0];
    if (imageFile) {
      const formData1 = new FormData();
      formData1.append("file", imageFile);
      formData1.append("upload_preset", "e_image");

      // Upload the image to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwgd3as6k/image/upload`,
        {
          method: "POST",
          body: formData1,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Update the formData and image URL state with the uploaded image's URL
      setFormData({ ...formData, ["userImage"]: data.secure_url });
      setFormData({ ...formData, ["image"]: data.secure_url });
      setUrl(data.secure_url);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    // Optionally, you can set an error state here to display a message to the user
    // setError(error.message); // Example of setting an error state
  }
}


// Handle changes to banner image
async function handleBannerChange(event) {
  let imageFile = event.target.files[0];
  if (imageFile) {
    const formData1 = new FormData();
    formData1.append("file", imageFile);
    formData1.append("upload_preset", "e_image");

    // Upload the image to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dwgd3as6k/image/upload`,
      {
        method: "POST",
        body: formData1,
      }
    );

    const data = await response.json();

    // Update the banner URL state with the uploaded image's URL
    setBannerUrl(data.secure_url);
  }
}

// Close the modal when clicking outside of it
const handleClickOutside = (e) => {
  if (e.target.className.includes("modal-overlay")) {
    onRequestClose();
  }
};

// Effect to manage the click event listener for closing the modal
useEffect(() => {
  if (isOpen) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }

  // Clean up event listener on component unmount
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, [isOpen]);

// Render nothing if the modal is not open
if (!isOpen) {
  return null;
}

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black bg-opacity-75 modal-overlay">
      <div
        className={`relative w-11/12 max-w-md p-5  ${
          theme
            ? "bg-white border-2 border-dashed border-black"
            : "bg-[#121111] border-2 border-dashed border-white"
        } rounded-lg shadow-lg max-h-[500px] overflow-auto`}
      >
        <span
          className="absolute text-2xl cursor-pointer top-2 right-5"
          onClick={onRequestClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h2 className="text-lg font-bold">Edit Profile</h2>

        <img
          src={url?.length > 0 ? url : formData.userImage}
          alt="Profile Picture"
          className="w-36 h-36 mx-auto z-50 relative mt-4 rounded-full object-cover modal-profile-img"
        />

        <label
          htmlFor="banner"
          className="absolute top-14 left-0 w-full text-center"
        >
          <img
            src={bannerUrl?.length > 0 ? bannerUrl : "default_banner.webp"}
            alt="Banner Picture"
            className="w-full h-48 object-cover cursor-pointer"
          />
        </label>
        <button
          onClick={() => profileImageInputRef.current.click()}
          className={`absolute top-44 right-32 p-1 pl-2 pr-2 z-50 flex gap-2 items-center ${
            theme
              ? "bg-white text-black border border-black rounded-md"
              : "bg-black text-white border rounded-md border-white"
          }`}
        >
          <FaPen color={`${theme ? "black" : "white"}`} />
          Edit
        </button>
        <input
          ref={profileImageInputRef}
          onChange={handlefilechange}
          id="image"
          style={{ visibility: "hidden" }}
          type="file"
        ></input>
        <input
          ref={bannerImageInputRef}
          onChange={handleBannerChange}
          id="banner"
          style={{ visibility: "hidden" }}
          type="file"
        ></input>

        <form className="flex flex-col gap-4 mt-5 edit-form">
          <label className="flex flex-col">
            Designation:
            <input
              type="text"
              name="designation"
              // placeholder={`${finalUser.designation?finalUser.designation:"Please Enter Designation"}`}
              value={formData.designation}
              placeholder="Please Enter Designation"
              onChange={handleChange}
              className={`p-2 mt-1 border border-gray-300 rounded ${
                theme ? "" : "text-white bg-[#1d1b1b]"
              }`}
            />
          </label>
          <label className="flex flex-col">
            Caption:
            <textarea
              type="text"
              name="caption"
              placeholder={`"Please Enter Caption"`}
              value={formData.caption}

              onChange={handleChange}
              className={`p-2 mt-1 border border-gray-300 rounded resize-none h-24 ${
                theme ? "" : "text-white bg-[#1d1b1b]"
              } `}
            />
          </label>
          <label className="flex flex-col">
            GitHub:
            <input
              type="text"
              name="github"
              placeholder={`"Please Enter Github Link"`}
              value={formData.github}
              onChange={handleChange}
              className={`${
                theme ? "" : "text-white bg-[#1d1b1b]"
              } p-2 mt-1 border border-gray-300 rounded`}
            />
          </label>
          <label className="flex flex-col">
            LinkedIn:
            <input
              type="text"
              value={formData.linkedin}
              name="linkedin"
              placeholder={`"Please Enter Linkedin Link"`}
              onChange={handleChange}
              className={`${
                theme ? "" : "text-white bg-[#1d1b1b]"
              } p-2 mt-1 border border-gray-300 rounded`}
            />
          </label>

          <div className="flex justify-between mt-5 form-buttons">
            <button
              type="button"
              onClick={handleSaveChanges}
              className={`${
                theme ? "" : "border border-white shadow-sm shadow-white"
              } px-4 py-2 text-white bg-black rounded`}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className={` ${
                theme ? "" : "border border-white shadow-sm shadow-white"
              } px-4 py-2 text-white bg-black rounded`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
