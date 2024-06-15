document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggle");

  document.getElementById('sun').style.display="block"


  // Load dark mode preference from local storage
  const savedDarkMode = localStorage.getItem("dark-mode");
  if (savedDarkMode === "enabled") {
    document.body.classList.add("dark-mode");
    toggleSwitch.checked = true;
    moonIcon.style.display='visible'
    sunIcon.style.display='none'
  }
else{
  moonIcon.style.display='none'
    sunIcon.style.display='visible'
}
});
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};
const sunIcon = document.getElementById('sun');
const moonIcon = document.getElementById('moon');

function toggleMode() {
  toggleDarkMode();
  
    localStorage.setItem("dark-mode", "enabled");
    document.getElementById('moon').style.display="block"
    document.getElementById('sun').style.display='none'
    
  } 
  function toggleMode1() {
    toggleDarkMode();
    
    localStorage.removeItem("dark-mode");
    document.getElementById('moon').style.display="none"
    document.getElementById('sun').style.display='block'
  } 

