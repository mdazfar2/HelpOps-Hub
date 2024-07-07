'use client'

import { set } from "mongoose"
import { createContext,useContext,useEffect,useState } from "react"
export let Context=createContext()
export const GlobalContext=({children})=>{
        let [userName,setUserName]=useState('')
        let [userEmail,setUserEmail]=useState('')
        let [userImage,setUserImage]=useState('')
        let [isLogin,setIsLogin]=useState(false)
        let [theme,setTheme]=useState(true)
        useEffect(()=>{

            setUserEmail(localStorage.getItem('userEmail')||'')
            setUserName(localStorage.getItem('userName')||'')
            setUserImage(localStorage.getItem('userImage')||'')
        },[])
        useEffect(()=>{
console.log(theme)
        },[theme])
  return <Context.Provider value={{userName,setUserName,userEmail,setUserEmail,userImage,setUserImage,setIsLogin,isLogin,theme,setTheme}}>
        {children}
    </Context.Provider>
}