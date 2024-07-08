"use client";
import { Context } from "@context/store";
import TeamsPage from "@pages/TeamsPage";
import { useContext } from "react";
export default function Team() {
  let { theme } = useContext(Context);
  return (
    <div>
      <TeamsPage theme={theme}/>
    </div>
  );
}