"use client"
import React, { useState } from "react";
import "@stylesheets/contact.css";

function ContactPage() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleStarClick = (value) => {
    setSelectedRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedRating === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    setShowThankYouMessage(true);
    setTimeout(() => {
      setShowThankYouMessage(false);
      document.getElementById("contact-form").reset();
      setSelectedRating(0);
    }, 3000);
  };

  return (
    <div>
      <div className="container">
        <img src="/rateus.png" className="contact-img" alt="rateus" />
        <div className="form-container">
          <h1>Contact Us</h1>
          <form id="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Name:"
            />

            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email:"
            />

            <textarea
              id="comment"
              name="comment"
              required
              placeholder="Comment:"
            ></textarea>

            <label htmlFor="rating" id="rate">
              Rating:
            </label>
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
            <button type="submit" id="button">
              Submit
            </button>
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
