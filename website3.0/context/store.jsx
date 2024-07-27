"use client";

import Popup from "@components/Popup";
import { set } from "mongoose";
import { createContext, useContext, useEffect, useState } from "react";
export let Context = createContext();
export const GlobalContext = ({ children }) => {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userImage, setUserImage] = useState("");
  let [userDesignation, setUserDesignation] = useState("");
  let [userCaption, setUserCaption] = useState("");
  let [userGithub, setUserGithub] = useState("");
  let [isAdminShow, setIsAdminShow] = useState(false);
  let [isLogin, setIsLogin] = useState(false);
  let [finalUser, setFinalUser] = useState({});
  let [theme, setTheme] = useState(true);
  let [isPopup, setIsPopup] = useState(false);
  let [msg, setMsg] = useState("sddddddddddddddddddddddddddddd");
  let [color, setColor] = useState("red");
  let [searchedBlog, setSearchedBlog] = useState("");
  let [isReadNotif, setisReadNotif] = useState(0);
  useEffect(() => {
  }, [theme]);
  useEffect(() => {
    if (isPopup) {
      setTimeout(() => {
        setMsg("");
        setIsPopup(false);
        setColor("red");
      }, 4000);
    }
  }, [isPopup]);
  return (
    <Context.Provider
      value={{
        setColor,
        color,
        setIsAdminShow,
        isAdminShow,
        setFinalUser,
        finalUser,
        isPopup,
        setIsPopup,
        msg,
        setMsg,
        userGithub,
        setUserGithub,
        setUserDesignation,
        userDesignation,
        userCaption,
        setUserCaption,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userImage,
        setUserImage,
        setIsLogin,
        isLogin,
        theme,
        setTheme,
        searchedBlog,
        setSearchedBlog,
        isReadNotif,
        setisReadNotif
      }}
    >
      {children}
      {isPopup && <Popup msg={msg} color={color} />}
    </Context.Provider>
  );
};
