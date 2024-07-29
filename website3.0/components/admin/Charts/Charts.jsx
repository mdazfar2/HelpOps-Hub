import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// const data = [
//   { date: new Date('2024-07-01'), accountsCreated: 30, userVisits: 120 },
//   { date: new Date('2024-07-02'), accountsCreated: 45, userVisits: 150 },
//   { date: new Date('2024-07-03'), accountsCreated: 28, userVisits: 135 },
//   { date: new Date('2024-07-04'), accountsCreated: 60, userVisits: 170 },
//   // Add more data points here
// ];

export default function Charts() {
  useEffect(()=>{
    fetchData()
  },[])
  let [chartData,setChartData]=useState()
  let [data,setData]=useState({})
  let [options,setOptions]=useState({})
  async function fetchData(){
    let data1=await fetch('/api/getnumber',{method:"GET"})
    data1=await data1.json()
    data1=data1.result
    let arr=[]
    for(let i in data1.accounts){
      console.log(data1.accounts[i][1],'ayushmaan')
        arr.push({date:new Date(i),accountsCreated:data1.accounts[i][0],userVisits:data1.accounts[i][1]/2})
    }
    setData([...arr])
    console.log(arr)
    setChartData({
      labels: arr.map(d => d.date.toLocaleDateString('en-GB')), // Format date to DD/MM/YYYY
      datasets: [
        {
          label: 'Accounts Created',
          data: arr.map(d => d.accountsCreated),
          borderColor: '#FF5733', // Line color
          backgroundColor: 'rgba(255, 87, 51, 0.2)', // Area color
          borderWidth: 2,
          fill: true,
          pointRadius: 5, // Size of points on the line
          pointBackgroundColor: '#FF5733', // Point color
          pointBorderColor: '#FF5733', // Point border color
        },
        {
          label: 'User Visits',
          data: arr.map(d => d.userVisits),
          borderColor: '#33C1FF', // Line color
          backgroundColor: 'rgba(51, 193, 255, 0.2)', // Area color
          borderWidth: 2,
          fill: true,
          pointRadius: 5, // Size of points on the line
          pointBackgroundColor: '#33C1FF', // Point color
          pointBorderColor: '#33C1FF', // Point border color
        }
      ]
    })
    setOptions({
    
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
         
         
          title: {
            display: true,
            text: 'Date'
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'Count'
          },
          beginAtZero: true,
          grid: {
            display: false
          }
        }
      }
    })
  }
  
  // Prepare data for Chart.js
  // const chartData = 
  // {
  //   labels: data.map(d => d.date.toLocaleDateString('en-GB')), // Format date to DD/MM/YYYY
  //   datasets: [
  //     {
  //       label: 'Accounts Created',
  //       data: data.map(d => d.accountsCreated),
  //       borderColor: '#FF5733', // Line color
  //       backgroundColor: 'rgba(255, 87, 51, 0.2)', // Area color
  //       borderWidth: 2,
  //       fill: true,
  //       pointRadius: 5, // Size of points on the line
  //       pointBackgroundColor: '#FF5733', // Point color
  //       pointBorderColor: '#FF5733', // Point border color
  //     },
  //     {
  //       label: 'User Visits',
  //       data: data.map(d => d.userVisits),
  //       borderColor: '#33C1FF', // Line color
  //       backgroundColor: 'rgba(51, 193, 255, 0.2)', // Area color
  //       borderWidth: 2,
  //       fill: true,
  //       pointRadius: 5, // Size of points on the line
  //       pointBackgroundColor: '#33C1FF', // Point color
  //       pointBorderColor: '#33C1FF', // Point border color
  //     }
  //   ]
  // };

  return (
    <>
    
    {chartData && options &&   <Line data={chartData}  options={options} />
     }
    </>
  );
}
