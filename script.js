document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Spotlight & Custom Cursor (Engineered Inertia) ---
    const cursor = document.querySelector('.cursor-dot');
    const spotlight = document.querySelector('.spotlight');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Spotlight moves instantly for responsiveness
        spotlight.style.setProperty('--x', `${mouseX}px`);
        spotlight.style.setProperty('--y', `${mouseY}px`);
    });

    // Smooth cursor follow with lerp
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        // Lower factor = more drag/weight (0.15 feels "heavy/premium")
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();


    // --- 2. Advanced Reveal System (Hierarchy) ---
    const revealOptions = {
        threshold: 0.1, // Lower threshold for earlier trigger
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe the WRAPPER, not the transformed child
    document.querySelectorAll('.reveal-text-wrapper').forEach(wrapper => {
        revealObserver.observe(wrapper);
    });


    // --- 3. Dynamic Stagger Logic ---
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Find direct children to stagger
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    // Dynamic delay computation: 60ms increments
                    item.style.transitionDelay = `${index * 60}ms`;
                });

                staggerObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.stagger-wrapper').forEach(wrapper => {
        staggerObserver.observe(wrapper);
    });


    // --- 4. Scroll-Aware Navbar ---
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Toggle 'scrolled' class for blur/transparency
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/Show logic
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling Down
            navbar.classList.add('hidden');
        } else {
            // Scrolling Up
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });


    // --- 5. Active Link Highlight ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Activate when 1/3 into the section
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }, { passive: true });


    // --- 6. Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 7. Typewriter Effect (Engineered) ---
    const typewriterElement = document.getElementById('typewriter');
    const typewriterCursor = document.querySelector('.typewriter-cursor');

    // Safety check if element exists
    if (typewriterElement) {
        const phrases = [
            "Security Learner.",
            "Systems Learner.",
            "Building to Understand."
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100; // Base typing speed (ms)

        // Reduced Motion Guard
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Static content fallback
            typewriterElement.textContent = phrases[0];
            if (typewriterCursor) typewriterCursor.style.display = 'none';
        } else {
            // Start Animation Loop
            function typeLoop() {
                const currentPhrase = phrases[phraseIndex];

                if (isDeleting) {
                    // Erasing
                    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    typeSpeed = 40; // Erase faster
                } else {
                    // Typing
                    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    typeSpeed = 100 + Math.random() * 50; // Humanize typing speed
                }

                if (!isDeleting && charIndex === currentPhrase.length) {
                    // Phrase Complete -> Pause before deleting
                    typeSpeed = 2500;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    // Delete Complete -> Next Phrase
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeSpeed = 500; // Pause before typing next
                }

                setTimeout(typeLoop, typeSpeed);
            }

            // Initial delay
            setTimeout(typeLoop, 1500);
        }
    }
});
