document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Page loaded, starting redirect timer.");
    setTimeout(() => {
        console.log("Redirecting to homepage.");
        window.location.href = 'about.html';
    }, 5000); // Redirect after 5 seconds
});
