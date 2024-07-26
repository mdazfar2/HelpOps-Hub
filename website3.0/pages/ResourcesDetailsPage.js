"use client";
import React, { useEffect, useState } from "react";
import "@stylesheets/resourcesdetails.css";
import showdown from "showdown";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FaHeart } from "react-icons/fa";

function ResourcesDetailsPage({theme}) {
  // State variables
  const [folderName, setFolderName] = useState("");
  const [content, setContent] = useState("Loading...");
  const [repoLink, setRepoLink] = useState(""); 
const [isLike,setIslike]=useState(false)
  // Effect hook to fetch README content when component mounts
  useEffect(() => {
    // Extract folder name from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get("folder");
    const folder1 = urlParams.get("isLike");
    if(folder1=='true'){
      setIslike(true)
    }
    // Set folder name and fetch README content if folder is specified
    if (folder) {
      setFolderName(folder);
      // Function to fetch README content
      fetchReadme(folder); 
    } else {
      setContent("No folder specified.");
    }
  }, []);

  // Function to fetch README content from GitHub repository
  const fetchReadme = (folder) => {
    // Possible names for README files
    const possibleReadmeNames = [
      "README.md",
      "Readme.md",
      "readme.md",
      "Project.md",
      "project.md",
    ];
    // Flag to track if README file is fetched
    let readmeFetched = false; 

    // Reduce function to sequentially try fetching README files
    possibleReadmeNames.reduce((promiseChain, readmeName) => {
      return promiseChain.then(() => {
        if (!readmeFetched) {
          const readmeUrl = `https://raw.githubusercontent.com/mdazfar2/HelpOps-Hub/main/${folder}/${readmeName}`;
          return fetch(readmeUrl)
            .then((response) => {
              if (response.ok) {
                readmeFetched = true;
                // Return README content as text
                return response.text(); 
              }
              return Promise.reject(`File not found: ${readmeName}`);
            })
            .then((text) => {
              // Convert Markdown to HTML using Showdown library
              const converter = new showdown.Converter({
                simplifiedAutoLink: true,
                tables: true,
                strikethrough: true,
                tasklists: true,
                literalMidWordUnderscores: true,
              });
              const html = converter.makeHtml(text);

              // Create a temporary container to parse the HTML and add buttons
              const tempContainer = document.createElement("div");
              tempContainer.innerHTML = html;

              // Add copy buttons to code blocks
              tempContainer.querySelectorAll("pre").forEach((pre) => {
                const button = document.createElement("button");
                button.className = "copy-button";
                button.innerText = "Copy";
                button.addEventListener("click", () => {
                  const code = pre.querySelector("code").innerText;
                  // Function to copy code to clipboard
                  copyToClipboard(code); 
                });
                pre.appendChild(button);
              });

              // Update the state with the modified HTML content
              setContent(tempContainer.innerHTML);
              
              // Set GitHub repository link
              setRepoLink(`https://github.com/mdazfar2/HelpOps-Hub/tree/main/${folder}`);
            })
            .catch((error) => {
              console.warn(error);
            });
        }
      });
    }, Promise.resolve()).then(() => {
      if (!readmeFetched) {
        setContent("README file not found.");
      }
    });
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Show toast message for successful copy
        showToast("Code copied!"); 
      },
      (err) => {
        console.error("Could not copy text: ", err);
        // Show toast message for failed copy
        showToast("Failed to copy code."); 
      }
    );
  };

  // Function to show toast message
  const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
      // Hide toast message after 2 seconds
      toast.style.display = "none"; 
    }, 2000);
  };
  return (
    <div 
    className={`resourcesdetails ${theme?"mt-[150px] mb-[20px]":"bg-[#1e1d1d] textwhite pt-[154px]"} `}>

      {/* Section: Container */}

      <div 
      id="container" 
      className={`${theme?"bg-[#fff]":"bg-[#1d1a1a]"}`}
       onClick={(e) => {
        // Handle click on copy button inside content container
        if (e.target.className === "copy-button") {
          const code = e.target.previousSibling.innerText;
          // Function to copy code to clipboard
          copyToClipboard(code); 
        }
      }}>
        {/* Render README content with dangerouslySetInnerHTML to allow HTML */}
        <div 
        id="content" 
        className={`${theme?"":"text-white"}`} 
        dangerouslySetInnerHTML={{ __html: content }}></div>
        {/* GitHub repository link */}
        <div 
        className="repo-info-container">
         <a
           id="repo-link"
           className="repo-link fab fa-github"
           href={repoLink}
           target="_blank"
           rel="noopener noreferrer"
         >
            <FontAwesomeIcon 
            icon={faGithub} />
         </a>
           <h5 
         className={`${theme?"":"text-white"}`}>More Info</h5>
         <div 
         className=" max-xl:relative  max-xl:right-0 max-xl:top-[-80px] max-xl:left-16 absolute top-[136px] right-[98px] ">
              <FaHeart 
              style={{color:`${isLike?"orange":"black"}`}}  
               size={'2rem'}/>
            </div>
       </div>
      </div>
      {/* Toast message for showing copy success/failure */}
      <div 
      className="toast" 
      id="toast">
        Code copied!
      </div>
    </div>
  );
}

export default ResourcesDetailsPage;
