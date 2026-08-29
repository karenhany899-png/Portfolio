// Theme toggle
const themeBtn = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '🌞';
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeBtn.textContent = isLight ? '🌞' : '🌙';
});

// Scroll spy
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...navLinks].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

function onScroll() {
  const offset = window.innerHeight * 0.4;
  let current = -1;
  sections.forEach((s, i) => {
    const r = s.getBoundingClientRect();
    if (r.top <= offset && r.bottom > offset) current = i;
  });
  if (current === -1) {
    const dists = sections.map(s => Math.abs(s.getBoundingClientRect().top));
    current = dists.indexOf(Math.min(...dists));
  }
  navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);

// Smooth scroll
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Skill bars animation
const skillFills = document.querySelectorAll('.skill-fill');
const skillPcts  = document.querySelectorAll('.skill-pct');

const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    skillFills.forEach(f => { f.style.width = (f.dataset.fill || 0) + '%'; });
    skillPcts.forEach(p => {
      const target = +p.dataset.value;
      let val = 0;
      const step = Math.ceil(target / 35);
      const t = setInterval(() => {
        val = Math.min(val + step, target);
        p.textContent = val + '%';
        if (val >= target) clearInterval(t);
      }, 20);
    });
    skillObs.disconnect();
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObs.observe(skillsSection);

// Contact form
const form = document.getElementById('contactForm');
const note = document.getElementById('form-note');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    note.textContent = 'Sending...';
    note.style.color = 'var(--muted)';
    setTimeout(() => {
      note.textContent = '✓ Message sent! I\'ll get back to you soon.';
      note.style.color = 'var(--accent)';
      form.reset();
    }, 900);
  });
}
