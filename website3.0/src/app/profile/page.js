'use client'
import React, { useContext } from 'react'
import Logout from '@components/Logout'
import ProfilepageDetails from '@components/ProfilepageDetails'
import { Context } from '@context/store'

const profile = () => {
  let {theme}=useContext(Context)
  return (
    <div className={`main ${theme?"":"  bg-[#1c1a1a] "} `}>
      <div className={`profile-page ${theme?"bg-[#fffaf4] border-2 border-black border-dashed":"bg-[#1e1d1d] border-2 border-white border-dashed"}`}>
        <ProfilepageDetails />
      <div className='mt-6 '>

        <Logout />
        </div>
      </div>
    </div>
  )
}

export default profile