import React, { useContext, useEffect, useState } from 'react'
import { Context } from '@context/store'

export default function Answers() {
    let {theme,finalUser}=useContext(Context)
    let [questions,setQuestions]=useState([])
    async function fetchData() {
      try {
          let response = await fetch("/api/createquestion", {
              method: "GET"
          });
          
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          let data = await response.json();
          data = data.data;
  
          let arr = [];
          data = data.map((d) => {
              console.log(d.solutions, 'dddd');
              d.solutions = d.solutions.filter((da) =>
                  da.authorId === finalUser._id || da.authorName === finalUser.name
              );
              arr = [...arr, d];
              return d;
          });
  
          console.log(arr, 'sdsdsdsd');
          setQuestions([...arr]);
      } catch (error) {
          console.error('Error fetching data:', error);
          // Optionally, you can set an error state here to display a message to the user
          // setError(error.message); // Example of setting an error state
      }
  }
  
  useEffect(() => {
      fetchData();
  }, []);
  
    function handleOnClick(id){
        // router.push(`/devopsforum?id=${id}`)
        window.location.href=`/devopsforum?id=${id}`
      }
  return (
    <div
    className={`${
      theme ? " text-black" : "bg-[#1e1d1d] "
    } p-[30px] max-sm:p-[10px] relative overflow-hidden  rounded-lg max-sm:h-[auto] w-full h-full`}
  >      <div className="w-[100%] gap-[20px] max-lg:flex-col flex h-[100%] justify-between max-md:justify-center max-md:gap-[20px]">
<div className='flex flex-col gap-3 bg-white w-[100%] h-[auto] p-[20px] '>
    <h1 className='text-center text-3xl'>Solutions Given</h1>
     {
        questions.map((data,index)=>{
            return(<><div className='cursor-pointer pt-[20px] pb-[20px] border-b-gray-400 border-b-[1px] '> <div onClick={()=>handleOnClick(data._id)} className=' break-words max-w-full'  dangerouslySetInnerHTML={{__html: data.title}} /></div></>)
        })
     }
</div>
</div>    </div>
  )
}
