const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const header = document.querySelector('.site-header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) header.style.background = 'linear-gradient(rgba(12,9,7,.35), transparent)';
  else header.style.background = 'transparent';
  lastScroll = y;
}, { passive: true });
