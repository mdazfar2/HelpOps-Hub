"use client"
import { Context } from '@context/store'
import React, { useContext, useEffect, useState } from 'react'

export default function DeletedBlogs() {
   // Destructure context values for theme and finalUser
let { theme, finalUser } = useContext(Context);

// State to manage the list of blogs
let [blogs, setBlogs] = useState([]);

// State to handle errors (initialize with an empty string)
let [error, setError] = useState('');

// Fetch blogs on component mount
useEffect(() => {
  // Async function to fetch blogs from the server
  const fetchBlogs = async () => {
    try {
      // Send GET request to fetch blog data
      let response = await fetch("/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Check if the response is OK (status code in the range 200-299)
      if (response.ok) {
        // Parse the JSON data from the response
        const data = await response.json();
        // Set the blogs state with the fetched data
        setBlogs(data.data);
      } else {
        // Set error message if response is not OK
        setError("Failed to fetch blogs.");
      }
    } catch (err) {
      // Set error message if an exception is thrown
      setError("An error occurred while fetching blogs.");
    }
  };

  // Call the fetchBlogs function to fetch data
  fetchBlogs();
}, []); // Empty dependency array means this effect runs only once when the component mounts

// Function to handle blog recovery by ID
async function handleRecoverBlog(id) {
  try {
    // Send PUT request to recover the blog with the specified ID
    let res = await fetch('/api/recoverblog', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });

    // Check if the response is OK (status code in the range 200-299)
    if (res.ok) {
      // Reload the page to reflect the changes
      window.location.reload();
    } else {
      // Handle error if response is not OK
      setError("Failed to recover the blog.");
    }
  } catch (err) {
    // Handle error if an exception is thrown
    setError("An error occurred while recovering the blog.");
  }
}
  return (
    <div
      className={`${
        theme ? " text-black" : "bg-[#1e1d1d] text-white"
      } p-[30px] max-sm:p-[10px] relative overflow-hidden  rounded-lg max-sm:h-[auto] w-full h-full`}
    >      <div className="w-[100%] gap-[20px] max-lg:flex-col flex h-[100%] justify-between max-md:justify-center max-md:gap-[20px]">
<div className='flex flex-col gap-3 w-[100%] h-[auto] p-[20px] '>

        {
          blogs.map(data=>{
            if(data.authorId==finalUser._id && data.isDeleted){
              return <div className='flex gap-5'>
                <img src={data.image}  height={'100px'} width={'100px'} />
             <div className='flex flex-col justify-center w-[60%]'>
                <p dangerouslySetInnerHTML={{__html:data.title}}/>
                <p dangerouslySetInnerHTML={{__html:data.description}}/>
              </div>
              <p className='flex items-center cursor-pointer' onClick={()=>handleRecoverBlog(data._id)}>Recover Blog</p>
                
                </div>
            }
          })
        }
</div>
</div>    </div>
  )
}
