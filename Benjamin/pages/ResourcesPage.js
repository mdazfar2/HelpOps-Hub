"use client"
import React, { useState, useEffect } from "react";
import "@stylesheets/resources.css";

function ResourcesPage() {
  const [foldersWithDates, setFoldersWithDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepository(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          const filteredData = data.filter((file) => {
            let filename = file.name;
            filename = filename.slice(0, -1);
            const isUpdate = filename.toLowerCase() === "website1.0";
            const isOfficialWebsite = file.name.toLowerCase() === "website2.0";
            return !file.name.includes(".") && !isUpdate && !isOfficialWebsite;
          });

          const foldersWithDates = await Promise.all(
            filteredData.map(async (folder) => {
              const commitsUrl = `https://api.github.com/repos/mdazfar2/HelpOps-Hub/commits?path=${folder.path}`;
              const commitResponse = await fetch(commitsUrl, {
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
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

          foldersWithDates.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );

          setFoldersWithDates(foldersWithDates);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchRepository("https://api.github.com/repos/mdazfar2/HelpOps-Hub/contents");
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = foldersWithDates.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFoldersWithDates(filteredResults);
  };

  const displayFolders = (data) => {
    return data.map((item) => {
      if (item.type === "dir") {
        const createdDate = new Date(item.created_at);
        return (
          <div className="folder-card" key={item.name} onClick={() => {
            const folder = `${item.name}`;
            window.location.href = `resource-details.html?folder=${folder}&htmlUrl=${item.html_url}`;
          }}>
            <h3>{item.name}</h3>
            <p>{item.path}</p>
            <p>Created on: {createdDate.toLocaleString() !== "Invalid Date" ? createdDate.toLocaleString() : "N/A"}</p>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <div className="heading">
        <h1>Resources</h1>
      </div>
      <div className="search-container">
        <div id="search-box">
          <div className="icon">
            <i className="fas fa-duotone fa-magnifying-glass"></i>
          </div>
          <input type="text" id="search-bar" placeholder="Search topics..." onInput={handleSearch} />
        </div>
      </div>
      <div id="maincontainer">
        {loading ? (
          <div id="loading">
            <div className="📦"></div>
            <div className="📦"></div>
            <div className="📦"></div>
            <div className="📦"></div>
            <div className="📦"></div>
          </div>
        ) : (
          <div id="folders-container">
            {displayFolders(foldersWithDates)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourcesPage;
