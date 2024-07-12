"use client";
import AutoResizeTextarea from "@components/Textarea";
import React, { useState } from "react";
import "../stylesheets/blog.css";
import { FaPlus, FaImage } from "react-icons/fa";

export default function Createblog({ theme }) {
  const [isShow, setIsShow] = useState(false);
    const [showInTitle,setShowInTitle]=useState(true)
  function handleClick() {
    setIsShow(!isShow);
  }
function changeShow(e){
    console.log(e.currentTarget.id)
    if(e.currentTarget.id=='title'){
        setShowInTitle(true)
    }else{
        setShowInTitle(false)
    }
}
  return (
    <div className={`flex flex-row items-start max-md:flex-col  ${theme ? "bg-slate-100" : "bg-[#1e1d1d]"} min-h-[100vh] w-[100vw] h-[auto] pt-32 pb-10`}>
      <div
        className={`flex relative flex-col rounded-xl pt-10 pb-10 border-dashed ${
          theme ? "border-black" : "border-white"

        } pl-1 max-sm:pl-6 max-md:pl-4 mt-0  gap-16 items-end mr-0 w-[60vw] max-sm:w-[98vw] max-md:w-[80vw] m-auto h-auto`}
      >
        <div className="h-20 w-[90%] flex  relative rounded-full gap-4  items-center">
      {showInTitle&&    
      <div className="h-20 items-center gap-3  absolute left-[-5%] max-md:left-[-8%] max-sm:left-[-10%] flex flex-col justify-center">
            <div
              className={`w-[30px]  h-[30px] border ${
                theme ? "border-black" : "border-white"
              } flex justify-center items-center rounded-full`}
              onClick={handleClick}
            >
              <FaPlus fill={theme ? "black" : "white"} />
            </div>
            {isShow && (
              <div className="border border-purple-600 w-[30px] h-[30px] flex justify-center items-center rounded-full">
                <FaImage size={"1rem"} fill="blue" />
              </div>
            )}
            </div>}
          <div className={`h-[100%] w-[1px] ${theme ? "bg-black" : "bg-white"}`}></div>
          <input
            style={{
              fontFamily:
                "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif"
            }}
            placeholder="Title"
            onClick={(e)=>{changeShow(e)}}
            id="title"
            className={` w-[100%]  w-[100%] placeholder:text-[#b3b3b1] focus:outline-none h-[100%] bg-transparent  text-4xl font-georgia ${
              theme ? "text-black" : "text-white"
            }`}
          ></input>
        </div>
        <div className="h-auto w-[90%] rounded-full mt-8 gap-4 flex items-center">
        {!showInTitle&&    
      <div className="h-20 items-center gap-3  absolute left-[5%] flex flex-col ">
            <div
              className={`w-[30px]  h-[30px] border ${
                theme ? "border-black" : "border-white"
              } flex justify-center items-center rounded-full`}
              onClick={handleClick}
            >
              <FaPlus fill={theme ? "black" : "white"} />
            </div>
            {isShow && (
              <div className="border border-purple-600 w-[30px] h-[30px] flex justify-center items-center rounded-full">
                <FaImage size={"1rem"} fill="blue" />
              </div>
            )}
            </div>}
          <AutoResizeTextarea
            placeholder="Write Something Amazing"
            className={`h-auto placeholder:text-[#b3b3b1] overflow-hidden bg-transparent placeholder:font-cursive text-4xl focus:outline-none ${
              theme ? "text-black" : "text-white"
            }`}
            theme={theme}
            show={changeShow}
          />
        </div>
        {/* <div className="flex flex-col max-sm:flex-col max-sm:gap-5 gap-10 w-[90%]">
          <div className="h-14 flex justify-center w-[100%] max-sm:w-[100%] pr-5">
            <input
              style={{
                fontFamily:
                  "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif",
              }}
              placeholder="Type"
              className={`  w-[100%]  w-[100%] placeholder:text-[#b3b3b1] focus:outline-none h-[100%] bg-transparent placeholder:font-cursive text-4xl ${
                theme ? "text-black" : "text-white"
              }`}
            ></input>
          </div>
          <div className="h-14 flex justify-center w-[100%] max-sm:w-[100%] pr-5">
            <input
              style={{
                fontFamily:
                  "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif",
              }}
              placeholder="Length"
              className={`placeholder:text-[#b3b3b1]  w-[100%]  border-dashed  w-[100%] focus:outline-none h-[100%] bg-transparent placeholder:font-cursive text-4xl ${
                theme ? "text-black" : "text-white"
              }`}
            ></input>
          </div>
        </div> */}
        {/* <div className="w-[100%] flex max-sm:flex-col max-sm:gap-5 h-auto items-center">
          <div className="w-[50%] max-sm:w-[100%] min-w-[300px] justify-center flex gap-4 items-center">
            <div className="checkbox-wrapper">
              <input id="_checkbox-26" type="checkbox" />
              <label htmlFor="_checkbox-26">
                <div className="tick_mark"></div>
              </label>
            </div>
            <span
              style={{
                fontFamily:
                  "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif",
              }}
              className={theme ? "text-black" : "text-white"}
            >
              Must Read
            </span>
          </div>
          <div className="w-[50%] max-sm:w-[100%] min-w-[300px] flex gap-4 items-center justify-center">
            <div className="checkbox-wrapper">
              <input id="_checkbox-27" type="checkbox" />
              <label htmlFor="_checkbox-27">
                <div className="tick_mark"></div>
              </label>
            </div>
            <span
              style={{
                fontFamily:
                  "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif",
              }}
              className={theme ? "text-black" : "text-white"}
            >
              Editors Pick
            </span>
          </div>
        </div> */}
       
      </div>
      <div className="w-[20%] justify-start max-md:justify-center max-md:w-[100%] flex">

            <button
              className={`button3   right-[-100px]  ${theme?"bg-[#7a6969] text-white":"bg-black border-2 border-white  text-white"}`}
              style={{
                fontFamily:
                  "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif",
              }}
            >
              Publish
            </button>
      </div>

    </div>
  );
}
