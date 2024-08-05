import React from 'react'
import Left from './Left'
import Right from './Right'
import MostRight from './MostRight'

export default function page() {
    
  return (
    <div className="">
    <div className=" flex bg-white dark:bg-gray-900">
       <Left/>
       <Right/>             
        <MostRight/>
    </div>
</div>   
)
}
