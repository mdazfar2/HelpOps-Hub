"use client"

import dynamic from "next/dynamic";
import "../../stylesheets/editor.css"
import React, { useEffect, useRef, useState ,useContext} from "react";
import { FaPlus, FaImage, FaTrash } from "react-icons/fa";

import ReactQuill, { Quill } from 'react-quill';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Context } from "@context/store";
import { usePathname, useRouter } from "next/navigation";
import { FaBucket } from "react-icons/fa6";
export default function CreateBlog({id}) {
  const {theme,isLogin,setColor,setMsg,setIsPopup,finalUser}=useContext(Context)
    const [isShow, setIsShow] = useState(false);
    const [showInTitle, setShowInTitle] = useState(true);
    let [isImg, setIsImg] = useState('');
    const [desc,setDesc]=useState('')
    const textareaRef = useRef('');
    const [draftId,setDraftId]=useState(id)
    const [height, setHeight] = useState('auto');
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [draftLink,setDraftLink]=useState('')
  let router=useRouter()
  const [value, setValue] = useState('');
  
  const quillRef = useRef(null);
  const quillRef1 = useRef(null);

  useEffect(()=>{
    if(!finalUser||!localStorage.getItem('finalUser')){
      setIsPopup(true)
      setMsg("Please Login to Create Blog")
      setTimeout(()=>{
        setIsPopup(false)
        setMsg('')
        router.push('/blogs')
      },1000)
      }
  },[])
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Send data to the server
      saveDraftOnUnload();
      // Optionally, show a confirmation dialog (this behavior is discouraged in modern browsers)
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [ ]);

  const saveDraftOnUnload = async () => {
    const savedDraft = JSON.parse(localStorage.getItem("draftBlog"));
    const draftData = {
      title: savedDraft.title,
      image: savedDraft.image,
      description: savedDraft.description,
      id: draftId,
      author_id: finalUser._id,
    };
console.log('sddddddddddddddd')
    // Convert data to FormData for sendBeacon
    const formData = new FormData();
    for (const key in draftData) {
      formData.append(key, draftData[key]);
    }
    console.log(draftId,'assssssssssssssssssss')
    localStorage.removeItem("draftBlog");
    let id1=  localStorage.getItem('draftId')
    await fetch('/api/updatedraft',{
      method:"POST",
      body:JSON.stringify({
        title: savedDraft.title,
        image: savedDraft.image,
        description: savedDraft.description,
        id:     localStorage.getItem('draftId')
        ,
        author_id: JSON.parse(localStorage.getItem("finalUser"))._id,
      })
    })
    // navigator.sendBeacon("/api/updatedraft", formData);
    localStorage.removeItem("draftBlog");
  };
  // useEffect(() => {
  //   event.preventDefault();
  //   event.returnValue = '';
  //   const handleBeforeUnload = (event) => {
  //     const savedDraft = JSON.parse(localStorage.getItem('draftBlog'));
  //     if (savedDraft) {
  //       fetch('/api/savedraft', {
  //         method: "PUT",
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           title: savedDraft.title,
  //           image: savedDraft.image,
  //           description: savedDraft.description,
  //           id: draftId,
  //           author_id: JSON.parse(localStorage.getItem('finalUser'))._id,
  //         })
  //       });
  //       console.log('sddddddddddddddddddddddddddddddddddddddddddddddddd')
  //       localStorage.removeItem('draftBlog');
  //     }
  //     // Prevent the default unload behavior
  //   };

  //   const handleUnload = () => {
  //     const savedDraft = JSON.parse(localStorage.getItem('draftBlog'));
  //     if (savedDraft) {
  //       fetch('/api/savedraft', {
  //         method: "PUT",
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           title: savedDraft.title,
  //           image: savedDraft.image,
  //           description: savedDraft.description,
  //           id: draftId,
  //           author_id: JSON.parse(localStorage.getItem('finalUser'))._id,
  //         })
  //       });
  //       localStorage.removeItem('draftBlog');
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('unload', handleUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('unload', handleUnload);
  //   };
  // }, [draftId]);

  async function saveDraft() {
    setIsDraftSaved(true);
    let response = await fetch('/api/savedraft', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: value,
        image: isImg,
        description: desc,
        author_id: JSON.parse(localStorage.getItem('finalUser'))._id,
      })
    });
    if (response.ok) {
      let data = await response.json();
      console.log('sdsaveing id ddddd',data.id)
      setDraftId(data.id);
      
      localStorage.setItem('draftId',data.id)
      router.replace(`/createblog?id=${data.id}`);
    }
  }

  useEffect(() => {
    const autoSaveDraft = async () => {
      const draft = { title: value, description: desc, image: isImg };
      localStorage.setItem("draftBlog", JSON.stringify(draft));
      let id1=  localStorage.getItem('draftId')
      await fetch('/api/updatedraft',{
        method:"POST",
        body:JSON.stringify({
          title: draft.title,
          image: draft.image,
          description: draft.description,
          id:     localStorage.getItem('draftId')
          ,
          author_id: JSON.parse(localStorage.getItem("finalUser"))._id,
        })
      })
      if (!isDraftSaved) {
        await saveDraft();
      }
    };
    let intervalId;
    if(value.length>0||desc.length>0||isImg.length>0){

        autoSaveDraft()
    }
    if((value.length>0||desc.length>0||isImg.length>0)&&id){

      autoSaveDraft()
  }
  }, [value, desc, isImg, isDraftSaved]);

  async function fetchDraft() {
    let response = await fetch("/api/getdraft", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (response.ok) {
      let data = await response.json();
      setValue(data.blog.title);
      setDesc(data.blog.description);
      setIsImg(data.blog.image);
    }
  }
 useEffect(()=>{

   if (id) {
     fetchDraft();
   }
 },[])
 

























  useEffect(() => {
    const handlePaste = (event, setValueCallback, setImgCallback) => {
      event.preventDefault(); // Prevent the default paste behavior
  
      const clipboardData = event.clipboardData;
      const items = clipboardData.items;
  
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(item,'dsssssss')
       if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.onload = async (e) => {
            // Handle image data
            const imageSrc = e.target.result;
            // For demonstration, we'll just log the image source
            setImgCallback(imageSrc);
          };
          reader.readAsDataURL(file);
        } else if (item.kind === 'string' &&(items.length>1? items[1].kind!=='file':true)) {
            console.log('sddddddddd',item)
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
        console.log('Pasting in first editor');
        handlePaste(event, setValue, setIsImg);
      };
      const handlePasteForQuill1 = (event) => {
        console.log('Pasting in second editor');
        handlePaste(event, setDesc, setIsImg);
      };
      quill1.root.addEventListener('paste', handlePasteForQuill1);
  
      quill.root.addEventListener('paste', handlePasteForQuill);
  
      return () => {
        quill.root.removeEventListener('paste', handlePasteForQuill);
        quill1.root.removeEventListener('paste', handlePasteForQuill1);

      };
    }
  
    if (quill1) {
      console.log('Initializing paste handler for second editor');
      const handlePasteForQuill1 = (event) => {
        console.log('Pasting in second editor');
        handlePaste(event, setDesc, setIsImg);
      };
      quill1.root.addEventListener('paste', handlePasteForQuill1);
  
      return () => {
        quill1.root.removeEventListener('paste', handlePasteForQuill1);
      };
    }
  }, []);
  
  
  
  
  
  
  
  // useEffect(() => {
  //   Array.from(document.getElementsByClassName('ql-toolbar')).map((e)=>{
  // e.style.visibility = 'hidden';
  //   })
  // }, []);
  
  function handleToolbar(e) {
  console.log(e,'in toolbar 1 ')
      const quillInstance = quillRef.current.getEditor();
  const toolbar = quillInstance.container.parentNode.querySelector('.ql-toolbar');
  
  if(e &&e.length>0){
    const { top, left, height } = quillInstance.getBounds(e.index, e.length);
    toolbar.style.visibility =  'visible';
    toolbar.style.position = 'absolute';
    toolbar.style.left = `${left}px`;
    toolbar.style.top = `${top - toolbar.offsetHeight+50}px`;
  }else{
    toolbar.style.visibility =  'hidden';
  
  }
  }
  function handleToolbar1(e) {
     const quillInstance = quillRef1.current.getEditor();
    const toolbar = quillInstance.container.parentNode.querySelector('.ql-toolbar');
    
    console.log(e,'in toolbar 2 ')
    if(e && e.length>0){
      const { top, left, height } = quillInstance.getBounds(e.index, e.length);

      toolbar.style.visibility =  'visible';
      
    toolbar.style.position = 'absolute';
    toolbar.style.left = `${left}px`;
    toolbar.style.top = `${top - toolbar.offsetHeight+200}px`;
      
    }else{
      toolbar.style.visibility =  'hidden';
    
    }
    }
  // const handlePaste1 = (event) => {
  //   const clipboardData = event.clipboardData;
  //   const items = clipboardData.items;
    
  //   for (let i = 0; i < items.length; i++) {
  //     const item = items[i];
  
  //     if (item.kind === 'file' && item.type.startsWith('image/')) {
  //       const file = item.getAsFile();
  //       const reader = new FileReader();
  //       reader.onload =async (e) => {
  //         // Handle image data
  //         const imageSrc = e.target.result;
  //         // For demonstration, we'll just log the image source
  //         console.log('Image pasted:', imageSrc);
  //         setIsImg(imageSrc)
  
  //       };
  //       reader.readAsDataURL(file);
  //     } else if (item.kind === 'string') {
  //       item.getAsString((text) => {
  //         // Handle text data
  //         console.log('Text pasted:', text);
  //         desc1((prevContent) => prevContent + text);
  //       });
  //     }
  //   }
    
  //   // Prevent the default paste behavior
  //   event.preventDefault();
  // };
  
  
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
    function changeShow1() {
      setShowInTitle(true)
    }
    function changeShow2() {
        setShowInTitle(false);
     
    }
   async function handleFormSubmit(){
    if(!isLogin){
      setIsPopup(true)
      setMsg("Please Login First")
      return
    }
    localStorage.setItem("showConfetti",true)
    fetch('/api/getdraft',{
      method:"DELETE",
      body:JSON.stringify({
        id:localStorage.getItem('draftId')
      })
    })
    let user=await JSON.parse(localStorage.getItem("finalUser"))
      await fetch('/api/blog',{
        method:"POST",
        body:JSON.stringify({
          title:value,
          image:isImg,
          type:'blog',
          description:desc,
          length:desc.length,
          authorName:user.name,
          authorImage:user.image1,
          authorId: JSON.parse(localStorage.getItem('finalUser'))._id,
  
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
    function createDraft(){

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

       <div className={`h-auto classsa w-[90%]  rounded-full mt-8 flex items-center ${theme?"":"classsc"}`}>
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
              <label htmlFor="img-input" className="border border-purple-600 w-[30px] h-[30px] flex justify-center items-center rounded-full">
                <FaImage size={"1rem"} fill="blue" />
              </label>
            )}
          </div>
        )}
        <div
          className={`h-[100%] w-[1px] ${theme ? "bg-black" : "bg-white"}`}
        ></div>
        <ReactQuill onFocus={changeShow1}  placeholder="Title"  ref={quillRef} className={` w-[100vw] ${theme?"text-black":"text-white"}`}  onChangeSelection={handleToolbar}  theme="snow" value={value} onChange={setValue} />
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
      <input className="hidden" onChange={handleImageUpload} type="file" id="img-input"></input>
      <div htmlFor="img-input" className="h-auto m-auto mt-6">{isImg &&<><img src={isImg}></img><FaTrash color="red" size={'2rem'} onClick={()=>setIsImg('')}/></> }</div>
      <div className={`h-auto classsb w-[90%] rounded-full  gap-4 flex items-center ${theme?"":"classsd"}`}>
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
                  <ReactQuill  onFocus={changeShow2} ref={quillRef1} className={` w-[100vw] ${theme?"text-black quill-placeholder-light ":"text-white quill-placeholder-dark"}`}  placeholder="Write Something Amazing" onChangeSelection={handleToolbar1}  theme="snow" value={desc} onChange={setDesc} />

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
  )
}
