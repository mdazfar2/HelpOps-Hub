'use client'
import { Context } from "@context/store";
import ContactPage from "@pages/ContactPage";
import { useContext } from "react";

export default function Contact() {
  const {theme}=useContext(Context)
  return (
    <div>

      <ContactPage theme={theme}/>
    </div>
  );
}
