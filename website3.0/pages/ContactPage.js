"use client";
import React, { useEffect, useState } from "react";
function ContactPage({theme,setIsPopup,setIsMsg,setColor}) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [blur, setBlur] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to manage popup message
  const [disableSubmit, setDisableSubmit] = useState(false); // State to manage submit button disabling

  useEffect(() => {
    function updateBackground() {
      if (document.body.classList.contains('dark-mode')) {
        document.body.style.background = "#353535";
      } else {
        document.body.style.background = "#EEE";
      }
    }

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
          updateBackground();
        }
      }
    });

    observer.observe(document.body, { attributes: true });
    updateBackground();

    return () => {
      document.body.style.background = "";
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    // Function to handle keydown event
    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        document.getElementById('contact-form').requestSubmit(); // Trigger form submission
      }
    }

    // Add keydown event listener to the document
    document.addEventListener('keydown', handleKeyDown);

    // Clean-up function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleStarClick = (value) => {
    setSelectedRating(value); // Updates the selected rating value when a star is clicked
};

// Handles form submission
const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Check if a rating has been selected
    if (selectedRating === 0) {
        setShowError(true);  // Show an error if no rating is selected
        setIsPopup(true);    // Show a popup with an error message
        setIsMsg("Please Give Any Rating"); // Set the error message
        return; // Exit the function if no rating is given
    }

    // Collect form data
    const formData = {
        name: event.target.name.value,     // Retrieve name from form
        email: event.target.email.value,   // Retrieve email from form
        comment: event.target.comment.value, // Retrieve comment from form
        rating: selectedRating,            // Include the selected rating
    };

    // Set UI states for loading and disabling form
    setLoading(true);      // Show loading indicator
    setBlur(true);         // Apply blur effect to background
    setDisableSubmit(true); // Disable the submit button to prevent multiple submissions

    try {
        // Send form data to the server
        const response = await fetch('/api/contact', {
            method: 'POST',                      // HTTP method
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify(formData),  // Convert form data to JSON format
        });

        // Check if the response is successful
        if (response.ok) {
            setShowThankYouMessage(true); // Show thank you message
            setIsPopup(true);            // Show popup
            setColor('green');           // Set popup color to green
            setIsMsg("Thank you! We will connect soon."); // Set success message
            setTimeout(() => {
                setShowThankYouMessage(false); // Hide thank you message after 3 seconds
                document.getElementById("contact-form").reset(); // Reset the form
                setSelectedRating(0);   // Reset the selected rating
                setError("");            // Clear any previous error messages
            }, 3000);
        } else {
            // If response is not successful, show an error message
            setIsPopup(true);      // Show popup
            setIsMsg("Failed to submit the form. Please try again."); // Set failure message
        }
    } catch (error) {
        // Handle any errors that occur during form submission
        setIsPopup(true);      // Show popup
        setIsMsg("An error occurred. Please try again."); // Set error message
    }

    // Re-enable the submit button and stop loading after 5 seconds
    setTimeout(() => {
        setDisableSubmit(false); // Re-enable the submit button
        setLoading(false);       // Hide loading indicator
        setBlur(false);          // Remove blur effect from background
    }, 5000);
};

  return (
    <div className={`flex ${theme?"bg-[#eeeeee]":"bg-[#1e1d1d] "} flex-col-reverse items-center justify-center space-x-0 p-10 md:flex-row lg:space-x-40 max-lg:space-x-20 h-[100vh] pt-40 max-md:flex-col-reverse max-lg:h-full max-md:h-full max-md:pt-20 max-md:space-x-0 max-sm:p-[0rem]`}>
      <div className="mt-10 max-md:mt-[80px] max-sm:mt-[70px]">
        <img src="rateus.webp" className="w-[30rem] max-md:w-[28rem] max-sm:w-[25rem]" alt="rateus" />
      </div>
        <div className={`flex flex-col items-center border-dashed border-2 border-black p-10  w-[30rem] rounded-3xl shadow-2xl  ${theme?"bg-[#098CCD] bg-opacity-10":"bg-[#181616]  border-white"} md:justify-center max-sm:scale-75 max-md:w-full max-md:max-w-[90%] max-sm:w-[95%] max-md:mt-20 max-sm:mt-[100px]`}>
          <h1 className={`${theme?"":"text-white"} text-3xl max-sm:text-2xl`}>Contact Us</h1>
          <form id="contact-form"  className={`${blur?"blurclass":""}`} onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" required placeholder="Name:" className={`w-full rounded-xl h-12 my-2 px-40 pl-4 ${theme?"placeholder-gray-900":"bg-transparent placeholder-white border-white border-b-2 rounded-none text-white"}  outline-none max-sm:text-[0.9rem] max-sm:px-20 max-sm:pl-4`}/>
            <input type="email" id="email" name="email" required placeholder="Email:" className={`w-full rounded-xl h-12 my-2 px-40 pl-4 ${theme?"placeholder-gray-900":"bg-transparent placeholder-white border-white border-b-2 rounded-none text-white"}  outline-none  max-sm:text-[0.9rem] max-sm:px-20 max-sm:pl-4`} />
            <textarea id="comment" name="comment" required placeholder="Comment:" className={`w-full rounded-xl h-32 my-2 px-40 pl-4 pt-2 ${theme?"placeholder-gray-900":"bg-transparent placeholder-white border-white border-b-2 rounded-none text-white"}  outline-none max-sm:text-[0.9rem] max-sm:px-20 max-sm:pl-4`}></textarea>
            <label htmlFor="rating" className={`${theme?"":"text-white"}`} id="rate">Rating:</label>

            <div id="rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={` star cursor-pointer text-[3rem] max-sm:text-[2.5rem]`}
                  data-value={value}
                  onClick={() => handleStarClick(value)}
                  style={{ color: selectedRating >= value ? "#FFD700" : `${theme? "#000":"white"}` }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {showError && <p id="error" className={`${theme?"":"text-white"}`}>Please Give Any Rating</p>}
            <button type="submit" id="button" disabled={disableSubmit} className={`w-1/3 max-md:w-1/3 max-sm:w-1/2 ${theme?"bg-[#fff]":"bg-black shadow-white shadow-sm border-white border text-white"} text-black border-2 border-black hover:bg-black hover:text-white shadow-lg font-bold py-2 px-4 rounded`}>
              Submit {loading && <div className="loader2"><div className="circle"><div className="dot"></div><div className="outline"></div></div></div>}
            </button>
            {showThankYouMessage && <p className={`${theme ? "text-black" : "text-white"}`}>Thank you! We will connect soon.</p>}
          </form>
        </div>
      </div>
  );
}

export default ContactPage;
