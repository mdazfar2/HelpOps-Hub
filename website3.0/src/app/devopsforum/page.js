'use client'
import ForumPost from "@components/forumpage/ForumPost";
import { Context } from "@context/store";
import ForumPage from "@pages/ForumPage";
import { useContext, useEffect, useState } from "react";

export default function DevopsForum() {
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
  return (
    <div className="w-[100vw]">
     {!id && <ForumPage  theme={theme} finalUser={finalUser} setFinalUser={setFinalUser} />
     } {id && <ForumPost theme={theme} finalUser={finalUser}  id={id}/>
}
    </div>
  );
}
