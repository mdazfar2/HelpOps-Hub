//script
document.addEventListener("DOMContentLoaded", async function () {
  // const loading = document.getElementById("loading");
  // loading.innerHTML = `<h1 class="loading">Loading</h1>`;
  const _0x508d96 = _0x20db;
  (function (_0x19bfc5, _0x120394) {
    const _0x3e52dd = _0x20db,
      _0x1d0abc = _0x19bfc5();
    while (!![]) {
      try {
        const _0x39e9fc =
          -parseInt(_0x3e52dd(0x1e8)) / 0x1 +
          (parseInt(_0x3e52dd(0x1e3)) / 0x2) *
            (-parseInt(_0x3e52dd(0x1e5)) / 0x3) +
          -parseInt(_0x3e52dd(0x1eb)) / 0x4 +
          (-parseInt(_0x3e52dd(0x1e1)) / 0x5) *
            (-parseInt(_0x3e52dd(0x1ea)) / 0x6) +
          (parseInt(_0x3e52dd(0x1dd)) / 0x7) *
            (-parseInt(_0x3e52dd(0x1e6)) / 0x8) +
          parseInt(_0x3e52dd(0x1de)) / 0x9 +
          parseInt(_0x3e52dd(0x1e0)) / 0xa;
        if (_0x39e9fc === _0x120394) break;
        else _0x1d0abc["push"](_0x1d0abc["shift"]());
      } catch (_0x3de373) {
        _0x1d0abc["push"](_0x1d0abc["shift"]());
      }
    }
  })(_0x2d57, 0xf311d);
  function _0x20db(_0x5e409a, _0x4a5db0) {
    const _0x2d5732 = _0x2d57();
    return (
      (_0x20db = function (_0x20db58, _0x23c579) {
        _0x20db58 = _0x20db58 - 0x1db;
        let _0x775235 = _0x2d5732[_0x20db58];
        return _0x775235;
      }),
      _0x20db(_0x5e409a, _0x4a5db0)
    );
  }
  const apiUrl = _0x508d96(0x1e2);
  async function getkey() {
    const _0x38fe38 = _0x508d96;
    try {
      const _0x223b25 = await fetch(apiUrl);
      if (!_0x223b25["ok"]) throw new Error(_0x38fe38(0x1e7));
      const _0x2b81dc = await _0x223b25[_0x38fe38(0x1df)]();
      return _0x2b81dc[_0x38fe38(0x1dc)][0x0][_0x38fe38(0x1db)];
    } catch (_0x550353) {
      console[_0x38fe38(0x1e9)](_0x38fe38(0x1e4), _0x550353);
    }
  }
  function _0x2d57() {
    const _0x43369c = [
      "66jrWeyw",
      "1716404RdSjyL",
      "apikey",
      "apik",
      "35XsbTnG",
      "11036538cnZHOy",
      "json",
      "2659980zzRIPo",
      "571785wAFKxg",
      "https://script.google.com/macros/s/AKfycbzipat1oQlBel7YwZaPl7mCpshjRpvyouFSRgunjqGlKC-0gv46hypYD0EnSMsOEBeC-Q/exec",
      "94MUOsMq",
      "Error\x20fetching\x20data:",
      "22287yxVVIR",
      "779728GWtUrW",
      "Network\x20response\x20was\x20not\x20ok",
      "489000XbTEek",
      "error",
    ];
    _0x2d57 = function () {
      return _0x43369c;
    };
    return _0x2d57();
  }
  const token = await getkey();

  async function fetchRepository(url) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data) {
        const loading = document.getElementById("loading");
        const main = document.getElementById("maincontainer");
        main.remove();
        loading.remove();

        const filteredData = data.filter((file) => {
          const isWebsite = file.name.toLowerCase() === "official_website";
          return !file.name.includes(".") && !isWebsite;
        });

        const foldersWithDates = await Promise.all(
          filteredData.map(async (folder) => {
            const commitsUrl = `https://api.github.com/repos/mdazfar2/HelpOps-Hub/commits?path=${folder.path}`;
            const commitResponse = await fetch(commitsUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const commitData = await commitResponse.json();
            const createdAt = commitData.length
              ? commitData[commitData.length - 1].commit.committer.date
              : "N/A";
            if (createdAt === "N/A") {
              console.warn(`No commit data found for folder: ${folder.name}`);
            }
            return {
              ...folder,
              created_at: createdAt,
            };
          })
        );

        // Sort folders by creation date in ascending order (oldest first)
        foldersWithDates.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        displayFolders(foldersWithDates);

        // Search functionality
        const searchBar = document.getElementById("search-bar");
        searchBar.addEventListener("input", () => {
          const searchTerm = searchBar.value.toLowerCase();
          const filteredResults = foldersWithDates.filter((item) =>
            item.name.toLowerCase().includes(searchTerm)
          );
          displayFolders(filteredResults);
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function displayFolders(data) {
    const foldersContainer = document.getElementById("folders-container");
    foldersContainer.innerHTML = "";
    data.forEach((item) => {
      if (item.type === "dir") {
        const folderCard = document.createElement("div");
        folderCard.classList.add("folder-card");
        const createdDate = new Date(item.created_at);
        folderCard.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.path}</p>
          <p>Created on: ${
            createdDate.toLocaleString() !== "Invalid Date"
              ? createdDate.toLocaleString()
              : "N/A"
          }</p>
        `;
        folderCard.addEventListener("click", () => {
          window.location.href = item.html_url;
        });
        foldersContainer.appendChild(folderCard);
      }
    });
  }

  fetchRepository("https://api.github.com/repos/mdazfar2/HelpOps-Hub/contents");
});
//Scroll to top js
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function handleScroll() {
  if (window.pageYOffset > 100) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}
// Add scroll event listener
window.addEventListener("scroll", handleScroll);
// Add click event listener
scrollToTopBtn.addEventListener("click", scrollToTop);
