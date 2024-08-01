'use client'
// import ForumPost from "@components/forumpage/ForumPost";
import { Context } from "@context/store";
import ForumPage from "@pages/ForumPage";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
const ForumPost = dynamic(() => import("@components/forumpage/ForumPost"), { ssr: false });

export default function DevopsForum() {
  let {theme,finalUser,setFinalUser,setIsPopup,setMsg}=useContext(Context)
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
  return (
    <div className="w-[100vw]">
     {!id && <ForumPage setIsPopup={setIsPopup} setMsg={setMsg}  theme={theme} finalUser={finalUser} setFinalUser={setFinalUser} />
     } {id && <ForumPost setIsPopup={setIsPopup} setMsg={setMsg} theme={theme} finalUser={finalUser}  id={id}/>
}
    </div>
  );
}
