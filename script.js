// Toggle mobile menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    document.getElementById("navLinks").classList.remove("active");
  });
});

// Light/Dark theme
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.style.background = "#fff";
    body.style.color = "#000";
    document.documentElement.style.setProperty("--nav-bg", "#333");
  } else {
    body.classList.add("dark");
    body.style.background = "#121212";
    body.style.color = "#fff";
    document.documentElement.style.setProperty("--nav-bg", "#222");
  }
}
