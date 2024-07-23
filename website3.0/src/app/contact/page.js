'use client'
import { Context } from "@context/store";
import ContactPage from "@pages/ContactPage";
import { useContext } from "react";

export default function Contact() {
  const {theme, setIsPopup,setMsg,setColor}=useContext(Context)
  return (
    <div>

      <ContactPage theme={theme} setIsPopup={setIsPopup} setIsMsg={setMsg} setColor={setColor}/>
    </div>
  );
}
