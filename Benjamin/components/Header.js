"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import "@stylesheets/header.css"
import ToggleSwitch from './ToggleSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isActive, setIsActive] = useState(false);

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
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <header>
      <nav>
        <Link href="/">
          <div className="logo" data-tilt data-tilt-scale="1.1">
            <img src="/HelpOps-H Fevicon.png" alt="Logo" />
          </div>
        </Link>
        <ul className={`nav-links ${isActive ? 'active' : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/abouts">About</Link></li>
          <li><Link href="/team">Team</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <a href="https://github.com/sponsors/mdazfar2" target='_blank'>
            <button className="nav-sponsor-btn">Sponsor <FontAwesomeIcon icon={faHeart} id="heart" width={25}/></button>
          </a>
          <ToggleSwitch />
        </div>
        <div className="hamburger" id="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      <ul className={`nav-links1 ${isActive ? 'active' : ''}`} id="nav-links1">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/team">Team</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </header>
  );
};

export default Header;
