document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggle");

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  // Load dark mode preference from local storage
  const savedDarkMode = localStorage.getItem("dark-mode");
  if (savedDarkMode === "enabled") {
    document.body.classList.add("dark-mode");
    toggleSwitch.checked = true;
  }

  toggleSwitch.addEventListener("change", () => {
    toggleDarkMode();
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.removeItem("dark-mode");
    }
  });
});
