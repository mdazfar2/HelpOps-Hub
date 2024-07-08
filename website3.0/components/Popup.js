
import React, { useEffect, useState } from 'react'
import "@stylesheets/Popup.css";

export default function Popup(props) {
    const { error, msg,img } = props;
    let [none, setNone] = useState(false);
  

    useEffect(() => {
        const timer = setTimeout(() => {
            setNone(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    
    console.log('sdsdsdsdsd')
    return (
        <div className={`${error} popup ${none ? "none1" : ""}`}>
            {img?<img src={img} alt='image' className='w-10 h-10 mr-5 filtered' />:<></>}{msg}
            <div className='line'></div>
        </div>
    );
}
