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
  let [isNotification,setIsNotification]=useState(false)
 
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




  useEffect(() => {
    if (!finalUser || !finalUser.email) return;

    const updateNotifications = async () => {
      try {
        // Fetch user data
        const response = await fetch("/api/getuserbyemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: finalUser.email }),
        });

        if (!response.ok) {
          console.error("Error fetching user data:", response.statusText);
          return;
        }

        const userData = await response.json();
        const followers = userData.msg.followers;

        // Fetch existing notifications
        const checkResponse = await fetch(`/api/notifications?userEmail=${finalUser.email}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        let existingNotifications = { followerList: {}, blogList: {}, blogCommentList: {} };

        if (checkResponse.ok) {
          existingNotifications = await checkResponse.json();
        } else if (checkResponse.status !== 404) {
          console.error("Error fetching existing notifications:", checkResponse.statusText);
          return;
        }

        const { followerList, blogList, blogCommentList } = existingNotifications;

        // Handle follower notifications
        const updatedFollowers = await Promise.all(
          Object.entries(followerList).map(async ([followerId, details]) => {
            try {
              const userResponse = await fetch("/api/getuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: followerId }),
              });

              if (userResponse.ok) {
                const userData = await userResponse.json();
                return {
                  followerId,
                  followerName: userData.msg.name,
                  dateTime: details.dateTime,
                  isRead: details.isRead,
                };
              } else {
                return {
                  followerId,
                  followerName: "Unknown",
                  dateTime: details.dateTime,
                  isRead: details.isRead,
                };
              }
            } catch (error) {
              console.error("Error fetching follower data:", error);
              return null;
            }
          })
        );

        // Handle blog notifications
        const blogResponse = await fetch("/api/blog", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        let latestBlogId = null;
        let blogDataMap = {};

        if (blogResponse.ok) {
          const blogs = await blogResponse.json();
          blogDataMap = blogs.data.reduce((map, blog) => {
            map[blog._id] = blog;
            return map;
          }, {});
          // Check for new comments
          for (const blog of blogs.data) {
            for (const comment of blog.comments) {
              if (!Object.keys(blogCommentList).includes(comment._id)) {
                await fetch("/api/notifications", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userEmail: finalUser.email,
                    commentId: comment._id,
                    blogId: blog._id,
                    blogName: blog.title,
                  }),
                });
                setIsNotification(true);
                console.log("New blog comment notification sent.");
              }
            }
          }

          // Check for new blogs
          if (blogs.data.length > 0) {
            latestBlogId = blogs.data[blogs.data.length - 1]._id;
            const isNewBlog = !Object.keys(blogList).includes(latestBlogId);

            if (isNewBlog) {
              await fetch("/api/notifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userEmail: finalUser.email, blogId: latestBlogId }),
              });
              setIsNotification(true);
              console.log("New blog notification sent.");
            }
          }
        } else {
          console.error("Error fetching blogs:", blogResponse.statusText);
        }

        // Handle new follower notifications
        for (const followerId in followers) {
          if (followers.hasOwnProperty(followerId) && !Object.keys(followerList).includes(followerId)) {
            await fetch("/api/notifications", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userEmail: finalUser.email, followerId }),
            });
            setIsNotification(true);
            console.log("New follower notification sent.");
          }
        }
      } catch (error) {
        console.error("Error updating notifications:", error);
      }
    };

    const interval = setInterval(updateNotifications, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [finalUser,isNotification]);
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
        setisReadNotif,
        isNotification,setIsNotification
      }}
    >
      {children}
      {isPopup && <Popup msg={msg} color={color} />}
    </Context.Provider>
  );
};
