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
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) header.style.background = 'linear-gradient(rgba(12,9,7,.35), transparent)';
  else header.style.background = 'transparent';
}, { passive: true });

// Remove failed decorative image layers completely instead of leaving
// an empty/black placeholder when an external image cannot load.
const imageElements = document.querySelectorAll(
  '.hero-image, .destination-image, .statement-image, .journal-image'
);

const extractUrl = (backgroundImage) => {
  const match = backgroundImage && backgroundImage.match(/url\(["']?(.*?)["']?\)/);
  return match ? match[1] : null;
};

imageElements.forEach((element) => {
  const backgroundImage = window.getComputedStyle(element).backgroundImage;
  const url = extractUrl(backgroundImage);
  if (!url || url.startsWith('data:')) return;

  const probe = new Image();
  probe.onerror = () => element.remove();
  probe.src = url;
});
