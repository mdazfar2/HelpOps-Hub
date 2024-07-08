"use client"
import { Context } from "@context/store";
import ResourcesDetailsPage from "@pages/ResourcesDetailsPage";
import { useContext } from "react";

export default function ResourcesDetails() {
  let {theme}=useContext(Context)
  return (
    <div>
      <ResourcesDetailsPage  theme={theme}/>
    </div>
  );
}