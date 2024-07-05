import React from 'react'
import '../stylesheets/profilecontainer.css'
export default function UserProfile({onClose,onLogout}) {
 function handleClose(){
    onClose()
 } 
    return (
  
  <>
  <div className=" profileContainer">
    <img className='image1' src={`${localStorage.getItem('image')}`}/> 
    <div className='youremail'>
        <p>Your Email :&nbsp;</p><span>{localStorage.getItem('userEmail')}</span>
    </div>
    <div className='name'>
        <p>Your Name :&nbsp;</p><span>{localStorage.getItem('userName')}</span>
    </div>
    <button className='logout'  onClick={onLogout}>Logout</button>
    <button className="close-btn" onClick={handleClose}>
            &#10005;
          </button>
  </div>
  </>

  )
}
