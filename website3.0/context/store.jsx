'use client'

import { set } from "mongoose"
import { createContext,useContext,useEffect,useState } from "react"
export let Context=createContext()
export const GlobalContext=({children})=>{
        let [userName,setUserName]=useState('')
        let [userEmail,setUserEmail]=useState('')
        let [userImage,setUserImage]=useState('')
        let [isLogin,setIsLogin]=useState(false)
        useEffect(()=>{

            setUserEmail(localStorage.getItem('userEmail')||'')
            setUserName(localStorage.getItem('userName')||'')
            setUserImage(localStorage.getItem('userImage')||'')
        },[])
  return <Context.Provider value={{userName,setUserName,userEmail,setUserEmail,userImage,setUserImage,setIsLogin,isLogin}}>
        {children}
    </Context.Provider>
}