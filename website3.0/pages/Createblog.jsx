"use client";
import AutoResizeTextarea from "@components/Textarea";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaImage } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Createblog({ theme }) {
  const [isShow, setIsShow] = useState(false);
  const [showInTitle, setShowInTitle] = useState(true);
  let [isImg, setIsImg] = useState(false);
  let title=useRef()
  const textareaRef = useRef('');
  const [height, setHeight] = useState('auto');
let router=useRouter()
  useEffect(() => {
    const handlePaste = (event) => {
        if (event.ctrlKey && event.key === 'v') {
            event.preventDefault();
            pasteImg();
        }
    };

    window.addEventListener('keydown', handlePaste);

    return () => {
        window.removeEventListener('keydown', handlePaste);
    };
}, []);

  const pasteImg = async ()=> {
    try {
        const clipboardItems = await navigator.clipboard.read()
        const blobOutput = await clipboardItems[0].getType('image/png')
        const data =await convertToBase64(blobOutput)
        setIsImg(data)
    } catch(e) {
        console.log(e);
    }
}

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  async function handleImageUpload(e){
    let img=e.target.files[0]
    img=await convertToBase64(img)
    setIsImg(img)
  }
  function handleClick() {
    setIsShow(!isShow);
  }
  function changeShow(e) {
    console.log(e.currentTarget.id);
    if (e.currentTarget.id == "title") {
      setShowInTitle(true);
    } else {
      setShowInTitle(false);
    }
  }
 async function handleFormSubmit(){
  let user=await JSON.parse(localStorage.getItem("finalUser"))
    await fetch('/api/blog',{
      method:"POST",
      body:JSON.stringify({
        title:title.current.value,
        image:isImg,
        type:'blog',
        description:textareaRef.current.value,
        length:textareaRef.current.value.length,
        authorName:user.name,
        authorImage:user.image1,
        authorCaption:user.caption,
        github:user.gthub,
        linkedin:user.linkedin,
        authorTitle:user.designation

      })
    })
    router.push('/blogs')
  }
  useEffect(() => {
    setHeight(`${textareaRef.current.scrollHeight}px`);
  }, [textareaRef.current.value]);

  const handleInput = (event) => {
    setHeight('auto');
    setHeight(`${event.target.scrollHeight}px`);
  };
  return (
    <div
      className={`flex flex-row items-start max-md:flex-col  ${
        theme ? "bg-slate-100" : "bg-[#1e1d1d]"
      } min-h-[100vh] w-[100vw] h-[auto] pt-32 pb-10`}
    >
      <div
        className={`flex relative flex-col rounded-xl pt-10 pb-10 border-dashed ${
          theme ? "border-black" : "border-white"
        } pl-1 max-sm:pl-6 max-md:pl-4 mt-0  gap-16 items-end mr-0 w-[60vw] max-sm:w-[98vw] max-md:w-[80vw] m-auto h-auto`}
      >

        <div className="h-20 w-[90%] flex  relative rounded-full gap-4  items-center">
          {showInTitle && (
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
                <label htmlFor="img-input" className="border border-purple-600 w-[30px] h-[30px] flex justify-center items-center rounded-full">
                  <FaImage size={"1rem"} fill="blue" />
                </label>
              )}
            </div>
          )}
          <div
            className={`h-[100%] w-[1px] ${theme ? "bg-black" : "bg-white"}`}
          ></div>
          <input
            style={{
              fontFamily:
                "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif",
            }}
            placeholder="Title"
            onClick={(e) => {
              changeShow(e);
            }}
            id="title"
            ref={title}
            className={` w-[100%]  w-[100%] placeholder:text-[#b3b3b1] focus:outline-none h-[100%] bg-transparent  text-4xl font-georgia ${
              theme ? "text-black" : "text-white"
            }`}
          ></input>
        </div>
        <input className="hidden" onChange={handleImageUpload} type="file" id="img-input"></input>
        <div htmlFor="img-input" className="h-auto m-auto">{isImg && <img src={isImg}></img>}</div>
        <div className="h-auto w-[90%] rounded-full mt-8 gap-4 flex items-center">
          {!showInTitle && (
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
            </div>
          )}
          <textarea
     onClick={changeShow}
      ref={textareaRef}
      style={{ height }}
      onInput={handleInput}
      placeholder='Write Something Amazing'
  
      className={`h-auto  w-[100%]  border-b-white ${theme?"placeholder:text-[#b3b3b1]":"placeholder:text-[#b3b3b1] text-white "}  max-sm:text-3xl  overflow-hidden bg-transparent font-georgia text-4xl focus:outline-none`} 
    />
          {/* <AutoResizeTextarea
            placeholder="Write Something Amazing"
            className={`h-auto placeholder:text-[#b3b3b1] overflow-hidden bg-transparent placeholder:font-cursive text-4xl focus:outline-none ${
              theme ? "text-black" : "text-white"
            }`}
            theme={theme}
            ref={desc}
            show={changeShow}
          /> */}
        </div>
      </div>
      <div className="w-[20%] justify-start max-md:justify-center max-md:w-[100%] flex">
        <button
        onClick={handleFormSubmit}
          className={`p-2  pl-4 pr-4 rounded-md right-[-100px]  ${
            theme
              ? "bg-[#2e87b7] text-white"
              : "bg-black border-2 border-white  text-white"
          }`}
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
