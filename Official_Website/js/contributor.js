// const hamBurger = document.querySelector(".hamburger");
// const nMenu = document.querySelector(".nav-menu");

// document.addEventListener("DOMContentLoaded", function () {
//   setTimeout(function () {
//     document.querySelector("body").classList.add("loaded");
//   }, 500);
// });
// const loading = document.getElementById("loading1");
// loading.innerHTML = `<h1 class="loading">Loading</h1>`;
// Hamburger menu
// hamBurger.addEventListener("click", mobileMenu);
// function mobileMenu() {
//   hamBurger.classList.toggle("active");
//   nMenu.classList.toggle("active");
// }

const cont = document.getElementById("team-grid1");
const owner = "mdazfar2";
const repoName = "HelpOps-Hub";

async function fetchContributors(pageNumber) {
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbzipat1oQlBel7YwZaPl7mCpshjRpvyouFSRgunjqGlKC-0gv46hypYD0EnSMsOEBeC-Q/exec";

  async function getkey() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Log the response data
      return data.apik[0].apikey;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const token = await getkey();
  const perPage = 100;
  const url = `https://api.github.com/repos/${owner}/${repoName}/contributors?page=${pageNumber}&per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch contributors data. Status code: ${response.status}`
    );
  }

  const contributorsData = await response.json();
  //   loading.innerHTML = ``;
  return contributorsData;
}

// Function to fetch all contributors
async function fetchAllContributors() {
  let allContributors = [];
  let pageNumber = 1;

  try {
    while (true) {
      const contributorsData = await fetchContributors(pageNumber);
      if (contributorsData.length === 0) {
        break;
      }
      allContributors = allContributors.concat(contributorsData);
      pageNumber++;
    }
    var cheak = 0;
    allContributors.forEach((contributor) => {
      if (contributor.login === owner) {
        return;
      }
      //   <div class="team-member">
      //     <div class="card">
      //       <div class="image-div">
      //         <img src="Screenshot (251).png" alt="Azfar Alam" />
      //       </div>
      //       <div class="info-div">
      //         <span class="badge founder">Founder</span>
      //         <h2>Azfar Alam</h2>
      //         <p>DevOps Engineer</p>
      //       </div>
      //     </div>
      //     <div class="social-links">
      //       <a href="#">
      //         <i class="fas fa-heart"></i> Sponsor
      //       </a>
      //       <a href="#">
      //         <i class="fab fa-github"></i> GitHub
      //       </a>
      //       <a href="#">
      //         <i class="fab fa-twitter"></i> Twitter
      //       </a>
      //     </div>
      //   </div>;

      const contributorCard = document.createElement("div");
      contributorCard.classList.add("team-member");
      const avatarImg = document.createElement("img");
      avatarImg.src = contributor.avatar_url;
      avatarImg.alt = `${contributor.login}'s Picture`;
      const name = contributor.name || contributor.login;

      const loginLink = document.createElement("a");
      const loginLink1 = document.createElement("a");
      loginLink1.href = `https://github.com/sponsors/${name}`;
      loginLink.href = contributor.html_url;
      loginLink.target = "_blank";
      contributorCard.innerHTML = `  <div class="card">
         <div class="image-div">
           <img src=${avatarImg.src} alt=${avatarImg.alt} />
         </div>
         <div class="info-div">
         <span class="badge maintainer">Contributor</span>
           <h2>${name}</h2>
           <p>Open-source contributor</p>
         </div>
       </div>
       <div class="social-links">
           <a href=${loginLink1}>
           <i class="fas fa-heart"></i> Sponsor
         </a>
         <a href=${loginLink}>
           <i class="fab fa-github"></i> GitHub
         </a>
       </div>`;
      //   loginLink.appendChild(avatarImg);

      //   contributorCard.appendChild(loginLink);
      if (cheak > 0) cont.appendChild(contributorCard);
      cheak++;
    });
  } catch (error) {
    console.error(error);
  }
}

fetchAllContributors();

// let calcScrollValue = () => {
//   let scrollProg = document.getElementById("progress");
//   let pos = document.documentElement.scrollTop;
//   let calcHeight =
//     document.documentElement.scrollHeight -
//     document.documentElement.clientHeight;
//   let scrollValue = Math.round((pos * 100) / calcHeight);
//   if (pos > 100) {
//     scrollProg.style.display = "grid";
//   } else {
//     scrollProg.style.display = "none";
//   }
//   scrollProg.addEventListener("click", () => {
//     document.documentElement.scrollTop = 0;
//   });
//   scrollProg.style.background = `conic-gradient(#0063ba ${scrollValue}%, #d499de ${scrollValue}%)`;
// };

// window.addEventListener("scroll", function () {
//   var scrollToTopButton = document.getElementById("progress");
//   if (window.pageYOffset > 200) {
//     scrollToTopButton.style.display = "block";
//   } else {
//     scrollToTopButton.style.display = "none";
//   }
// });

// window.onscroll = calcScrollValue;
// window.onload = calcScrollValue;
