"use client";
import React, { useState, useEffect } from "react";
import "@/stylesheets/teams.css";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

//Importing the CardSkeleton Component
import CardSkeleton from "@components/CardSkeleton";

//Importing the SplideJS Package
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
// The GitHub username of the repository owner
const owner = "mdazfar2";

// The name of the repository from which we are fetching contributors
const repoName = "HelpOps-Hub";

// The initial number of items (contributors) to display on the page
const initialItems = 4;

// The number of items (contributors) to display per page when loading more
const itemsPerPage = 4;

function TeamsPage() {
  // State variables for managing contributors and loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [otherContri, setOtherContri] = useState([]);
  const [topContri, setTopContri] = useState([]);
  const [allContributors, setAllContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Checks for window innerwidth
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 845);
      const handleResize = () => {
        setIsMobile(window.innerWidth < 845);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  // Initialized splidejs
  useEffect(() => {
    if (topContri.length >= 3 && isMobile) {
      const splide = new Splide("#teams-card-splide", {
        type: "loop",
        perPage: 1,
        perMove: 1,
        arrows: false,
        pagination: true,
      });

      splide.mount();

      return () => {
        splide.destroy();
      };
    }
  }, [topContri, isMobile]);
  //to add body bg color
  useEffect(() => {
    function updateBackground() {
      if (document.body.classList.contains("dark-mode")) {
        document.body.style.background = "#353535";
      } else {
        document.body.style.background =
          "linear-gradient(to bottom,#f5d471 2%,#ec904f 35%,#eb9a60 55%,#e99960 65%,#e89357 75%,#e99559 85%)  ";
      }
    }
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === "class") {
          updateBackground();
        }
      }
    });

    observer.observe(document.body, { attributes: true });

    // Initial background update
    updateBackground();
    // Clean-up function to reset background color when component unmounts
    return () => {
      document.body.style.background = "";
      observer.disconnect();
    };
  }, []);
  // Hook to handle side effects in functional components
  useEffect(() => {
    // Function to fetch all contributors data
    async function fetchAllContributors() {
      try {
        // Fetch contributors data
        const contributorsData = await fetchContributors();
        // Filter and set top contributors
        topContributors(contributorsData);
        // Set all contributors data
        setAllContributors(contributorsData);
        // Simulate loading delay
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error(error);
      }
    }

    // Call the function to fetch all contributors
    fetchAllContributors();
  }, []);

  // Function to fetch contributors from the GitHub API
  async function fetchContributors(pageNumber = 1) {
    // Number of contributors to fetch per page
    const perPage = 100;
    // Construct the API URL
    const url = `https://api.github.com/repos/${owner}/${repoName}/contributors?page=${pageNumber}&per_page=${perPage}`;

    // Fetch data from the API
    const response = await fetch(url);
    // Throw an error if the response is not ok
    if (!response.ok) {
      throw new Error(
        `Failed to fetch contributors data. Status code: ${response.status}`
      );
    }

    // Parse the JSON response
    const contributorsData = await response.json();
    return contributorsData;
  }

  // Function to filter and set top and other contributors
  function topContributors(contributors) {
    let r = 0;
    const topContributorsList = [];
    const otherContributorsList = [];

    // Filter contributors based on specific conditions
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

    // Set the state for top and other contributors
    setTopContri(topContributorsList);
    setOtherContri(otherContributorsList);
  }

  // Function to render the list of contributors
  function renderContributors(contributors) {
    return contributors.map((contributor) => {
      const avatarImgSrc = contributor.avatar_url;
      const avatarImgAlt = `${contributor.login}'s Picture`;
      let name = contributor.name || contributor.login;
      const fname = name;
      if (name.length > 12) {
        name = name.slice(0, 10) + "...";
      }

      // Exclude specific contributors from rendering since they are Maintainers
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
                <a
                  href={`https://github.com/mdazfar2/HelpOps-Hub/commits/main/?author=${name}`}
                  target="__blank"
                >
                  <div className="member-contributions-count">{contri}</div>
                  <div className="member-contributions-label">
                    Contributions
                  </div>
                </a>
              </div>
              <div className="member-social-links">
                <a href={loginLink} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="Github" />
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

  // Function to render the top 3 contributors
  function renderTopContributors(contributors) {
    if (contributors.length < 3) return null;
    console.log(contributors.html_url);

    if (isMobile) {
      return (
        <div id="teams-card-splide" className="splide">
          <div className="splide__track">
            <div className="splide__list">
              <div className="splide__slide" id="c2">
                <div>
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
                    <p id="name1">
                      {contributors[0].name || contributors[0].login}
                    </p>
                    <p id="co1">
                      contributions {contributors[0].contributions}
                    </p>
                  </div>
                </div>
              </div>
              <div className="splide__slide top-contributor" id="c1">
                <div>
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
                    <p id="name2">
                      {contributors[1].name || contributors[1].login}
                    </p>
                    <p id="co2">
                      contributions {contributors[1].contributions}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="splide__slide" id="c3">
                <div>
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
                      <p id="name3">
                        {contributors[2].name || contributors[2].login}
                      </p>
                      <p id="co3">
                        contributions {contributors[2].contributions}{" "}
                      </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
  }

  // Function to load more contributors when user clicks 'Load More' button
  function loadMore() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const remainingContributors = otherContri.slice(start, end);
    setCurrentPage(currentPage + 1);
  }

  return (
    <div>
      {/* Section: Meet Our Team */}

      <div id="ourteam">Meet Our Team</div>
      <div className="team-description">
        Meet our team driving HelpOps-Hub's success with expertise and passion,
        turning every challenge into a milestone.
      </div>

      {/* Section: Team Grid */}

      <div id="team-grid">
        {/* Team Member 1 */}
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
          {/* Social Links for Team Member 1 */}
          <div className="social-links">
            <div className="social-links-items">
              <a
                href="https://github.com/sponsors/mdazfar2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://github.com/mdazfar2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://www.linkedin.com/in/md-azfar-alam/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
        {/* Team Member 2 */}
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
          {/* Social Links for Team Member 2 */}
          <div className="social-links">
            <div className="social-links-items">
              <a
                href="https://github.com/sponsors/pandeyji711"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://github.com/pandeyji711"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://www.linkedin.com/in/anuragpandey0711/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
        {/* Team Member 3 */}
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
          {/* Social Links for Team Member 3 */}
          <div className="social-links">
            <div className="social-links-items">
              <a
                href="https://github.com/sponsors/RamakrushnaBiswal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://github.com/RamakrushnaBiswal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://www.linkedin.com/in/ramakrushna-biswal/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
        {/* Team Member 4 */}
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
          {/* Social Links for Team Member 4 */}
          <div className="social-links">
            <div className="social-links-items">
              <a
                href="https://github.com/sponsors/RamakrushnaBiswal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon" />
              </a>
              <p>Sponsor</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://github.com/RamakrushnaBiswal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon" />
              </a>
              <p>Github</p>
            </div>
            <div className="social-links-items">
              <a
                href="https://www.linkedin.com/in/ayushmaan-agarwal-8064a4258/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
              </a>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Top 3 Contributors */}

      <div className="teams-container">
        <h1 className="contri">Top 3 Contributors</h1>
        <div id="contributors">{renderTopContributors(topContri)}</div>
      </div>

      {/* Section: Dynamic Loading of Contributors */}

      <div id="team-grid1">
        {/* Conditionally render loading skeleton or contributor cards */}
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : renderContributors(
              otherContri.slice(0, currentPage * itemsPerPage)
            )}
      </div>

      {/* Section: Trophy Card and Call to Action */}

      <div className="trophy-card">
        <img src="trophy.png" alt="Trophy" className="trophy" />
        <div className="team-invite">
          <h2>Join our awesome team!</h2>
          <p>
            Be a contributor and improve HelpOps-Hub and help fellow developers.
          </p>
        </div>
        <a
          href="https://discord.gg/UWTrRhqywt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="join-button"> Join us now &#8594;</button>
        </a>
      </div>

      {/* Section: Load More Button */}

      <div className="load">
        <button id="load-more" onClick={loadMore}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default TeamsPage;
