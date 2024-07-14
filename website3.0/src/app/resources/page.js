'use client'
import { Context } from "@context/store";
import ResourcesPage from "@pages/ResourcesPage";
import { useContext } from "react";

export default function Contact() {
  let {theme,setIsPopup,setMsg,isLogin,finalUser,setFinalUser}=useContext(Context)
  return (
    <div>
      <ResourcesPage theme={theme} finalUser={finalUser} setFinalUser={setFinalUser} isLogin={isLogin} setMsg={setMsg} setIsPopup={setIsPopup} />
    </div>
  );
}
