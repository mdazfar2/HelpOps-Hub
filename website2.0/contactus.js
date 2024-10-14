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

/*function handleError(){
  document.getElementById('error').style.display=''
  
  setTimeout(()=>{
      document.getElementById('error').style.display='none'
  },2000)
}
  

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  if(selectedRating==0){
    return handleError()
}
  const thankYouMessage = document.getElementById('thank-you-message');
  thankYouMessage.style.display = 'block';

  setTimeout(function() 
  {
    thankYouMessage.style.display = 'none';
    document.getElementById('contact-form').reset();
  }, 3000);

});*/

document.getElementById("button").addEventListener("click", function(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let comment = document.getElementById('comment').value;

  if (!name || !email || !comment || selectedRating === 0) {
      document.getElementById('error').style.display = 'block';
      return;
  } else {
      document.getElementById('error').style.display = 'none';
  }

  let text = '<i class="fa-solid fa-face-smile"></i> Thank you! We will connect soon.';
  Toastify({
      text: text,
      duration: 4000,
      gravity: "top",
      position: "right",
      backgroundColor: "rgb(137, 68, 255,0.7)",
      close: true,
      stopOnFocus: true,
      className: "toast",
      escapeMarkup: false
  }).showToast();

  setTimeout(resetForm, 4000);
});

function resetForm() {
  document.getElementById('contact-form').reset();
  selectedRating = 0;
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => star.style.color = "#000");
}

const stars = document.querySelectorAll('.star');
let selectedRating = 0;
stars.forEach(star => {
  star.addEventListener('click', () => {
      selectedRating = star.getAttribute('data-value');
      stars.forEach(star => star.style.color = "#000");
      for (let i = 0; i < selectedRating; i++) {
          stars[i].style.color = "#f5a623";
      }
  });
});

document.getElementById('error').style.display = 'none';

