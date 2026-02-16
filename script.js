// Toggle research topic sections
function toggleTopic(header) {
    const topic = header.parentElement;
    const papers = topic.querySelector('.topic-papers');
    const toggle = header.querySelector('.topic-toggle');

    const isOpen = papers.style.maxHeight;

    if (isOpen) {
        papers.style.maxHeight = null;
        toggle.textContent = '+';
        topic.classList.remove('active');
    } else {
        papers.style.maxHeight = papers.scrollHeight + 'px';
        toggle.textContent = '−';
        topic.classList.add('active');
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active nav link
            updateActiveNavLink(this.getAttribute('href'));
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink(hash) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for scroll-based navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -80% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveNavLink(`#${id}`);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.paper-card, .team-member, .focus-item');

const fadeObserver = new IntersectionObserver((entries) => {
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

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
