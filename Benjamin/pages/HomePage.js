import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "@stylesheets/homepage.css";

function HomePage() {
  return (
    <div>
      <main>
        <div className="main-content">
          <div className="content">
            <a href="https://github.com/mdazfar2/HelpOps-Hub/" target="_blank">
              <h3 className="star-button">
                <FontAwesomeIcon icon={faStar} className="star-icon" width={24}/> Star Us
              </h3>
            </a>
            <li className="isDisplay">
              <a href="https://github.com/sponsors/mdazfar2" target="_blank">
                <h3 className="home-sponsor-btn">
                  Sponsor <FontAwesomeIcon icon={faHeart} id="heart" width={25}/>
                </h3>
              </a>
            </li>
          </div>
          <h1>HelpOps-Hub</h1>
          <p>Ensuring You Never Get Stuck In DevOps Again!</p>
          <a href="resources.html">
            <button className="get-started-btn">Get started</button>
          </a>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
