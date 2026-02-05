// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const navbar = document.querySelector('.navbar');

// Toggle Menu
if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        navMenu.classList.toggle('active');
        
        // Update icon
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Scroll Header Blur Effect & Active Link Highlighting
window.addEventListener('scroll', () => {
    // Add shadow/diff style if needed when scrolled
    // Currently handled by CSS backdrop-filter, strictly sticking to transparent-ish look

    // Active Link Highlight
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    // Handle home/hero case
    if (pageYOffset < 100) current = 'hero';

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Back to top Visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to Top Action
const backToTopBtn = document.getElementById('back-to-top');
if(backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideUpFade 0.6s ease forwards ${entry.target.dataset.delay || '0s'}`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all potential animated elements
const animateElements = document.querySelectorAll('.card, .project, .achievement-card, section h2, .hero > *');
animateElements.forEach((el, index) => {
    // Stagger delay for groups
    // Simple logic: if siblings, increase delay
    el.style.opacity = '0'; // Initial state before animation
    observer.observe(el);
});

// Special stagger for grids
const grids = document.querySelectorAll('.grid, .achievement-grid');
grids.forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
        child.dataset.delay = `${index * 0.1}s`;
    });
});

// Achievement Card Persistent Hover Effect
const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('revealed');
    });
});


// Notifier
const notifier = document.getElementById("notifier");
const notifierText = document.getElementById("notifier-text");

window.notify = function(message) { // Make global
  if (!notifier || !notifierText) return;
  notifierText.textContent = message;
  notifier.classList.add("show");

  setTimeout(() => {
    notifier.classList.remove("show");
  }, 3000);
}

// Download Resume
const downloadResumeBtn = document.getElementById("download-resume-btn");
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener("click", () => {
       const a = document.createElement("a");
       // Try PDF first, but since we can't check existence easily on file protocol without error, 
       // and we know it exists from file listing, we just point to it.
       a.href = "resume.pdf";
       a.download = "Sivaram_V_Resume.pdf";
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       notify("Downloading Resume... 📄");
  });
}

const contactMeBtn = document.getElementById("contact-me-btn");
if (contactMeBtn) {
    contactMeBtn.addEventListener("click", (e) => {
        // e.preventDefault(); // Not needed for a button usually, but good practice if it were inside a form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            notify("Contact section not found!");
        }
    });
}

// Welcome
window.addEventListener("load", () => {
  setTimeout(() => {
    notify("Welcome to my Portfolio! 🚀");
  }, 800);
});
