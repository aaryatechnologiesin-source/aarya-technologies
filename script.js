// ==========================================
// 1. IMPORT LIBRARIES & INITIALIZATION
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ==========================================
// 2. LUXURY THEME MANAGEMENT (LocalStorage)
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check saved theme
const savedTheme = localStorage.getItem('aarya-theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('aarya-theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if(!themeToggle) return;
    if(theme === 'dark') {
        themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
    }
}

// ==========================================
// 3. SMOOTH SCROLLING (Lenis) & GSAP
// ==========================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 4. UI INTERACTIONS
// ==========================================

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('global-loader');
    if(loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => loader.style.display = 'none'
        });
    }
});

// Sticky Header & Progress Bar
const header = document.getElementById('main-header');
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if(progressBar) progressBar.style.width = scrolled + "%";
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    if(cursorDot && cursorOutline) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    // Fade Up Elements
    gsap.utils.toArray('.fade-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Staggered Cards
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });
});

// Project Cost Calculator Logic
const calcForm = document.getElementById('cost-calculator');
const costResult = document.getElementById('estimated-cost');

if(calcForm && costResult) {
    calcForm.addEventListener('change', () => {
        let basePrice = parseInt(document.getElementById('service-type').value) || 0;
        let pagesPrice = parseInt(document.getElementById('project-scale').value) || 0;
        let timelineMultiplier = parseFloat(document.getElementById('timeline').value) || 1;
        
        if(basePrice > 0) {
            let total = (basePrice + pagesPrice) * timelineMultiplier;
            costResult.innerText = "$" + total.toLocaleString();
        } else {
            costResult.innerText = "$0";
        }
    });
}
