"use client";
import React, { useState, useEffect } from "react";
import "@stylesheets/resources.css";
import "@stylesheets/resourceloader.css";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {FaThumbsUp,FaHeart} from 'react-icons/fa6'
import Login from "@components/LoginSignup/Login";
import Signup from "@components/LoginSignup/Signup";
function ResourcesPage() {
  // State variables to manage Data and Loading State
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // New state variables for sorting and filtering
  const [sortOption, setSortOption] = useState("name");
  const [filterOption, setFilterOption] = useState("all");
  const [showPopup,setShowPopup]=useState(false)
  const [likedFolders, setLikedFolders] = useState(new Set());  //to add body bg color
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => {
    setIsLogin(false);
  };
  const closeAuth = () => {
    setShowAuth(false);
    setIsLogin(true);
  };
  useEffect(()=>{
    fetchdataa()
  },[])
  async function fetchdataa(){
    let msg=await fetch('/api/likedfolder',{
      method:"GET"
    })
    msg=await msg.json()
    let folder=new Set()
    msg.msg.map((data)=>{
      folder.add(data.resourcePath)
    })
    setLikedFolders(folder)
  }
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

  useEffect(() => {
    // Function to fetch repository data
    async function fetchRepository(url) {
      // Function to delay execution for visual effect
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Function to fetch API key from external source
      (function (_0x25f1f8, _0x2c8548) {
        const _0x3d2bd2 = _0x26f2,
          _0xfb22ad = _0x25f1f8();
        while (!![]) {
          try {
            const _0x4d92e6 =
              parseInt(_0x3d2bd2(0x1ed)) / 0x1 +
              parseInt(_0x3d2bd2(0x1ee)) / 0x2 +
              (-parseInt(_0x3d2bd2(0x1f0)) / 0x3) *
                (parseInt(_0x3d2bd2(0x1e9)) / 0x4) +
              -parseInt(_0x3d2bd2(0x1e8)) / 0x5 +
              (-parseInt(_0x3d2bd2(0x1e3)) / 0x6) *
                (parseInt(_0x3d2bd2(0x1e7)) / 0x7) +
              (parseInt(_0x3d2bd2(0x1e4)) / 0x8) *
                (-parseInt(_0x3d2bd2(0x1ef)) / 0x9) +
              parseInt(_0x3d2bd2(0x1eb)) / 0xa;
            if (_0x4d92e6 === _0x2c8548) break;
            else _0xfb22ad["push"](_0xfb22ad["shift"]());
          } catch (_0x2a8803) {
            _0xfb22ad["push"](_0xfb22ad["shift"]());
          }
        }
      })(_0xff61, 0x46615);
      async function getkey() {
        const _0xaefe02 = _0x26f2;
        try {
          const _0x5465ca = await fetch(
            "https://script.googleusercontent.com/macros/echo?user_content_key=M5P4EYh_BuJrTHJYOmv-oQAa9a6mCxh4g85vN45gaKRtrdz8lo_5mh00mwqz7816kG-RJz8emXXNWEb_dxS9WdaFQcXCxqtJm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFIloOYi_xeVNw6-UByw1mnYIs88IJt7zafhtTIVIUHc6t4l3UyWu-OUHYZF6tPdrKjRDsPTA4mkeXNfwJSFFu6ExfB7Qd_-iQ&lib=MjyKE0CtWnEGB8SSZjHlO0qJGBFN6q3R9"
          );
          if (!_0x5465ca["ok"]) throw new Error(_0xaefe02(0x1ec));
          const _0x5ec22f = await _0x5465ca[_0xaefe02(0x1e5)]();
          return _0x5ec22f["apik"][0x0][_0xaefe02(0x1ea)];
        } catch (_0x122dd6) {
          console[_0xaefe02(0x1e6)]("Error\x20fetching\x20data:", _0x122dd6);
        }
      }
      function _0x26f2(_0x4e567a, _0x167364) {
        const _0xff6186 = _0xff61();
        return (
          (_0x26f2 = function (_0x26f251, _0x134099) {
            _0x26f251 = _0x26f251 - 0x1e3;
            let _0x5572bc = _0xff6186[_0x26f251];
            return _0x5572bc;
          }),
          _0x26f2(_0x4e567a, _0x167364)
        );
      }
      const token = await getkey();
      function _0xff61() {
        const _0x133e0b = [
          "json",
          "error",
          "68523NXrIWE",
          "2776380TjYKzc",
          "131644pVNzRV",
          "apikey",
          "13194460oZOwDa",
          "Network\x20response\x20was\x20not\x20ok",
          "353100sgAbVb",
          "529902NYSiuT",
          "18UnAwMS",
          "15xuPVjc",
          "282khDwpp",
          "1877224nhCeKH",
        ];
        _0xff61 = function () {
          return _0x133e0b;
        };
        return _0xff61();
      }

      try {
        // Fetch repository contents using provided URL and API token
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    let results = originalData;

    if (searchTerm !== "") {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply current filter
    if (filterOption !== "all") {
      results = results.filter((item) => {
        const createdDate = new Date(item.created_at);
        const now = new Date();
        if (filterOption === "lastWeek") {
          return (now - createdDate) / (1000 * 60 * 60 * 24) <= 7;
        } else if (filterOption === "lastMonth") {
          return (now - createdDate) / (1000 * 60 * 60 * 24) <= 30;
        }
        return true;
      });
    }

    // Apply current sort
    results.sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "date") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

    setFilteredData(results);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredData].sort((a, b) => {
      if (option === "name") {
        return a.name.localeCompare(b.name);
      } else if (option === "date") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });
    setFilteredData(sorted);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
    if (option === "all") {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((item) => {
        const createdDate = new Date(item.created_at);
        const now = new Date();
        if (option === "lastWeek") {
          return (now - createdDate) / (1000 * 60 * 60 * 24) <= 7;
        } else if (option === "lastMonth") {
          return (now - createdDate) / (1000 * 60 * 60 * 24) <= 30;
        }
        return true;
      });
      setFilteredData(filtered);
    }
  };
  
  async function handleLike(e, folderName) {
    e.stopPropagation();
    if (!localStorage.getItem('userName') && !localStorage.getItem('userEmail')) {
      setShowPopup(true);
      setTimeout(() => {
        
        setShowAuth(true)
      }, 800);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    }
    let folder=likedFolders
    if(folder.has(folderName)){
      await fetch('/api/like', {
        method: "POST",
        body: JSON.stringify({
          path: `${folderName}`,
          isDelete:true
        })
      });
    }else{
      await fetch('/api/like', {
        method: "POST",
        body: JSON.stringify({
          path: `${folderName}`,
          isDelete:false
        })
      });
    }
    setLikedFolders((prev) => {
      const newLikedFolders = new Set(prev);
      if (newLikedFolders.has(folderName)) {
        newLikedFolders.delete(folderName);
      } else {
        newLikedFolders.add(folderName);
      }
      return newLikedFolders;
    });
   

  }
  const displayFolders = (data) => {
    return data.map((item,index) => {
      // Render only directories (type === "dir")
      if (item.type === "dir") {
        // Parse creation date
        const createdDate = new Date(item.created_at);

        // Return JSX for each directory item
        return (
          <div
            className="folder-card flex-[0_0_calc(25%_-_20px)] m-[20px] min-w-[400px] justify-center p-8 bg-[#0000000d] rounded-[30px] border-[1px] border-[solid] border-[#ddd] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.5)] cursor-pointer [transition:background-color_0.3s_ease] hover:[box-shadow:0_0_20px_rgba(48,48,48,.8)] hover:scale-[1.03] hover:[transition:0.5s] hover:rounded-3xl hover:text-[0.9rem]"
            key={item.name}
            onClick={() => {
              // Redirect to detailed resources page on click
              const folder = `${item.name}`;
              window.location.href = `/resourcesdetails?folder=${folder}&htmlUrl=${item.html_url}&isLike=${likedFolders.has(item.name)?"true":'false'}`;
            }}
          >
            {/* Display folder name */}
            <h3 className="resourcesTitle text-[25px] font-bold">{item.name}</h3>
            {/* Display folder path */}
            <p className="resourcesPara text-[18px] font-[cursive] m-[10px]">{item.path}</p>
            {/* Display creation date */}
            <p className="resourcesDate text-[16px] font-[cursive] m-[10px]">
              Created on:{" "}
              {createdDate.toLocaleString() !== "Invalid Date"
                ? createdDate.toLocaleString()
                : "N/A"}
            </p>
            <div className="like-button" onClick={(e) => handleLike(e, item.name)}>
              <FaHeart className={`${likedFolders.has(item.name)?"gradientdd":""}`} style={{ color: likedFolders.has(item.name) ? 'red' : 'inherit' }}  size={'2rem'}/>
            </div>
             
          
              
         
          </div>
        );
      }
      // Return null for non-directory items
      return null;
    });
  };
  const switchToLogin = () => {
    setIsLogin(true);
  };
  return (
    <div className="flex flex-col items-center justify-center m-0 font-arial">
      {/* Section: Heading */}
{showPopup && <Popup msg="Please Login" error="red1"/>}
{showAuth && (
        <div className="auth-overlay" onClick={closeAuth}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            {isLogin ? (
              <Login onClose={closeAuth} onSignupClick={switchToSignup} />
            ) : (
              <Signup onClose={closeAuth} onLoginClick={switchToLogin} />
            )}
          </div>
        </div>
      )}
      <div className="heading">
        <h1 class="text-4xl text-center font-extrabold mt-[160px] mb-5 font-rancho">Resources</h1>
      </div>

      {/* Section: Search-Bar */}
      <div className="search-container flex justify-center items-center relative mb-[13px]">
        <div id="search-box" className="flex justify-center items-center w-[400px] h-16 mt-4 p-[17px] text-[16px] border-[none] outline-[none] rounded-[24px] bg-[white] [box-shadow:inset_0_-3px_6px_rgba(0,_0,_0,_0.1)] relative gap-[7px] hover:[box-shadow:0_0px_8px_rgba(48,48,48,.8)]">
          <div className="icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} color="black" />
          </div>
          <input
            type="text"
            id="search-bar"
            placeholder="Search topics..."
            onInput={handleSearch}
            className="w-[90%] outline-[none] border-[none] text-[20px] rounded-[24px] bg-[white] relative placeholder:text-[#9e9e9e]"
          />
        </div>
      </div>

      {/* Section: Sort & Filter */}

      <div className="sort-filter-container flex justify-center gap-[20px] mb-[20px]">
        <div className="sort-options flex items-center gap-[10px]">
          <label>Sort by: </label>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="p-[5px] rounded-[5px] border-[1px] border-[solid] border-[#ddd] bg-[white] cursor-pointer"
          >
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="filter-options flex items-center gap-[10px]">
          <label className="text-black">Filter: </label>
          <select
            value={filterOption}
            onChange={(e) => handleFilter(e.target.value)}
            className="p-[5px] rounded-[5px] border-[1px] border-[solid] border-[#ddd] bg-[white] cursor-pointer"
          >
            <option value="all">All</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>
      </div>

      {/* Section: Main Container */}

      <div id="maincontainer" className="flex items-center justify-center">
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
          <div id="folders-container" className="flex w-full flex-wrap justify-center m-auto">{displayFolders(filteredData)}</div>
        )}
      </div>
    </div>
  );
}

export default ResourcesPage;