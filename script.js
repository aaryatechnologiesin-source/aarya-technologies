document.addEventListener("DOMContentLoaded", () => {
    // 1. Lenis Smooth Scrolling (Apple-like momentum)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Custom Luxury Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline has slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards", easing: "ease-out" });
    });

    // Cursor hover effects on links/buttons
    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'; // Gold tint
            cursorOutline.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'rgba(17, 17, 17, 0.2)';
        });
    });

    // 3. Header Scroll Behavior
    const header = document.querySelector('.header');
    lenis.on('scroll', (e) => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. GSAP Entrance Animations (Clean, minimal fade-ups)
    gsap.registerPlugin(ScrollTrigger);

    // Initial Load Sequence
    const tl = gsap.timeline();
    tl.to('.loader', {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => document.querySelector('.loader').style.display = 'none'
    })
    .from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.2")
    .from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .from('.hero-cta-group', { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .from('.mockup-container', { y: 40, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1");

    // Services Scroll Reveal
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    });
});
