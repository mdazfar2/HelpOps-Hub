'use client'
import React, { useContext } from 'react'
import { Context } from '@context/store';
import { useScroll } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Logout() {
    let {setUserEmail,setUserImage,setUserName,setIsLogin}=useContext(Context)
    let router=useRouter()
    let session=useSession()
    async function handleLogout(){
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userImage');
        setUserEmail('')
        setUserImage('')
        setUserName('')
        if(session.status=="authenticated"){
          router.push('http://localhost:3000/api/auth/signout?csrf=true')
        }else{
        setIsLogin(false)
        window.location.reload()
        }
        }
  return (
    <button className='w-[200px]  h-[52px] flex justify-center content-center items-center p-2 relative  bg-[#098CCD] text-white mt-4 border-none rounded-[18px] cursor-pointer  m-auto gap-[18px] text-[19px] font-semibold '  onClick={handleLogout}>Logout</button>

  )
}