import React, { useContext, useEffect, useState } from "react";
import { Context } from "@context/store";

export default function FollowersTab({ setFollowTab, FollowTab, id }) {
 // Destructure necessary values from context
const { finalUser, setFinalUser, theme } = useContext(Context);

// State to manage the visibility of certain UI elements
const [firstShow, setFirstShow] = useState(true);

// State to store user details fetched from the server
const [userDetails, setUserDetails] = useState({});

// Fetch user data when the component mounts or `id` changes
useEffect(() => {
  fetchData();
}, [id]);

// Fetch user details from the server based on `id`
async function fetchData() {
  try {
    const response = await fetch('/api/getuser', {
      method: "POST",
      body: JSON.stringify({
        id: id || finalUser._id, // Use the provided `id` or fallback to `finalUser._id`
      }),
    });
    const data = await response.json();
    setUserDetails(data.msg);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Handle following a user
async function handleFollow(userId) {
  try {
    const updatedData = await fetch("/api/setfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        other_user_id: finalUser.email, // Use `finalUser.email` to identify the current user
      }),
    }).then(res => res.json());
    .catch(err => console.error(err))