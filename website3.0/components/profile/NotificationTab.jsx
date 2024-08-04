"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@context/store";
import Link from 'next/link';

function NotificationTab() {
 // Destructure necessary functions and values from context
 const { finalUser, theme, setisReadNotif, setIsNotification } = useContext(Context);

 // State to hold notifications categorized by type
 const [notifications, setNotifications] = useState({
   followers: [],
   blogs: [],
   comments: [],
 });

 useEffect(() => {
   // If user data is not available, do not proceed
   if (!finalUser || !finalUser.email) return;

   setIsNotification(false);

   // Function to update notifications
   const updateNotifications = async () => {
     try {
       // Fetch user data based on email
       const response = await fetch("/api/getuserbyemail", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email: finalUser.email }),
       });

       if (response.ok) {
         const userData = await response.json();
         const followers = userData.msg.followers;

         // Fetch existing notifications for the user
         const checkResponse = await fetch(
           `/api/notifications?userEmail=${finalUser.email}`,
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
             },
           }
         );

         let existingNotifications = { followerList: {}, blogList: {}, blogCommentList: {} };

         if (checkResponse.ok) {
           existingNotifications = await checkResponse.json();
         } else if (checkResponse.status === 404) {
           // Handle case where notifications are not found
         } else {
           console.error("Error fetching existing notifications:", checkResponse.statusText);
           return;
         }

         const { followerList = {}, blogList = {}, blogCommentList = {} } = existingNotifications;

         // Handle follower notifications
         const updatedFollowers = await Promise.all(
           Object.entries(followerList).map(async ([followerId, details]) => {
             const userResponse = await fetch("/api/getuser", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({ id: followerId }),
             });

             if (userResponse.ok) {
               const userData = await userResponse.json();
               const followerName = userData.msg.name;
               return {
                 followerId,
                 followerName,
                 dateTime: details.dateTime,
                 isRead: details.isRead,
               };
             }
             return {
               followerId,
               followerName: "Unknown",
               dateTime: details.dateTime,
               isRead: details.isRead,
             };
           })
         );

         // Handle blog notifications
         const blogResponse = await fetch("/api/blog", {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
         });

         let latestBlogId = null;
         let blogDataMap = {};

         if (blogResponse.ok) {
           const blogs = await blogResponse.json();
           blogDataMap = blogs.data.reduce((map, blog) => {
             map[blog._id] = blog;
             return map;
           }, {});

           // Check for new comments and blogs
           blogs.data.forEach(async (res) => {
             res.comments.forEach(async (comment) => {
               if (!Object.keys(blogCommentList).includes(comment._id)) {
                 // Add notification for new comment
                 await fetch("/api/notifications", {
                   method: "POST",
                   headers: {
                     "Content-Type": "application/json",
                   },
                   body: JSON.stringify({
                     userEmail: finalUser.email,
                     commentId: comment._id,
                     blogId: res._id,
                     blogName: res.title
                   }),
                 });
               }
             });
           });

           if (blogs.data.length > 0) {
             latestBlogId = blogs.data[blogs.data.length - 1]._id;
             const isNewBlog = !Object.keys(blogList).includes(latestBlogId);

             if (isNewBlog) {
               // Add notification for new blog
               await fetch("/api/notifications", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                   userEmail: finalUser.email,
                   blogId: latestBlogId,
                 }),
               });
             }
           }
         }

         // Update state with notifications
         setNotifications({
           followers: updatedFollowers,
           blogs: Object.entries(blogList).map(([blogId, details]) => ({
             blogId,
             blogName: blogDataMap[blogId]?.title || "Unknown Blog",
             dateTime: details.dateTime,
             isRead: details.isRead,
           })),
           comments: Object.entries(blogCommentList).map(([commentId, details]) => ({
             _id: commentId,
             dateTime: details.dateTime,
             isRead: details.isRead,
             id: details.blogId,
             blogName: details.blogName,
           })),
         });

         // Handle new follower notifications
         for (const followerId in followers) {
           if (followers.hasOwnProperty(followerId)) {
             const isDuplicate = Object.keys(followerList).includes(followerId);

             if (!isDuplicate) {
               // Add notification for new follower
               await fetch("/api/notifications", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                   userEmail: finalUser.email,
                   followerId,
                 }),
               });
             }
           }
         }
       } else {
         console.error("Error fetching user data:", response.statusText);
       }
     } catch (error) {
       console.error("Error updating notifications:", error);
     }
   };

   // Set interval to update notifications every second
   const interval = setInterval(updateNotifications, 1000);

   // Clean up interval on component unmount
   return () => clearInterval(interval);
 }, [finalUser]);

 // Function to handle click on a notification and mark it as read
 const handleNotificationClick = async (type, id) => {
   try {
     const response = await fetch("/api/updateNotificationStatus", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ userEmail: finalUser.email, type, id }),
     });

     if (response.ok) {
       // Update the state to mark the notification as read
       setNotifications((prevNotifications) => {
         if (type === "follower") {
           return {
             ...prevNotifications,
             followers: prevNotifications.followers.map((notif) =>
               notif.followerId === id ? { ...notif, isRead: true } : notif
             ),
           };
         } else if (type === "blog") {
           return {
             ...prevNotifications,
             blogs: prevNotifications.blogs.map((notif) =>
               notif.blogId === id ? { ...notif, isRead: true } : notif
             ),
           };
         } else if (type === "comments") {
           return {
             ...prevNotifications,
             comments: prevNotifications.comments.map((notif) =>
               notif._id === id ? { ...notif, isRead: true } : notif
             ),
           };
         }
         return prevNotifications;
       });
     } else {
       console.error("Failed to update notification status");
     }
   } catch (error) {
     console.error("Error marking notification as read:", error);
   }
 };
  return (
    <div className="h-screen overflow-scroll p-4">
      <div className={`${theme ? "bg-gray-100 text-black" : "bg-[#111111] text-white"} p-4 rounded-xl overflow-scroll flex flex-col gap-4 `}>
        <h2 className="text-xl text-center">Notifications</h2>
        <hr className={`${theme ? "border-gray-300 text-black" : "bg-[#3c3c3c] text-white"} w-full border-2 my-4`} />
        <ul className=" overflow-scroll">
          {notifications.followers.map(
            ({ followerId, followerName, dateTime, isRead }) => (
              <Link href={`/profile?id=${followerId}`} key={followerId} target="_blank">
                <li key={followerId}
                className={`py-3 px-2 rounded-xl ${isRead ? (theme ? "bg-gray-300 text-gray-400" : "bg-[#2c2c2c] text-gray-400") : (theme ? "bg-gray-200 text-black" : "bg-[#3c3c3c] text-black")}`}
                    onClick={() => handleNotificationClick("follower", followerId)}>
                  {followerName} has started following you.{" "}
                  ({new Date(dateTime).toLocaleString()})
                </li>
              </Link>
            )
          )}
        </ul>
        <ul className="flex flex-col gap-4 ">
          {notifications.blogs.map(({ blogId, blogName, dateTime, isRead }) => (
            <Link href={`/blogs/${blogId}`} key={blogId} target="_blank">
              <li key={blogId}
                  className={`py-3 px-2 rounded-xl ${isRead ? (theme ? "bg-gray-300 text-gray-400" : "bg-[#2c2c2c] text-gray-400") : (theme ? "bg-gray-200 text-black" : "bg-[#3c3c3c] text-black")}`}
                  onClick={() => handleNotificationClick("blog", blogId)}>
                <span className="flex gap-1">
                  Read a blog on the topic{" "}
                  <span dangerouslySetInnerHTML={{ __html: blogName }}></span>
                  ({new Date(dateTime).toLocaleString()})
                </span>
              </li>
            </Link>
          ))}
          <ul className="flex flex-col gap-4  overflow-scroll">
  {notifications.comments.map(({ _id,id, dateTime, isRead,blogName }) => (
    <Link href={`/blogs/${id}`} key={id} target="_blank">
      <li
        key={id}
        className={`py-3 px-2 rounded-xl ${
          isRead
            ? theme
              ? "bg-gray-300 text-gray-400"
              : "bg-[#2c2c2c] text-gray-400"
            : theme
            ? "bg-gray-200 text-black"
            : "bg-[#3c3c3c] text-black"
        }`}
        onClick={() => handleNotificationClick("comments", _id)}
      >
        <span className="flex gap-1">
          New comment on blog:{" "}
          <span dangerouslySetInnerHTML={{ __html: blogName }}></span>{" "}
          ({new Date(dateTime).toLocaleString()})
        </span>
      </li>
    </Link>
  ))}
</ul>

        </ul>
      </div>
    </div>
  );
}

export default NotificationTab;
