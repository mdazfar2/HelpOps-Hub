import React from "react";
import "@/stylesheets/teams.css";

function TeamsPage() {
  return (
    <div>
      <div id="ourteam">Meet Our Team</div>
      <div
        className="team-description"
        style={{
          textAlign: "center",
          width: "60vw",
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Meet our team driving HelpOps-Hub's success with expertise and passion,
        turning every challenge into a milestone.
      </div>
      <div id="team-grid">
        <div className="team-member">
          <div className="card1">
            <div className="margin">
              <div className="image-div">
                <img src="/founder.png" alt="Azfar Alam" />
              </div>
              <div className="info-div">
                <h2>Azfar Alam</h2>
                <p>DevOps Engineer</p>
              </div>
              <span className="badge founder">Founder</span>
            </div>
          </div>
          <div className="social-links">
            <div className="social-links-items">
              <a href="https://github.com/sponsors/mdazfar2">
                <i className="fas fa-heart"></i>
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a href="https://github.com/mdazfar2">
                <i className="fab fa-github"></i>
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a href="https://www.linkedin.com/in/md-azfar-alam/">
                <i className="fab fa-linkedin"></i>
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
        <div className="team-member">
          <div className="card2">
            <div className="margin">
              <div className="image-div">
                <img src="/maintainer.png" alt="Anurag Pandey" />
              </div>
              <div className="info-div">
                <h2>Anurag Pandey</h2>
                <p>Software Engineer</p>
              </div>
              <span className="badge Lead">Lead Developer</span>
            </div>
          </div>
          <div className="social-links">
            <div className="social-links-items">
              <a href="https://github.com/sponsors/pandeyji711">
                <i className="fas fa-heart"></i>
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a href="https://github.com/pandeyji711">
                <i className="fab fa-github"></i>
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a href="https://www.linkedin.com/in/anuragpandey0711/">
                <i className="fab fa-linkedin"></i>
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
        <div className="team-member">
          <div className="card3">
            <div className="margin">
              <div className="image-div">
                <img src="/maintainer2.jpeg" alt="RamakrushnaBiswal" />
              </div>
              <div className="info-div">
                <h2>Ramakrushna</h2>
                <p>UI/UX Designer</p>
              </div>
              <span className="badge UI">Maintainer</span>
            </div>
          </div>
          <div className="social-links">
            <div className="social-links-items">
              <a href="https://github.com/sponsors/RamakrushnaBiswal">
                <i className="fas fa-heart"></i>
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a href="https://github.com/RamakrushnaBiswal">
                <i className="fab fa-github"></i>
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a href="https://www.linkedin.com/in/ramakrushna-biswal/">
                <i className="fab fa-linkedin"></i>
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
        <div className="team-member">
          <div className="card4">
            <div className="margin">
              <div className="image-div">
                <img src="/maintainer3.jpeg" alt="Ayushmaan" />
              </div>
              <div className="info-div">
                <h2>Ayushmaan</h2>
                <p>Web Developer</p>
              </div>
              <span className="badge Maintainer">Maintainer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
