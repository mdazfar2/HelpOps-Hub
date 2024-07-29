"use client"

import dynamic from "next/dynamic";
import "../../stylesheets/editor.css"
import React, { useEffect, useRef, useState ,useContext, useMemo} from "react";
import { FaPlus, FaImage, FaTrash, FaCross } from "react-icons/fa";

import ReactQuill, { Quill } from 'react-quill';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Context } from "@context/store";
import { usePathname, useRouter } from "next/navigation";
import { FaBucket, FaXmark } from "react-icons/fa6";
export default function CreateBlog({id}) {
  const {theme,isLogin,setColor,setMsg,setIsPopup,finalUser}=useContext(Context)
    const [isShow, setIsShow] = useState(false);
    const [showInTitle, setShowInTitle] = useState(true);
    let [isImg, setIsImg] = useState('');
    const [desc,setDesc]=useState('')
    let [loading,setLoading]=useState(false)
    const textareaRef = useRef('');
    let [isTagModalShow,setIsTagModalShow]=useState(false)
    let [modal,setModal]=useState(false)
    const [draftId,setDraftId]=useState(id)
    const [height, setHeight] = useState('auto');
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [draftLink,setDraftLink]=useState('')
    let [ifSchedule,setISSchedule]=useState(false)
  let router=useRouter()
  const [value, setValue] = useState('');
  const datetime = useRef(null);

  const quillRef = useRef(null);
  const quillRef1 = useRef(null);
  useEffect(() => {
    if(ifSchedule){

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      if(datetime){

        datetime.current.min = currentDateTime;
      }
    }
  }, [ifSchedule]);
  let tagsData=[
    {
      "tagName": "CI/CD",
      "tagDescription": "Continuous Integration and Continuous Delivery (CI/CD) practices for automating software release processes."
    },
    {
      "tagName": "Infrastructure as Code",
      "tagDescription": "Managing and provisioning computing infrastructure through machine-readable definition files."
    },
    {
      "tagName": "Containerization",
      "tagDescription": "Encapsulating applications into lightweight containers for easy deployment and scalability."
    },
    {
      "tagName": "Orchestration",
      "tagDescription": "Automating the management, coordination, and deployment of complex software systems."
    },
    {
      "tagName": "Monitoring and Logging",
      "tagDescription": "Tools and practices for monitoring system performance, detecting issues, and logging events."
    },
    {
      "tagName": "Configuration Management",
      "tagDescription": "Automating the configuration and coordination of software applications and systems."
    },
    {
      "tagName": "DevSecOps",
      "tagDescription": "Integrating security practices into the DevOps lifecycle to deliver secure software faster."
    },
    {
      "tagName": "Microservices",
      "tagDescription": "Architectural style that structures an application as a collection of loosely coupled services."
    },
    {
      "tagName": "Cloud Native",
      "tagDescription": "Designing and running applications that leverage cloud computing principles and services."
    },
    {
      "tagName": "Agile",
      "tagDescription": "Software development methodology emphasizing collaboration, flexibility, and continuous improvement."
    }
  ]
  let [tags,setTags]=useState([])
  let [selectedTag,setSelectedTags]=useState([])
  useEffect(()=>{
    setTags(tagsData)
  },[])
  function handleSelectTags(tagName){
    let tag=tagsData.filter((data)=>data.tagName==tagName)
    let arr=tags.filter((data)=>!data.tagName==tagName)
    setTags([...arr])
    setSelectedTags((prev)=>[...prev,tag[0]])
  }
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
    // Convert data to FormData for sendBeacon
    const formData = new FormData();
    for (const key in draftData) {
      formData.append(key, draftData[key]);
    }
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
      quill1.root.addEventListener('paste', handlePasteForQuill1);
  
      quill.root.addEventListener('paste', handlePasteForQuill);
  
      return () => {
        quill.root.removeEventListener('paste', handlePasteForQuill);
        quill1.root.removeEventListener('paste', handlePasteForQuill1);

      };
    }
  
    if (quill1) {
      const handlePasteForQuill1 = (event) => {
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
  const insertCommand = () => {
    const editor = quillRef1.current.getEditor();
    const cursorPosition = editor.getSelection().index;
    editor.insertText(cursorPosition, '`command`');
    editor.setSelection(cursorPosition + 1, cursorPosition + 8);
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      keyboard: {
        bindings: {
          backtick: {
            key: '`',
            handler: () => {
              insertCommand();
            }          }
        }
      }
    }),
    [insertCommand]
  );
  function handleToolbar1(e) {
     const quillInstance = quillRef1.current.getEditor();
    const toolbar = quillInstance.container.parentNode.querySelector('.ql-toolbar');
    
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
  
  
  function handleTagClick(tag){
    setSelectedTags([...selectedTag,tag.tagName])
    let arr=tags.filter((data)=>data.tagName!==tag.tagName)
    setTags([...arr])
  }
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    useEffect(()=>{
      if(selectedTag.length==4){
        setIsTagModalShow(false)
      }
    },[selectedTag])
    async function handleImageUpload(e){
      let img=e.target.files[0]
      img=await convertToBase64(img)
      setIsImg(img)
    }
    function handleClick() {
      setIsShow(!isShow);
    }
    function changeShow1() {
      setIsTagModalShow(false)
      setShowInTitle(true)
    }
    function changeShow2() {
      setIsTagModalShow(false)

        setShowInTitle(false);
     
    }
    async function handleTagTaker(){
      setModal(true)
    }
    async function handleFormSubmit(){
      if(!isLogin){
        setIsPopup(true)
        setMsg("Please Login First")
        return
      }
      setLoading(true)
      fetch('/api/getdraft',{
        method:"DELETE",
        body:JSON.stringify({
          id:localStorage.getItem('draftId')
        })
      })
      let user=await JSON.parse(localStorage.getItem("finalUser"))
      if(!ifSchedule){
  
          await fetch('/api/blog',{
            method:"POST",
            body:JSON.stringify({
              title:value,
              image:isImg,
              type:'blog',
              description:desc,
              username:user.username,
              tags:selectedTag,
              length:desc.length,
              authorName:user.name,
              authorImage:user.image1,
              authorId: JSON.parse(localStorage.getItem('finalUser'))._id,
              
            })
          })
          localStorage.setItem("showConfetti",true)

      }else{
        await fetch('/api/scheduleblog',{
          method:"POST",
          body:JSON.stringify({
            title:value,
            image:isImg,
            type:'blog',
            description:desc,
            username:user.username,
            tags:selectedTag,
            datetime:datetime.current.value,
            length:desc.length,
            authorName:user.name,
            authorImage:user.image1,
            authorId: JSON.parse(localStorage.getItem('finalUser'))._id,
            
          })
        })

      }
        setLoading(false)
        router.push('/blogs')
      }
  
  //  async function handleFormSubmit(){
  //   if(!isLogin){
  //     setIsPopup(true)
  //     setMsg("Please Login First")
  //     return
  //   }
  //   setLoading(true)
  //   localStorage.setItem("showConfetti",true)
  //   fetch('/api/getdraft',{
  //     method:"DELETE",
  //     body:JSON.stringify({
  //       id:localStorage.getItem('draftId')
  //     })
  //   })
  //   let user=await JSON.parse(localStorage.getItem("finalUser"))
  //     await fetch('/api/blog',{
  //       method:"POST",
  //       body:JSON.stringify({
  //         title:value,
  //         image:isImg,
  //         type:'blog',
  //         description:desc,
  //         username:user.username,
  //         tags:selectedTag,
  //         length:desc.length,
  //         authorName:user.name,
  //         authorImage:user.image1,
  //         authorId: JSON.parse(localStorage.getItem('finalUser'))._id,
  
  //       })
  //     })
  //     setLoading(false)
  //     router.push('/blogs')
  //   }
    useEffect(() => {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }, [textareaRef.current.value]);
  
    const handleInput = (event) => {
      setHeight('auto');
      setHeight(`${event.target.scrollHeight}px`);
    };
    function createDraft(){

    }
    function handleCut(tagName){
      let arr=selectedTag.filter((data)=>data!==tagName)
      setSelectedTags([...arr])
      let ele;
      for(let i of tagsData){
        if(i.tagName==tagName){
          ele=i
        }
      }
      setTags(prev=>[...prev,ele])
    }

  return (
   <>
    <div
    className={`flex flex-row items-start max-md:flex-col  ${
      theme ? "bg-slate-100" : "bg-[#1e1d1d]"
    } min-h-[100vh] w-[100vw] h-[auto] pt-32 pb-10 foreditor`}
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
        <ReactQuill  onFocus={changeShow1}  placeholder="Title"  ref={quillRef} className={` w-[100vw] ${theme?"text-black":"text-white"}`}  onChangeSelection={handleToolbar}  theme="snow" value={value} onChange={setValue} />
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
                  <ReactQuill   onFocus={changeShow2} ref={quillRef1} className={` w-[100vw] ${theme?"text-black quill-placeholder-light ":"text-white quill-placeholder-dark"}`}  placeholder="Write Something Amazing" onChangeSelection={handleToolbar1}  theme="snow" value={desc} onChange={setDesc} />

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
      {/* <div className="flex flex-col gap-6 w-[100%] mt-[50px]">
        <div className="w-[100%] justify-center flex gap-2 pl-[39px]">

        {
          selectedTag.map((data,index)=>{
            return <p className={`min-w-[80px] p-[9px] ${index==0?"bg-[#eee9ef]":index==1?"bg-[#fffce8]":index==2?"bg-[#e5f2ea]":index==3?"bg-[#f3e5e5]":""} rounded-lg flex justify-between items-center`}>{data}<FaXmark className="cursor-pointer" onClick={()=>handleCut(data)}/></p>
          })
        }
 {selectedTag.length<4 &&<input onClick={()=>setIsTagModalShow(true)} placeholder="Enter Upto 4 Tags" className={`bg-transparent border-b-[1px] placeholder:text-2xl pl-[20px] ml-[20px] pb-[10px] border-b-gray-500  ${selectedTag.length==0?"w-[90%]":selectedTag.length==1?"w-[60%]":selectedTag.length==2?"w-[40%]":selectedTag.length==3?"w-[20%]":selectedTag.length==4?"w-[40%]":""}`}/>     }   </div>
     {
      isTagModalShow && <div className=" pb-[20px] z-[10000] max-h-[200px] flex flex-col  overflow-scroll bg-slate-100 rounded-lg h-auto w-[90%]  left-[99px] absolute bottom-[84px]">
      

        {
          tags.map((data)=>{
          return <div  onClick={()=>handleTagClick(data)} className="pl-[20px]   pr-[20px] border-b-[1px] border-b-gray-400 p-[10px] cursor-pointer hover:bg-gray-200"><p className="text-[15px]">#{data.tagName}</p><p className="text-[15px]">{data.tagDescription}</p></div>
          })
        }
        <FaXmark onClick={()=>setIsTagModalShow(false)} className="absolute right-[15px] cursor-pointer " size={"1.2rem"}/>
      </div>
     }
      </div> */}
    </div>
    <div className="w-[20%] justify-start max-md:justify-center max-md:w-[100%] flex">
      <button
      onClick={handleTagTaker}
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
  {
    modal && <div className="auth-overlay" >
    <div className="auth-modal" onClick={(e) => e.stopPropagation()}><div
                  className={`bg-[rgba(255, 255, 255, 1)] border-dashed border-[2px] ${
                    theme
                      ? "bg-slate-100 border-black"
                      : "bg-[#0f0c0c] whiteshadow border-white"
                  } p-8 border-rounded1  lg:w-[600px] md:w-[500px] max-sm:h-auto   relative select`}>
                      <h1
                className={`text-center mt-[5px] ${
                  theme ? "text-black" : "text-white"
                } font-bold max-sm:mt-[20px] text-2xl `}
                style={{fontFamily:"georgia"}}
              >
                Please Enter Tags
              </h1>
              <div className="flex flex-col gap-6 w-[100%] mt-[50px]">
        <div className="w-[100%] justify-center flex-col-reverse flex gap-2 ">
<div className="w-[100%] h-auto flex flex-wrap gap-4">

        {
          selectedTag.map((data,index)=>{
            return <p className={`min-w-[80px] p-[9px] ${index==0?"bg-[#eee9ef]":index==1?"bg-[#fffce8]":index==2?"bg-[#e5f2ea]":index==3?"bg-[#f3e5e5]":""} rounded-lg flex justify-between items-center`}>{data}<FaXmark className="cursor-pointer" onClick={()=>handleCut(data)}/></p>
          })
        }
</div>
 {selectedTag.length<4 &&<input onClick={()=>setIsTagModalShow(true)} placeholder="Enter Upto 4 Tags" className={`bg-transparent border-b-[1px] placeholder:text-2xl pl-[20px]  pb-[10px] border-b-gray-500 w-[100%]`}/>     }   </div>
     {
      isTagModalShow && <div className={` pb-[20px] z-[10000] max-h-[200px] flex flex-col  overflow-scroll bg-slate-100 rounded-lg h-auto w-[100%]  left-[0px] absolute ${!ifSchedule?"bottom-[200px]":"bottom-[280px]"}`}>
      

        {
          tags.map((data)=>{
          return <div  onClick={()=>handleTagClick(data)} className="pl-[20px]   pr-[20px] border-b-[1px] border-b-gray-400 p-[10px] cursor-pointer hover:bg-gray-200"><p className="text-[15px]">#{data.tagName}</p><p className="text-[15px]">{data.tagDescription}</p></div>
          })
        }
        <FaXmark onClick={()=>setIsTagModalShow(false)} className="absolute right-[15px] cursor-pointer " size={"1.2rem"}/>
      </div>
     }
      </div>

    {ifSchedule &&<div className="flex justify-center">
        <input type="datetime-local" placeholder="Enter date time"  className="bg-transparent m-auto mt-[30px] mb-[30px] border-b-gray-400 border-b-[1px]  focus:outline-none " ref={datetime}></input></div>
}
      <div className="w-[100%] flex justify-around max-sm:flex-col max-sm:justify-center gap-[10px] mt-4 items-center">

              <button
                    className={`${!loading?"w-[220px]":"w-[300px]"} h-[52px] flex justify-center content-center items-center p-2 relative  bg-[#098CCD] text-white   rounded-[18px] cursor-pointer  text-[19px] ${
                      theme
                        ? "bg-[#098CCD] border-none"
                        : "bg-[#272525] border-white border whiteshadow"
                    } max-sm:m-[auto] max-sm:mt-[20px]  font-semibold `}
                    onClick={handleFormSubmit}
                  >
                    Confirm Publish &nbsp; {loading && (
                  <div className="loader3">
                    <div className="circle">
                      <div className="dot"></div>
                      <div className="outline"></div>
                    </div>
                  </div>
                )}
                   
                  </button>
                  <p className="text-gray-500 cursor-pointer" onClick={()=>setISSchedule(true)}>
                    Schedule Post 
                  </p>
      </div>
                    </div>
                  </div>
                  </div>
  }
   </>
  )
}
