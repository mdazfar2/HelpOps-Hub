"use client"
import React, { createContext, useState } from 'react'
import {SessionProvider} from 'next-auth/react'
export let Context=createContext()
export default function Authprovider({children}) {
  let [name,setName]=useState('Ayushmaan')
  return (
    <Context.Provider value={name}>

    <SessionProvider>
        {children}
    </SessionProvider>
    </Context.Provider>
  )
}
