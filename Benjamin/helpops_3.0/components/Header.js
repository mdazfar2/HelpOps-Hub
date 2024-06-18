"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import "@stylesheets/header.css"
import ToggleSwitch from './ToggleSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js";
    script.onload = () => {
      VanillaTilt.init(document.querySelectorAll(".logo"), {
        max: 25,
        speed: 400,
      });
    };
    document.body.appendChild(script);

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('.nav-links1');
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (window.innerWidth > 980) {
        navLinks.classList.remove('active');
      }
    });
  }, []);

  return (
    <header>
      <nav>
        <Link href="/">
          <div className="logo" data-tilt data-tilt-scale="1.1">
            <img src="/HelpOps-H Fevicon.png" alt="Logo" />
          </div>
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/team">Team</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <a href="https://github.com/sponsors/mdazfar2">
            <button className="nav-sponsor-btn">Sponsor <FontAwesomeIcon icon={faHeart} id="heart" /></button>
          </a>
          <ToggleSwitch />
        </div>
        <div className="hamburger" id="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      <ul className="nav-links1" id="nav-links1">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/team">Team</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </header>
  );
};

export default Header;
