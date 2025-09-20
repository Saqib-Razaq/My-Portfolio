/* ---------- Mobile nav toggle (index & resume) ---------- */
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

/* ---------- Smooth scroll for in-page links (index.html) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    // If link points to an ID present on current page, smooth-scroll.
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

/* ---------- Theme toggle (both pages) ---------- */
function applyTheme(isDark) {
  if (isDark) document.documentElement.classList.add('dark'), document.body.classList.add('dark');
  else document.documentElement.classList.remove('dark'), document.body.classList.remove('dark');
}
const themeToggle = document.getElementById('themeToggle') || document.getElementById('themeToggleResume');
if (themeToggle) {
  // restore saved preference
  const pref = localStorage.getItem('pref-dark');
  applyTheme(pref === '1');
  themeToggle.addEventListener('click', () => {
    const darkNow = document.body.classList.toggle('dark');
    localStorage.setItem('pref-dark', darkNow ? '1' : '0');
  });
          }
