"use client";
import React from "react";
import "@stylesheets/profilepage.css";
import Logout from "@components/Logout";
import ProfilepageDetails from "@components/ProfilepageDetails";

const ProfilePage = () => {


  return (
    <div className="main">
      <div className="profile-page">
        <ProfilepageDetails/>
      <div>

<Logout />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
