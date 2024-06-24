import React from 'react';
import '@stylesheets/footer.css';

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div>
      {/* Main footer container */}
      <div className="footer">
        {/* Social media icons */}
        <p className="iconsclass mm">
          <a href="https://www.linkedin.com/company/HelpOps-Hub/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
          </a>
          <a href="https://discord.gg/UWTrRhqywt" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDiscord} className="icon" />
          </a>
          <a href="https://github.com/mdazfar2/HelpOps-Hub/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="icon" />
          </a>
        </p>
        {/* Copyright notice */}
        <p className="font h mm">© HelpOps-Hub | MIT License</p>
        {/* Developer and contributors */}
        <p className="font h mm">
          Developed by <a href="https://github.com/mdazfar2" target="_blank" rel="noopener noreferrer" className="font">Azfar Alam</a> & <a className="font" rel="noopener noreferrer" href="/team">Open Source Community</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
