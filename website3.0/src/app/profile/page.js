'use client'
import React from 'react'
import Logout from '@components/Logout'
import ProfilepageDetails from '@components/ProfilepageDetails'

const profile = () => {
  return (
    <div className="main">
      <div className="profile-page">
        <ProfilepageDetails/>
      <div>

        <Logout />
        </div>
      </div>
    </div>
  )
}

export default profile