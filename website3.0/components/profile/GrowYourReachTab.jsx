import React, { useContext, useEffect, useState } from "react";
import { Context } from "@context/store";
import { useRouter } from "next/navigation";

function GrowYourReachTab() {
  const { finalUser, theme } = useContext(Context);
  const [nonFollowers, setNonFollowers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("/api/alluser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const allUsers = data.msg;


          if (finalUser && finalUser.following) {
            const followingIds = Object.keys(finalUser.following);
            const nonFollowersList = allUsers.filter(
              user => !followingIds.includes(user._id) && user._id !== finalUser._id
            );

            setNonFollowers(nonFollowersList);
          }
        } else {
          console.error("Error fetching all users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, [finalUser]);

  const handleFollowClick = (userId) => {
    router.push(`/profile?id=${userId}`);
  };

  return (
    <div className="min-h-screen p-10">
      <div className= {`${theme?"bg-gray-100 text-black":"bg-[#111111] text-white"} w-full rounded-xl min-h-96 text-2xl text-center p-5`}>
        Grow Your Reach
        <div className="mt-10 text-xl">
          {nonFollowers.length > 0 ? (
            <ul>
              {nonFollowers.map(user => (
                <li key={user._id} className={`${theme?"bg-gray-200 text-black":"bg-[#383838] text-white"} py-3 px-2 rounded-xl mb-2 flex justify-between items-center`}>
                  <div className="flex items-center">
                    <img src={user.image1} alt={user.name} className="w-10 h-10 rounded-full inline-block mr-3" />
                    {user.name}
                  </div>
                  <a
                    href={`/profile?id=${user._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme?"bg-[#6089a4]":"bg-[#979797]"}  text-lg max-md:text-sm text-white px-4 py-2 rounded-md`}
                  >
                    Open Profile
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No new users to Show.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GrowYourReachTab;
