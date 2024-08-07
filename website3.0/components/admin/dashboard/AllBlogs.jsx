"use client"
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Image from 'next/image';

export default function AllBlogs() {
 let [blogs,setBLogs]=useState([])
 useEffect(()=>{
    fetchBlogs()
 },[])
 async function fetchBlogs() {
  try {
    const response = await fetch('/api/blog', { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Error fetching blogs: ${response.statusText}`);
    }

    const data = await response.json();
    setBLogs(data.data);
  } catch (error) {
    console.error('Error in fetchBlogs:', error);
  }
}

async function handleBlogDelete(blog) {
  try {
    const response = await fetch('/api/blog', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: blog._id })
    });

    if (!response.ok) {
      throw new Error(`Error deleting blog: ${response.statusText}`);
    }

    // Optionally refresh the blog list here if needed
    // You can also call fetchBlogs() to reload the blogs without a full page reload
    await fetchBlogs(); 

  } catch (error) {
    console.error('Error in handleBlogDelete:', error);
  }
}

    return (
    <div className="">
    <div className="flex w-[100%] flex-col gap-4 flex-wrap lg:flex-nowrap justify-center ">
        {
            blogs.map((data)=>{
                if(!data.isDeleted){

                    return  <div className='w-[100%] flex gap-4 '> <Image
                    src={data.image}   // Dynamic image source
                    alt="Dynamic Image"
                    layout="fill"      // Fills the container
                    objectFit="contain" // Ensures the image scales correctly within the container
                    draggable="false" // Prevents image dragging
                  /><p className='h-[100%] flex flex-col w-[60%]' ><p dangerouslySetInnerHTML={{__html:data.title}}/><p  dangerouslySetInnerHTML={{__html:data.description}}/></p ><div className="flex h-[100%] items-center flex-row gap-[10px] justify-center cursor-pointer" onClick={()=>handleBlogDelete(data)}> <FaTrash className="hover:cursor-pointer" color="red" onClick={()=>handleBlogDelete(data)}/>Delete Post</div></div>
                }
            })
        }
    </div>
  </div>
  )
}
