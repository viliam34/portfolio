// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.nav-hamburger');
const navMenu = document.querySelector('.nav-links');
const cursorFollower = document.querySelector('.cursor-follower');
const roleText = document.querySelector('.role-text');
const contactForm = document.getElementById('contact-form');

// ===== Typing Animation =====
const roles = ['3D Artist', 'Web Developer', 'Creative Designer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        roleText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing animation after page load
setTimeout(typeRole, 1500);

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('mobile-open');
    document.body.style.overflow = navMenu.classList.contains('mobile-open') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Custom Cursor =====
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorFollower.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    cursorFollower.classList.remove('active');
});

function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursorFollower.style.left = cursorX - 15 + 'px';
    cursorFollower.style.top = cursorY - 15 + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effect
const hoverElements = document.querySelectorAll('a, button, .work-card, .project-card, .skill-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.section-header, .about-image, .about-text, .work-card, .project-card, .contact-info, .contact-form, .skill-item');

revealElements.forEach(el => {
    el.classList.add('reveal');
});

function reveal() {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// ===== Staggered Animation for Cards =====
function staggerCards() {
    const cards = document.querySelectorAll('.work-card, .project-card, .skill-item');
    
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

staggerCards();

// ===== Parallax Effect for Floating Shapes =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ===== 3D Cube Mouse Interaction =====
const cube = document.querySelector('.cube');

document.querySelector('.hero-visual').addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 30;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * -30;
    
    cube.style.animation = 'none';
    cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

document.querySelector('.hero-visual').addEventListener('mouseleave', () => {
    cube.style.animation = 'rotateCube 20s infinite linear';
});

// ===== Contact Form Handling =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Show success message (you can integrate with a backend later)
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
    
    console.log('Form submitted:', { name, email, message });
});

// ===== Intersection Observer for Performance =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Easter Egg: Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.filter = 'hue-rotate(180deg)';
    
    setTimeout(() => {
        document.body.style.filter = '';
    }, 3000);
}

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-greeting, .name-line, .hero-roles, .hero-description, .hero-cta');
    heroElements.forEach((el, index) => {
        el.style.animationPlayState = 'running';
    });
});

// ===== Disable Cursor Follower on Touch Devices =====
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursorFollower.style.display = 'none';
}

// ===== Console Message =====
console.log(`
╔══════════════════════════════════════╗
║                                      ║
║   Welcome to Viliam Balara's         ║
║   Portfolio Website!                 ║
║                                      ║
║   Built with ❤️ and lots of ☕       ║
║                                      ║
╚══════════════════════════════════════╝
`);
