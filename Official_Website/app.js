//script
document.addEventListener("DOMContentLoaded", async function () {
  // const loading = document.getElementById("loading");
  // loading.innerHTML = `<h1 class="loading">Loading</h1>`;

  function _0x2f00(_0x8f731d, _0x540245) {
    const _0x35b8dc = _0x35b8();
    return (
      (_0x2f00 = function (_0x2f005c, _0x4958ed) {
        _0x2f005c = _0x2f005c - 0x10c;
        let _0x591871 = _0x35b8dc[_0x2f005c];
        return _0x591871;
      }),
      _0x2f00(_0x8f731d, _0x540245)
    );
  }
  const _0x325d39 = _0x2f00;
  (function (_0x4151fc, _0xb369e9) {
    const _0x4e7762 = _0x2f00,
      _0x3c3186 = _0x4151fc();
    while (!![]) {
      try {
        const _0x525e77 =
          parseInt(_0x4e7762(0x112)) / 0x1 +
          (-parseInt(_0x4e7762(0x11c)) / 0x2) *
            (-parseInt(_0x4e7762(0x119)) / 0x3) +
          parseInt(_0x4e7762(0x10f)) / 0x4 +
          (parseInt(_0x4e7762(0x11a)) / 0x5) *
            (-parseInt(_0x4e7762(0x115)) / 0x6) +
          -parseInt(_0x4e7762(0x117)) / 0x7 +
          -parseInt(_0x4e7762(0x114)) / 0x8 +
          (parseInt(_0x4e7762(0x11b)) / 0x9) *
            (-parseInt(_0x4e7762(0x111)) / 0xa);
        if (_0x525e77 === _0xb369e9) break;
        else _0x3c3186["push"](_0x3c3186["shift"]());
      } catch (_0x1fdb3c) {
        _0x3c3186["push"](_0x3c3186["shift"]());
      }
    }
  })(_0x35b8, 0x6d915);
  function _0x35b8() {
    const _0x332eb2 = [
      "409580RoLiUq",
      "apikey",
      "1674440paAThL",
      "30330fTgmBv",
      "Network\x20response\x20was\x20not\x20ok",
      "565376UWJHTh",
      "json",
      "15IwAEsy",
      "745WUQgoO",
      "1113939kaHLBK",
      "275510qyCDuL",
      "error",
      "apik",
      "https://script.googleusercontent.com/macros/echo?user_content_key=EzyPm8qoLqvtQWyyN8R5Z80voJk-ptU5byKtPo8haVVFeeUO3d2KRa3n_8fBJtHskVxV8yvI507uTyLDWUeIrrNtISZYcaz1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPGM7xLHLqvZvMSHnARWbupyIWIJrY7gK1mSjVDHcR25w5zDMGOWGLe99CpEY-JfLA6TOwkCoui3XCUWh_VsrxoGyvkiYp3rQ9z9Jw9Md8uu&lib=Ms2w9yo699vd0M5y2UYeB-z4c9SZU-kkO",
      "2069892hawKdV",
      "log",
      "10uvHqxB",
    ];
    _0x35b8 = function () {
      return _0x332eb2;
    };
    return _0x35b8();
  }
  const apiUrl = _0x325d39(0x10e);
  async function getkey() {
    const _0x309b02 = _0x325d39;
    try {
      const _0x39a329 = await fetch(apiUrl);
      if (!_0x39a329["ok"]) throw new Error(_0x309b02(0x116));
      const _0x10b7b1 = await _0x39a329[_0x309b02(0x118)]();
      return (
        console[_0x309b02(0x110)](_0x10b7b1),
        _0x10b7b1[_0x309b02(0x10d)][0x0][_0x309b02(0x113)]
      );
    } catch (_0x1d7ef2) {
      console[_0x309b02(0x10c)]("Error\x20fetching\x20data:", _0x1d7ef2);
    }
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
