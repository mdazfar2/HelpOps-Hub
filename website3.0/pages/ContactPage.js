"use client";
import React, { useEffect, useState } from "react";
import "@stylesheets/contact.css";

function ContactPage() {
  const [selectedRating, setSelectedRating] = useState(0); // State variable to track selected rating
  const [showError, setShowError] = useState(false); // State variable to manage error message visibility
  const [showThankYouMessage, setShowThankYouMessage] = useState(false); // State variable to manage thank you message visibility

  useEffect(() => {
    // Function to update background based on dark-mode class
    function updateBackground() {
      if (document.body.classList.contains('dark-mode')) {
        document.body.style.background = "#353535"; // Dark mode background color
      } else {
        document.body.style.background = "linear-gradient(to bottom,#f5d471 2%,#eb9a60 45%,#e99960 65%,#e89357 85%)"; // Default light mode background gradient
      }
    }

    // Observer to watch for changes in body class attribute
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
          updateBackground(); // Update background when class changes
        }
      }
    });

    observer.observe(document.body, { attributes: true }); // Start observing body attribute changes

    updateBackground(); // Initial background update based on current class

    // Clean-up function to reset background and disconnect observer
    return () => {
      document.body.style.background = ""; // Reset background style
      observer.disconnect(); // Disconnect observer when component unmounts
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Function to handle click on star rating
  const handleStarClick = (value) => {
    setSelectedRating(value); // Update selectedRating state with the clicked star value
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (selectedRating === 0) {
      setShowError(true); // Show error message if rating is not selected
      setTimeout(() => setShowError(false), 2000); // Hide error message after 2 seconds
      return; // Exit function early if validation fails
    }

    // Construct form data object from form input values
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      comment: event.target.comment.value,
      rating: selectedRating,
    };

    // Send form data to API endpoint for storage
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setShowThankYouMessage(true); // Show thank you message after successful submission
      setTimeout(() => {
        setShowThankYouMessage(false); // Hide thank you message after 3 seconds
        document.getElementById("contact-form").reset(); // Reset the form fields
        setSelectedRating(0); // Reset selectedRating state
      }, 3000);
    }
  };

  return (
    <div>
      <div className="container">
        <img src="/rateus.png" className="contact-img" alt="rateus" />
        <div className="form-container">
          <h1>Contact Us</h1>
          <form id="contact-form" onSubmit={handleSubmit}>
            {/* Name input */}
            <input type="text" id="name" name="name" required placeholder="Name:" />

            {/* Email input */}
            <input type="email" id="email" name="email" required placeholder="Email:" />

            {/* Comment textarea */}
            <textarea id="comment" name="comment" required placeholder="Comment:"></textarea>

            {/* Rating section */}
            <label htmlFor="rating" id="rate">Rating:</label>
            <div id="rating">
              {/* Generate star icons for rating selection */}
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

            {/* Error message for rating selection */}
            {showError && <p id="error">Please Give Any Rating</p>}

            {/* Submit button */}
            <button type="submit" id="button">Submit</button>

            {/* Thank you message after successful submission */}
            {showThankYouMessage && (
              <p id="thank-you-message">
                Thank you !!
                <br />
                We will connect soon.
              </p>
            )}
          </form>
        </div>
        <img src="rateus.png" className="contact-img1" alt="rateus" />
      </div>
    </div>
  );
}

export default ContactPage;
