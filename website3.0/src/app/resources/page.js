'use client'
import { Context } from "@context/store";
import ResourcesPage from "@pages/ResourcesPage";
import { useContext } from "react";

export default function Contact() {
  let {theme}=useContext(Context)
  return (
    <div>
      <ResourcesPage theme={theme} />
    </div>
  );
}
