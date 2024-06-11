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

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      `Name: ${form.name.value}\nEmail: ${form.email.value}\nComment: ${form.comment.value}\nRating: ${selectedRating} stars`
    );
  });
});
