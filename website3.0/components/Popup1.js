import React, { useEffect, useState } from 'react'
import "@stylesheets/Popup.css";

export default function Popup1(props) {
    const { error, msg } = props;
    let [none, setNone] = useState(false);
  

    useEffect(() => {
        const timer = setTimeout(() => {
            setNone(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    
    console.log('sdsdsdsdsd')
    return (
        <div className={`${error} popup ${none ? "none1" : ""}`}>
            {msg}
            <div className='line'></div>
        </div>
    );
}
