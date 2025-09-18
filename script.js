// ------------------------------
// Basic helpers + DOM
// ------------------------------
const root = document.documentElement;
const app = document.getElementById('app');
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

// ------------------------------
// THEME: light/dark + persist
// ------------------------------
const THEME_KEY = 'portfolio_theme'; // values: 'light'|'dark'|'auto'
function applyTheme(theme){
  document.body.classList.remove('theme--dark','theme--light');
  if(theme === 'dark'){
    document.body.classList.add('theme--dark');
  } else if(theme === 'light'){
    document.body.classList.add('theme--light');
  } else { // auto -> respect system
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('theme--dark', prefersDark);
    document.body.classList.toggle('theme--light', !prefersDark);
  }
}
function loadTheme(){
  const t = localStorage.getItem(THEME_KEY) || 'auto';
  applyTheme(t);
  return t;
}
function toggleTheme(){
  const cur = localStorage.getItem(THEME_KEY) || 'auto';
  const next = cur === 'dark' ? 'light' : cur === 'light' ? 'auto' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}
themeToggle.addEventListener('click', toggleTheme);
loadTheme();

// ------------------------------
// Typed text animation (simple)
// ------------------------------
const typedEl = document.getElementById('typed');
const phrases = ['Front-end Developer','UI/UX Enthusiast','Animation Lover','React & JS'];
let tI = 0, tJ = 0, forward = true;
function tick(){
  const cur = phrases[tI];
  if(forward){
    typedEl.textContent = cur.slice(0, tJ+1);
    tJ++;
    if(tJ === cur.length){ forward = false; setTimeout(tick, 900); return; }
  } else {
    typedEl.textContent = cur.slice(0, tJ-1);
    tJ--;
    if(tJ === 0){ forward = true; tI = (tI+1)%phrases.length; }
  }
  setTimeout(tick, forward ? 80 : 40);
}
tick();

// ------------------------------
// Smooth scroll for nav links
// ------------------------------
document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  });
});

// ------------------------------
// Reveal on scroll (Intersection Observer)
// ------------------------------
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting) en.target.classList.add('inview');
  });
},{threshold:0.12});
document.querySelectorAll('.card, .about-img-wrap, .hero-left, .hero-right').forEach(el=>{
  obs.observe(el);
});

// ------------------------------
// Project image modal + card tilt
// ------------------------------
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
document.querySelectorAll('.project .view-btn').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const card = e.target.closest('.project');
    const img = card.getAttribute('data-img') || card.querySelector('img').src;
    modalImg.src = img;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});
modalClose.addEventListener('click', ()=>{ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
modal.addEventListener('click', (e)=>{ if(e.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); } });

// simple 3D tilt on mouse move for profile card
const profileCard = document.getElementById('profileCard');
if(profileCard){
  profileCard.addEventListener('mousemove', (e)=>{
    const r = profileCard.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    profileCard.style.transform = `rotateY(${x*12}deg) rotateX(${-y*12}deg) translateZ(10px)`;
  });
  profileCard.addEventListener('mouseleave', ()=>{ profileCard.style.transform = `rotateY(0) rotateX(0)`; });
}

// ------------------------------
// Contact form simple validation
// ------------------------------
const form = document.getElementById('contactForm');
const fmsg = document.getElementById('formMsg');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if(!name || !email || !msg){ fmsg.textContent = 'Sab fields fill karein.'; return; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ fmsg.textContent = 'Valid email daalen.'; return; }
  fmsg.textContent = 'Message sent — demo only.';
  form.reset();
});

// ------------------------------
// Particle background (canvas) — lightweight
// ------------------------------
(function initParticles(){
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const particles = [];
  const COUNT = Math.floor((w*h)/70000) + 18; // scale with screen

  function rand(min,max){ return Math.random()*(max-min)+min; }
  function create(){
    for(let i=0;i<COUNT;i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        r: rand(0.6,2.6),
        vx: rand(-0.3,0.3),
        vy: rand(-0.2,0.2),
        alpha: rand(0.05,0.9)
      });
    }
  }
  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);
  create();

  function step(){
    ctx.clearRect(0,0,w,h);
    // subtle gradient overlay
    const g = ctx.createLinearGradient(0,0,w,h);
    if(document.body.classList.contains('theme--dark')){
      g.addColorStop(0,'rgba(12,18,30,0.12)');
      g.addColorStop(1,'rgba(8,12,20,0.18)');
    } else {
      g.addColorStop(0,'rgba(255,255,255,0.08)');
      g.addColorStop(1,'rgba(240,250,255,0.02)');
    }
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    // draw particles
    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10;
      if(p.y > h+10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(125,211,252,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });

    // optional connect lines (sparse)
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d < 110){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125,211,252,${(0.08*(110-d)/110)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }
  step();
})();

// ------------------------------
// Accessibility: prefers-reduced-motion
// ------------------------------
if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  // stop animations if user prefers reduced motion
  document.querySelectorAll('.cursor').forEach(el=>el.style.display='none');
  // more reductions could be applied...
}
// Download CV handler
document.getElementById('downloadCV').addEventListener('click', ()=>{
  const link = document.createElement('a');
  link.href = 'Saqib_Razaque_CV.docx';   // yahan apni file ka path set karein
  link.download = 'Saqib_Razaque_CV.docx'; // download hone wali file ka naam
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Tilt effect for skill cards only
document.addEventListener("DOMContentLoaded", function () {
  const skillCards = document.querySelectorAll(".skill-card");

  if (skillCards.length > 0) {
    VanillaTilt.init(skillCards, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }
});
