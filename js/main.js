/* ========================================
   PORTFOLIO - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBreadcrumb();
    initScrollReveal();
    initProgressBars();
    initProjectFilter();
    initCounters();
    initCursorGlow();
    initContactForm();
});

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ========================================
   BREADCRUMB
   ======================================== */
function initBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    const sections = document.querySelectorAll('section[id]');
    
    const sectionNames = {
        'accueil': 'Accueil',
        'apropos': '\u00C0 Propos',
        'parcours': 'Parcours',
        'projets': 'Projets',
        'competences': 'Comp\u00E9tences',
        'outils': 'Outils & Technologies',
        'contact': 'Contact'
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            breadcrumb.classList.add('visible');
        } else {
            breadcrumb.classList.remove('visible');
        }

        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                breadcrumbCurrent.textContent = sectionNames[sectionId] || sectionId;
            }
        });
    });
}

/* ========================================
   SCROLL REVEAL
   ======================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-card, .about-details .detail-card, .about-links, .about-interests, ' +
        '.project-card, .competence-card, .tool-category, .contact-grid, ' +
        '.timeline-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
        observer.observe(el);
    });
}

/* ========================================
   PROGRESS BARS
   ======================================== */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

/* ========================================
   PROJECT FILTER
   ======================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.display = 'block';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        if (!btn.classList.contains('active') || btn.getAttribute('data-filter') !== 'all') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

/* ========================================
   COUNTERS
   ======================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

/* ========================================
   CURSOR GLOW
   ======================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    } else {
        glow.style.display = 'none';
    }
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Envoy\u00E9 !</span><i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}
