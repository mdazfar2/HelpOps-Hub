"use client";
import { Context } from "@context/store";
import HomePage from "@pages/HomePage";
import { useContext } from "react";
export default function Home() {
  let { theme , setIsPopup,setMsg,setColor} = useContext(Context);
  return (
    <div>
      <HomePage setIsPopup={setIsPopup} setMsg={setMsg} setColor={setColor}  theme={theme}/>
    </div>
  );
}
