// Splash Screen Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const loadingProgress = document.getElementById('loading-progress');
    const percentage = document.getElementById('percentage');
    const splashParticles = document.getElementById('splash-particles');
    
    createParticles();
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                splashScreen.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    initMainContent();
                }, 500);
            }, 500);
        }
        
        loadingProgress.style.width = progress + '%';
        percentage.textContent = Math.round(progress) + '%';
    }, 200);
    
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            splashParticles.appendChild(particle);
        }
    }
    
    function initMainContent() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateCounter(stat, target, 2000);
        });
        
        if (typeof particlesJS !== 'undefined' && window.innerWidth > 768) {
            particlesJS('particles-js', {
                particles: {
                    number: { 
                        value: window.innerWidth < 992 ? 40 : 80, 
                        density: { enable: true, value_area: 800 } 
                    },
                    color: { value: "#00f3ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00f3ff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.padding = '0.75rem 0';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
        
        lastScroll = currentScroll;
    });
});
