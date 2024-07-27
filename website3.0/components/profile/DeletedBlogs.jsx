"use client"
import { Context } from '@context/store'
import React, { useContext, useEffect, useState } from 'react'

export default function DeletedBlogs() {
    let {theme,finalUser}=useContext(Context)
    let [blogs,setBlogs]=useState([])
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          let response;
         
             response = await fetch("/api/blog", {
              method: "GET",
              headers: {
                "Content-Type": "application/json"              },
            });
        
       
         
          if (response.ok) {
            const data = await response.json();
            setBlogs(data.data);
          } else {
            setError("Failed to fetch blogs.");
          }
        } catch (err) {
          setError("An error occurred while fetching blogs.");
        }
      };
     
  
      fetchBlogs();
    }, []);
    async function handleRecoverBlog(id){
      let res=await fetch('/api/recoverblog',{
        method:"PUT",
        body:JSON.stringify({
          id:id
        })
      })
      window.location.reload()
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
