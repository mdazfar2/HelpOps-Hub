"use client"
import ForumPost from '@components/forumpage/ForumPost'
import { Context } from '@context/store'
import React, { useContext, useEffect, useState } from 'react'

function page() {
  let {theme,finalUser,setFinalUser}=useContext(Context)
  let [id,setId]=useState('')
  useEffect(() => {
    // Function to get query parameters from URL
    const getUrlParameter = (name) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    };

    // Get the 'id' query parameter from the URL
    const idFromQuery = getUrlParameter('id');
          setId(idFromQuery);
      console.log(idFromQuery,'sdddddddddddd')
   
  }, []);

  // You can now use the id as needed, for example:
  console.log("Post ID:", id);
  return (
    <div>
     {id && <ForumPost theme={theme} id={id}/>
 } </div>
  )
}

export default page

