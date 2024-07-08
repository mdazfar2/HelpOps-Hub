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
        let [user,setUser]=useState({})
        let [theme,setTheme]=useState(true)
        useEffect(()=>{

            setUserEmail(localStorage.getItem('userEmail')||'')
            setUserName(localStorage.getItem('userName')||'')
            setUserImage(localStorage.getItem('userImage')||'')
            setUser(localStorage.getItem('user'))
            setUserDesignation(localStorage.getItem('userDesignation')||"")
            setUserCaption(localStorage.getItem('userCaption')||"")
            setUserDesignation(localStorage.getItem('userLinkedin')||"")
            setUserDesignation(localStorage.getItem('userGithub')||"")

        },[])
        useEffect(()=>{
console.log(theme)
        },[theme])
  return <Context.Provider value={{userLinkedin,setUserLinkedin,userGithub,setUserGithub,setUserDesignation,userDesignation,userCaption,setUserCaption,userName,setUserName,userEmail,setUserEmail,userImage,setUserImage,setIsLogin,isLogin,theme,setTheme}}>
        {children}
    </Context.Provider>
}