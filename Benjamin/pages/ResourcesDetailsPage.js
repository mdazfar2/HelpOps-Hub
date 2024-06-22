"use client"
import React, { useEffect, useState } from "react";
import "@stylesheets/resourcesdetails.css";
import showdown from "showdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
function ResourcesDetailsPage() {
  const [folderName, setFolderName] = useState("");
  const [content, setContent] = useState("Loading...");
  const [repoLink, setRepoLink] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get("folder");
    if (folder) {
      setFolderName(folder);
      fetchReadme(folder);
    } else {
      setContent("No folder specified.");
    }
  }, []);

  const fetchReadme = (folder) => {
    const possibleReadmeNames = [
      "README.md",
      "Readme.md",
      "readme.md",
      "Project.md",
      "project.md",
    ];
    let readmeFetched = false;

    possibleReadmeNames.reduce((promiseChain, readmeName) => {
      return promiseChain.then(() => {
        if (!readmeFetched) {
          const readmeUrl = `https://raw.githubusercontent.com/mdazfar2/HelpOps-Hub/main/${folder}/${readmeName}`;
          return fetch(readmeUrl)
            .then((response) => {
              if (response.ok) {
                readmeFetched = true;
                return response.text();
              }
              return Promise.reject(`File not found: ${readmeName}`);
            })
            .then((text) => {
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
                  console.log(code)
                  copyToClipboard(code);
                });
                pre.appendChild(button);
              });

              // Update the state with the modified HTML
              setContent(tempContainer.innerHTML);
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        showToast("Code copied!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        showToast("Failed to copy code.");
      }
    );
  };

  const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  };

  return (
    <div>
      <div id="container">
        <div id="content" dangerouslySetInnerHTML={{ __html: content }}></div>
        <a
          id="repo-link"
          className="repo-link fab fa-github"
          href={repoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <div className="toast" id="toast">
        Code copied!
      </div>
    </div>
  );
}

export default ResourcesDetailsPage;
