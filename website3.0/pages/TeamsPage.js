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
          "rgba(238, 238, 238, 1)";
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
          <div className="team-member-card bg-[#2f9ed62b] rounded-[10%] p-[20px] flex gap-[10px] mt-0 flex-col items-center [transition:0.5s] scale-[0.95] border-[2.5px] border-dashed border-[rgba(0,0,0,1)] hover:scale-[0.9]"
           key={contributor.login}
           >
            <div className="member-card bg-[#ffffff82] px-0 py-[50px] w-full rounded-[10%] text-center">
              <div className="dev-badge right-[40px] top-[30px] absolute bg-[rgba(217,_217,_217,_1)] text-[#6e6e6e] rounded-[10px] px-[8px] py-[4px] text-[12px] font-bold w-[80px]">
                Developer
              </div>
              <div className="member-image-div flex justify-center items-center mb-[20px]">
                <img className="rounded-[50%] mx-[60px] my-0 w-[100px] h-[100px]" src={avatarImgSrc} alt={avatarImgAlt} />
              </div>
              <div className="member-info-div text-center w-full">
                <h2 className="mt-[10px] mx-[0] mb-[5px] text-[1.3em]">{name}</h2>
                <p className="mt-[5px] block text-[16px] text-[black] font-arial mx-[0] my-[5px] text-[0.9em]">Open Source Contributor</p>
              </div>
            </div>
            <div className="member-data flex flex-row items-center justify-center mt-[5px] w-full">
              <div className="member-contributions group flex flex-col items-center mr-[10px] w-28 [transition:0.5s_ease-in-out] pl-4 pr-4 pt-2 pb-2 rounded-2xl hover:bg-[rgba(255,_255,_255,_0.624)] hover:text-[black] hover:[box-shadow:2px_2px_10px_2px_#0000002f]">
                <a
                  href={`https://github.com/mdazfar2/HelpOps-Hub/commits/main/?author=${name}`}
                  target="__blank"
                >
                  <div className="member-contributions-count w-full text-center text-[24px] font-bold">{contri}</div>
                  <div className="member-contributions-label text-[14px] text-[#777] [transition:0.5s_ease-in-out] group-hover:text-black">
                    Contributions
                  </div>
                </a>
              </div>
              <div className="member-social-links group flex flex-col items-center [transition:0.5s_ease-in-out] w-28 pl-4 pr-4 pt-2 pb-2 rounded-2xl cursor-pointer hover:bg-[rgba(255,_255,_255,_0.624)] hover:[box-shadow:2px_2px_10px_2px_#0000002f]">
                <a href={loginLink} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="Github [transition:0.5s_ease-in-out] text-[black] text-[24px]" />
                </a>
                <div className="member-github-label text-[14px] text-[#777] mt-[5px] [transition:0.5s_ease-in-out] group-hover:text-black">GitHub</div>
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
                 <div className="contributor relative text-center flex flex-col justify-center items-center gap-0" key={contributors[0].login}>
                  <a href={contributors[0].html_url} target="__blank">
                    <img
                      className="circle w-[260px] h-[260px] bg-secondary rounded-full flex justify-center items-center relative transition-all duration-300 ease-in-out hover:shadow-[0_0px_20px_rgba(48,48,48,0.8)] hover:scale-[1.09] z-10"
                      src={contributors[0].avatar_url}
                      alt={`${contributors[0].login}'s Picture`}
                    />
                  </a>
                  <div className="rank w-[50px] h-[50px] bg-[#e7e7e7] rounded-full flex justify-center items-center relative bottom-[44px] left-[50px] z-20">
                    <h1 className="text-[#2f7191] font-[Poppins] text-[48px] font-extrabold leading-[72px]">1</h1>
                  </div>
                  <div className="crown absolute top-[-132px] left-1/2 transform -translate-x-1/2 z-0" id="rank1">
                    <img src="/crown.png" className="relative left-[80px] transform rotate-[20deg] scale-[1.5] w-[200px] h-[200px] max-w-none" alt="crown" />
                  </div>
                  <p id="name1" className="relative bottom-[25px] font-poppins text-[30px] font-bold text-black">{contributors[0].name || contributors[0].login}</p>
                  <p id="co1" className="relative bottom-[25px] font-poppins text-[30px] font-medium text-[#00000094]">contributions {contributors[0].contributions}</p>
                 </div>
                </div>
              </div>
              <div className="splide__slide top-contributor" id="c1">
                <div>
                 <div className="contributor relative text-center flex justify-center items-center flex-col gap-0" key={contributors[1].login}>
                  <a href={contributors[1].html_url} target="__blank">
                    <img
                      className="circle w-[160px] h-[160px] bg-[#ff9800] rounded-[50%] flex justify-center items-center relative [transition:all_0.3s_ease-in-out] [box-shadow:1px_5px_6.8px_4px_rgba(0,_0,_0,_0.25)] hover:[box-shadow:0_0px_20px_rgba(48,_48,_48,_0.8)] hover:scale-[1.09] z-10"
                      src={contributors[1].avatar_url}
                      alt={`${contributors[1].login}'s Picture`}
                    />
                  </a>
                  <div className="rank w-[50px] h-[50px] bg-[#e7e7e7] rounded-[50%] flex justify-center items-center relative bottom-[44px] left-[50px] z-20">
                  <h1 className="text-[#2f7191] font-[Poppins] text-[48px] font-extrabold leading-[72px]">2</h1>
                  </div>
                  <div className="crown absolute -top-[100px] left-2/4 -translate-x-1/2 z-0" id="rank">
                    <img className="max-w-none relative left-[50px] top-0 h-[160px] w-[160px] rotate-[20deg]" src="/crown.png" />
                  </div>
                  <p id="name2" className="relative bottom-[35px] font-poppins text-[20px] font-bold text-black">{contributors[1].name || contributors[1].login}</p>
                  <p id="co2" className="relative bottom-[25px] font-poppins text-[20px] font-medium text-[#00000094]">contributions {contributors[1].contributions}</p>
                 </div>
                </div>
              </div>
              <div className="splide__slide" id="c3">
               <div>
                <div className="contributor relative text-center flex justify-center items-center flex-col gap-0" key={contributors[2].login}>
                  <a href={contributors[2].html_url} target="__blank">
                    <img
                      className="circle w-[160px] h-[160px] bg-[#ff9800] rounded-[50%] flex justify-center items-center relative [transition:all_0.3s_ease-in-out] [box-shadow:1px_5px_6.8px_4px_rgba(0,_0,_0,_0.25)] hover:[box-shadow:0_0px_20px_rgba(48,_48,_48,_0.8)] hover:scale-[1.09] z-10"
                      src={contributors[2].avatar_url}
                      alt={`${contributors[2].login}'s Picture`}
                    />
                  </a>
                  <div className="rank w-[50px] h-[50px] bg-[#e7e7e7] rounded-[50%] flex justify-center items-center relative bottom-[44px] left-[50px] z-20">
                  <h1 className="text-[#2f7191] font-[Poppins] text-[48px] font-extrabold leading-[72px]">3</h1>
                  </div>
                  <div className="crown absolute -top-[100px] left-2/4 -translate-x-1/2 z-0" id="rank">
                    <img className="max-w-none relative left-[50px] top-0 h-[160px] w-[160px] rotate-[20deg]" src="/crown.png" />
                  </div>
                  <p id="name3" className="relative bottom-[35px] font-poppins text-[20px] font-bold text-black">{contributors[2].name || contributors[2].login}</p>
                  <p id="co3" className="relative bottom-[25px] font-poppins text-[20px] font-medium text-[#00000094]">contributions {contributors[2].contributions}</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="top-contributor flex justify-center items-end gap-[40px]">
          <div className="contributor relative text-center flex justify-center items-center flex-col gap-0" key={contributors[1].login}>
            <a href={contributors[1].html_url} target="__blank">
              <img
                className="circle w-[160px] h-[160px] bg-[#ff9800] rounded-[50%] flex justify-center items-center relative [transition:all_0.3s_ease-in-out] [box-shadow:1px_5px_6.8px_4px_rgba(0,_0,_0,_0.25)] hover:[box-shadow:0_0px_20px_rgba(48,_48,_48,_0.8)] hover:scale-[1.09] z-10"
                src={contributors[1].avatar_url}
                alt={`${contributors[1].login}'s Picture`}
              />
            </a>
            <div className="rank w-[50px] h-[50px] bg-[#e7e7e7] rounded-[50%] flex justify-center items-center relative bottom-[44px] left-[50px] z-20">
            <h1 className="text-[#2f7191] font-[Poppins] text-[48px] font-extrabold leading-[72px]">2</h1>
            </div>
            <div className="crown absolute -top-[100px] left-2/4 -translate-x-1/2 z-0" id="rank">
              <img className="max-w-none relative left-[50px] top-0 h-[160px] w-[160px] rotate-[20deg]" src="/crown.png" />
            </div>
            <p id="name2" className="relative bottom-[35px] font-poppins text-[20px] font-bold text-black">{contributors[1].name || contributors[1].login}</p>
            <p id="co2" className="relative bottom-[25px] font-poppins text-[20px] font-medium text-[#00000094]">contributions {contributors[1].contributions}</p>
          </div>

          <div className="contributor relative text-center flex flex-col justify-center items-center gap-0" key={contributors[0].login}>
            <a href={contributors[0].html_url} target="__blank">
              <img
                className="circle w-[260px] h-[260px] bg-secondary rounded-full flex justify-center items-center relative transition-all duration-300 ease-in-out [box-shadow:1px_5px_6.8px_4px_rgba(0,_0,_0,_0.25)] hover:shadow-[0_0px_20px_rgba(48,48,48,0.8)] hover:scale-[1.09] z-10"
                src={contributors[0].avatar_url}
                alt={`${contributors[0].login}'s Picture`}
              />
            </a>
            <div className="rank w-[50px] h-[50px] bg-[#e7e7e7] rounded-full flex justify-center items-center relative bottom-[44px] left-[50px] z-20">
              <h1 className="text-[#2f7191] font-[Poppins] text-[48px] font-extrabold leading-[72px]">1</h1>
            </div>
            <div className="crown absolute top-[-132px] left-1/2 transform -translate-x-1/2 z-0" id="rank1">
              <img src="/crown.png"  alt="crown" className="relative left-[80px] transform rotate-[20deg] scale-[1.5] w-[200px] h-[200px] max-w-none" />
            </div>
            <p id="name1" className="relative bottom-[25px] font-poppins text-[30px] font-bold text-black">{contributors[0].name || contributors[0].login}</p>
            <p id="co1" className="relative bottom-[25px] font-poppins text-[30px] font-medium text-[#00000094]">contributions {contributors[0].contributions}</p>
          </div>

          <div className="contributor relative text-center flex justify-center items-center flex-col gap-0" key={contributors[2].login}>
            <a href={contributors[2].html_url} target="__blank">
              <img
                className="circle w-[160px] h-[160px] bg-[#ff9800] rounded-[50%] flex justify-center items-center relative [transition:all_0.3s_ease-in-out] [box-shadow:1px_5px_6.8px_4px_rgba(0,_0,_0,_0.25)] hover:[box-shadow:0_0px_20px_rgba(48,_48,_48,_0.8)] hover:scale-[1.09] z-10"
                src={contributors[2].avatar_url}
                alt={`${contributors[2].login}'s Picture`}
              />
            </a>
            <div className="rank w-[50px] h-[50px] bg-[#e7e7e7] rounded-[50%] flex justify-center items-center relative bottom-[44px] left-[50px] z-20">
            <h1 className="text-[#2f7191] font-[Poppins] text-[48px] font-extrabold leading-[72px]">3</h1>
            </div>
            <div className="crown absolute -top-[100px] left-2/4 -translate-x-1/2 z-0" id="rank">
              <img className="max-w-none relative left-[50px] top-0 h-[160px] w-[160px] rotate-[20deg]" src="/crown.png" />
            </div>
            <p id="name3" className="relative bottom-[35px] font-poppins text-[20px] font-bold text-black">{contributors[2].name || contributors[2].login}</p>
            <p id="co3" className="relative bottom-[25px] font-poppins text-[20px] font-medium text-[#00000094]">contributions {contributors[2].contributions}</p>
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
    <div className="m-0 font-arial min-h-screen w-full block">
      {/* Section: Meet Our Team */}

      <div id="ourteam" className="flex justify-center items-center font-semibold text-4xl mt-[160px] text-center">Our Team</div>
      <div className="team-description text-center w-[60vw] m-auto mt-[20px] mb-[20px] leading-normal">
        Meet our team driving HelpOps-Hub's success with expertise and passion,
        turning every challenge into a milestone.
      </div>

      {/* Section: Team Grid */}

      <div id="team-grid" className="ml-4 mr-4 grid grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))] gap-8 mt-0 scale-[0.95]">
        {/* Team Member 1 */}
        <div className="team-member flex items-center bg-[#f1faff] border-[2.5px] border-dashed border-[#ff7d1f] rounded-[20px] p-[20px] ml-[20px] bg-center bg-cover bg-no-repeat transition-all duration-500 pr-0 hover:scale-[1.03]">
          <div className="card1 bg-[#4285f430] pt-8 rounded-[2rem] border-[#3498db] flex flex-col items-center relative w-[85%] h-full">
            <div className="margin h-[90%] flex flex-col justify-center items-center">
              <div className="image-div flex-none flex justify-center items-center">
                <img className="rounded-[50%] w-[28%]" src="/founder.png" alt="Azfar Alam" />
              </div>
              <div className="info-div text-center mt-[5px]">
                <h2 className="mt-[10px] text-[1.5em] font-bold mb-2 font-arial">Azfar Alam</h2>
                <p className="mt-[5px] block text-[16px] text-[#000000] font-arial">DevOps Engineer</p>
              </div>
              <span className="badge absolute top-[10px] right-[10px] inline-block px-[10px] py-[2px] rounded-[20px] text-[1em] founder bg-[#4285f47d] text-[#fff]">Founder</span>
            </div>
          </div>
          {/* Social Links for Team Member 1 */}
          <div className="social-links w-[16%] p-[10px] pl-[12px] pr-[12px]">
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#4285f45c]">
              <a
                href="https://github.com/sponsors/mdazfar2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Sponsor</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#4285f45c]">
              <a
                href="https://github.com/mdazfar2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Github</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#4285f45c]">
              <a
                href="https://www.linkedin.com/in/md-azfar-alam/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">LinkedIn</p>
            </div>
          </div>
        </div>
        {/* Team Member 2 */}
        <div className="team-member flex items-center bg-[#f1faff] border-[2.5px] border-dashed border-[#ff7d1f] rounded-[20px] p-[20px] ml-[20px] bg-center bg-cover bg-no-repeat transition-all duration-500 pr-0 hover:scale-[1.03]">
          <div className="card2 bg-[#fbbc0530] pt-8 rounded-[2rem] border-[#3498db] flex flex-col items-center relative w-[85%] h-full">
            <div className="margin h-[90%] flex flex-col justify-center items-center">
              <div className="image-div flex-none flex justify-center items-center">
                <img className="rounded-[50%] w-[28%]" src="/maintainer.png" alt="Anurag Pandey" />
              </div>
              <div className="info-div text-center mt-[5px]">
                <h2 className="mt-[10px] text-[1.5em] font-bold mb-2 font-arial">Anurag Pandey</h2>
                <p className="mt-[5px] block text-[16px] text-[#000000] font-arial">Software Engineer</p>
              </div>
              <span className="badge absolute top-[10px] right-[10px] inline-block px-[10px] py-[2px] rounded-[20px] text-[1em] Lead bg-[#fe9a37] text-[#fff]">Lead Developer</span>
            </div>
          </div>
          {/* Social Links for Team Member 2 */}
          <div className="social-links w-[16%] p-[10px] pl-[12px] pr-[12px]">
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#fbbc0591]">
              <a
                href="https://github.com/sponsors/pandeyji711"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Sponsor</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#fbbc0591]">
              <a
                href="https://github.com/pandeyji711"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Github</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#fbbc0591]">
              <a
                href="https://www.linkedin.com/in/anuragpandey0711/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">LinkedIn</p>
            </div>
          </div>
        </div>
        {/* Team Member 3 */}
        <div className="team-member flex items-center bg-[#f1faff] border-[2.5px] border-dashed border-[#ff7d1f] rounded-[20px] p-[20px] ml-[20px] bg-center bg-cover bg-no-repeat transition-all duration-500 pr-0 hover:scale-[1.03]">
          <div className="card3 bg-[#34a85330] pt-8 rounded-[2rem] border-[#3498db] flex flex-col items-center relative w-[85%] h-full">
            <div className="margin h-[90%] flex flex-col justify-center items-center">
              <div className="image-div flex-none flex justify-center items-center">
                <img className="rounded-[50%] w-[28%]" src="/maintainer2.jpeg" alt="RamakrushnaBiswal" />
              </div>
              <div className="info-div text-center mt-[5px]">
                <h2 className="mt-[10px] text-[1.5em] font-bold mb-2 font-arial">Ramakrushna</h2>
                <p className="mt-[5px] block text-[16px] text-[#000000] font-arial">UI/UX Designer</p>
              </div>
              <span className="badge absolute top-[10px] right-[10px] inline-block px-[10px] py-[2px] rounded-[20px] text-[1em] UI bg-[#34a85370] text-[#fff]">Maintainer</span>
            </div>
          </div>
          {/* Social Links for Team Member 3 */}
          <div className="social-links w-[16%] p-[10px] pl-[12px] pr-[12px]">
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#34a8535e]">
              <a
                href="https://github.com/sponsors/RamakrushnaBiswal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Sponsor</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#34a8535e]">
              <a
                href="https://github.com/RamakrushnaBiswal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Github</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#34a8535e]">
              <a
                href="https://www.linkedin.com/in/ramakrushna-biswal/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">LinkedIn</p>
            </div>
          </div>
        </div>
        {/* Team Member 4 */}
        <div className="team-member flex items-center bg-[#f1faff] border-[2.5px] border-dashed border-[#ff7d1f] rounded-[20px] p-[20px] ml-[20px] bg-center bg-cover bg-no-repeat transition-all duration-500 pr-0 hover:scale-[1.03]">
          <div className="card4 bg-[#ea433530] pt-8 rounded-[2rem] border-[#3498db] flex flex-col items-center relative w-[85%] h-full">
            <div className="margin h-[90%] flex flex-col justify-center items-center">
              <div className="image-div flex-none flex justify-center items-center">
                <img className="rounded-[50%] w-[28%]" src="/maintainer3.jpeg" alt="Ayushmaan" />
              </div>
              <div className="info-div text-center mt-[5px]">
                <h2 className="mt-[10px] text-[1.5em] font-bold mb-2 font-arial">Ayushmaan</h2>
                <p className="mt-[5px] block text-[16px] text-[#000000] font-arial">Web Developer</p>
              </div>
              <span className="badge absolute top-[10px] right-[10px] inline-block px-[10px] py-[2px] rounded-[20px] text-[1em] Maintainer bg-[#ea433578] text-[#fff]">Maintainer</span>
            </div>
          </div>
          {/* Social Links for Team Member 4 */}
          <div className="social-links w-[16%] p-[10px] pl-[12px] pr-[12px]">
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#ea43354d]">
              <a
                href="https://github.com/Ayushmaanagarwal1211"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeart} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Sponsor</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#ea43354d]">
              <a
                href="https://github.com/Ayushmaanagarwal1211"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">Github</p>
            </div>
            <div className="social-links-items [transition:0.3s_ease-in-out] flex justify-center flex-col items-center pt-[25px] rounded-[10px] w-full mx-[0rem] my-[0.6rem] hover:bg-[#ea43354d]">
              <a
                href="https://www.linkedin.com/in/ayushmaan-agarwal-8064a4258/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon scale-[2.5] max-[525px]:scale-125 text-[#6e6e6e]" />
              </a>
              <p className="text-[14px] mt-[10px] text-[#000000] font-arial">LinkedIn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Top 3 Contributors */}

      <div className="teams-container text-center h-[95vh] flex flex-col justify-center items-center">
        <h1 className="contri text-[48px] font-poppins font-extrabold text-[#1f1f1f] [transition:0.5s_ease-in-out]">Top 3 Contributors</h1>
        <div id="contributors" className="mt-[110px] flex justify-center items-end gap-[40px]">{renderTopContributors(topContri)}</div>
      </div>

      {/* Section: Dynamic Loading of Contributors */}

      <div id="team-grid1" className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-[10px] ml-8 mr-8 p-[30px]">
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

      <div className="trophy-card flex pl-[20px] ml-[74px] mr-[51px] bg-[rgba(47,_158,_214,_0.35)] text-[black] rounded-[18px] p-4 relative">
        <img src="trophy.png" alt="Trophy" className="trophy h-[66px] relative" />
        <div className="team-invite pl-8">
          <h2 className="text-[1.5em] font-bold mb-2 font-arial">Join our awesome team!</h2>
          <p>
            Be a contributor and improve HelpOps-Hub and help fellow developers.
          </p>
        </div>
        <a
          href="https://discord.gg/UWTrRhqywt"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-[20px]"
        >
          <button className="join-button px-[20px] py-[10px] text-[16px] bg-[#d9d9d9] text-[#3a3a3a] border-[none] [box-shadow:0px_4px_4px_0px_#00000040] rounded-[23px] cursor-pointer [transition:all_0.3s_ease] hover:bg-[linear-gradient(to_right,_#ff7d1f,_#ffd700)]"> 
            Join us now
          </button>
        </a>
      </div>

      {/* Section: Load More Button */}

      <div className="load">
        <button id="load-more" className="block mx-[auto] my-[20px] px-[20px] py-[10px] text-[16px] bg-[white] text-[black] border-solid border border-black [box-shadow:-5px_5px_0px_0px_#000000] cursor-pointer [transition:all_0.3s_ease] hover:bg-[linear-gradient(to_right,_#ff7d1f,_#ffd700)]"
         onClick={loadMore}
         >
          Load More
        </button>
      </div>
    </div>
  );
}

export default TeamsPage;
