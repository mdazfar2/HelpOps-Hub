"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@stylesheets/header.css";

//Importing TogleSwitch Component
import ToggleSwitch from "./ToggleSwitch";

//Importing AuthButton component
import AuthButton from "./AuthButton";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserCircle,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  // State to manage mobile menu toggle
  const [isActive, setIsActive] = useState(false);

  // to set the status of show navbar or not
  const [show, setShow] = useState(true);
  let lastScrollTop = 0; // to keep the position of lastscroll

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to load VanillaTilt library for logo animation
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js";
    script.onload = () => {
      // Initialize VanillaTilt on .logo elements
      VanillaTilt.init(document.querySelectorAll(".logo"), {
        max: 25,
        speed: 400,
      });
    };
    document.body.appendChild(script);
  }, []);

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Effect to close mobile menu on window resize if screen width > 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`${show ? "showNav" : "hideNav"}`}>
      <nav>
        {/* Logo with VanillaTilt animation */}
        <Link href="/">
          <div className="logo" data-tilt data-tilt-scale="1.1">
            <img src="/HelpOps-H Fevicon.png" alt="Logo" />
          </div>
        </Link>

        <div className="nav-items">
          {/* Main navigation links */}
          <ul className={`nav-links ${isActive ? "active" : ""}`}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          {/* Navigation actions (sponsor button and toggle switch) */}
          <div className="nav-actions">
            <div className="auth-desktop">
              <AuthButton />
            </div>
            <a href="https://github.com/sponsors/mdazfar2" target="_blank">
              <button className="nav-sponsor-btn">
                <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
                Sponsor
              </button>
            </a>
            <ToggleSwitch />
          </div>
        </div>
        {/* Hamburger menu icon for mobile */}
        <div className="hamburger" id="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      {/* Mobile menu links */}
      <ul className={`nav-links1 ${isActive ? "active" : ""}`} id="nav-links1">
        <li>
          <Link href="/" onClick={() => setIsActive(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setIsActive(false)}>
            About
          </Link>
        </li>
        <li>
          <Link href="/team" onClick={() => setIsActive(false)}>
            Team
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => setIsActive(false)}>
            Contact
          </Link>
        </li>
        <li>
          <div className="auth-mobile">
            <AuthButton />
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
