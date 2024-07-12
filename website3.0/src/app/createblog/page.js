"use client";
import BlogPage from "@pages/BlogPage";
import { useContext } from "react";
import { Context } from "@context/store";
import Createblog from "@pages/Createblog";
export default function blogPage() {
  const {theme}=useContext(Context)
  return (
    <div>
      <Createblog theme={theme}/>
    </div>
  );
}
