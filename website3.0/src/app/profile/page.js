"use client"
import React, { useContext, useEffect, useState } from "react";
import ProfilepageDetails from "@components/profile/ProfilepageDetails";
import SettingsTab from "@components/profile/SettingsTab";
import ResourcesTab from "@components/profile/ResourcesTab";
import NotificationTab from "@components/profile/NotificationTab";
import { Context } from "@context/store";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faChartBar,
  faBell,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBlog,
  faChevronRight,
  faCog,
  faHouseUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import GrowYourReachTab from "@components/profile/GrowYourReachTab";
import { FaX, FaBars } from "react-icons/fa6";
import DashboardTab from "@components/profile/DashboardTab";
import DeletedBlogs from "@components/profile/DeletedBlogs";
import Unblock from "@components/profile/Unblock";
import Questions from "@components/profile/Questions";
import Answers from "@components/profile/Answers";

// Define animation variants for menu
const menuVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: { opacity: 1, y: "0%" },
  exit: { opacity: 0, y: "-100%" }
};

const Settings = () => (
  <div className="min-h-screen mt-10 rounded-xl">
    <SettingsTab />
  </div>
);

const Resources = () => (
  <div className="min-h-screen mt-10 rounded-xl">
    <ResourcesTab />
  </div>
);

const Notifications = () => <div><NotificationTab/></div>;
const GrowYourReach = () => <div><GrowYourReachTab/></div>;
const BlogDetails = () => <div className="min-h-screen mt-10 rounded-xl"><DashboardTab/></div>;
const DeletedBlogs1=()=><div  className="min-h-screen mt-10 rounded-xl"><DeletedBlogs/></div>
const UnblockBlogs1=()=><div  className="min-h-screen mt-10 rounded-xl"><Unblock/></div>

const Profile = ({ id ,isView}) => (
  <div className="bg-gray-100 mt-10 rounded-xl">
    <ProfilepageDetails  isViewProfile={isView} id={id} />
  </div>
);

const MenuItem = ({
  title,
  icon,
  children,
  isCollapsible,
  onClick,
  isActive,
  theme,
  notificationCount // Add notificationCount as a prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          if (isCollapsible) setIsOpen(!isOpen);
          onClick();
        }}
        className={`py-2 px-4 hover:bg-gray-300 rounded flex items-center cursor-pointer justify-between ${
          isActive
            ? theme
              ? "bg-[#6089a4] hover:!bg-[#6089a4] text-white"
              : "bg-[#6f6f6f] hover:!bg-[#262626] text-white"
            : theme
            ? "bg-gray-100 hover:bg-gray-200"
            : "hover:!bg-[#262626]"
        }`}
      >
        <div className="flex items-center relative">
          <FontAwesomeIcon icon={icon} className="mr-2" />
          {title}
          {title === "Notifications" && notificationCount > 0 && (
            <span className="absolute -top-1 -left-2 bg-red-500 text-white rounded-full px-2 py-1 scale-75 text-xs font-bold">
              {notificationCount}
            </span>
          )}
        </div>
        {isCollapsible && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`transition-transform duration-200 mr-5 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </div>
      {isCollapsible && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
const MenuItem1 = ({
  title,
  icon,
  children,
  isCollapsible,
  onClick,
  isActive,
  theme,
  notificationCount // Add notificationCount as a prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          if (isCollapsible) setIsOpen(!isOpen);
          
        }}
        className={`py-2 px-4 hover:bg-gray-300 rounded flex items-center cursor-pointer justify-between ${
          isActive
            ? theme
              ? "bg-[#6089a4] hover:!bg-[#6089a4] text-white"
              : "bg-[#6f6f6f] hover:!bg-[#262626] text-white"
            : theme
            ? "bg-gray-100 hover:bg-gray-200"
            : "hover:!bg-[#262626]"
        }`}
      >
        <div className="flex items-center relative">
        <svg version="1.1" viewBox="0 0 2048 2048" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
<path transform="translate(373,714)" d="m0 0h25l20 3 24 8 19 10 12 9 10 9 10 10 11 15 11 21 7 21 3 19 1 18v305l8 5 52 30 24 14 52 30 21 12 24 14 26 15 28 16 24 14 16 8 16 7 15 5 20 4 22 2 427 1 27 3 27 6 24 8 20 9 16 8 21 14 13 10 14 12 12 12 7 8 12 15 11 16 10 17 11 23 8 22 6 24 3 17 2 21v399l-2 12-5 13-6 10-9 10-8 7-15 8-16 5h-849l-20-7-11-7-10-9-8-10-7-14-3-10-1-7-1-70v-401l-20-11-24-14-52-30-24-14-28-16-52-30-24-14-21-12-19-11-12-9-12-11-10-11-10-15-9-17-7-21-3-16-1-10v-404l2-18 5-20 5-13 10-18 8-11 9-10 12-12 17-12 23-11 17-5zm8 63v1h6v-1zm-9 1v1h5v-1zm-7 2m-4 1m55 3m4 2m4 2m2 1m4 3m3 2m1 1m1 1m3 3m4 4m1 1m1 1m2 3m2 3m2 3m1 2m1 2m9 82 1 2zm0 3v162h1v-162zm-152 41v223h1v-223zm152 223v20l2 4-1-24zm2 26m1 2m1 2m1 1m1 1m1 1m2 2m2 2m8 6m-171 2v29h1v-29zm176 1m8 5m7 4m14 8m19 11m-223 2v8h1v-8zm2 18 1 3zm1 4 1 2zm1 3 1 2zm1 3m1 2m1 2m1 2m1 2m1 1 1 2zm1 2 1 2zm1 2m1 1 1 2zm1 2m1 1 1 3v-3zm2 3m1 1m1 1m1 1m1 1m1 1m1 1m1 1m1 1m1 1m1 1m2 1m1 1m2 1m1 1m1 1m2 1m2 1m1 1m2 1m3 2m2 1m1 1m2 1m2 1m2 1m1 1m2 1m2 1m2 1m2 1m3 2m2 1m1 1m2 1m2 1m2 1m1 1m2 1m2 1m3 2m2 1m2 1m1 1m2 1m4 2m2 1m1 1m2 1m5 3m2 1m3 2m2 1m4 2m1 1m2 1m5 3m2 1m3 2m2 1m2 1m3 2m2 1m2 1m5 3m2 1m6 4m2 1m2 1m3 2m4 2m10 6m7 4m2 1m5 3m4 2m1 1m2 1m7 4m7 4m3 2m4 2m5 3m2 1m7 4m1 1m2 1m4 2m3 2m2 1m827 1m-820 3m1 1m4 2m3 2m825 0m-823 1m2 1m3 2m824 0m-820 2m823 0m3 2m-817 3m821 0m-820 1m4 2m3 2m2 1m2 1m3 2m4 2m816 1m1 1m1 1m1 1m1 1m-810 1m812 1m1 1m1 1m-808 1m3 2m1 1m3 2m1 1m1 1m1 1m808 3m-804 1m805 0m1 2m2 3m1 1m-806 1 1 2zm807 0m6 10m1 1m1 2m4 7m8 16m4 9m13 118 1 2zm0 3v29h1v-29zm0 30 1 2zm-190 69m17 2m2 1m2 1m2 1m3 2m1 1m1 1m1 1m2 2m1 1m1 2m5 12v13h1v-13zm0 14 1 3zm0 5v187h1v-187zm-64 4v183h1v-183zm215 174 1 4z" fill="#6b7280"/>
<path transform="translate(1047)" d="m0 0h698l19 8 12 8 11 11 8 13 5 14 1 6 1 21v472l-1 20-4 16-7 14-11 13-11 8-12 6-16 4-66 1h-259l-17 1-11 14-9 10-9 11-9 10-9 11-9 10-9 11-11 12-9 11-26 30-24 28-9 10-9 8-14 7-11 3-13 1-13-2-14-5-13-9-7-7-8-13-5-14-1-6-1-132h-72l-24-1-14-4-15-8-13-12-7-10-6-13-3-10-1-7v-507l4-16 8-16 9-11 10-8 12-7zm689 66m-681 1m-1 1 1 4zm683 0 1 2zm-344 41m4 0m-24 3m-4 1m50 0m-54 1m58 0m4 1m-71 2m-2 1m82 0m3 1m2 1m296 0v399h1v-399zm-684 1v435h1v-435zm293 0m100 1m2 1m2 1m3 2m2 1m2 1m-125 1m126 0m2 1m1 1m2 1m1 1m1 1m1 1m2 1m1 1m1 1m1 1m-153 1m154 0m-155 1m156 0m-157 1m158 0m-159 1m160 0m-161 1m-1 1m-1 1m166 0m-167 1m168 0m-169 1m-1 1m-1 1m174 0m1 1m1 1m1 1m-180 1m181 0m-182 1m183 0m-184 1m185 0 1 2zm1 2m1 1m-190 1m191 0 1 2zm1 2m-194 1m196 2m-198 1m199 1m1 2m2 3m-106 2m107 0m-118 2m27 0m92 0m-122 1m33 0m-35 1m37 0m88 0m-85 1m3 1m83 0m-81 1m1 1m2 1m80 2m1 2 1 2zm-73 2m74 1 1 2zm-71 3m1 1m2 3m1 1 1 2zm1 2m1 2m1 1 1 2zm68 3m-66 2m1 2 1 2zm-99 1m100 1 1 3zm-104 19m-1 4m-61 2m2 4m2 3m53 1m108 0m-159 2m2 2m46 0m-45 1m44 0m108 3m-147 1m4 2m141 0m-140 1m21 0m-18 1m135 1m70 1m-1 4m-81 6m-1 1m-2 1m-2 1m-1 1m-5 3m86 1m-93 3m-1 1m92 0m-1 2m-5 8m-2 3m-2 3m-1 1m-1 1m-2 3m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-1 1m-2 1m-1 1m-1 1m-3 2m-1 1m-6 4m-5 3m-88 70 1 2zm62 0 1 2zm-61 2 1 3zm60 2m-59 1 1 2zm1 3m1 1m2 3m1 1m1 1m1 1m1 1m39 3m-34 1m2 1m1 1m26 0m-24 1m0 39m21 0m-22 1m25 0m2 1m2 1m1 1m1 1m1 1m-43 3m48 2m2 2 1 2zm1 2m1 1 1 2zm1 3 1 2zm1 3m-61 18 1 2zm1 3m1 2m2 3m1 1m51 0m-1 1m-1 1m-39 7m2 1m2 1m21 0m-19 1m-333 35 1 4zm1 6v5h1v-5zm3 6m3 0v1h41v-1zm348 0v1h12v-1zm317 0v1h11v-1zm-584 1v1h12v-1zm249 0v1h6v-1zm-228 2m219 0m-3 1m-210 1m5 2m7 4m1 1m2 1m1 1m165 11m-151 4m2 3m4 7m129 5m-1 1m-1 1m-1 1m-1 1m-4 5m-1 1m-15 18m-1 1m-1 1m-1 1m-1 1m-4 5m-1 1m-15 18m-1 1m-1 1m-1 1m-1 1m-4 5m-1 1m-16 19m-1 1m-1 1m-1 1m-4 5m-44 39v10l2-2-1-8z" fill="#6b7280"/>
<path transform="translate(373,714)" d="m0 0h25l20 3 24 8 19 10 12 9 10 9 10 10 11 15 11 21 7 21 3 19 1 18v305l8 5 52 30 24 14 52 30 21 12 24 14 26 15 28 16 24 14 16 8 16 7 15 5 20 4 22 2 427 1 27 3 27 6 24 8 20 9 16 8 21 14 13 10 14 12 12 12 7 8 12 15 11 16 10 17 11 23 8 22 6 24 3 17 2 21v399l-2 12-5 13-6 10-9 10-8 7-15 8-16 5h-849l-20-7-11-7-10-9-8-10-7-14-3-10-1-7-1-70v-401l-20-11-24-14-52-30-24-14-28-16-52-30-24-14-21-12-19-11-12-9-12-11-10-11-10-15-9-17-7-21-3-16-1-10v-404l2-18 5-20 5-13 10-18 8-11 9-10 12-12 17-12 23-11 17-5zm1 63-17 5-13 7-9 7-5 4-10 14-6 13-4 15-1 11-1 46v329l1 20 3 17 5 12 9 14 11 11 15 10 24 14 28 16 19 11 15 9 16 9 24 14 21 12 26 15 24 14 23 13 43 25 14 10 7 9 1 494 2 5 1 1 247 1h380v-185l1-24 3-9 5-6 9-6 6-2h13l9 4 6 4 2 3h2l2 5 3 10 1 12h1v6h-1v188h100l51-1 2-5v-377l-2-30-5-24-6-18-9-20-7-12-7-11-9-12-11-12-12-12-13-10-15-10-23-12-22-8-27-6-27-3-430-1-22-3-22-5-27-9-16-7-22-12-25-14-15-9-21-12-24-14-49-28-17-10-104-60-17-11-9-8-3-8-1-4-1-342-3-14-5-12-8-12-9-10-12-9-17-7-14-3zm955 1014 1 3z" fill="#6b7280"/>
<path transform="translate(1053,1402)" d="m0 0h205v1h37l27 4 17 4 20 7 17 8 5 1 17 11 9 7 8 6 9 10 8 7 7 8v2l4 4 1 3 5 5 2 6 4 4 10 20 5 11 7 24 3 16 2 30v377l-2 5-51 1h-100l1-167v-36l-2-3-3-10-2-5-3-1-2-4-5-2v-2l-6-1-16-3v2l-9 4-7 5-5 7-2 7-1 24-1 1v166h1v18h-41l-168-1-7-2 4-2-1-3h-5l1-2-11-4-1-4 3-7-4-5-3-6-2-1 1-8 3-11 3-7 5-4 10-20 4-36v-10l2-12 2-7 1-9v-253l1-22 1-6-2-2v-12l1-19 1-7 1-9-3-6v-3l-3-1-2-5 1-6h2l-3-3v-2l-3-1 3-7 4-7 2-1-2-4-3-1 4-3 1-7 5-3-2-2-2-10v-1l-7-2v-4l4-4-3-5-159-1v-1zm337 32m6 4m44 42m12 18m28 476 1 4z" fill="#6b7280"/>
<path transform="translate(1047)" d="m0 0h698l19 8 12 8 11 11 8 13 5 14 1 6 1 21v472l-1 20-4 16-7 14-11 13-11 8-12 6-16 4-66 1h-259l-17 1-11 14-9 10-9 11-9 10-9 11-9 10-9 11-11 12-9 11-26 30-24 28-9 10-9 8-14 7-11 3-13 1-13-2-14-5-13-9-7-7-8-13-5-14-1-6-1-132h-72l-24-1-14-4-15-8-13-12-7-10-6-13-3-10-1-7v-507l4-16 8-16 9-11 10-8 12-7zm9 64-3 9v494l2 3 13 1 86 1 13 3 14 7 10 9 8 10 7 14 2 9v111l1 21 4-2 13-14 7-8 12-14 7-8 11-13 24-28 13-15 11-13 13-15 11-13 13-15 9-10 10-8 11-5 11-3 338-1 10-1 1-3v-501l-3-2z" fill="#6b7280"/>
<path transform="translate(832,1399)" d="m0 0 12 1 443 1 27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40v-1h-202l127 1v1l-120 1 5 1-3 2 1 2h-3l-2 6 10 3-3 1 2 4 2 7 1 2-6 2v7l-4 3 5 5-3 2-6 12 2 4 3 1v2h-2v6l2 5 2 1 4 9-1 9-1 14-1 21 1 4 1 3-1 4-1 31v244l-2 15-1 1-2 14v8l-4 36-6 12-5 9-5 4-7 25 3 1 5 8 2 4-3 6v3l11 4 4 2v3l2 1v2l2 2-137 1h-34l-68-1v-1l79-1-8-1v-2l-5 1v-3l-11-1-4-2 2-1-9-3 1-5 3-3 1-4-3-5-5-3-1-6 1-1 1-7 3-5-1-5h-3l2-4 1-3h2v-2l3-2h3l2-5 4-4 3-17 2-4v-8l3-16 1-2 2-24 6-15 1-64 1-25 1-5v-99l2-50-3-16v-18l-1-14v-22l-5-4-2-9-3-3v-2h-4l-5-12-4-4-1-9 2-5h2l2-5 4-8 1-1-3-2h2l2-5 8-4-1-3h-2l-4-8 1-2-3 1-4-3-7-2v-4-4l-9-3-14-2h-11l-5-3z" fill="#6b7280"/>
<path transform="translate(936,770)" d="m0 0h32l20 2 23 4 22 6 22 8 27 13 19 12 16 12 13 11 15 14 7 8 11 13 14 20 13 23 9 20 7 20 6 22 4 24 2 21v26l-3 28-6 28-10 30-8 18-11 20-8 12-12 16-11 13-22 22-14 11-14 10-20 12-25 12-19 7-22 6-28 5-23 2h-20l-31-3-24-5-26-8-21-9-16-8-20-12-17-13-13-11-22-22-11-14-11-15-11-19-8-16-8-19-7-21-6-28-3-26v-32l3-27 5-24 7-23 11-26 9-17 10-16 14-19 11-12 7-8 8-8 8-7 15-12 18-12 16-9 16-8 26-10 27-7 26-4zm2 64-17 2-23 5-21 7-21 10-19 12-13 10-13 12-8 8v2h-2l-13 17-9 14-12 23-8 22-4 16-3 19-1 10v24l3 24 6 25 8 21 12 23 8 12 11 14 14 15 11 10 18 13 21 12 21 9 16 5 17 4 15 2 15 1h13l21-2 25-5 25-9 17-8 19-12 16-12 7-6v-2l4-2 12-13 11-14 12-19 10-21 8-24 5-24 2-23v-12l-2-22-4-21-9-27-11-23-11-17-10-13-11-12-10-10-17-13-15-10-24-12-27-9-25-5-13-1z" fill="#6b7280"/>
<path transform="translate(832,1399)" d="m0 0 12 1 443 1 27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40v-1h-202l127 1v1l-119 1h-151l33 2 5 2-1 6 6 1 11 4 4 5v6l2 1-4 4-3 5-5 3-4 8-5 9-5 3-1 9 3 8v7l2 1 2 4h2l4 12 3 11-1 5 1 4-1 3-1 13-2 10 1 9v175l-1 32-1 34-1 5-2 34-1 8v11l-2 8-1 8-1 9-1 14-3 4-1 5-2 3-3 3-3 6h-2l-1 4-3 3-4 8-4 1-1 12h2l5 9 1 1v5l-2 4 5 5 17 4 13 2 2 3 77 1v1l-117 1h-34l-68-1v-1l79-1-8-1v-2l-5 1v-3l-11-1-4-2 2-1-9-3 1-5 3-3 1-4-3-5-5-3-1-6 1-1 1-7 3-5-1-5h-3l2-4 1-3h2v-2l3-2h3l2-5 4-4 3-17 2-4v-8l3-16 1-2 2-24 6-15 1-64 1-25 1-5v-99l2-50-3-16v-18l-1-14v-22l-5-4-2-9-3-3v-2h-4l-5-12-4-4-1-9 2-5h2l2-5 4-8 1-1-3-2h2l2-5 8-4-1-3h-2l-4-8 1-2-3 1-4-3-7-2v-4-4l-9-3-14-2h-11l-5-3z" fill="#6b7280"/>
<path transform="translate(1383,111)" d="m0 0h25l24 6 15 6 11 6 12 9 18 18 8 13 8 16 5 15 4 21v14l-4 20-5 15-8 17-10 14-9 10-9 8-15 10-15 9-5 5-4 10-1 45-7 14-10 8-9 4h-14l-10-6-7-6-5-8-2-6v-45l5-24 5-11 6-10 10-13 11-9 13-8 16-10 9-10 7-14 1-3 1-21-3-12-3-5v-3h-2l-6-9-8-7-10-5-13-4-11-1-12 3-16 8-2 4-4 1-7 9-5 12-1 4-1 13-2 3-2 9-6 10-9 6-8 2h-15l-9-5-6-5-6-10-2-5v-16l5-22 4-12 7-14 9-13 14-15 14-11 16-9 17-6z" fill="#6b7280"/>
<path transform="translate(1391,460)" d="m0 0h9l11 4 8 7 5 6 4 10v12l-2 2-5 10-8 7-6 3-9 3h-6l-12-5-10-9-4-8-2-5v-10l4-11 9-10 7-4z" fill="#6b7280"/>
<path transform="translate(1055,163)" d="m0 0 2 2v27l1-10 3 4 1 7 1 6 1 19v82l-1 107-1 25-4 1-1-14-1 102h-1l-1-67v-275z" fill="#6b7280"/>
<path transform="translate(858,1401)" d="m0 0h429l27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40v-1h-202l-153 1h-32l-9-1z" fill="#6b7280"/>
<path transform="translate(1205,608)" d="m0 0 2 2 4 14 1 6v114l-1 8 4-1-4 5-2-1 1-2-2-21v-108l-2-9-2-6z" fill="#6b7280"/>
<path transform="translate(1258,1401)" d="m0 0h29l27 3 27 6 22 8 14 7-1 2-19-9-25-8-21-4-16-2h-40l3-1z" fill="#6b7280"/>
<path transform="translate(1055,68)" d="m0 0 2 1-1 29v22l-2 2-1-1v-48z" fill="#A672FE"/>
<path transform="translate(1252,706)" d="m0 0 1 3-7 7-9 11-10 11-7 8-2 1 2-4 12-14 11-12 8-10z" fill="#6b7280"/>
<path transform="translate(1055,525)" d="m0 0h1l1 40 1 4h-4l-1-2v-11z" fill="#6b7280"/>
<path transform="translate(1058,160)" d="m0 0 2 1v20l-3-1v-15z" fill="#6b7280"/>
<path transform="translate(1275,679)" d="m0 0 2 2-11 12-4 5-2-1 11-13z" fill="#6b7280"/>
<path transform="translate(1441,335)" d="m0 0 2 1-10 10-3 6-1-3 5-9z" fill="#6b7280"/>
<path transform="translate(1185,583)" d="m0 0h2v2l4 2 8 9v2l-4-2-7-8-3-3z" fill="#6b7280"/>
<path transform="translate(1252,706)" d="m0 0 1 3-7 7-6 8-3-1 10-11z" fill="#6b7280"/>
<path transform="translate(1323,623)" d="m0 0 2 2-10 11-4 5-2-1 11-13z" fill="#6b7280"/>
<path transform="translate(1298,652)" d="m0 0 3 1-11 12-3 4-2-1 11-13z" fill="#6b7280"/>
<path transform="translate(758,1372)" d="m0 0 6 1 9 4-1 3-9-4v-2l-5-1z" fill="#6b7280"/>
<path transform="translate(1331,129)" d="m0 0v3l-9 7-3 2v-3z" fill="#6b7280"/>
<path transform="translate(1359,188)" d="m0 0h2l-1 3h-2l-2 4-5 7-1-3z" fill="#6b7280"/>
<path transform="translate(1392,173)" d="m0 0 11 1 5 2-2 1-13-2z" fill="#6b7280"/>
</svg>&nbsp;
          {title}
          {title === "Notifications" && notificationCount > 0 && (
            <span className="absolute -top-1 -left-2 bg-red-500 text-white rounded-full px-2 py-1 scale-75 text-xs font-bold">
              {notificationCount}
            </span>
          )}
        </div>
        {isCollapsible && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`transition-transform duration-200 mr-5 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </div>
      {isCollapsible && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
const ProfilePage = () => {
  const { theme, setColor, isLogin, finalUser,setIsNotification } = useContext(Context);
  const [activeComponent, setActiveComponent] = useState(<Profile id="" />);
  const [activeMenuItem, setActiveMenuItem] = useState("Profile");
  const [menuVisible, setMenuVisible] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0); // State for unread notifications count
  const pathname = usePathname(); // Get current path
  const [id, setId] = useState("");
  let [isView,setIsView]=useState(false)
  const isViewProfile = id.length > 0;
  const router = useRouter();

  useEffect(() => {
    // Function to get query parameters from URL
    const getUrlParameter = (name) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    };

    // Get the 'id' query parameter from the URL
    const idFromQuery = getUrlParameter("id");
    let isView=getUrlParameter("isView")
    if(isView){
      setIsView(true)
    }
    if (idFromQuery) {
      const storedUser = localStorage.getItem("finalUser");
      const parsedUser = storedUser ? JSON.parse(storedUser) : isViewProfile;
      if (parsedUser.username !== idFromQuery) {
        setId(idFromQuery);
      }
    }
    setActiveComponent(<Profile id={id} isView={isView} />);
    setActiveMenuItem("Profile");
  }, [id, isViewProfile]); // Adjust dependencies if needed

  useEffect(() => {
    // Refresh the color from localStorage on page reload
    const color = localStorage.getItem("color");
    if (color) {
      setColor(color);
    }

    const handleResize = () => {
      setMenuVisible(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setColor]);

  useEffect(() => {
    // Fetch notifications and calculate unread count
    const fetchNotifications = async () => {
      if (finalUser?.email) {
        try {
          const response = await fetch(`/api/notifications?userEmail=${finalUser.email}`);
          if (response.ok) {
            const data = await response.json();
            const unreadCount = Object.values(data.followerList).filter(notif => !notif.isRead).length +
                                Object.values(data.blogList).filter(notif => !notif.isRead).length;
            setNotificationCount(unreadCount);
          } else {
            console.error("Error fetching notifications:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [finalUser]);

  const handleMenuClick = (component, title) => {
    if(title=="Notifications"){
      setIsNotification(0)
    }
    setActiveComponent(component);
    setActiveMenuItem(title);

  };

  const handleHomeButton = () => {
    router.push("/");
  };
  const handleDevopsInsights = () => {
    router.push("/devopsforum");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div
      className={`bg-gray-100 overflow-hidden mt-24 flex min-h-screen w-full ${
        theme ? "" : "bg-[#1c1a1a]"
      } max-lg:flex-col`}
    >
      {!menuVisible && (
        <div className="w-[80%] bg-gray-100 m-auto pt-8 pl-4 mb-10 z-50 cursor-pointer max-lg:block hidden" >
          <FaBars size={24} className={theme ? "text-gray-600" : "text-black"} onClick={toggleMenu}/>
          <hr className="w-full border-gray-200 border-[3px] my-6"/>
        </div>
      )}
      {menuVisible && (
        <div className="w-[80%] m-auto bg-gray-100 pt-8 pl-4 mb-10 z-50 cursor-pointer max-lg:block hidden" >
          <FaX size={24} className={theme ? "text-gray-600" : "text-black"} onClick={toggleMenu}/>
        </div>
      )}
      <AnimatePresence>
        {menuVisible && !isViewProfile && (
          <motion.div
            id="menu"
            className={`${
              theme ? "max-lg:bg-gray-100" : "bg-[#1c1a1a]"
            } w-[20%] max-lg:w-[80%] max-lg:m-auto  max-sm:h-full border-t-4 border-gray-200 px-5 py-10 text-lg`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }} 
          >
            <div
              className={`${
                theme ? "text-gray-600" : "text-white"
              } flex-1 overflow-y-auto space-y-4`}
            >
              <MenuItem
                title="Home"
                icon={faHouseUser}
                isCollapsible={false}
                onClick={handleHomeButton}
                isActive={activeMenuItem === "Home"}
                theme={theme}
              />
              <MenuItem
                title="Profile"
                icon={faAddressCard}
                isCollapsible={true}
                onClick={() => handleMenuClick(<Profile isView={isView} id={id} />, "Profile")}
                isActive={activeMenuItem === "Profile"}
                theme={theme}
              >
                <ul className="space-y-2 mt-2 cursor-pointer">
                  <li
                    className="py-2 px-4 hover:bg-gray-300 rounded"
                    onClick={() =>
                      handleMenuClick(<BlogDetails />, "BlogDetails")
                    }
                  >
                    Blog Details
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-300 rounded"
                    onClick={() =>
                      handleMenuClick(<DeletedBlogs />, "DeletedBlogs1")
                    }
                  >
                    Deleted Blogs
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-300 rounded"
                    onClick={() =>
                      handleMenuClick(<Unblock />, "UnblockBlogs1")
                    }
                  >
                    Blocked Blogs
                  </li>
                </ul>
              </MenuItem>
              <MenuItem
                title="Grow Your Reach"
                icon={faUserFriends}
                isCollapsible={false}
                onClick={() => handleMenuClick(<GrowYourReach/>, "GrowYourReach")}
                isActive={activeMenuItem === "GrowYourReach"}
                theme={theme}
              />
              <MenuItem
                title="DevOps Insights"
                icon={faComment}
                isCollapsible={false}
                onClick={() =>
                  handleDevopsInsights()
                }
                isActive={activeMenuItem === "DevopsInsights"}
                theme={theme}
              />
              <MenuItem
                title="Blogs Page"
                icon={faBlog}
                isCollapsible={false}
                onClick={() => router.push("/blogs")}
                theme={theme}
              />
                <MenuItem1
                title="Devops Forum"
                icon={faAddressCard}
                isCollapsible={true}
                isActive={activeMenuItem === "Devops Forum"}
                theme={theme}
              >
                <ul className="space-y-2 mt-2 cursor-pointer">
                  <li
                    className="py-2 px-4 hover:bg-gray-300 rounded"
                    onClick={() =>
                      handleMenuClick(<Questions />, "Questions")
                    }
                  >
                    Questions
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-300 rounded"
                    onClick={() =>
                      handleMenuClick(<Answers />, "Answers")
                    }
                  >
                    Answers
                  </li>
                </ul>
              </MenuItem1>
              <MenuItem
                title="Saved Resources"
                icon={faChartBar}
                isCollapsible={false}
                onClick={() => handleMenuClick(<Resources />, "Resources")}
                isActive={activeMenuItem === "Resources"}
                theme={theme}
              />
              <MenuItem
                title="Notifications"
                icon={faBell}
                isCollapsible={false}
                onClick={() =>
                  handleMenuClick(<Notifications />, "Notifications")
                }
                isActive={activeMenuItem === "Notifications"}
                theme={theme}
                notificationCount={notificationCount} // Pass notificationCount to MenuItem
              />
              <MenuItem
                title="Settings"
                icon={faCog}
                isCollapsible={false}
                onClick={() => handleMenuClick(<Settings />, "Settings")}
                isActive={activeMenuItem === "Settings"}
                theme={theme}
              />
              {/* <MenuItem1
                title="Questions"
             
                isCollapsible={false}
                onClick={() => handleMenuClick(<Questions/>, "Questions")}
                isActive={activeMenuItem === "Questions"}
                theme={theme}
              />
               <MenuItem1
                title="Answers"
                icon={faUserFriends}
                isCollapsible={false}
                onClick={() => handleMenuClick(<Answers/>, "Answers")}
                isActive={activeMenuItem === "Answers"}
                theme={theme}
              /> */}
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-[80%] max-md:w-[95%] m-auto">
        <div
          className={`w-full px-10 max-sm:px-2 bg-gray-200 ${
            theme
              ? "shadow-[5px_5px_15px_rgba(0,0,0,0.195)]"
              : "shadow-md shadow-white"
          } ${theme ? "bg-[#fffaf4] border-2" : "bg-[#1e1d1d] border-2"}`}
        >
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
