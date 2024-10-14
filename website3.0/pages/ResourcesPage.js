"use client";
import React, { useState, useEffect } from "react";
import "@stylesheets/resources.css";
import "@stylesheets/resourceloader.css";
import { color, motion } from "framer-motion";
import Image from "next/image";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FaHeart } from "react-icons/fa6";
import Login from "@components/LoginSignup/Login";
import Signup from "@components/LoginSignup/Signup";
import { FaSave } from "react-icons/fa";
import { FaThLarge, FaList } from "react-icons/fa";
const CustomDropdown = ({
  options,
  selectedOption,
  onSelect,
  value,
  onChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value.charAt(0).toUpperCase() + value.slice(1));
  }, [value]);

  const handleOptionSelect = (option) => {
    if (typeof option === "object") {
      setCurrentValue(
        option.value.charAt(0).toUpperCase() + option.value.slice(1)
      );
      onSelect(option.value);
      onChange({ target: { value: option.value } });
    } else if (typeof option === "string") {
      setCurrentValue(option.charAt(0).toUpperCase() + option.slice(1));
      onSelect(option);
      onChange({ target: { value: option } });
    }
    setDropdownOpen(false);
  };

  return (
    <div className="relative w-52">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className=" w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between focus:outline-none transition-all duration-300 ease-in-out outline-none"
      >
        {currentValue || "Select an option"}
        <svg
          className="w-4 h-4 text-gray-500 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const ListView = ({ data, theme, handleShare, handleLike, likedFolders }) => {
  return (
    <div className="w-full">
      {data.map((item) => {
        if (item.type === "dir") {
          const createdDate = new Date(item.created_at);

          return (
            <div
              key={item.name}
              className={`flex p-4 cursor-pointer shadow-lg mb-12 border rounded-lg ${
                theme
                  ? "bg-white border-gray-300"
                  : "bg-[#2c2b2b] border-gray-900"
              }`}
              onClick={() => {
                const folder = `${item.name}`;
                window.location.href = `/resourcesdetails?folder=${folder}&htmlUrl=${
                  item.html_url
                }&isLike=${likedFolders.has(item.name) ? "true" : "false"}`;
              }}
            >
              <div className="w-16 h-16 bg-gray-200 flex justify-center items-center rounded-lg overflow-hidden">
                {/* <img
                  src="/HelpOps-H Fevicon.webp"
                  className="w-12 h-12"
                  alt="Icon"
                /> */}
                <div
                  className="w-12 h-12"
                  style={{
                    width: "3rem", // Equivalent to Tailwind's w-12
                    height: "3rem", // Equivalent to Tailwind's h-12
                  }}
                >
                  <Image
                    src="/HelpOps-H Fevicon.webp" // Path to your image file in the `public` directory
                    alt="Icon"
                    width="100"
                    height="100"
                    objectFit="contain" // Ensure the image fits within the container without distortion
                  />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3
                  className={`text-xl font-bold ${
                    theme ? "text-gray-900" : "text-white"
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`text-lg ${
                    theme ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Comprehensive Resource for {item.path}
                </p>
                <p
                  className={`text-md ${
                    theme ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  Created on:{" "}
                  {createdDate.toLocaleString() !== "Invalid Date"
                    ? createdDate.toLocaleString()
                    : "N/A"}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <FaSave
                      className={`${
                        theme
                          ? likedFolders.has(item.name)
                            ? "text-gray-900 "
                            : "text-gray-500"
                          : likedFolders.has(item.name)
                          ? "text-gray-500"
                          : "text-gray-300"
                      } transition-colors duration-300`}
                      size={"1.5rem"}
                      onClick={(e) => handleLike(e, item.name)}
                    />
                    <span
                      className={`text-lg font-medium ${
                        likedFolders.has(item.name)
                          ? theme
                            ? "text-gray-900"
                            : "text-gray-500"
                          : theme
                          ? "text-gray-700"
                          : "text-gray-300"
                      }`}
                    >
                      {likedFolders.has(item.name) ? "Saved" : "Save"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleShare(item)}
                      className="bg-gray-600 text-white rounded-lg px-4 py-2"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

function ResourcesPage({
  theme,
  setIsPopup,
  setMsg,
  isLogin,
  setFinalUser,
  finalUser,
  setColor,
}) {
  // State variables to manage Data and Loading State
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // New state variables for sorting and filtering
  const [sortOption, setSortOption] = useState("sort By");
  let [sortOrder, setSortOrder] = useState("ascending"); // New state for sort order
  const [filterOption, setFilterOption] = useState("uploaded");
  const [showPopup, setShowPopup] = useState(false);
  const [likedFolders, setLikedFolders] = useState(new Set()); //to add body bg color
  const [showAuth, setShowAuth] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const switchToSignup = () => {
    setIsLogin(false);
  };
  const closeAuth = () => {
    setShowAuth(false);

    setIsLogin(true);
  };
  useEffect(() => {
    fetchdataa();
  }, [isLogin]);
  async function fetchdataa() {
    if (isLogin) {
      let dd = await JSON.parse(localStorage.getItem("finalUser"));
      let folder = new Set();
      Object.keys(dd.resource).map((data) => {
        folder.add(data);
      });
      setLikedFolders(folder);
    }
  }
  useEffect(() => {
    function updateBackground() {
      if (document.body.classList.contains("dark-mode")) {
        document.body.style.background = "#353535";
      } else {
        document.body.style.background = "rgba(238, 238, 238, 1)";
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
        return sortOrder === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortOption === "date") {
        return sortOrder === "ascending"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

    setFilteredData(results);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredData].sort((a, b) => {
      if (option === "name") {
        return sortOrder === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (option === "date") {
        return sortOrder === "ascending"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
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

  // handles sort order
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    handleSort(sortOption);
  };

  // to get the appropriate sort icon
  const getSortIcon = (option) => {
    if (sortOption === option) {
      if (option === "name") {
        return sortOrder === "asc" ? faSortAlphaDown : faSortAlphaUp;
      } else if (option === "date") {
        return sortOrder === "asc" ? faSortAmountDown : faSortAmountUp;
      }
    } else {
      if (option === "name") {
        return faSortAlphaDown;
      } else if (option === "date") {
        return faSortAmountDown;
      }
    }
    return null;
  };

  // to get the appropriate sort title on hovering the icon
  const getSortTitle = (option) => {
    if (sortOption === option) {
      if (option === "name") {
        return sortOrder === "asc" ? "Sort from A to Z" : "Sort from Z to A";
      } else if (option === "date") {
        return sortOrder === "asc"
          ? "Sort by earliest date"
          : "Sort by latest date";
      }
    } else {
      if (option === "name") {
        return "Sort from A to Z";
      } else if (option === "date") {
        return "Sort by earliest date";
      }
    }
    return "";
  };

  async function handleLike(e, folderName) {
    e.stopPropagation();
    if (!isLogin) {
      setIsPopup(true);
      setMsg("Please Login First");
      // setTimeout(() => {
      //   setShowAuth(true);
      // }, 800);
      // setTimeout(() => {
      //   setShowPopup(false);
      // }, 2000);
      return;
    }
    let folder = likedFolders;
    let id = await JSON.parse(localStorage.getItem("finalUser"));
    if (folder.has(folderName)) {
      let user = await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({
          path: `${folderName}`,
          id: id._id,
          isDelete: true,
        }),
      });
      user = await user.json();
      setFinalUser(user.user);
      user = await JSON.stringify(user.user);
      localStorage.setItem("finalUser", user);
      await fetchdataa();
    } else {
      let user = await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({
          path: `${folderName}`,
          id: id._id,

          isDelete: false,
        }),
      });
      user = await user.json();
      setFinalUser(user.user);
      user = await JSON.stringify(user.user);
      localStorage.setItem("finalUser", user);
      await fetchdataa();
    }
  }

  const handleShare = (item, index) => {
    setCurrentItem(item);
    setActiveModalIndex(index);
  };

  const handleCloseShareModal = () => {
    setActiveModalIndex(null);
  };
  const eventVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const adjustColorBrightness = (color, amount) => {
    const hex = color.replace(/^#/, "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const adjust = (component) =>
      Math.min(255, Math.max(0, component + amount));
    const adjustedColor = [adjust(r), adjust(g), adjust(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");

    return `#${adjustedColor}`;
  };

  const getStoredColor = (itemName) => {
    // Retrieve the color from localStorage, if it exists
    const storedColors = JSON.parse(localStorage.getItem("cardColors")) || {};
    return storedColors[itemName];
  };

  const setStoredColor = (itemName, color) => {
    // Retrieve existing colors from localStorage
    const storedColors = JSON.parse(localStorage.getItem("cardColors")) || {};
    // Update the color for the specific item
    storedColors[itemName] = color;
    // Save the updated colors back to localStorage
    localStorage.setItem("cardColors", JSON.stringify(storedColors));
  };
  const refreshColorsInLocalStorage = (data) => {
    const newColors = data.reduce((acc, item) => {
      if (item.type === "dir") {
        const baseColor = getRandomColor();
        acc[item.name] = baseColor;
      }
      return acc;
    }, {});

    localStorage.setItem("cardColors", JSON.stringify(newColors));
  };
  useEffect(() => {
    // Refresh colors when the component mounts
    refreshColorsInLocalStorage(filteredData);
  }, [filteredData]);
  const displayFolders = (data) => {
    return data.map((item, index) => {
      if (item.type === "dir") {
        const createdDate = new Date(item.created_at);
        let baseColor = getStoredColor(item.name);

        if (!baseColor) {
          // Generate a new color if one is not already stored
          baseColor = getRandomColor();
          setStoredColor(item.name, baseColor);
        }

        const darkerColor = adjustColorBrightness(baseColor, -50);
        const lighterColor = adjustColorBrightness(baseColor, 50);

        return (
          <motion.div
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.06 }}
            viewport={{ once: true }}
            variants={eventVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex-[0_0_calc(25%_-_20px)] m-[20px] min-w-[400px] max-sm:min-w-[350px] justify-center ${
              theme ? "bg-[#0000000d]" : "bg-[#121111] shadow-sm shadow-white"
            } cursor-pointer rounded-2xl overflow-hidden bg-white`}
            key={item.name}
            onClick={() => {
              const folder = `${item.name}`;
              window.location.href = `/resourcesdetails?folder=${folder}&htmlUrl=${
                item.html_url
              }&isLike=${likedFolders.has(item.name) ? "true" : "false"}`;
            }}
          >
            <div
              className="w-full relative flex justify-center items-center h-52 overflow-hidden"
              style={{ backgroundColor: darkerColor }}
            >
              <div
                className="absolute top-0 left-0 w-24 text-center h-6 rounded-br-2xl text-white"
                style={{ backgroundColor: lighterColor }}
              >
                Resource
              </div>
              <div
                className="absolute z-10 w-full h-96 rounded-full -bottom-[120%]"
                style={{ backgroundColor: lighterColor }}
              ></div>
              <img src="/HelpOps-H Fevicon.webp" className="z-30" width={125} />
            </div>
            <div
              className={`p-8 h-full relative ${
                theme ? "text-gray-800" : "bg-[#282727] text-gray-300"
              }`}
            >
              <h3
                className={`resourcesTitle ${
                  theme ? "text-gray-800" : "text-gray-300"
                } text-2xl font-bold mb-4`}
              >
                {item.name}
              </h3>
              <p
                className={`resourcesPara ${
                  theme ? "text-gray-700" : "text-gray-300"
                } text-lg mb-4`}
              >
                Comprehensive Resource for {item.path}
              </p>
              <p
                className={`resourcesDate ${
                  theme ? "text-gray-600" : "text-gray-400"
                } text-md mb-4`}
              >
                Created on:{" "}
                {createdDate.toLocaleString() !== "Invalid Date"
                  ? createdDate.toLocaleString()
                  : "N/A"}
              </p>
              <div
                className="like-button flex justify-between items-center mt-4 cursor-pointer"
                onClick={(e) => handleLike(e, item.name)}
              >
                <div className="flex gap-2 items-center">
                  <FaSave
                    className={`${
                      theme
                        ? likedFolders.has(item.name)
                          ? "text-gray-900 "
                          : "text-gray-500"
                        : likedFolders.has(item.name)
                        ? "text-gray-500"
                        : "text-gray-300"
                    } transition-colors duration-300`}
                    size={"1.5rem"}
                  />
                  <span
                    className={`text-lg font-medium ${
                      likedFolders.has(item.name)
                        ? theme
                          ? "text-gray-900"
                          : "text-gray-500"
                        : theme
                        ? "text-gray-700"
                        : "text-gray-300"
                    }`}
                  >
                    {likedFolders.has(item.name) ? "Saved" : "Save"}
                  </span>
                </div>
                <div className="">
                  <div
                    onClick={() => handleShare(item, index)}
                    className="text-sm bg-gray-600 text-white rounded-xl px-4 py-2"
                  >
                    Share
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      }
      return null;
    });
  };
  const switchToLogin = () => {
    setIsLogin(true);
  };

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date" },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
  ];

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "card" ? "list" : "card"));
  };
  return (
    <div
      className={`flex flex-col items-center justify-center m-0 font-arial ${
        theme ? "bg-[#F3F4F6]" : "bg-[#1e1d1d]"
      } `}
    >
      {/* Section: Heading */}
      {/* {showPopup && <Popup msg="Please Login" error="red1" />} */}
      {/* {showAuth && (
        <div className="auth-overlay" onClick={closeAuth}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            {isLogin ? (
              <Login onClose={closeAuth} onSignupClick={switchToSignup} />
            ) : (
              <Signup onClose={closeAuth} onLoginClick={switchToLogin} />
            )}
          </div>
        </div>
      )} */}
      <div className="heading">
        <h1
          className={`${
            theme ? "" : "text-white"
          } text-4xl text-center font-base mt-[160px] mb-10`}
        >
          Resources
        </h1>
      </div>

      <div
        className={`w-[85%] gap-2 shadow-xl max-md:flex-col mb-10 flex items-center justify-between py-6 px-8 rounded-3xl  min-h-20 ${
          theme ? "bg-gray-200 " : "bg-[#242424] text-black"
        }`}
      >
        <div className="search-container flex justify-center items-center relative mb-[13px]">
          <div
            id="search-box"
            className="flex justify-center items-center w-full h-12 mt-4 p-[17px] text-[16px] border-[none] outline-[none] rounded-[24px] bg-[white] [box-shadow:inset_0_-3px_6px_rgba(0,_0,_0,_0.1)] relative gap-[7px] "
          >
            <div className="icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} color="black" />
            </div>
            <input
              type="text"
              id="search-bar"
              placeholder="Search topics..."
              onInput={handleSearch}
              className="w-[90%] outline-none border-none text-[20px] bg-[white] relative placeholder:text-[#9e9e9e]"
            />
          </div>
        </div>
        <div className="sort-filter-container flex justify-center gap-[20px]">
          <div className="flex max-sm:flex-col gap-4">
            <CustomDropdown
              options={sortOptions.map((option) => ({
                value: option,
                label: (
                  <span>
                    {" "}
                    {/* Add relevant icon for sorting purpose */}
                    {option.label}
                    <FontAwesomeIcon
                      icon={getSortIcon(option.value)}
                      className="ml-2"
                      title={getSortTitle(option.value)}
                    />
                  </span>
                ),
              }))}
              selectedOption={selectedSortOption}
              onSelect={handleSortOrderChange}
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            />
            <CustomDropdown
              options={filterOptions}
              selectedOption={selectedFilterOption}
              onSelect={setSelectedFilterOption}
              value={filterOption}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
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
        ) : filteredData.length ===
          0 /* Display message when resouce not found on searching */ ? (
          <div id="not-found">
            <p
              className={`${
                theme ? "" : "text-white"
              } text-center text-4xl font-bold py-20 mb-5 mt-[7px]`}
            >
              Resource not found
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col mt-4 gap-8 justify-center items-center w-full">
              <div className="flex gap-10 justify-between items-center mb-4">
                <button
                  onClick={toggleViewMode}
                  className="bg-white flex gap-2 items-center shadow-lg text-gray-600 rounded-lg px-6 py-2"
                >
                  {viewMode === "card" ? (
                    <>
                      <FaList />
                      List View
                    </>
                  ) : (
                    <>
                      <FaThLarge />
                      Card View
                    </>
                  )}
                </button>
              </div>

              {viewMode === "card" ? (
                <div
                  id="folders-container"
                  className="flex w-full flex-wrap justify-center m-auto"
                >
                  {displayFolders(filteredData)}
                  {activeModalIndex !== null && currentItem && (
                    <div className="auth-overlay">
                      <div
                        className="auth-modal z-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className={`z-500 w-[500px] gap-6 rounded-lg p-6 border-2 flex flex-col items-center ${
                            theme
                              ? "border-black bg-slate-100 text-black"
                              : "border-white bg-[#1e1d1d] text-white"
                          }`}
                        >
                          <h1 className="text-xl font-bold">Resource Link</h1>
                          <input
                            className={`w-[90%] bg-transparent border-b-[1px] outline-none ${
                              theme
                                ? "border-b-black text-black"
                                : "border-b-white text-white"
                            }`}
                            value={`https://www.helpopshub.com/resourcesdetails?folder=${
                              currentItem.name
                            }&htmlUrl=${currentItem.html_url}&isLike=${
                              likedFolders.has(currentItem.name)
                                ? "true"
                                : "false"
                            }`}
                            readOnly
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `https://www.helpopshub.com/resourcesdetails?folder=${
                                  currentItem.name
                                }&htmlUrl=${currentItem.html_url}&isLike=${
                                  likedFolders.has(currentItem.name)
                                    ? "true"
                                    : "false"
                                }`
                              );
                              setMsg("Copied to Clipboard !");
                              setIsPopup(true);
                              setColor("green");
                            }}
                            className={` w-28 h-12 p-2 ${
                              theme
                                ? "bg-[#6089a4] text-white"
                                : "bg-white text-black"
                            }  border-none rounded-2xl cursor-pointer text-base`}
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                      <div
                        onClick={handleCloseShareModal}
                        className="fixed z-0 top-0 left-0 h-[100vh] w-[100vw] opacity-35 bg-black"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[95vw]">
                  <div className="w-[80%] m-auto max-sm:w-[90%]">
                    <ListView
                      data={filteredData}
                      theme={theme}
                      handleShare={handleShare}
                      handleLike={handleLike}
                      likedFolders={likedFolders}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourcesPage;
