"use client"
import React from 'react';
import SparkLine from '../Charts/SparkLine';
import Charts from '../Charts/Charts';

const Overview = () => {
  return (
    <div className="">
    <div className="flex w-[100%]  flex-wrap lg:flex-nowrap justify-center ">
      <div className="w-[100%] flex justify-around ">
        <div className= "w-[300px] bg-white flex justify-between items-center p-8 pt-9 rounded-xl  bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div>
            <p className="font-bold text-gray-400">Total Blogs </p>
            <p className="text-2xl">500</p>
          </div>
          <button
            type="button"
            // style={{ backgroundColor: currentColor }}
            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
          >
            {/* <BsCurrencyDollar /> */}
          </button>
        </div>
        <div className="w-[300px] bg-white flex justify-between items-center  p-8 pt-9 rounded-xl  bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div>
            <p className="font-bold text-gray-400">Total Views</p>
            <p className="text-2xl">1430</p>
          </div>
          <button
            type="button"
            // style={{ backgroundColor: currentColor }}
            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
          >
            {/* <BsCurrencyDollar /> */}
          </button>
        </div>
        <div className="w-[300px] bg-white flex justify-between items-center  p-8 pt-9 rounded-xl  bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div>
            <p className="font-bold text-gray-400">Total Likes</p>
            <p className="text-2xl">900</p>
          </div>
          <button
            type="button"
            // style={{ backgroundColor: currentColor }}
            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
          >
            {/* <BsCurrencyDollar /> */}
          </button>
        </div>
      </div>
    
    </div>

    <div className="flex gap-6 flex-wrap w-[100%] justify-center h-auto mt-[20px]">
      <div className="w-[40%] bg-transparent  flex-col flex gap-6 ">
          <div className=' p-8 pt-9 rounded-xl bg-white  bg-hero-pattern bg-no-repeat bg-cover bg-center'>
            <p className="font-bold text-gray-400">Total Questions</p>
            <p className="text-2xl">1000</p>
          </div>
        
      <div className="w-[100%] bg-white h-[460px] dark:text-gray-600 dark:bg-secondary-dark-bg p-4 rounded-2xl   ">
        <div className="flex justify-between">
          <p className="font-semibold text-xl">Daily New Blogs Posted</p>
         
        </div>
        <div className="mt-10 flex gap-10 flex-wrap justify-center">
          <div className=" border-r-1 w-[200px] border-color m-4 pr-10">
          <p className="font-semibold text-xl"></p>

              <SparkLine />
          
          </div>
          <div>
            {/* <Stacked currentMode={currentMode} width="320px" height="360px" /> */}
          </div>
        </div>
      </div>
        </div>
      <div className='bg-white h-[600px] w-[40%] rounded-2xl'>
        <div
          className="bg-white rounded-2xl w-[500px] p-4 m-3"
          // style={{ backgroundColor: currentColor }}
        >
                   <p className="font-semibold text-xl mb-[30px]">Daily Activity</p>


         <Charts/>
        </div>

     
      </div>
    </div>
  </div>
  );
};

export default Overview;
