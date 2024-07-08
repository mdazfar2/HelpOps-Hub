'use client'

import { set } from "mongoose"
import { createContext,useContext,useEffect,useState } from "react"
export let Context=createContext()
export const GlobalContext=({children})=>{
        let [userName,setUserName]=useState('')
        let [userEmail,setUserEmail]=useState('')
        let [userImage,setUserImage]=useState('')
        let [userDesignation,setUserDesignation]=useState('')
        let [userCaption,setUserCaption]=useState('')
        let [userLinkedin,setUserLinkedin]=useState('')
        let [userGithub,setUserGithub]=useState('')

        let [isLogin,setIsLogin]=useState(false)
        let [finalUser,setFinalUser]=useState({})
        let [theme,setTheme]=useState(true)
       
        useEffect(()=>{
console.log(theme)
        },[theme])
  return <Context.Provider value={{setFinalUser,finalUser,userLinkedin,setUserLinkedin,userGithub,setUserGithub,setUserDesignation,userDesignation,userCaption,setUserCaption,userName,setUserName,userEmail,setUserEmail,userImage,setUserImage,setIsLogin,isLogin,theme,setTheme}}>
        {children}
    </Context.Provider>
}