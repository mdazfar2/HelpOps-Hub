"use client"
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

export default function AllBlogs() {
 let [blogs,setBLogs]=useState([])
 useEffect(()=>{
    fetchBlogs()
 },[])
 async function fetchBlogs(){
    let data=await fetch('/api/blog',{method:"GET"})

    data=await data.json()
    
    setBLogs(data.data)
 }
 async function handleBlogDelete(blog){
    await fetch('/api/blog',{
      method:"DELETE",
      body:JSON.stringify({
        id:blog._id
      })
    })
    window.location.reload()
  }
    return (
    <div className="">
    <div className="flex w-[100%] flex-col gap-4 flex-wrap lg:flex-nowrap justify-center ">
        {
            blogs.map((data)=>{
                if(!data.isDeleted){

                    return  <div className='w-[100%] flex gap-4 '><img width={'130px'} height={'130px'} src={data.image}/><p className='h-[100%] flex flex-col w-[60%]' ><p dangerouslySetInnerHTML={{__html:data.title}}/><p  dangerouslySetInnerHTML={{__html:data.description}}/></p ><div className="flex h-[100%] items-center flex-row gap-[10px] justify-center cursor-pointer" onClick={()=>handleBlogDelete(data)}> <FaTrash className="hover:cursor-pointer" color="red" onClick={()=>handleBlogDelete(data)}/>Delete Post</div></div>
                }
            })
        }
    </div>
  </div>
  )
}
