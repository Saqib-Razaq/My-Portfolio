document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('drawer');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.closebtn');
  const navLinks = document.querySelectorAll('.drawer a');
  const darkModeToggle = document.getElementById('darkModeToggle');

  // Drawer open
  hamburger.addEventListener('click', () => {
    drawer.style.width = '150px'; // drawer open hoga
  });

  // Drawer close
  closeBtn.addEventListener('click', () => {
    drawer.style.width = '0'; // drawer close hoga
  });

  // Drawer band karna jab link click ho
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.style.width = '0';
    });
  });

  // Dark/Light Mode toggle
  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Check for saved theme preference on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
});

                           
