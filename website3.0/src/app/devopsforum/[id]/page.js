"use client"
import ForumPost from '@components/forumpage/ForumPost'
import { Context } from '@context/store'
import React, { useContext } from 'react'

function page() {
  let {theme,finalUser,setFinalUser}=useContext(Context)

  return (
    <div>
      <ForumPost theme={theme}/>
    </div>
  )
}

export default page

