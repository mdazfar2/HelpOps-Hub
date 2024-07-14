'use client'
import React, { useContext, useEffect, useState } from 'react'
import Logout from '@components/Logout'
import ProfilepageDetails from '@components/ProfilepageDetails'
import { Context } from '@context/store'
import { usePathname } from 'next/navigation';
import {  } from 'next/router';

const profile = () => {
  let {theme, setIsPopup,setMsg,setColor,isLogin,finalUser}=useContext(Context)
  const pathname = usePathname(); // Get current path
  let [id,setId]=useState('')
  useEffect(() => {
    // Function to get query parameters from URL
    const getUrlParameter = (name) => {
      const params = new URLSearchParams(window.location.search);

      return params.get(name);
    };

    // Get the 'id' query parameter from the URL
    const idFromQuery = getUrlParameter('id');

    if (idFromQuery) {
        if(JSON.parse(localStorage.getItem('finalUser'))._id!==idFromQuery){
          setId(idFromQuery);
    }
    }
  }, []);
  return (
    <div className={`main ${theme?"":"  bg-[#1c1a1a] "} `}>
      <div className={`relative flex flex-col items-center w-1/2 min-w-[350px] pt-20 py-10 px-4 md:p-20 mt-[250px] rounded-[10px]  ${theme?"shadow-[5px_5px_15px_rgba(0,0,0,0.195)]":"shadow-md shadow-white"} ${theme?"bg-[#fffaf4] border-2 border-black border-dashed":"bg-[#1e1d1d] border-2 border-white border-dashed"}`}>
        <ProfilepageDetails isViewProfile={id.length>0} id={id}/>
      <div className='mt-6 '>

       {!id && <Logout />}
        </div>
      </div>
    </div>
  )
}

export default profile