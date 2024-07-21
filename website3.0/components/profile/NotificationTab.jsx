"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@context/store";
import Link from 'next/link';
function NotificationTab() {
  const { finalUser,theme } = useContext(Context);
  const [notifications, setNotifications] = useState({
    followers: [],
    blogs: [],
  });

  useEffect(() => {
    if (!finalUser || !finalUser.email) return;

    const updateNotifications = async () => {
      try {
        // Fetch user data
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

          // Fetch existing notifications
          const checkResponse = await fetch(
            `/api/notifications?userEmail=${finalUser.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          let existingNotifications = { followerList: {}, blogList: {} };

          if (checkResponse.ok) {
            existingNotifications = await checkResponse.json();
          } else if (checkResponse.status === 404) {
            console.log("No existing notifications found. Creating new ones.");
          } else {
            console.error(
              "Error fetching existing notifications:",
              checkResponse.statusText
            );
            return;
          }

          const { followerList = {}, blogList = {} } = existingNotifications;

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
                };
              }
              return {
                followerId,
                followerName: "Unknown",
                dateTime: details.dateTime,
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

            if (blogs.data.length > 0) {
              latestBlogId = blogs.data[blogs.data.length - 1]._id;
              const isNewBlog = !Object.keys(blogList).includes(latestBlogId);

              if (isNewBlog) {
                const response2 = await fetch("/api/notifications", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userEmail: finalUser.email,
                    blogId: latestBlogId,
                  }),
                });

                console.log("New blog notification sent:", response2.ok);
              }
            }
          }

          setNotifications({
            followers: updatedFollowers,
            blogs: Object.entries(blogList).map(([blogId, details]) => ({
              blogId,
              blogName: blogDataMap[blogId]?.title || "Unknown Blog",
              dateTime: details.dateTime,
            })),
          });
          // Handle new follower notifications
          for (const followerId in followers) {
            if (followers.hasOwnProperty(followerId)) {
              const isDuplicate =
                Object.keys(followerList).includes(followerId);

              if (!isDuplicate) {
                const response2 = await fetch("/api/notifications", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userEmail: finalUser.email,
                    followerId,
                  }),
                });

                console.log("New follower notification sent:", response2.ok);
              } else {
                console.log(
                  "Duplicate follower notification found, not sending again."
                );
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

    const interval = setInterval(updateNotifications, 1000);

    return () => clearInterval(interval);
  }, [finalUser]);

  return (
    <div className="h-screen p-4">
      <div className={`${theme?"bg-gray-100 text-black":"bg-[#111111] text-white"} p-4 rounded-xl flex flex-col gap-4 `}>
        <h2 className="text-xl text-center">Notifications</h2>
        <hr className={`${theme?"border-gray-300 text-black":"bg-[#3c3c3c] text-white"} w-full border-2 my-4`} />
        <ul>
          {notifications.followers.map(
            ({ followerId, followerName, dateTime }) => (
              <Link href={`/profile?id=${followerId}`} key={followerId} target="_blank">
              <li key={followerId} className={`${theme?"bg-gray-200 text-black":"bg-[#3c3c3c] text-white"} py-3 px-2 rounded-xl `}>
                {followerName} has started following you.{" "}
                ({new Date(dateTime).toLocaleString()})
              </li>
              </Link>
            )
          )}
        </ul>
        <ul className="flex flex-col gap-4 ">
          {notifications.blogs.map(({ blogId, blogName, dateTime }) => (
            <Link href={`/blogs/${blogId}`} key={blogId} target="_blank">
            <li key={blogId} className={`${theme?"bg-gray-200 text-black":"bg-[#3c3c3c] text-white"} py-3 px-2 rounded-xl`}>
              <span className="flex gap-1">
                Read a blog on the topic{" "}
                <span dangerouslySetInnerHTML={{ __html: blogName }}></span>
                ({new Date(dateTime).toLocaleString()})
              </span>
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NotificationTab;
