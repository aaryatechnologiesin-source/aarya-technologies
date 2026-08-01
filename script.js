document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen Sequence
    const tl = gsap.timeline();
    
    tl.to(".progress-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    })
    .to(".loader-wrapper", {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
        delay: 0.2
    })
    // 2. Hero Section Entrance Animations
    .from(".glass-nav", { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
    .from(".badge", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.6")
    .from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
    .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
    .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
    .from(".3d-element", { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "back.out(1.2)" 
    }, "-=0.5");

    // 3. Sticky Navbar Blur on Scroll
    const nav = document.querySelector(".glass-nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // 4. Interactive Mouse Movement (Parallax on Hero Visuals)
    const heroVisual = document.querySelector('.hero-visual');
    const cards = document.querySelectorAll('.3d-element');

    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            cards.forEach(card => {
                // Apply slight 3D rotation based on mouse position
                card.style.transform = `translate(-50%, -50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
        });
        
        // Reset transform on mouse leave
        heroVisual.addEventListener('mouseleave', () => {
            cards.forEach(card => {
                card.style.transform = `translate(-50%, -50%) rotateY(0deg) rotateX(0deg)`;
                card.style.transition = 'transform 0.5s ease';
            });
        });
        
        // Remove transition during mouse movement for instant tracking
        heroVisual.addEventListener('mouseenter', () => {
            cards.forEach(card => {
                card.style.transition = 'none';
            });
        });
    }

    // 5. Scroll Reveal for Services Grid
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%", // triggers when the top of the grid hits 80% of the viewport height
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });
});
