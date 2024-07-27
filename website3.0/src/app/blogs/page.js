"use client";
import BlogPage from "@pages/BlogPage";
import { useContext, useEffect, useState } from "react";
import { Context } from "@context/store";
export default function blogPage() {
  const {theme,finalUser,searchedBlog,setFinalUser}=useContext(Context)
  let [subject,setSubject]=useState('')
  const getUrlParameter = (name) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  };
  // Get the 'id' query parameter from the URL
  useEffect(()=>{

    const idFromQuery = getUrlParameter("subject");
    setSubject(idFromQuery)
    
  },[])
  function updateUser(data){
    setFinalUser(data)
  }
  return (
    <div>
      <BlogPage subject={subject} theme={theme} updateUser={updateUser} finalUser={finalUser} setFinalUser={setFinalUser} searchedBlog={searchedBlog}/>
    </div>
  );
}
