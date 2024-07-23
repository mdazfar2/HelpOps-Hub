import React from "react";
import "@stylesheets/profilecontainer.css";
export default function UserProfile({ onClose, onLogout }) {
  function handleClose() {
    onClose();
  }
  return (
    <>
      <div className=" bg-slate-100 p-[40px] pt-[30px] h-[500px] w-[500px] profileContainer rounded-2xl  border-dashed border-black border-[2px]">
        <img className="image1" src={`${localStorage.getItem("image")}`} />
        <div className="youremail">
          <p>Your Email:&nbsp;</p>
          <span>{localStorage.getItem("userEmail")}</span>
        </div>
        <div className="name">
          <p>Your Name :&nbsp;</p>
          <span>{localStorage.getItem("userName")}</span>
        </div>
        <button className="logout" onClick={onLogout}>
          Logout
        </button>
        <button
          className="absolute right-[16px] top-[10px]"
          onClick={handleClose}
        >
          &#10005;
        </button>
      </div>
    </>
  );
}
