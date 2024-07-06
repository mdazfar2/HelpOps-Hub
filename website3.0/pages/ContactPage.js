"use client";
import React, { useEffect, useState } from "react";
import Popup from "@components/Popup"; // Make sure to import the Popup component
import AuthButton from "@components/AuthButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
function ContactPage() {
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
    setSelectedRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedRating === 0) {
      setShowError(true);
      setError("Please Give Any Rating");
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      comment: event.target.comment.value,
      rating: selectedRating,
    };

    setLoading(true);
    setBlur(true);
    setDisableSubmit(true); // Disable the submit button

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowThankYouMessage(true);
        setError("Thank you! We will connect soon.");
        setTimeout(() => {
          setShowThankYouMessage(false);
          document.getElementById("contact-form").reset();
          setSelectedRating(0);
          setError("");
        }, 3000);
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    // Re-enable the submit button and stop loading after 5 seconds
    setTimeout(() => {
      setDisableSubmit(false);
      setLoading(false);
      setBlur(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col-reverse items-center justify-center space-x-0 mt-36 p-10 md:flex-row md:space-x-40 md:mt-32 max-[400px]:mt-28">
      {error && <Popup msg={error} error={`${error === "Thank you! We will connect soon." ? "green1" : "red1"}`} />}
      <div className="mt-10">
        <img src="/rateus.png" className="w-[30rem]" alt="rateus" />
      </div>
        <div className="flex flex-col items-center border-dashed border-2 border-black p-10  w-[30rem] rounded-3xl shadow-2xl bg-[#098CCD] bg-opacity-10 md:justify-center">
          <h1 className="text-3xl">Contact Us</h1>
          <form id="contact-form"  className={`${blur?"blurclass":""}`} onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" required placeholder="Name:" className="w-full rounded-xl h-12 my-2 px-40 pl-4  outline-none placeholder-gray-900"/>
            <input type="email" id="email" name="email" required placeholder="Email:" className="w-full rounded-xl h-12 my-2 px-40 pl-4  outline-none placeholder-gray-900" />
            <textarea id="comment" name="comment" required placeholder="Comment:" className="w-full rounded-xl h-32 my-2 px-40 pl-4 pt-24  outline-none placeholder-gray-900"></textarea>
            <label htmlFor="rating" id="rate">Rating:</label>
            <div id="rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className="star cursor-pointer text-[3rem]"
                  data-value={value}
                  onClick={() => handleStarClick(value)}
                  style={{ color: selectedRating >= value ? "#FFD700" : "#000" }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {showError && <p id="error">Please Give Any Rating</p>}
            <button type="submit" id="button" disabled={disableSubmit} className="w-1/3 bg-[#fff] text-black border-2 border-black hover:bg-black hover:text-white shadow-lg font-bold py-2 px-4 rounded">
              Submit {loading && <div className="loader2"><div className="circle"><div className="dot"></div><div className="outline"></div></div></div>}
            </button>
            {showThankYouMessage}
          </form>
        </div>
        <div className="relative mb-10 items-center gap-2 hidden max-[400px]:flex justify-center w-full">
        <a href="https://github.com/sponsors/mdazfar2" target="_blank">
          <button
            className="bg-gray-100/80 border-none rounded-2xl shadow-md shadow-black/20 text-black text-xl cursor-pointer text-center transition-all duration-500 ease-in-out w-30 p-2 hover:transform hover:translate-x-2.5 hover:bg-none hover:border-2 hover:border-whitesmoke mr-5"
            style={{ fontFamily: "ubuntu" }}
          >
            <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
            Sponsor
          </button>
        </a>
        <div className="block">
          <AuthButton />
        </div>
      </div>
      </div>
  );
}

export default ContactPage;
