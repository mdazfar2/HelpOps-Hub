"use client";
import React, { useEffect, useState } from "react";
import "@stylesheets/contact.css";
import Popup from "@components/Popup"; // Make sure to import the Popup component

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
        document.body.style.background = "linear-gradient(to bottom,#f5d471 2%,#eb9a60 45%,#e99960 65%,#e89357 85%)";
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
    <div>
      {error && <Popup msg={error} error={`${error === "Thank you! We will connect soon." ? "green1" : "red1"}`} />}
      <div className="container">
        <img src="/rateus.png" className="contact-img" alt="rateus" />
        <div className="form-container">
          <h1>Contact Us</h1>
          <form id="contact-form"  className={`${blur?"blurclass":""}`} onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" required placeholder="Name:" />
            <input type="email" id="email" name="email" required placeholder="Email:" />
            <textarea id="comment" name="comment" required placeholder="Comment:"></textarea>
            <label htmlFor="rating" id="rate">Rating:</label>
            <div id="rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className="star"
                  data-value={value}
                  onClick={() => handleStarClick(value)}
                  style={{ color: selectedRating >= value ? "#FFD700" : "#000" }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {showError && <p id="error">Please Give Any Rating</p>}
            <button type="submit" id="button" disabled={disableSubmit}>
              Submit {loading && <div className="loader2"><div className="circle"><div className="dot"></div><div className="outline"></div></div></div>}
            </button>
            {showThankYouMessage}
          </form>
        </div>
        <img src="rateus.png" className="contact-img1" alt="rateus" />
      </div>
    </div>
  );
}

export default ContactPage;
