function toggleNavDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('navDropdown');
    dropdown.classList.toggle('active');
}

function closeNavDropdown() {
    const dropdown = document.getElementById('navDropdown');
    dropdown.classList.remove('active');
}
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('navDropdown');
    const menuBtn = document.querySelector('.nav-menu-btn');
    
    if (!dropdown.contains(event.target) && !menuBtn.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeNavDropdown();
    }
});

// ==================== Video Play Button Handler ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-button-overlay');
    
    playButtons.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            const videoWrapper = this.parentElement;
            const iframe = videoWrapper.querySelector('iframe');
            
            // Add animation effect
            const playBtn = this.querySelector('.play-btn');
            playBtn.style.animation = 'none';
            setTimeout(() => {
                playBtn.style.animation = '';
            }, 10);
            
            // Trigger iframe focus and autoplay
            if (iframe) {
                // Hide overlay after click to show video is playing
                this.style.opacity = '0.1';
                this.style.pointerEvents = 'none';
                
                // Re-enable overlay on hover
                videoWrapper.addEventListener('mouseleave', () => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'all';
                });
            }
        });
        
        // Show overlay on hover
        const videoWrapper = overlay.parentElement;
        videoWrapper.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
    });
    document.querySelectorAll('.play-btn').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log(`Video ${index + 1} play button clicked`);
            trackEvent('video_play_clicked', {
                video_number: index + 1,
                timestamp: new Date().toISOString()
            });
        });
    });
});
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
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
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
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.course-card, .video-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
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
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
}
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_view', {
        page: 'homepage',
        timestamp: new Date().toISOString()
    });
});
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
function openSignupModal(event) {
    if (event) {
        event.preventDefault();
    }
    const modal = document.getElementById('signupModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    trackEvent('signup_modal_opened', {
        timestamp: new Date().toISOString()
    });
}

function closeSignupModal() {
    const modal = document.getElementById('signupModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    resetSignupForm();
}
window.addEventListener('click', function(event) {
    const modal = document.getElementById('signupModal');
    if (event.target === modal) {
        closeSignupModal();
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSignupModal();
    }
});
function handleSignupSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const about = document.getElementById('about').value.trim();
    clearFormErrors();
    
    // Validate form
    let isValid = true;
    
    if (!name || name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validatePhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (about && about.length < 5) {
        showError('aboutError', 'About section should be at least 5 characters');
        isValid = false;
    }
    
    if (isValid) {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
        setTimeout(() => {
            const formData = {
                name: name,
                email: email,
                phone: phone,
                about: about,
                timestamp: new Date().toISOString()
            };
            console.log('Sign up data:', formData);
            trackEvent('user_signup', formData);
            showSuccessMessage();
            setTimeout(() => {
                closeSignupModal();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Account';
            }, 2000);
        }, 1500);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Accept various phone formats
    const re = /^[0-9\s\-\+\(\)]{7,}$/;
    return re.test(phone);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        const fieldId = elementId.replace('Error', '');
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('error');
        }
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputFields = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    
    inputFields.forEach(field => {
        field.classList.remove('error');
    });
}

function resetSignupForm() {
    const form = document.getElementById('signupForm');
    if (form) {
        form.reset();
        clearFormErrors();
    }
}

function showSuccessMessage() {
    const name = document.getElementById('name').value;
    alert(`Welcome to CodeMaster Academy, ${name}!\n\nYour account has been created successfully. Check your email for further instructions.`);
    console.log('User registration successful');
}
console.log('%c Welcome to CodeMaster Academy!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%c Learn AI & Programming with our expert instructors', 'font-size: 14px; color: #764ba2;');
