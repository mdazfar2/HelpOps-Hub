'use client'
import { Context } from "@context/store";
import ResourcesPage from "@pages/ResourcesPage";
import { useContext } from "react";

export default function Resource() {
  let {theme,setIsPopup,setMsg,setColor,isLogin,finalUser,setFinalUser}=useContext(Context)
  return (
    <div>
      <ResourcesPage theme={theme} setColor={setColor} finalUser={finalUser} setFinalUser={setFinalUser} isLogin={isLogin} setMsg={setMsg} setIsPopup={setIsPopup} />
    </div>
  );
}
