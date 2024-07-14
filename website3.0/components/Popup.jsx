import React from 'react'

export default function Popup({msg,color}) {
  return (
    <div className={`bg-${color}   popupclass`}>{msg}<div className='absolute jdikfgf'></div></div>
  )
}
