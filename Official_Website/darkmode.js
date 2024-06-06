// darkmode.js

function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  // Check if dark mode is currently active and store the preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  applyThemeToElements();
}

function applyThemeToElements() {
  const darkMode = document.body.classList.contains("dark-mode");
  const elements = [
    document.querySelector("header"),
    document.querySelector(".sponsor-button"),
    ...document.querySelectorAll(".icons a"),
    document.getElementById("search-bar"),
    document.getElementById("search-box"),
    ...document.querySelectorAll("#folders-container div"),
    document.querySelector(".feedback"),
    document.querySelector("#feedback-section"),
    ...document.querySelectorAll(".feedback-form input"),
    ...document.querySelectorAll(".feedback-form textarea"),
    ...document.querySelectorAll(".feedback-form button")
  ];

  elements.forEach((element) => {
    if (element) {
      if (darkMode) {
        element.classList.add("dark-mode");
      } else {
        element.classList.remove("dark-mode");
      }
    }
  });
}

function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  applyThemeToElements();
}

document.addEventListener("DOMContentLoaded", loadTheme);


function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.card-header').forEach(element => {
      element.classList.toggle('dark-mode');
  });
  document.querySelectorAll('.card-body').forEach(element => {
      element.classList.toggle('dark-mode');
  });
  document.querySelectorAll('.about-button1').forEach(element => {
      element.classList.toggle('dark-mode');
  });
  document.querySelectorAll('.nav__item a').forEach(element => {
      element.classList.toggle('dark-mode');
  });
  document.body.classList.toggle('dark-mode'); // Toggle dark mode on the body

  // Toggle dark mode on specific elements as needed
  document.querySelectorAll('.header').forEach(element => {
      element.classList.toggle('dark-mode');
  });

  document.querySelectorAll('.nav__item a').forEach(element => {
      element.classList.toggle('dark-mode');
  });

  document.querySelectorAll('.about-button').forEach(element => {
      element.classList.toggle('dark-mode');
  });
}
// darkmode.js

function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  // Check if dark mode is currently active and store the preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  applyThemeToElements();
}

function applyThemeToElements() {
  const darkMode = document.body.classList.contains("dark-mode");
  const elements = [
    document.querySelector("header"),
    document.querySelector(".sponsor-button"),
    ...document.querySelectorAll(".icons a"),
    document.getElementById("search-bar"),
    document.getElementById("search-box"),
    document.getElementById("folders-container"), // Add folders-container here
    document.querySelector(".feedback"),
    document.querySelector("#feedback-section"),
    ...document.querySelectorAll(".feedback-form input"),
    ...document.querySelectorAll(".feedback-form textarea"),
    ...document.querySelectorAll(".feedback-form button")
  ];

  elements.forEach((element) => {
    if (element) {
      if (darkMode) {
        element.classList.add("dark-mode");
      } else {
        element.classList.remove("dark-mode");
      }
    }
  });
}

function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  applyThemeToElements();
}

document.addEventListener("DOMContentLoaded", loadTheme);

// Additional logic for specific elements as per your design
document.addEventListener("DOMContentLoaded", function () {
  // Example: Apply dark mode to folders-container initially
  const foldersContainer = document.getElementById("folders-container");
  if (localStorage.getItem("theme") === "dark") {
    foldersContainer.classList.add("dark-mode");
  } else {
    foldersContainer.classList.remove("dark-mode");
  }
});
