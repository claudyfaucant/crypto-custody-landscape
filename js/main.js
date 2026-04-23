/**
 * Crypto Custody Landscape - Main JavaScript
 * Enterprise Ethereum Alliance
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initSmoothScroll();
        initScrollSpy();
    });

    /**
     * Navigation functionality
     */
    function initNavigation() {
        const nav = document.getElementById('mainNav');
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        // Mobile menu toggle
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }

        // Scroll effect for navigation
        if (nav) {
            let lastScroll = 0;

            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
            }, { passive: true });
        }
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const navHeight = document.getElementById('mainNav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                    window.scrollTo({
                        top: targetPosition - navHeight - 20,
                        behavior: 'smooth'
                    });

                    // Update URL without scrolling
                    history.pushState(null, null, href);
                }
            });
        });
    }

    /**
     * Scroll spy for navigation highlighting
     */
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        if (sections.length === 0 || navLinks.length === 0) return;

        function updateActiveLink() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

    /**
     * Add subtle animation on scroll for elements
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.info-card, .criteria-card, .use-case-card, .engagement-card').forEach(function(el) {
            observer.observe(el);
        });
    }

})();
