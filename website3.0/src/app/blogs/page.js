"use client";
import BlogPage from "@pages/BlogPage";
import { useContext } from "react";
import { Context } from "@context/store";
export default function blogPage() {
  const {theme}=useContext(Context)
  return (
    <div>
      <BlogPage theme={theme}/>
    </div>
  );
}
