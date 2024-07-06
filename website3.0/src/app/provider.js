"use client"

import { SessionProvider } from "next-auth/react";
import { Content } from "next/font/google";
import { createContext } from "react";

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
