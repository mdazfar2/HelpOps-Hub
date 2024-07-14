import React, { useRef, useEffect, useState } from 'react';

const AutoResizeTextarea = (props) => {
  const textareaRef = useRef(null);
  const [height, setHeight] = useState('auto');
const {theme}=props
  useEffect(() => {
    setHeight(`${textareaRef.current.scrollHeight}px`);
  }, [props.value]);

  const handleInput = (event) => {
    setHeight('auto');
    setHeight(`${event.target.scrollHeight}px`);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <textarea
      {...props}
      ref={textareaRef}
      style={{ height }}
      onInput={handleInput}
      placeholder='Write Something Amazing'
      onClick={(e)=>{props.show(e)}}
      className={`h-auto  w-[100%]  border-b-white ${theme?"placeholder:text-[#b3b3b1]":"placeholder:text-[#b3b3b1] text-white "}  max-sm:text-3xl  overflow-hidden bg-transparent font-georgia text-4xl focus:outline-none`} 
    />
  );
};

export default AutoResizeTextarea;
