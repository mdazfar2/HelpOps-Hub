'use client'
import React, { useContext } from 'react'
import Logout from '@components/Logout'
import ProfilepageDetails from '@components/ProfilepageDetails'
import { Context } from '@context/store'

const profile = () => {
  let {theme}=useContext(Context)
  return (
    <div className={`main ${theme?"":"bg-black"}  `}>
      <div className={`profile-page ${theme?"bg-[#fffaf4]":"bg-[#1c1a1a] "}`}>
        <ProfilepageDetails />
      <div className='mt-6 pb-6'>

        <Logout />
        </div>
      </div>
    </div>
  )
}

export default profile