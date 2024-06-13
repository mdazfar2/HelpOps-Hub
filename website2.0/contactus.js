document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  let selectedRating = 0;

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = star.getAttribute("data-value");
      stars.forEach((s) => (s.style.color = "#000"));
      for (let i = 0; i < selectedRating; i++) {
        stars[i].style.color = "#FFD700";
      }
    });
  });
});
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const thankYouMessage = document.getElementById('thank-you-message');
  thankYouMessage.style.display = 'block';

  setTimeout(function() 
  {
    thankYouMessage.style.display = 'none';
    document.getElementById('contact-form').reset();
  }, 3000);

});
