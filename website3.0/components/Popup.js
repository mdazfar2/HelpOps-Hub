
import React, { useEffect, useState } from 'react'
import "@stylesheets/Popup.css";

export default function Popup(props) {
    const { color, msg } = props;
   
    
    return (
        <div className={`bg-${color} popup `} style={{backgroundColor:`${color}`}}>
            {msg}
            <div className='line'></div>
        </div>
    );
}
