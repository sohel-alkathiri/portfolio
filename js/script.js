// -----------
// MENU TOGGLE
// -----------
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// --------------
// NAVIGATION BAR
// --------------
const tabs = document.querySelectorAll('nav ul li a');
const ACTIVE_TAB_KEY = 'activeTab';

// Function to set active tab
const setActiveTab = (id) => {
    tabs.forEach((tab) => tab.classList.remove('active'));
    const activeTab = document.getElementById(id);
    if (activeTab) activeTab.classList.add('active');
    localStorage.setItem(ACTIVE_TAB_KEY, id);
};

// Initialize on page load
const savedTabId = localStorage.getItem(ACTIVE_TAB_KEY);
if (savedTabId) {
    setActiveTab(savedTabId);
} else {
    setActiveTab('home'); // Default tab
}

// Add click event listeners
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        setActiveTab(tab.id);
    });
});


// -------------------------
//  RATING - COUNT ANIMATION
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  counters.forEach(counter => {
    let target = +counter.getAttribute("data-target");
    let count = 0;
    let increment = target / 100; // Adjust speed here

    const updateCount = () => {
      count += increment;

      if (count < target) {
        counter.innerText = Math.ceil(count) + (counter.innerText.includes('%') ? '%' : '+');
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
      }
    };

    updateCount();
  });
});

// ---------------------------
// ABOUT TAB - SWITCH FUNCTION
// ---------------------------

// REMOVE ACTIVE CLASS
function openTab(event, tabId) {
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // CLICK - ADD ACTIVE CLASS
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// --------------------
// CERTIFICATION SLIDER
// --------------------
const slides = document.querySelectorAll('.certification');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}
showSlide(currentIndex); //INITIALIZE