"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "@/stylesheets/teams.css";
import CardSkeleton from "@components/CardSkeleton";

const owner = "mdazfar2";
const repoName = "HelpOps-Hub";
const initialItems = 4;
const itemsPerPage = 4;

function TeamsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [otherContri, setOtherContri] = useState([]);
  const [topContri, setTopContri] = useState([]);
  const [allContributors, setAllContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllContributors() {
      try {
        const contributorsData = await fetchContributors();
        topContributors(contributorsData);
        setAllContributors(contributorsData);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllContributors();
  }, []);

  async function fetchContributors(pageNumber = 1) {
    const perPage = 100;
    const url = `https://api.github.com/repos/${owner}/${repoName}/contributors?page=${pageNumber}&per_page=${perPage}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch contributors data. Status code: ${response.status}`
      );
    }

    const contributorsData = await response.json();
    return contributorsData;
  }

  function topContributors(contributors) {
    let r = 0;
    const topContributorsList = [];
    const otherContributorsList = [];

    contributors.forEach((contributor) => {
      let name = contributor.name || contributor.login;
      if (
        r < 3 &&
        name !== "azfar-2" &&
        name !== "Ayushmaanagarwal1211" &&
        name !== "RamakrushnaBiswal" &&
        name !== "pandeyji711" &&
        name !== owner
      ) {
        topContributorsList.push(contributor);
        r++;
      } else if (
        r >= 3 &&
        name !== "azfar-2" &&
        name !== "Ayushmaanagarwal1211" &&
        name !== "RamakrushnaBiswal" &&
        name !== "pandeyji711" &&
        name !== owner
      ) {
        otherContributorsList.push(contributor);
      }
    });

    setTopContri(topContributorsList);
    setOtherContri(otherContributorsList);
  }

  function renderContributors(contributors) {
    return contributors.map((contributor) => {
      const avatarImgSrc = contributor.avatar_url;
      const avatarImgAlt = `${contributor.login}'s Picture`;
      let name = contributor.name || contributor.login;
      const fname = name;
      if (name.length > 12) {
        name = name.slice(0, 10) + "...";
      }

      if (
        fname !== "azfar-2" &&
        fname !== "Ayushmaanagarwal1211" &&
        fname !== "RamakrushnaBiswal" &&
        fname !== "pandeyji711" &&
        fname !== owner &&
        !topContri.includes(contributor)
      ) {
        const loginLink = contributor.html_url;
        const contri = contributor.contributions;
        return (
          <div className="team-member-card" key={contributor.login}>
            <div className="member-card">
              <div className="dev-badge">Developer</div>
              <div className="member-image-div">
                <img src={avatarImgSrc} alt={avatarImgAlt} />
              </div>
              <div className="member-info-div">
                <h2>{name}</h2>
                <p>Open Source Contributor</p>
              </div>
            </div>
            <div className="member-data">
              <div className="member-contributions">
                <div className="member-contributions-count">{contri}</div>
                <div className="member-contributions-label">Contributions</div>
              </div>
              <div className="member-social-links">
                <a href={loginLink} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="Github"/>
                </a>
                <div className="member-github-label">GitHub</div>
              </div>
            </div>
          </div>
        );
      }
      return null;
    });
  }

  function renderTopContributors(contributors) {
    if (contributors.length < 3) return null;
    console.log(contributors.html_url);
    return (
      <div className="top-contributor">
        <div className="contributor" key={contributors[1].login}>
          <a href={contributors[1].html_url} target="__blank">
            <img
              className="circle"
              src={contributors[1].avatar_url}
              alt={`${contributors[1].login}'s Picture`}
            />
          </a>
          <div className="rank">
            <h1>2</h1>
          </div>
          <div className="crown" id="rank">
            <img src="/crown.png" />
          </div>
          <p id="name2">{contributors[1].name || contributors[1].login}</p>
          <p id="co2">contributions {contributors[1].contributions} </p>
        </div>

        <div className="contributor" key={contributors[0].login}>
          <a href={contributors[0].html_url} target="__blank">
            <img
              className="circle"
              src={contributors[0].avatar_url}
              alt={`${contributors[0].login}'s Picture`}
            />
          </a>
          <div className="rank">
            <h1>1</h1>
          </div>
          <div className="crown" id="rank1">
            <img src="/crown.png" />
          </div>
          <p id="name1">{contributors[0].name || contributors[0].login}</p>
          <p id="co1">contributions {contributors[0].contributions}</p>
        </div>

        <div className="contributor" key={contributors[2].login}>
          <a href={contributors[2].html_url} target="__blank">
            <img
              className="circle"
              src={contributors[2].avatar_url}
              alt={`${contributors[2].login}'s Picture`}
            />
          </a>
          <div className="rank">
            <h1>3</h1>
          </div>
          <div className="crown" id="rank">
            <img src="/crown.png" />
          </div>
          <p id="name3">{contributors[2].name || contributors[2].login}</p>
          <p id="co3">contributions {contributors[2].contributions} </p>
        </div>
      </div>
    );
  }

  function loadMore() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const remainingContributors = otherContri.slice(start, end);
    setCurrentPage(currentPage + 1);
  }

  return (
    <div>
      <div id="ourteam">Meet Our Team</div>
      <div className="team-description">
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
              <a href="https://github.com/sponsors/mdazfar2" target="__blank">
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a href="https://github.com/mdazfar2" target="__blank">
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a href="https://www.linkedin.com/in/md-azfar-alam/" target="__blank">
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
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
              <a href="https://github.com/sponsors/pandeyji711" target="__blank">
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a href="https://github.com/pandeyji711" target="__blank">
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a href="https://www.linkedin.com/in/anuragpandey0711/" target="__blank">
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
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
              <a href="https://github.com/sponsors/RamakrushnaBiswal" target="__blank">
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a href="https://github.com/RamakrushnaBiswal" target="__blank">
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a href="https://www.linkedin.com/in/ramakrushna-biswal/" target="__blank">
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
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
          <div className="social-links">
            <div className="social-links-items">
              <a href="https://github.com/sponsors/RamakrushnaBiswal" target="__blank">
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a href="https://github.com/RamakrushnaBiswal" target="__blank">
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a href="https://www.linkedin.com/in/ramakrushna-biswal/" target="__blank">
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
      </div>
      <div className="teams-container">
        <h1 className="contri">Top 3 Contributors</h1>
        <div id="contributors">{renderTopContributors(topContri)}</div>
      </div>
      <div id="team-grid1">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : renderContributors(
              otherContri.slice(0, currentPage * itemsPerPage)
            )}
      </div>
      <div className="trophy-card">
        <img src="trophy.png" alt="Trophy" className="trophy" />

        <div className="team-invite">
          <h2>Join our awesome team!</h2>
          <p>
            Be a contributor and improve HelpOps-Hub and help fellow developers.
          </p>
        </div>
        <a href="https://discord.gg/UWTrRhqywt" target="__blank">
          <button className="join-button"> Join us now &#8594;</button>
        </a>
      </div>
      <div className="cards" id="team-grid1"></div>
      <div className="load">
        <button id="load-more" onClick={loadMore}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default TeamsPage;
