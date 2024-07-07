import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="mt-12 mb-6 flex flex-col items-center justify-center text-center w-full">
      {/* Social media icons */}
      <div className="flex items-center justify-center gap-5 w-full mb-0">
        <a href="https://www.linkedin.com/company/HelpOps-Hub/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="text-black p-1 rounded-full text-xl hover:text-gray-300 hover:shadow-lg" />
        </a>
        <a href="https://discord.gg/UWTrRhqywt" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faDiscord} className="text-black p-1 rounded-full text-xl hover:text-gray-300 hover:shadow-lg" />
        </a>
        <a href="https://github.com/mdazfar2/HelpOps-Hub/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="text-black p-1 rounded-full text-xl hover:text-gray-300 hover:shadow-lg" />
        </a>
      </div>
      {/* Copyright notice */}
      <p className="text-black font-sans text-xs py-2 font-normal mb-0">© HelpOps-Hub | MIT License</p>
      {/* Developer and contributors */}
      <p className="text-black font-sans text-xs font-normal mb-0">
        Developed by <a href="https://github.com/mdazfar2" target="_blank" rel="noopener noreferrer" className="underline">Azfar Alam</a> & <a className="underline" rel="noopener noreferrer" href="/team">Open Source Community</a>
      </p>
    </div>
  );
}

export default Footer;
