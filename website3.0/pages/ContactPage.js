"use client";
import React, { useEffect, useState } from "react";
import "@stylesheets/contact.css";

function ContactPage() {
  // State variables to manage form state and UI messages
  const [selectedRating, setSelectedRating] = useState(0); 
  const [showError, setShowError] = useState(false); 
  const [showThankYouMessage, setShowThankYouMessage] = useState(false); 

  // Use useEffect to add body background color and clean-up function to reset it on unmount
  useEffect(() => {
    document.body.style.background = "linear-gradient(to bottom,#f5d471 2%,#eb9a60 45%,#e99960 65%,#e89357 85%)";
    console.log("Background color set to orange");

    // Clean-up function to reset background color when component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Function to handle click on star rating
  const handleStarClick = (value) => {
    // Update selectedRating state with the clicked star value
    setSelectedRating(value); 
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault(); 

    // Validation: Check if a rating is selected
    if (selectedRating === 0) {
      // Show error message if rating is not selected
      setShowError(true); 
      // Hide error message after 2 seconds
      setTimeout(() => setShowError(false), 2000); 
      // Exit function early if validation fails
      return;
    }

    // Display thank you message and reset form after 3 seconds
    setShowThankYouMessage(true); 
    setTimeout(() => {
      // Hide thank you message after 3 seconds
      setShowThankYouMessage(false); 
      // Reset the form fields
      document.getElementById("contact-form").reset();
      // Reset selectedRating state
      setSelectedRating(0); 
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <img src="/rateus.png" className="contact-page__img" alt="rateus" />
        <div className="contact-page__form-container">
          <h1 className="contact-page__title">Contact Us</h1>
          <form id="contact-form" className="contact-page__form" onSubmit={handleSubmit}>
            {/* Name input */}
            <input
              type="text"
              id="name"
              name="name"
              className="contact-page__input"
              required
              placeholder="Name:"
            />

            {/* Email input */}
            <input
              type="email"
              id="email"
              name="email"
              className="contact-page__input"
              required
              placeholder="Email:"
            />

            {/* Comment textarea */}
            <textarea
              id="comment"
              name="comment"
              className="contact-page__textarea"
              required
              placeholder="Comment:"
            ></textarea>

            {/* Rating section */}
            <label htmlFor="rating" className="contact-page__rating-label">
              Rating:
            </label>
            <div id="rating" className="contact-page__rating">
              {/* Generate star icons for rating selection */}
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`contact-page__star ${selectedRating >= value ? 'contact-page__star--selected' : ''}`}
                  data-value={value}
                  onClick={() => handleStarClick(value)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {/* Error message for rating selection */}
            {showError && <p className="contact-page__error">Please Give Any Rating</p>}
            
            {/* Submit button */}
            <button type="submit" className="contact-page__button">
              Submit
            </button>

            {/* Thank you message after successful submission */}
            {showThankYouMessage && (
              <p className="contact-page__thank-you-message">
                Thank you !!
                <br />
                We will connect soon.
              </p>
            )}
          </form>
        </div>
        <img src="rateus.png" className="contact-page__img--secondary" alt="rateus" />
      </div>
    </div>
  );
}

export default ContactPage;
