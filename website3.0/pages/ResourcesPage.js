"use client";
import React, { useState, useEffect } from "react";
import "@stylesheets/resources.css";
import "@stylesheets/resourceloader.css";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function ResourcesPage() {
  // State variables to manage Data and Loadin State
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 //to add body bg color 
 useEffect(() => {
  document.body.style.background = "linear-gradient(to bottom,#f5d471 2%,#ec904f 35%,#eb9a60 55%,#e99960 65%,#e89357 75%,#e99559 85%)  ";

  // Clean-up function to reset background color when component unmounts
  return () => {
    document.body.style.backgroundColor = "";
  };
}, []);
  useEffect(() => {
    // Function to fetch repository data
    async function fetchRepository(url) {
      // Function to delay execution for visual effect
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
      // Function to fetch API key from external source
      async function getkey() {
        try {
          // Fetch API key from the provided URL
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzipat1oQlBel7YwZaPl7mCpshjRpvyouFSRgunjqGlKC-0gv46hypYD0EnSMsOEBeC-Q/exec"
          );
          
          // Check if response is ok; throw error if not
          if (!response.ok) throw new Error("Network response was not ok");
  
          // Parse response to JSON format
          const data = await response.json();
  
          // Return the API key from the fetched data
          return data.apik[0].apikey;
        } catch (error) {
          // Handle and log any errors encountered during fetching
          console.error("Error fetching data:", error);
        }
      }
  
      // Call getkey function to retrieve API key
      const token = await getkey();
  
      try {
        // Fetch repository contents using provided URL and API token
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Include authorization token in headers
          },
        });
  
        // Handle HTTP error responses
        if (response.status === 403) {
          throw new Error(
            "Access to the requested resource is forbidden. You might have hit the API rate limit."
          );
        }
  
        // Parse response to JSON format
        const data = await response.json();
  
        // Ensure fetched data is an array; throw error if not
        if (!Array.isArray(data)) {
          throw new TypeError("Fetched data is not an array.");
        }
  
        // Filter out specific files from fetched data
        const filteredData = data.filter((file) => {
          const filename = file.name.slice(0, -1); // Remove last character from filename
          const isUpdate = filename.toLowerCase() === "website2.0"; // Check if filename is "website2.0"
          const isOfficialWebsite = file.name.toLowerCase() === "website3.0"; // Check if filename is "website3.0"
          // Exclude files with extensions and specific filenames
          return !file.name.includes(".") && !isUpdate && !isOfficialWebsite;
        });
  
        // Fetch creation dates for each filtered folder asynchronously
        const foldersWithDates = await Promise.all(
          filteredData.map(async (folder) => {
            const commitsUrl = `https://api.github.com/repos/mdazfar2/HelpOps-Hub/commits?path=${folder.path}`;
            const commitResponse = await fetch(commitsUrl, {
              headers: {
                Authorization: `Bearer ${token}`, // Include authorization token in headers
              },
            });
            const commitData = await commitResponse.json(); // Parse commit data to JSON format
            const createdAt = commitData.length
              ? commitData[commitData.length - 1].commit.committer.date // Get creation date of last commit
              : "N/A"; // Set as "N/A" if no commit data found
            if (createdAt === "N/A") {
              console.warn(`No commit data found for folder: ${folder.name}`);
            }
            // Return folder object with added creation date
            return { ...folder, created_at: createdAt };
          })
        );
  
        // Sort folders by creation date (ascending order)
        foldersWithDates.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
  
        // Set both original and filtered data states with fetched and processed data
        setOriginalData(foldersWithDates);
        setFilteredData(foldersWithDates);
  
        await delay(1500); // Simulate delay for loading effect
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        // Handle and log errors encountered during fetching or processing
        console.error("Error fetching data:", error);
        setError(error.message); // Set error state with error message
        await delay(1500); // Simulate delay for loading effect
        setLoading(false); // Set loading state to false after error
      }
    }
  
    // Call fetchRepository function with GitHub API URL when component mounts (empty dependency array)
    fetchRepository(
      "https://api.github.com/repos/mdazfar2/HelpOps-Hub/contents"
    );
  }, []);
  
  const handleSearch = (event) => {
    // Get the search term from the input field, convert to lowercase
    const searchTerm = event.target.value.toLowerCase();
    
    // If search term is empty, show all original data
    if (searchTerm === "") {
      setFilteredData(originalData);
    } else {
      // Filter original data based on whether item name includes the search term
      const filteredResults = originalData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      // Update filtered data state with filtered results
      setFilteredData(filteredResults);
    }
  };

  const displayFolders = (data) => {
    return data.map((item) => {
      // Render only directories (type === "dir")
      if (item.type === "dir") {
        // Parse creation date
        const createdDate = new Date(item.created_at);
  
        // Return JSX for each directory item
        return (
          <div
            className="resources__folder-card"
            key={item.name}
            onClick={() => {
              // Redirect to detailed resources page on click
              const folder = `${item.name}`;
              window.location.href = `/resourcesdetails?folder=${folder}&htmlUrl=${item.html_url}`;
            }}
          >
            {/* Display folder name */}
            <h3 className="resources__folder-title">{item.name}</h3>
            {/* Display folder path */}
            <p className="resources__folder-path">{item.path}</p>
            {/* Display creation date */}
            <p className="resources__folder-date">
              Created on:{" "}
              {createdDate.toLocaleString() !== "Invalid Date"
                ? createdDate.toLocaleString()
                : "N/A"}
            </p>
          </div>
        );
      }
      // Return null for non-directory items
      return null;
    });
  };
  

  return (
    <div className="resources">

      {/* Section: Heading */}

      <div className="resources__heading">
        <h1>Resources</h1>
      </div>
      
      {/* Section: Search-Bar */}

      <div className="resources__search-container">
        <div id="search-box" className="resources__search-box">
          <div className="resources__icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} color="orange" />
          </div>
          <input
            type="text"
            id="search-bar"
            className="resources__search-bar"
            placeholder="Search topics..."
            onInput={handleSearch}
          />
        </div>
      </div>

      {/* Section: Main Container */}

      <div id="maincontainer" className="resources__main-container">
        {loading ? (
          <div id="loading" className="resources__loading">
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
