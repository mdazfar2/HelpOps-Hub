"use client"
import React, { useEffect, useState } from 'react';
import SparkLine from '../Charts/SparkLine';
import Charts from '../Charts/Charts';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const Overview = () => {
  let [totalViews,setTotalViews]=useState(0)
  let [totalBlogs,setTotalBlogs]=useState(0)
  let [totalLikes,setTotalLikes]=useState(0)
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(()=>{
    fetchBlogs()
  },[])
  async function fetchBlogs() {
    try {
      const response = await fetch('/api/blog', { method: 'GET' });
  
      if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.statusText}`);
      }
  
      const { data } = await response.json();
  
      // Calculate total views
      const totalCount = data.reduce((total, blog) => total + blog.views, 0);
      // Calculate total likes
      const likeCount = data.reduce((total, blog) => total + blog.reactionList.length, 0);
  
      // Update state with calculated values
      setTotalViews(totalCount);
      setTotalLikes(likeCount);
      setTotalBlogs(data.length);
  
      // Calculate blog counts by date
      const blogCountsByDate = data.reduce((acc, blog) => {
        const date = new Date(blog.date).toISOString().split('T')[0]; // Get YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
  
      // Convert to arrays for Chart.js
      const labels = Object.keys(blogCountsByDate).sort();
      const chartData = labels.map(label => blogCountsByDate[label]);
  
      setChartData({
        labels,
        datasets: [
          {
            label: 'Blogs Posted',
            data: chartData,
            backgroundColor: '#4caf50',
            borderColor: '#388e3c',
            borderWidth: 1
          }
        ]
      });
    } catch (error) {
      console.error('Error in fetchBlogs:', error);
    }
  }
  

  return (
    <div className="">
    <div className="flex w-[100%]  flex-wrap lg:flex-nowrap justify-center ">
      <div className="w-[100%] flex justify-around ">
        <div className= "w-[300px] bg-white flex justify-between items-center p-8 pt-9 rounded-xl  bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div>
            <p className="font-bold text-gray-400">Total Blogs </p>
            <p className="text-2xl">{totalBlogs}</p>
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
            <p className="text-2xl">{totalViews}</p>
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
            <p className="text-2xl">{totalLikes}</p>
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
        <div className="mt-10 flex gap-10 flex-wrap ">
          <div className=" border-r-1 w-[200px] border-color ">
          <p className="font-semibold text-xl"></p>
         <div className='w-[400px] h-[500px]'>

          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return `Blogs: ${tooltipItem.raw}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Number of Blogs',
                  },
                  beginAtZero: true
                }
              }
            }}
          />
         </div>
              {/* <SparkLine /> */}
          
          </div>
          <div>
            {/* <Stacked currentMode={currentMode} width="320px" height="360px" /> */}
          </div>
        </div>
      </div>
        </div>
      <div className='bg-white h-[600px] w-[650px] rounded-2xl'>
        <div 
          className="bg-white rounded-2xl h-[300px] w-[600px] p-4 m-3 " id='line'
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
