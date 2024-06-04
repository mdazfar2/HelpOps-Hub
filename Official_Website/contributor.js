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
// const loading = document.getElementById("skeleton-wrapper");
//   cont.appendChild(loading);
async function fetchContributors(pageNumber) {
  const _0x57c7a2 = _0x55df;
  (function (_0x7afde4, _0x279ad2) {
    const _0x373dbd = _0x55df,
      _0x449b85 = _0x7afde4();
    while (!![]) {
      try {
        const _0x5aa9a9 =
          -parseInt(_0x373dbd(0xad)) / 0x1 +
          -parseInt(_0x373dbd(0xb7)) / 0x2 +
          -parseInt(_0x373dbd(0xaf)) / 0x3 +
          (parseInt(_0x373dbd(0xac)) / 0x4) *
            (-parseInt(_0x373dbd(0xae)) / 0x5) +
          -parseInt(_0x373dbd(0xa8)) / 0x6 +
          (-parseInt(_0x373dbd(0xb3)) / 0x7) *
            (-parseInt(_0x373dbd(0xab)) / 0x8) +
          (-parseInt(_0x373dbd(0xaa)) / 0x9) *
            (-parseInt(_0x373dbd(0xb5)) / 0xa);
        if (_0x5aa9a9 === _0x279ad2) break;
        else _0x449b85["push"](_0x449b85["shift"]());
      } catch (_0x36680b) {
        _0x449b85["push"](_0x449b85["shift"]());
      }
    }
  })(_0x470c, 0xe59c7);
  function _0x55df(_0x3c5be2, _0x22e4d2) {
    const _0x470c8f = _0x470c();
    return (
      (_0x55df = function (_0x55dfa5, _0x40ac15) {
        _0x55dfa5 = _0x55dfa5 - 0xa8;
        let _0x120ab5 = _0x470c8f[_0x55dfa5];
        return _0x120ab5;
      }),
      _0x55df(_0x3c5be2, _0x22e4d2)
    );
  }
  const apiUrl = _0x57c7a2(0xb1);
  async function getkey() {
    const _0x36503b = _0x57c7a2;
    try {
      const _0x37cb91 = await fetch(apiUrl);
      if (!_0x37cb91["ok"]) throw new Error(_0x36503b(0xb4));
      const _0x1d7bab = await _0x37cb91[_0x36503b(0xb2)]();
      return _0x1d7bab[_0x36503b(0xa9)][0x0][_0x36503b(0xb6)];
    } catch (_0x45ce9f) {
      console["error"](_0x36503b(0xb0), _0x45ce9f);
    }
  }
  function _0x470c() {
    const _0x57b2f6 = [
      "11073704OnHOnz",
      "192616eTlKBl",
      "1549488wLKhSq",
      "170ZCfKen",
      "754176DlyvCG",
      "Error\x20fetching\x20data:",
      "https://script.google.com/macros/s/AKfycbzipat1oQlBel7YwZaPl7mCpshjRpvyouFSRgunjqGlKC-0gv46hypYD0EnSMsOEBeC-Q/exec",
      "json",
      "7Sgnepe",
      "Network\x20response\x20was\x20not\x20ok",
      "70NJzGMO",
      "apikey",
      "1110902JNcOiC",
      "1677348FGGESa",
      "apik",
      "4923513NUAFJk",
    ];
    _0x470c = function () {
      return _0x57b2f6;
    };
    return _0x470c();
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
  const cont = document.getElementById("team-grid1");
  cont.removeChild(cont.firstChild);

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

      const contributorCard = document.createElement("div");
      contributorCard.classList.add("team-member7");
      const avatarImg = document.createElement("img");
      avatarImg.src = contributor.avatar_url;
      avatarImg.alt = `${contributor.login}'s Picture`;
      let name = contributor.name || contributor.login;

      if (name.length > 12) {
        name = name.slice(0, 10) + "...";
      }

      const loginLink = document.createElement("a");
      const loginLink1 = document.createElement("a");
      loginLink1.href = `https://github.com/sponsors/${name}`;
      loginLink.href = contributor.html_url;
      loginLink.target = "_blank";
      const contri = contributor.contributions;
      contributorCard.innerHTML = `  <div class="card7">
       <div class="badge7" >Developer</div>
          <div class="image-div7">
            <img src=${avatarImg.src} alt=${avatarImg.alt} />
          </div>
          <div class="info-div7">
            <h2>${name}</h2>
            <p>Open Source Contributor</p>
          </div>
        </div>
        <div class="data7">
          <div class="contributions7">
            <div class="contributions-count7">${contri}</div>
            <div class="contributions-label7">Contributions</div>
           
          </div>
          <div class="social-links7">
            <a href=${loginLink}>
              <i class="fab fa-github"></i>
            </a>
            <div class="github-label7">GitHub</div>
          </div>
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
