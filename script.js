document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    const lines = document.querySelectorAll('.burger div');
    burger.addEventListener('click', function() {
        lines[0].classList.toggle('line1-active');
        lines[1].classList.toggle('line2-active');
        lines[2].classList.toggle('line3-active');
    });
});

// ==================== Enroll Button Handlers ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const ctaButtonLarge = document.querySelector('.cta-btn-large');

    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
            showEnrollModal(courseTitle);
        });
    });

    if (ctaButtonLarge) {
        ctaButtonLarge.addEventListener('click', function() {
            showEnrollModal('Premium Course Package');
        });
    }
});

function showEnrollModal(courseTitle) {
    const message = `Thank you for your interest in "${courseTitle}"!\n\nEnrollment form would be displayed here. This is a demo homepage.`;
    alert(message);
    // In a real application, you would open a modal or redirect to an enrollment page
    console.log(`User interested in: ${courseTitle}`);
}

// ==================== Smooth Scroll Behavior ==================== 
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

// ==================== Navbar Background on Scroll ==================== 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== Intersection Observer for Animations ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe course cards, video cards, and testimonial cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.course-card, .video-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ==================== Counter Animation for Stats ==================== 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('K+') ? 'K+' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('K+') ? 'K+' : '+');
        }
    };
    
    updateCounter();
}

// Trigger stat counters when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    const statItems = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statItems.forEach(item => {
                    const text = item.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(item, number);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ==================== Form Validation (for future contact form) ==================== 
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    if (!formData.name || formData.name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
    }
    if (!validateEmail(formData.email)) {
        return { valid: false, message: 'Please enter a valid email' };
    }
    if (!formData.message || formData.message.trim().length < 10) {
        return { valid: false, message: 'Message must be at least 10 characters' };
    }
    return { valid: true, message: 'Form is valid' };
}

// ==================== Dynamic Greeting Based on Time ==================== 
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'Good Morning';
    } else if (hour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
}

// ==================== Analytics Tracking (placeholder) ==================== 
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // In a real application, you would send this to an analytics service
}

// Track page view
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_view', {
        page: 'homepage',
        timestamp: new Date().toISOString()
    });
});

// Track course enrollment interest
document.addEventListener('DOMContentLoaded', function() {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
            trackEvent('course_interest', {
                course: courseTitle,
                position: index + 1,
                timestamp: new Date().toISOString()
            });
        });
    });
});

// ==================== Lazy Loading Setup (optional) ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

// ==================== Scroll to Top Button ==================== 
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 99;
        font-weight: bold;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('hover', () => {
        button.style.backgroundColor = '#5558e3';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ==================== Console Welcome Message ==================== 
console.log('%c Welcome to CodeMaster Academy!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%c Learn AI & Programming with our expert instructors', 'font-size: 14px; color: #764ba2;');
