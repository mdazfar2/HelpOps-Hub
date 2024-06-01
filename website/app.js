// Fetch repository contents using the GitHub API
const apiUrl = "https://api.github.com/repos/mdazfar2/HelpOps-Hub/contents";
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      const filteredData = data.filter((file) => {
        const iswebsite = file.name.toLowerCase() == "website";
        return !file.name.includes(".") && !iswebsite;
      });

      const foldersContainer = document.getElementById("folders-container");
      filteredData.forEach((item) => {
        if (item.type === "dir") {
          // Create a card for each folder
          const folderCard = document.createElement("div");
          folderCard.classList.add("folder-card");
          folderCard.innerHTML = `
                            <h3>${item.name}</h3>
                            <p>${item.path}</p>
                        `;
          // Add click event to redirect to folder
          folderCard.addEventListener("click", () => {
            window.location.href = item.html_url;
          });
          foldersContainer.appendChild(folderCard);
        }
      });
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
