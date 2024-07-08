"use client";
import { Context } from "@context/store";
import HomePage from "@pages/HomePage";
import { useContext } from "react";
export default function Home() {
  let { theme } = useContext(Context);
  return (
    <div>
      <HomePage theme={theme}/>
    </div>
  );
}
