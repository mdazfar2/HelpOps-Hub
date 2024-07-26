import "../../stylesheets/editor.css";
import React, { useEffect, useRef, useState, useContext } from "react";
import { FaPlus, FaImage, FaTrash } from "react-icons/fa";

import ReactQuill, { Quill } from "react-quill";
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Context } from "@context/store";
import { usePathname, useRouter } from "next/navigation";
import { FaBucket } from "react-icons/fa6";

export default function Editblog({ id }) {
  const { theme, isLogin, setColor, setMsg, setIsPopup, finalUser } =
    useContext(Context);
  const textareaRef = useRef("");

  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");
  const [isImg, setIsImg] = useState("");
  const quillRef = useRef(null);
  const quillRef1 = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [showInTitle, setShowInTitle] = useState(true);
  let router = useRouter();

  async function fetchData() {
    let data = await fetch(`/api/getblog`,{
      method:"POST",
      body:JSON.stringify({id:id})
    });
    data = await data.json();
  
    setValue(data.title);
    setDesc(data.description);
    setIsImg(data.image);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handlePaste = (event, setValueCallback, setImgCallback) => {
      event.preventDefault(); // Prevent the default paste behavior

      const clipboardData = event.clipboardData;
      const items = clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.onload = async (e) => {
            // Handle image data
            const imageSrc = e.target.result;
            // For demonstration, we'll just log the image source
            setImgCallback(imageSrc);
          };
          reader.readAsDataURL(file);
        } else if (
          item.kind === "string" &&
          (items.length > 1 ? items[1].kind !== "file" : true)
        ) {
          item.getAsString((text) => {
            // Handle text data
            setValueCallback((prevContent) => prevContent + text);
          });
        }
      }
    };

    const quill = quillRef.current?.getEditor();
    const quill1 = quillRef1.current?.getEditor();

    if (quill) {
      const handlePasteForQuill = (event) => {
        handlePaste(event, setValue, setIsImg);
      };
      const handlePasteForQuill1 = (event) => {
        handlePaste(event, setDesc, setIsImg);
      };
      quill1.root.addEventListener("paste", handlePasteForQuill1);

      quill.root.addEventListener("paste", handlePasteForQuill);

      return () => {
        quill.root.removeEventListener("paste", handlePasteForQuill);
        quill1.root.removeEventListener("paste", handlePasteForQuill1);
      };
    }

    if (quill1) {
      const handlePasteForQuill1 = (event) => {
        handlePaste(event, setDesc, setIsImg);
      };
      quill1.root.addEventListener("paste", handlePasteForQuill1);

      return () => {
        quill1.root.removeEventListener("paste", handlePasteForQuill1);
      };
    }
  }, []);
  function handleToolbar(e) {
    const quillInstance = quillRef.current.getEditor();
    const toolbar =
      quillInstance.container.parentNode.querySelector(".ql-toolbar");

    if (e && e.length > 0) {
      const { top, left, height } = quillInstance.getBounds(e.index, e.length);
      toolbar.style.visibility = "visible";
      toolbar.style.position = "absolute";
      toolbar.style.left = `${left}px`;
      toolbar.style.top = `${top - toolbar.offsetHeight + 50}px`;
    } else {
      toolbar.style.visibility = "hidden";
    }
  }
  function handleToolbar1(e) {
    const quillInstance = quillRef1.current.getEditor();
    const toolbar =
      quillInstance.container.parentNode.querySelector(".ql-toolbar");

    if (e && e.length > 0) {
      const { top, left, height } = quillInstance.getBounds(e.index, e.length);

      toolbar.style.visibility = "visible";

      toolbar.style.position = "absolute";
      toolbar.style.left = `${left}px`;
      toolbar.style.top = `${top - toolbar.offsetHeight + 200}px`;
    } else {
      toolbar.style.visibility = "hidden";
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
  async function handleImageUpload(e) {
    let img = e.target.files[0];
    img = await convertToBase64(img);
    setIsImg(img);
  }
  function handleClick() {
    setIsShow(!isShow);
  }
  function changeShow1() {
    setShowInTitle(true);
  }
  function changeShow2() {
    setShowInTitle(false);
  }
  async function handleFormSubmit() {
    if (!isLogin) {
      setIsPopup(true);
      setMsg("Please Login First");
      return;
    }
    let payload = {
      title: value,
      image: isImg,
      description: desc,
      id: id,
    };
    let user = await JSON.parse(localStorage.getItem("finalUser"));
    await fetch("/api/blog", {
      method: "PUT",
      body: JSON.stringify({ payload }),
    });
    router.push("/blogs");
  }

  return (
    <div
      className={`flex flex-row items-start max-md:flex-col  ${
        theme ? "bg-slate-100" : "bg-[#1e1d1d]"
      } min-h-[100vh] w-[100vw] h-[auto] pt-32 pb-10`}
    >
      <div
        className={`flex relative flex-col rounded-xl pt-10 pb-10 border-dashed ${
          theme ? "border-black" : "border-white"
        } pl-1 max-sm:pl-6 max-md:pl-4 mt-0   items-end mr-0 w-[60vw] max-sm:w-[98vw] max-md:w-[80vw] m-auto h-auto`}
      >
        <div className="h-auto classsa w-[90%] rounded-full mt-8 flex items-center">
          {showInTitle && (
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
                <label
                  htmlFor="img-input"
                  className="border border-purple-600 w-[30px] h-[30px] flex justify-center items-center rounded-full"
                >
                  <FaImage size={"1rem"} fill="blue" />
                </label>
              )}
            </div>
          )}
          <div
            className={`h-[100%] w-[1px] ${theme ? "bg-black" : "bg-white"}`}
          ></div>
          <ReactQuill
            onFocus={changeShow1}
            placeholder="Title"
            ref={quillRef}
            className="w-[100vw]"
            onChangeSelection={handleToolbar}
            theme="snow"
            value={value}
            onChange={setValue}
          />
          {/* <input
          style={{height1,
            fontFamily:
              "medium-content-title-font,Georgia,Cambria,Times New Roman,Times,serif",
          }}
          placeholder="Title"
          onClick={(e) => {
            changeShow(e);
          }}
          id="title"
          value={title1}
          onPaste={handlePaste}
          onInput={handletitle}
          onChange={(e)=>setTitle1(e.currentTarget.value)}
          ref={title}
          className={` w-[100%]  w-[100%] placeholder:text-[#b3b3b1] focus:outline-none h-[100%] bg-transparent  text-4xl font-georgia ${
            theme ? "text-black" : "text-white"
          }`}
        ></input> */}
        </div>
        <input
          className="hidden"
          onChange={handleImageUpload}
          type="file"
          id="img-input"
        ></input>
        <div htmlFor="img-input" className="h-auto m-auto mt-6">
          {isImg && (
            <>
              <img src={isImg}></img>
              <FaTrash color="red" size={"2rem"} onClick={() => setIsImg("")} />
            </>
          )}
        </div>
        <div className="h-auto classsb w-[90%] rounded-full  gap-4 flex items-center">
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
          <ReactQuill
            onFocus={changeShow2}
            ref={quillRef1}
            className="w-[100vw]"
            placeholder="Write Something Amazing"
            onChangeSelection={handleToolbar1}
            theme="snow"
            value={desc}
            onChange={setDesc}
          />

          {/* <textarea
   onClick={changeShow}
    ref={textareaRef}
    style={{ height }}
    onChange={(e)=>desc1(e.currentTarget.value)}
        value={desc}
    onInput={handleInput}
    placeholder='Write Something Amazing'

    onPaste={handlePaste1}
    className={`h-auto  w-[100%]  border-b-white ${theme?"placeholder:text-[#b3b3b1]":"placeholder:text-[#b3b3b1] text-white "}  max-sm:text-3xl  overflow-hidden bg-transparent font-georgia text-4xl focus:outline-none`} 
  /> */}
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
        {/* <button>Draft</button> */}
      </div>
    </div>
  );
}
