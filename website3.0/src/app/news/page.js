"use client"
import React, { useEffect, useState } from 'react'

export default function page() {
    let [articles,setArticles]=useState([])
    useEffect(()=>{
            fetchData()
    })
    async function fetchData(){

        const KEY = "CD2Tgd7zbDcP3pRTi0kwVInpslwrDnbg";
      const data = await fetch(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${KEY}`);
      const result = await data.json();
      setArticles([...result.results])
    }
  return (
    <div className='home'>
      <div className="mt-20 p-20 flex flex-col justify-center items-center bg-searchBar bg-top bg-no-repeat bg-cover bg-fixed sm:bg-contain">
      <div className="p-4 flex flex-col justify-center items-center gap-y-4">
        <div className="text-5xl font-extrabold text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-yellow-400">
            Your articles one click away...
          </span>
        </div>
        <div className="sm:flex">
          <input type="text" placeholder="Your Search..." className="p-2 outline-none border-none" required />
          <button className="border-none bg-yellow-400 text-white p-2" >Search</button>
        </div>
        {/* {busquedaRealizada &&
          <div>
            <h1 className="text-center text-white text-4xl">Results for: {buscado}</h1>
            <div className='grid sm:grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
              {buscadoArreglo.map(article => (
                  <ArticleSearch article={article} key={article._id} />
              ))}
            </div>
          </div>
        } */}
      </div>
    </div>
      <div className='articles'>
            <h1 className='text-center grid grid-cols-3 justify-center items-center text-4xl mt-8 mb-4 after:content-[""] after:block after:w-full after:h-1 after:bg-yellow-400 before:content-[""] before:block before:w-full before:h-1 before:bg-yellow-400'>Today`s articles</h1>

            <div className='grid sm:grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
        
        
        {
            articles.map((article)=>{

       return <div className='flex flex-col bg-gray-200 p-5 w-full text-center gap-y-4'>
            {
                <img loading='lazy' src={article.multimedia&&article?.multimedia[0].url} alt='img-article' className='w-full h-50' />
            }
            <h3 className='font-bold text-2xl'>{'High-temperature quantum '}</h3>
            <div>
                <p className='font-thin text-left p-2'>{article.title}</p>
                <p className='font-thin text-left p-2'>{article.updated_date}</p>
            </div>
            {/* <Link href='/home-articles/[title]'  as={`/home-articles/${"sdsdsdsdsd"}`} > */}
                <a className='p-2 bg-yellow-400 uppercase font-medium'>Read more</a>
            {/* </Link> */}
        </div>
            })
        }
     
      
            </div>
        </div>
    </div>
  )
}
