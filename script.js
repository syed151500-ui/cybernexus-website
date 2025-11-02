// Splash Screen Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const loadingProgress = document.getElementById('loading-progress');
    const percentage = document.getElementById('percentage');
    const splashParticles = document.getElementById('splash-particles');
    
    // Create floating particles
    createParticles();
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Complete loading and transition to main content
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                splashScreen.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Initialize main content animations
                    initMainContent();
                }, 500);
            }, 500);
        }
        
        loadingProgress.style.width = progress + '%';
        percentage.textContent = Math.round(progress) + '%';
    }, 200);
    
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const left = Math.random() * 100;
            const delay = Math.random() * 6;
            
            particle.style.left = left + '%';
            particle.style.animationDelay = delay + 's';
            
            splashParticles.appendChild(particle);
        }
    }
    
    function initMainContent() {
        // Initialize any main content animations or functionality here
        console.log('Main content loaded');
        
        // Initialize counter animations for stats
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateCounter(stat, target, 2000);
        });
    }
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
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
    
    // Initialize particles.js for main content if needed
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
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
});