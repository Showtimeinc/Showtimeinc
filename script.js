// Add this JavaScript before the closing </script> tag

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const videoPlayButton = document.getElementById('videoPlayButton');
const closeVideoModal = document.getElementById('closeVideoModal');
const featureVideo = document.getElementById('featureVideo');

videoPlayButton.addEventListener('click', function() {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    featureVideo.src = "https://www.youtube.com/embed/EXAMPLEVIDEOID?autoplay=1";
    trackEvent('play_video', 'engagement', 'Showreel Video Played');
});

closeVideoModal.addEventListener('click', function() {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    featureVideo.src = "";
});

videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        featureVideo.src = "";
    }
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('div');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        trackEvent('dark_mode', 'preference', 'Dark Mode Enabled');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        trackEvent('dark_mode', 'preference', 'Dark Mode Disabled');
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Cookie Consent Banner
const cookieConsent = document.createElement('div');
cookieConsent.className = 'cookie-consent';
cookieConsent.innerHTML = `
    <div class="cookie-content">
        <p class="cookie-text">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.</p>
        <div class="cookie-buttons">
            <button class="cookie-btn accept">Accept</button>
            <button class="cookie-btn decline">Decline</button>
        </div>
    </div>
`;
document.body.appendChild(cookieConsent);

// Show cookie consent if not already accepted
if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieConsent.classList.add('active');
    }, 2000);
}

// Handle cookie consent buttons
cookieConsent.querySelector('.cookie-btn.accept').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.classList.remove('active');
    trackEvent('cookie_consent', 'preference', 'Cookies Accepted');
});

cookieConsent.querySelector('.cookie-btn.decline').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'false');
    cookieConsent.classList.remove('active');
    trackEvent('cookie_consent', 'preference', 'Cookies Declined');
});

// Animate testimonial cards when they come into view
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            testimonialObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

testimonialCards.forEach(card => {
    testimonialObserver.observe(card);
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.boxShadow = '0 8px 24px rgba(229, 9, 20, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1)';
        icon.style.boxShadow = 'none';
    });
});

// Add dark mode styles
const styleElement = document.createElement('style');
styleElement.id = 'dark-mode-styles';
styleElement.textContent = `
    body.dark-mode {
        --primary: #121212;
        --secondary: #1e1e1e;
        --text: #f0f0f0;
        --text-secondary: #aaaaaa;
        --glass: rgba(30, 30, 30, 0.8);
    }
    
    body.dark-mode .glass-card {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }
    
    body.dark-mode .hero h1 {
        background: linear-gradient(90deg, #ffffff, #cccccc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;
document.head.appendChild(styleElement);
