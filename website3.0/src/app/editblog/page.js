"use client";
import React, { useEffect, useRef, useState ,useContext} from "react";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Editblog = dynamic(() => import("@components/blogpage/Editblog"), { ssr: false });

export default function page() {
    const pathname = usePathname(); // Get current path
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
      
     
    }, []);
  return (
    <Editblog id={id}/>
  )
}
