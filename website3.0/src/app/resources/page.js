'use client'
import { Context } from "@context/store";
import ResourcesPage from "@pages/ResourcesPage";
import { useContext } from "react";

export default function Contact() {
  let {theme,setIsPopup,setMsg,isLogin}=useContext(Context)
  return (
    <div>
      <ResourcesPage theme={theme} isLogin={isLogin} setMsg={setMsg} setIsPopup={setIsPopup} />
    </div>
  );
}
