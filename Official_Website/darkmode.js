/* app.js */

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector(".sponsor-button").classList.toggle("dark-mode");
  document.querySelectorAll(".icons a").forEach((icon) => {
    icon.classList.toggle("dark-mode");
  });
  document.getElementById("search-bar").classList.toggle("dark-mode");
  document.querySelectorAll("#folders-container div").forEach((folder) => {
    folder.classList.toggle("dark-mode");
  });
}
