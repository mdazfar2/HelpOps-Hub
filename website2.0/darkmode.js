document.addEventListener("DOMContentLoaded", () => {

  
  
  // Load dark mode preference from local storage
  const savedDarkMode = localStorage.getItem("dark-mode");
  if (savedDarkMode === "enabled") {
    document.body.classList.add("dark-mode");
    document.getElementById('sun').style.display="block"
  }else{
    document.getElementById('moon').style.display='block'
  }
});
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

function toggleMode() {
  toggleDarkMode();
  
    localStorage.setItem("dark-mode", "enabled");
    document.getElementById('moon').style.display="none"
    document.getElementById('sun').style.display='block'
  } 
  function toggleMode1() {
    toggleDarkMode();
    document.getElementById('moon').style.display="block"
    document.getElementById('sun').style.display='none'
    
    
    localStorage.removeItem("dark-mode");
  } 

