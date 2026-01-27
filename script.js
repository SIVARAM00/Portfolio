// Enhanced Fade-in animation with staggering
const sections = document.querySelectorAll("section");
const cards = document.querySelectorAll(".card");
const projects = document.querySelectorAll(".project");
const achievementCards = document.querySelectorAll(".achievement-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = "slideInUp 0.8s ease-out forwards";
        }, index * 200); // Stagger delay
      }
    });
  },
  { threshold: 0.1 },
);

// Observe sections
sections.forEach((section) => {
  observer.observe(section);
});

// Observe cards with bounce animation
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = "bounceIn 0.6s ease-out forwards";
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 },
);

cards.forEach((card) => {
  cardObserver.observe(card);
});

// Observe projects
projects.forEach((project, index) => {
  observer.observe(project);
});

// Observe achievements with fadeIn
const achievementObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = "fadeIn 0.5s ease-out forwards";
        }, index * 300);
      }
    });
  },
  { threshold: 0.1 },
);

achievementCards.forEach((achievement) => {
  achievementObserver.observe(achievement);

  // Set background image on hover
  const img = achievement.querySelector(".achievement-img");
  if (!img) return;

  const originalBackground = achievement.style.backgroundImage;

  achievement.addEventListener("mouseenter", () => {
    const imgSrc = img.getAttribute("src");
    achievement.style.backgroundImage = `url('${imgSrc}')`;
    achievement.style.backgroundSize = "cover";
    achievement.style.backgroundPosition = "center";
    achievement.style.backgroundRepeat = "no-repeat";
    // Make text white for contrast
    achievement.style.color = "#fff";
    achievement.querySelector("h3").style.color = "#fff";
    achievement.querySelector("p").style.color = "#fff";
    achievement.querySelector(".achievement-icon").style.color = "#fff";
    // Hide the img
    img.style.opacity = "0";
  });

  achievement.addEventListener("mouseleave", () => {
    achievement.style.backgroundImage = originalBackground;
    achievement.style.color = "";
    achievement.querySelector("h3").style.color = "";
    achievement.querySelector("p").style.color = "";
    achievement.querySelector(".achievement-icon").style.color = "";
    // Show the img
    img.style.opacity = "1";
  });
});

// Notifier
const notifier = document.getElementById("notifier");
const notifierText = document.getElementById("notifier-text");

function notify(message) {
  notifierText.textContent = message;
  notifier.classList.add("show");

  setTimeout(() => {
    notifier.classList.remove("show");
  }, 3000);
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "resume.txt";
  link.download = "Sivaram_V_Resume.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Project click animations
projects.forEach((project) => {
  project.addEventListener("click", () => {
    project.classList.toggle("clicked");
    setTimeout(() => {
      project.classList.remove("clicked");
    }, 300);
  });
});

// Welcome notification
window.addEventListener("load", () => {
  setTimeout(() => {
    notify("Welcome to Sivaram's Portfolio 👋");
  }, 800);
});

// Buttons: Download Resume and Contact Me
const downloadResumeBtn = document.getElementById("download-resume-btn");
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener("click", async () => {
    try {
      // Check if resume exists before attempting download
      const res = await fetch("resume.pdf", { method: "HEAD" });
      if (!res.ok) {
        notify("Resume file not found. Please add resume.pdf to the project root.");
        return;
      }
      const a = document.createElement("a");
      a.href = "resume.pdf";
      a.download = "Sivaram_V_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      notify("Unable to download resume. Check file path or network.");
    }
  });
}

const contactMeBtn = document.getElementById("contact-me-btn");
if (contactMeBtn) {
  contactMeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Hash fallback in case scrollIntoView is blocked
      setTimeout(() => {
        if (location.hash !== "#contact") location.hash = "#contact";
      }, 100);
    } else {
      location.hash = "#contact";
    }
  });
}

// Back to top button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
