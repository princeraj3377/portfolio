/* ============================================================
   script.js — Prince Raj Portfolio
   Features:
   - Custom cursor
   - Navbar scroll + active link highlighting
   - Mobile hamburger menu
   - Typing animation (hero tagline)
   - Scroll reveal animations
   - Skill bar fill animation
   - Contact form handler
   ============================================================ */

// ============================================================
// 1. CUSTOM CURSOR
// ============================================================
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

// Dot follows cursor instantly; ring lags a little for feel
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Move dot immediately
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth ring follow via requestAnimationFrame
function animateRing() {
  // Lerp (linear interpolation) for smooth follow
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Enlarge ring when hovering interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '0.5';
});

// ============================================================
// 2. NAVBAR — scroll behaviour + active section highlighting
// ============================================================
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Add/remove .scrolled class based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// Highlight the nav link whose section is currently visible
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach(section => {
    // Section is "active" when its top is within the top half of the viewport
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight * 0.4) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === currentSection) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// 3. HAMBURGER MENU (mobile)
// ============================================================
const hamburger   = document.getElementById('hamburger');
const mobileNavLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = !mobileNavLinks.classList.contains('open');
  hamburger.classList.toggle('open', isOpen);
  mobileNavLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNavLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// 4. TYPING ANIMATION (hero tagline)
// ============================================================
const typingEl = document.getElementById('typingText');

// Array of strings to cycle through
const phrases = [
  'Software Engineer in Progress',
  'FastAPI Backend Developer',
  'Database & API Builder',
  'AI/ML & GenAI Developer',
  'B.Tech @ Galgotias',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingSpeed  = 90;   // ms per character when typing
let deletingSpeed = 50;  // ms per character when deleting
let pauseTime    = 1800; // pause before deleting

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Add next character
    typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      // Finished typing — pause then start deleting
      isDeleting = true;
      setTimeout(typeLoop, pauseTime);
      return;
    }
    setTimeout(typeLoop, typingSpeed);
  } else {
    // Remove last character
    typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Finished deleting — move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 400); // tiny pause before typing next
      return;
    }
    setTimeout(typeLoop, deletingSpeed);
  }
}

// Start typing after a short delay
setTimeout(typeLoop, 800);

// ============================================================
// 5. SCROLL REVEAL ANIMATIONS
// Uses IntersectionObserver — efficient and smooth
// ============================================================
const revealElements = document.querySelectorAll(
  '.fade-up, .reveal, .reveal-right, .fade-right'
);

// Make hero section elements visible immediately on load
document.querySelectorAll('.hero-content .fade-up').forEach(el => {
  el.classList.add('visible');
});
document.querySelector('.hero-code-card')?.classList.add('visible');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after revealing to save resources
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,    // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px' // Trigger slightly before element fully enters viewport
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ============================================================
// 6. SKILL BAR FILL ANIMATION
// Fills progress bars when the skills section scrolls into view
// ============================================================
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        // Slight delay for visual delight
        setTimeout(() => {
          entry.target.style.width = targetWidth + '%';
        }, 200);
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

barFills.forEach(bar => barObserver.observe(bar));

// ============================================================
// 7. CONTACT FORM — mock submission handler
// ============================================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual page reload

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnSpan   = submitBtn.querySelector('span');

    // Show loading state
    submitBtn.disabled = true;
    btnSpan.textContent = 'Sending...';

    // Simulate a network delay (replace with actual fetch/API call)
    setTimeout(() => {
      submitBtn.style.display = 'none';
      formSuccess.style.display = 'block';
      contactForm.reset();

      // Re-show button after 5 seconds (optional reset)
      setTimeout(() => {
        submitBtn.disabled      = false;
        submitBtn.style.display = '';
        btnSpan.textContent     = 'Send Message';
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}

// ============================================================
// 8. SMOOTH SCROLL for nav links (native smooth scroll is set
//    in CSS, but this adds offset for fixed navbar height)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navbarHeight = navbar.offsetHeight;
    const targetTop    = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

// ============================================================
// 9. CONSOLE EASTER EGG — for curious devs who open DevTools
// ============================================================
console.log('%c Hey there, fellow developer! 👋', 'color: #00e5ff; font-size: 18px; font-weight: bold;');
console.log('%c This portfolio was built with pure HTML, CSS & JavaScript.', 'color: #a5f3fc; font-size: 13px;');
console.log('%c Feel free to reach out: princeraj@example.com', 'color: #6b7280; font-size: 12px;');
