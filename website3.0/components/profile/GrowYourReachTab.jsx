import React, { useContext, useEffect, useState } from "react";
import { Context } from "@context/store";
import { useRouter } from "next/navigation";

function GrowYourReachTab() {
 // Destructure necessary values from context
const { finalUser, theme } = useContext(Context);

// State to store users who are not followed by the current user
const [nonFollowers, setNonFollowers] = useState([]);

// Next.js router for navigation
const router = useRouter();

// Effect hook to fetch all users when `finalUser` changes
useEffect(() => {
  // Function to fetch all users from the server
  const fetchAllUsers = async () => {
    try {
      // Fetch all users from the API
      const response = await fetch("/api/alluser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Parse the response data
        const data = await response.json();
        const allUsers = data.msg;

        // Check if `finalUser` and its following list are available
        if (finalUser && finalUser.following) {
          // Extract the IDs of users that the current user is following
          const followingIds = Object.keys(finalUser.following);

          // Filter users to get those who are not followed by the current user
          let nonFollowersList = allUsers.filter(
            user => !followingIds.includes(user._id) && user._id !== finalUser._id
          );

          // Array to track unique user names
          let arr = [finalUser.name];
          
          // Further filter to ensure unique user names
          nonFollowersList = nonFollowersList.filter((dataa) => {
            if (!arr.includes(dataa.name)) {
              arr.push(dataa.name);
              return dataa;
            }
          });

          // Update the state with the filtered list of non-followers
          setNonFollowers(nonFollowersList);
        }
      } else {
        console.error("Error fetching all users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  // Call the function to fetch all users
  fetchAllUsers();
}, [finalUser]); // Dependency array: re-run effect if `finalUser` changes

// Function to handle clicking a user's profile
const handleFollowClick = (userId) => {
  // Navigate to the user's profile page
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
                    href={`/profile?id=${user.username}&&isView=true`}
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
