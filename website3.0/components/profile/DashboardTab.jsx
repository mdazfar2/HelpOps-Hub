"use client"

import { Context } from "@context/store";
import React, { useContext, useEffect, useState } from "react";
import {FaEye} from 'react-icons/fa6'
export default function DashboardTab() {
  const { finalUser, setFinalUser, theme } = useContext(Context);
  let [totalViews,setTotalViews]=useState(0)
  let [totalComment,setTotalComments]=useState(0)
  let [totalReactions,setTotalReactions]=useState(0)
  let [topViewsBlogs,setTopViewsBlogs]=useState([])
  let [relatedAllBlogs,setRelatedAllBlogs]=useState([])
  useEffect(()=>{ 
    fetchBlogs()
  },[])
  async function fetchBlogs(){
    let blogs=await fetch('/api/blog',{
      method:"GET"
    })
    blogs=await blogs.json()
    blogs=blogs.data
    let relatedBlogs=[]
    blogs.map((data)=>{
      data.comments.map((res)=>{
        if(res.user.username==finalUser.username){
          relatedBlogs.push(data)
        }
      })
    })
    setRelatedAllBlogs([...relatedBlogs])
    blogs=blogs.filter((data)=>data.authorId==finalUser._id)
    let views=0
    let reactions=0
    let comments=0
    let viewArray=[]
    blogs.map((res)=>{
      views+=res.views
      viewArray.push({blog:res,views:res.views})
    })
    blogs.map((res)=>reactions+=res.reactionList.length)
    blogs.map((res)=>comments+=res.comments.length)
    setTotalComments(comments)
    setTotalReactions(reactions)
    setTotalViews(views)
    viewArray.sort((a,b)=>a.views-b.views)
    
    setTopViewsBlogs([...viewArray])
  }
  function handleError(e){
    e.target.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAPFBMVEX///+hoaGenp6mpqaZmZn5+fn8/PzX19e3t7e/v7/t7e2pqann5+fCwsLg4OCtra3IyMjOzs7z8/OTk5PhY2O7AAAC2klEQVR4nO3a6XKbMBRAYUkIIRazvv+7VtjGYAKkA8xwac/3147rU7SgBKUAAAAAAAAAAAAAAAAAAAAAAAAAAFeKT3VpSpn6UzXthTG1OVdVXNfiHkbr81K0qcpLY2xTnCQrvb065rx/vv2XYjJBMU455458mqSYw4TEhCviyvpRH/sqUmJU4SNtdOSPbHpCYsL30D1jfLt/2kiJSc0zRke22X9/JSSmqN4x2uT7B5qQmCQaYrTNdn+akJhGf3S3jynz8crcfpi1ldXRq8VvLgBx2JBWXxQSoxL9vjR280CSal2r1RwhMc7V1oalzNpk6/Ystf1OtPqykJig9OHi+GJry0zsc/Fu1l6XE6Nc3Mabd81Z99qJdLYy0uTEbN/F9JXDXmTylTfJifntnWHCRMPyvTJtbhOjkm7cWHWy+JbbxMR20mKibGlY3iZmvHlbnzb3iHHqMR1kvXRhybhHjCrnLcYs/Ng9Yr4mzDBtft6QyowppseAsMVU5kfMc32eDTSJMXHVdZP/d6fqnxemV98hpj8OGD3WFPMJ8x5oev6T4mLCwvUcU9YPJ5eFCTOsz7NpIy7mc7Lphptjvxaj56cBcTHt5wDdvY5pzWqLnp/UZMWEkeUnc6I/QJdbLSYq5Mb0v6YZV2Gbhi+ql1bl8S3V9DcGwmLKr1uwLlF+syVcm1SNBzpZMe1sd7QrO8wkRjdKZIxz3kTf3/W3ln59Lj+LgKSYrwnz18z4VxBJMUW+oyXUPIYPEBQTL95O/kXM5xAtKCbd1xJqqvdNtpyYJtobE6ZNLCum2DnIXl63NVJi2t92x+1LEz2njZSY+kCKHqaNkJhk/4R516SxE/LsTJbbw09n1U7GlXGPKM+r/IAqj3wpIybOztBKGGbJaU+bFpfHGJ+exedXP9bY/yHzJGEduDJGNXl0qnT/IxHHtWVyqitbAAAAAAAAAAAAAAAAAAAAAAAAAOC/9we2/TfNeTuRKgAAAABJRU5ErkJggg=="
  }
  return (
    <div
      className={`${
        theme ? " text-black" : "bg-[#1e1d1d] text-white"
      } p-[30px] max-sm:p-[10px] relative overflow-hidden  rounded-lg max-sm:h-[auto] w-full h-full`}
    >
      <div className="w-[100%] gap-[20px] max-lg:flex-col flex h-[100%] justify-between max-md:justify-center max-md:gap-[20px]">
        <div className="flex w-[70%] max-lg:w-[100%]  h-[100%] flex-col">
          <div className="flex h-[50%] max-lg:gap-4 justify-around w-[100%]">
            <div
              className={`  max-sm:w-[90vw] max-sm:h-[20vh] h-[15vh] max-lg:w-[35vw] p-[15px] w-[20vw] rounded-3xl ${
                theme ? "bg-white" : "bg-black border-white" 
              } border-[1px] flex flex-col p-[15px]`}
            >
              <p className="text-[25px] font-bold ">{totalComment}</p>
              <p className="text-[20px]  text-gray-500 font-medium" style={{fontFamily:"georgia"}}>Total Post Comments</p>
            </div>
            <div
              className={` max-lg:w-[35vw]  max-sm:h-[20vh] max-sm:w-[90vw] h-[15vh] p-[15px] w-[20vw] rounded-3xl ${
                theme ? "bg-white" : "bg-black border-white" 
              } border-[1px] flex flex-col p-[15px]`}
            >
              <p className="text-[25px] font-bold ">{totalReactions}</p>
              <p className="text-[20px]  text-gray-500 font-medium" style={{fontFamily:"georgia"}}>Total Post Reactions</p>
            </div>
          </div>
          <div className={` ${theme?"bg-white":"bg-black"} border-[1px] border-white  p-[20px] overflow-scroll overflow-x-hidden rounded-3xl min-h-[50vh] max-h-[60vh] h-[auto] w-[100%]   mt-5 text-ellipsis  whitespace-nowrap   `}>
              <p className={` text-2xl ${theme?"text-gray-500":"text-gray-100"} font-semibold mb-[10px]`} style={{fontFamily:"georgia"}}>Blogs You Interacted With</p>
     
         
        {
          relatedAllBlogs.map((data)=>{

return        <div className={`flex gap-5 ${theme?"text-gray-800":"text-gray-300"} h-[100px] text-ellipsis items-center border-b-gray-400 border-b-[1px] p-[10px]  overflow-hidden whitespace-nowrap `}>

<img
  src={data.image}
  alt="blog"
  className="rounded-xl"
  width={70}
  height={70}
  onError={handleError}
/>
<div className="overflow-hidden truncate w-[100%] leading-snug text-ellipsis">
  <div
    dangerouslySetInnerHTML={{
      __html: data.title,
    }}
  ></div>
  <div
    className="max-w-full text-ellipsis overflow-hidden whitespace-nowrap " // Adjust as needed
    dangerouslySetInnerHTML={{
      __html:
        data.description,
    }}
  ></div>
</div>
</div>
          })
        }  


         
          </div>
        </div>
        <div className={`h-[75vh] w-[30%] max-lg:w-[100%]  items-center overflow-hidden  flex flex-col gap-2 ${theme?"bg-white":"bg-black"} border-[1px] border-white rounded-3xl `}>
        <div className="w-[100%] max-md:h-[132px] h-[150px] overflow-hidden  p-[25px]">
        <p className="text-[25px] font-bold ">{totalViews}</p>
        <p className="text-[20px]  text-gray-500 font-medium" style={{fontFamily:"georgia"}}>Total Views</p>
        </div>
        <div className="h-[2px] bg-gray-500  w-[60%]">
        </div>
        <div className="text-gray-500 h-[72%]  p-[15px] mt-1 w-[100%]">
        <p className={` text-2xl ${theme?"text-gray-500":"text-gray-100"} font-semibold mb-4`} style={{fontFamily:"georgia"}}>Top Views Blogs</p>
     {

      topViewsBlogs && topViewsBlogs.map((data)=>{

      return <div className="h-[70px] mb-5 p-[20px] pl-[0px]">
     <p className={`mb-2 items-center justify-between flex ${theme?"text-gray-800":"text-gray-300"}`}>
       <p  dangerouslySetInnerHTML={{ __html: data.blog.title }}/> <span className="flex h-[20px] items-center gap-2 text-[13px] "><FaEye color="gray"/> {data.views}</span>
      </p>    
          <p className={`mb-2 ${theme?"text-gray-800":"text-gray-300"} `} dangerouslySetInnerHTML={{ __html: data.blog.description }}/>
          <p className="border-b-gray-500 border-b-[1px] h-[1px] w-[90%] m-auto"></p>
        </div>
      })  
     }
       
        </div>
    
        </div>
      </div>
    </div>
  );
}
