"use client";
import React, { useEffect, useRef, useState ,useContext} from "react";

import dynamic from "next/dynamic";

const CreateBlog = dynamic(() => import("@components/blogpage/CreateBlog"), { ssr: false });

export default function blogPage() {
  return (
    <CreateBlog/>
  );
}
