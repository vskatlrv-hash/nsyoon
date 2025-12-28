/* ==========================================================================
   Main JavaScript
   Handles navigation, language toggle, and scroll animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger icon
        navToggle.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('open');
        });
    });

    // --- Sticky Navbar Shrink on Scroll ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Language Toggle (EN/KO) ---
    const langEN = document.getElementById('langEN');
    const langKO = document.getElementById('langKO');
    let currentLang = 'en';

    function switchLanguage(lang) {
        currentLang = lang;

        // Update toggle buttons
        if (lang === 'en') {
            langEN.classList.add('active');
            langKO.classList.remove('active');
        } else {
            langEN.classList.remove('active');
            langKO.classList.add('active');
        }

        // Update all elements with data-en and data-ko attributes
        document.querySelectorAll('[data-en][data-ko]').forEach(el => {
            const text = lang === 'en' ? el.dataset.en : el.dataset.ko;
            el.textContent = text;
        });

        // Store preference
        localStorage.setItem('preferredLang', lang);
    }

    langEN.addEventListener('click', () => switchLanguage('en'));
    langKO.addEventListener('click', () => switchLanguage('ko'));

    // Check for stored preference or browser language
    const storedLang = localStorage.getItem('preferredLang');
    if (storedLang) {
        switchLanguage(storedLang);
    } else if (navigator.language.startsWith('ko')) {
        switchLanguage('ko');
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.timeline-item, .skill-category, .education-card, .highlight-card');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                el.classList.add('reveal', 'active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollPos = window.pageYOffset + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
});
