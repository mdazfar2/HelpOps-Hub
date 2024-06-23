"use client";
import React, { useState, useEffect } from "react";
import "@stylesheets/resources.css";
import "@stylesheets/resourceloader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function ResourcesPage() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepository(url) {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      async function getkey() {
        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzipat1oQlBel7YwZaPl7mCpshjRpvyouFSRgunjqGlKC-0gv46hypYD0EnSMsOEBeC-Q/exec"
          );
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          return data.apik[0].apikey;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const token = await getkey();

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          throw new Error(
            "Access to the requested resource is forbidden. You might have hit the API rate limit."
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new TypeError("Fetched data is not an array.");
        }

        const filteredData = data.filter((file) => {
          const filename = file.name.slice(0, -1);
          const isUpdate = filename.toLowerCase() === "website1.0";
          const isOfficialWebsite = file.name.toLowerCase() === "website2.0";
          return !file.name.includes(".") && !isUpdate && !isOfficialWebsite;
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
            return { ...folder, created_at: createdAt };
          })
        );

        foldersWithDates.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        setOriginalData(foldersWithDates);
        setFilteredData(foldersWithDates);

        await delay(1500);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        await delay(1500);
        setLoading(false);
      }
    }

    fetchRepository(
      "https://api.github.com/repos/mdazfar2/HelpOps-Hub/contents"
    );
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setFilteredData(originalData);
    } else {
      const filteredResults = originalData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filteredResults);
    }
  };

  const displayFolders = (data) => {
    return data.map((item) => {
      if (item.type === "dir") {
        const createdDate = new Date(item.created_at);
        return (
          <div
            className="folder-card"
            key={item.name}
            onClick={() => {
              const folder = `${item.name}`;
              window.location.href = `/resourcesdetails?folder=${folder}&htmlUrl=${item.html_url}`;
            }}
          >
            <h3 className="resourcesTitle">{item.name}</h3>
            <p className="resourcesPara">{item.path}</p>
            <p className="resourcesDate">
              Created on:{" "}
              {createdDate.toLocaleString() !== "Invalid Date"
                ? createdDate.toLocaleString()
                : "N/A"}
            </p>
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
            <FontAwesomeIcon icon={faMagnifyingGlass} color="orange" />
          </div>
          <input
            type="text"
            id="search-bar"
            placeholder="Search topics..."
            onInput={handleSearch}
          />
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
        ) : error ? (
          <div id="error">
            <p>{error}</p>
          </div>
        ) : (
          <div id="folders-container">{displayFolders(filteredData)}</div>
        )}
      </div>
    </div>
  );
}

export default ResourcesPage;
