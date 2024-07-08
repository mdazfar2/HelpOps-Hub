'use client'
import React, { useContext } from 'react'
import Logout from '@components/Logout'
import ProfilepageDetails from '@components/ProfilepageDetails'
import { Context } from '@context/store'

const profile = () => {
  let {theme}=useContext(Context)
  return (
    <div className={`main ${theme?"":"  bg-[#1c1a1a] "} `}>
      <div className={`relative flex flex-col items-center w-1/2 min-w-[350px] pt-20 py-10 px-4 md:p-20 mt-[250px] rounded-[10px]  ${theme?"shadow-[5px_5px_15px_rgba(0,0,0,0.195)]":"shadow-md shadow-white"} ${theme?"bg-[#fffaf4] border-2 border-black border-dashed":"bg-[#1e1d1d] border-2 border-white border-dashed"}`}>
        <ProfilepageDetails />
      <div className='mt-6 '>

        <Logout />
        </div>
      </div>
    </div>
  )
}

export default profile