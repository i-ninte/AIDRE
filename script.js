// AIDRE Website JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize animations and effects
    initializeAnimations();
    initializeScrollEffects();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent outside click from immediately closing
            
            console.log('Mobile menu toggle clicked'); // Debug log
            
            if (mobileMenu.classList.contains('open')) {
                // Closing the menu
                console.log('Closing menu');
                mobileMenu.classList.remove('open');
                this.classList.remove('active');
            } else {
                // Opening the menu
                console.log('Opening menu');
                mobileMenu.style.display = 'block'; // Show immediately
                setTimeout(() => {
                    mobileMenu.classList.add('open');
                    console.log('Menu should be visible now');
                }, 10); // Small delay for animation
                this.classList.add('active');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('open') &&
                !mobileMenuToggle.contains(event.target) &&
                !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
                // Hide after animation completes
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('open')) {
                        mobileMenu.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Close on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
                mobileMenu.style.display = 'none';
            }
        });
        
        // Add keyboard support
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Publications Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    if (filterButtons.length > 0 && publicationCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter publications
                publicationCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Basic validation
            if (!formObject.name || !formObject.email || !formObject.subject || !formObject.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#main-content') {
                const target = document.getElementById('main-content') || document.body;
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Pagination Functionality (for Publications page)
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const isNext = this.textContent === 'Next';
                const isPrev = this.textContent === 'Prev';
                
                if (!isNext && !isPrev) {
                    // Update active page
                    paginationButtons.forEach(btn => {
                        if (btn.textContent !== 'Next' && btn.textContent !== 'Prev') {
                            btn.classList.remove('active');
                        }
                    });
                    this.classList.add('active');
                    
                    // Scroll to top of publications
                    const publicationsSection = document.querySelector('.publications-content');
                    if (publicationsSection) {
                        publicationsSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // Card Hover Effects Enhancement
    const cards = document.querySelectorAll('.section-card, .center-card, .publication-card, .project-card, .category-card, .contact-section');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Navbar Background Change on Scroll
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        });
    }
    
    // Lazy Loading for Project Images (if images are added later)
    const projectImages = document.querySelectorAll('.project-image img');
    
    if (projectImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        projectImages.forEach(img => imageObserver.observe(img));
    }
    
    // Accessibility: Focus management for mobile menu
    if (mobileMenuToggle && mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', function(e) {
            if (mobileMenu.classList.contains('open') && e.key === 'Tab') {
                const firstLink = mobileMenuLinks[0];
                const lastLink = mobileMenuLinks[mobileMenuLinks.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstLink) {
                        e.preventDefault();
                        lastLink.focus();
                    }
                } else {
                    if (document.activeElement === lastLink) {
                        e.preventDefault();
                        firstLink.focus();
                    }
                }
            }
        });
    }
    
    // Form field enhancements
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Search functionality (can be extended)
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase();
            
            searchTimeout = setTimeout(() => {
                // Implement search logic here
                console.log('Searching for:', query);
            }, 300);
        });
    }
    
    // Print page functionality
    const printButtons = document.querySelectorAll('.print-btn');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    });
    
    // Back to top button (if added)
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize any animations or effects
    function initializeEffects() {
        // Add entrance animations for cards when they come into view
        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe all cards for animation
            const animatedCards = document.querySelectorAll('.section-card, .center-card, .publication-card, .project-card');
            animatedCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                cardObserver.observe(card);
            });
        }
    }
    
    // Initialize effects
    initializeEffects();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
    
    // Console message for developers
    console.log('AIDRE Website loaded successfully! 🚀');
    console.log('Supporting evidence-informed policy making in Africa.');
});

// Initialize animations
function initializeAnimations() {
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.section-card, .center-card, .publication-card, .project-card, .category-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#main-content') {
                e.preventDefault();
                const target = document.getElementById('main-content') || document.body;
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize intersection observer for animations
function initializeIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add stagger effect for multiple elements
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.section-card, .center-card, .publication-card, .project-card, .category-card, .contact-section');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    /* Enhanced hover effects */
    .section-card:hover,
    .center-card:hover,
    .publication-card:hover,
    .project-card:hover,
    .category-card:hover,
    .contact-section:hover {
        transform: translateY(-8px) scale(1.02);
    }

    /* Smooth transitions for all interactive elements */
    .read-more,
    .view-more,
    .cta-button,
    .btn-download,
    .btn-abstract,
    .project-link,
    .contact-link {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Enhanced focus states */
    .read-more:focus,
    .view-more:focus,
    .cta-button:focus,
    .btn-download:focus,
    .btn-abstract:focus {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    /* Loading animation for form submission */
    .submit-btn.loading {
        position: relative;
        color: transparent;
    }

    .submit-btn.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Parallax effect for hero sections */
    .hero.home-hero,
    .about-header,
    .centers-header,
    .contact-header,
    .stay-updated {
        background-attachment: fixed;
    }

    @media (max-width: 768px) {
        .hero.home-hero,
        .about-header,
        .centers-header,
        .contact-header,
        .stay-updated {
            background-attachment: scroll;
        }
    }
`;
document.head.appendChild(style);
