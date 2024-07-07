'use client'
import AboutPage from "@pages/AboutPage";
import { Context } from "@context/store";
import { useContext } from "react";
export default function About() {
  const {theme}=useContext(Context)
  return (
    <div>
      <AboutPage theme={theme}/>
    </div>
  );
}
