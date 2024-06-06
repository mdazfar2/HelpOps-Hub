/* app.js */

const toggleButton = document.getElementById('theme-toggle');

const enableDarkMode = () => {
  document.body.classList.add('dark-mode');
  document.querySelector('header').classList.add('dark-mode');
  document.querySelector('#navbar').classList.add('dark-mode');
  document.querySelector('.search-box').classList.add('dark-mode');
  document.querySelector('.search-box').classList.add('border');
  document.querySelector('.search-bar').classList.add('dark-mode');
  document.querySelector('#name').classList.add('inputs');
  document.querySelector('#email').classList.add('inputs');
  document.querySelector('#comments').classList.add('inputs');
}

const disableDarkMode = () => {
  document.body.classList.remove('dark-mode');
  document.querySelector('header').classList.remove('dark-mode');
  document.querySelector('#navbar').classList.remove('dark-mode');
  document.querySelector('.search-box').classList.remove('dark-mode');
  document.querySelector('.search-box').classList.remove('border');
  document.querySelector('.search-bar').classList.remove('dark-mode');
  document.querySelector('#name').classList.remove('inputs');
  document.querySelector('#email').classList.remove('inputs');
  document.querySelector('#comments').classList.remove('inputs');
}

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('isDarkMode');
  if(currentTheme === 'true'){
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

toggleButton.addEventListener('click', () => {
  let prevTheme = localStorage.getItem('isDarkMode');
  localStorage.setItem('isDarkMode',prevTheme === 'false' ? 'true' : 'false');
  let getTheme = localStorage.getItem('isDarkMode');
  if(getTheme === 'true'){
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
