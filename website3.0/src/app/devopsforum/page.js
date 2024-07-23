'use client'
import { Context } from "@context/store";
import ForumPage from "@pages/ForumPage";
import { useContext } from "react";

export default function DevopsForum() {
  let {theme,finalUser,setFinalUser}=useContext(Context)
  return (
    <div>
      <ForumPage theme={theme} finalUser={finalUser} setFinalUser={setFinalUser} />
    </div>
  );
}
