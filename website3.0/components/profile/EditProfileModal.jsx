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
}) {
  const [formData, setFormData] = useState({ ...userData, password: "" });
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
  let [url, setUrl] = useState(img);
  let [bannerUrl, setBannerUrl] = useState(banner);
  const profileImageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    await fetch("/api/editaccount", {
      method: "POST",
      body: JSON.stringify({
        formData: formData,
        image: url,
        banner: bannerUrl,
        email: finalUser.email,
      }),
    });
    let a = await fetch("/api/createaccount", {
      method: "POST",
      body: JSON.stringify({
        email: finalUser.email,
      }),
    });

    let e = await a.json();
    setFinalUser(e.msg);
    let dt = await JSON.stringify(e.msg);
    localStorage.setItem("finalUser", dt);
    setUrl(e.msg.image1);
    setBannerUrl(e.msg.banner);
    onRequestClose();
  };

  async function handlefilechange(event) {
    let imageFile = event.target.files[0];
    if (imageFile) {
      const formData1 = new FormData();
      formData1.append("file", imageFile);
      formData1.append("upload_preset", "e_image");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwgd3as6k/image/upload`,
        {
          method: "POST",
          body: formData1,
        }
      );

      const data = await response.json();
      setFormData({ ...formData, ["userImage"]: data.secure_url });
      setFormData({ ...formData, ["image"]: data.secure_url });
      setUrl(data.secure_url);
    }
  }

  async function handleBannerChange(event) {
    let imageFile = event.target.files[0];
    if (imageFile) {
      const formData1 = new FormData();
      formData1.append("file", imageFile);
      formData1.append("upload_preset", "e_image");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwgd3as6k/image/upload`,
        {
          method: "POST",
          body: formData1,
        }
      );

      const data = await response.json();
      setBannerUrl(data.secure_url);
    }
  }

  const handleClickOutside = (e) => {
    if (e.target.className.includes("modal-overlay")) {
      onRequestClose();
    }
  };

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
            src={bannerUrl?.length > 0 ? bannerUrl : "default_banner.png"}
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
              placeholder="Software Engineer"
              value={formData.designation}
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
              placeholder="Creating visually appealing and highly functional software that bridges technology and user needs."
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
              placeholder="Enter Your Github Link"
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
              name="linkedin"
              placeholder="Enter Your LinkedIn Link"
              value={formData.linkedin}
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
