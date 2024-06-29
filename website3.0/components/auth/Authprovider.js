"use client"
import React from 'react'
import {SessionProvider} from 'next-auth/react'
export default function Authprovider({children}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
