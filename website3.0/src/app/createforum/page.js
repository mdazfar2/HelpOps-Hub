"use client"
import React from 'react';
import dynamic from "next/dynamic";
const CreateForum = dynamic(() => import("@components/forumpage/CreateForum"), { ssr: false });
function page() {
  return (
    <div>
      <CreateForum/>
    </div>
  )
}

export default page
