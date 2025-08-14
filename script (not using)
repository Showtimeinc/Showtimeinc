// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.querySelector('.loading-animation');
    if (loadingElement) {
        setTimeout(() => {
            loadingElement.classList.add('fade-out');
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 500);
        }, 1500);
    }

    initLazyLoading();
    initParallax();
    initAnimations();
    initFormLogic();
});

// Lazy Loading
function initLazyLoading() {
    const lazyLoad = (targets) => {
        if (!targets.length) return;

        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const target = entry.target;
                if (!target.classList.contains('lazy')) return;
                
                loadAsset(target);
                target.classList.remove('lazy');
                observer.unobserve(target);
            });
        }, {
            rootMargin: '0px 0px 100px 0px',
            threshold: 0.1
        });

        targets.forEach(target => io.observe(target));
    };

    const loadAsset = (target) => {
        if (target.tagName === 'IMG') {
            target.src = target.dataset.src;
        } else if (target.tagName === 'VIDEO') {
            target.querySelectorAll('source').forEach(source => {
                source.src = source.dataset.src;
            });
            target.load();
        } else if (target.hasAttribute('data-bg')) {
            target.style.backgroundImage = `url(${target.dataset.bg})`;
        }
    };

    lazyLoad(document.querySelectorAll('.lazy'));
}

// Parallax Effect
function initParallax() {
    const parallaxLayers = [
        document.getElementById('parallax-layer-1'),
        document.getElementById('parallax-layer-2')
    ].filter(Boolean);

    if (!parallaxLayers.length) return;

    const heroVideo = document.querySelector('.hero-video');
    
    // Set background images if they're not set in HTML
    parallaxLayers[0]?.style.backgroundImage ||= 'url("spkr_close_up~2.jpg")';
    parallaxLayers[1]?.style.backgroundImage ||= 'url("URC-Lifestyle-Image-Residential-12.jpg")';

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxLayers.forEach((layer, index) => {
            const yPos = -scrollPosition * (0.2 * (index + 1));
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            layer.style.willChange = 'transform';
        });

        if (heroVideo) {
            heroVideo.style.transform = `translate3d(0, ${-scrollPosition * 0.3}px, 0)`;
        }
    });
}

// GSAP Animations
function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded - animations disabled');
        return;
    }

    // Hero animations
    gsap.to('.hero h1', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 });
    gsap.to('.hero h1 span', { y: 0, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.6 });
    gsap.to('.hero p', { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' });
    gsap.to('.cta-button', { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power3.out' });

    // Stats counter
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const suffix = stat.textContent.includes('%') ? '%' : '';
        
        gsap.to(stat, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power1.out",
            onUpdate: function() {
                stat.textContent = Math.floor(this.targets()[0].innerText) + suffix;
            },
            scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Section animations
    createScrollTrigger('.about-text', { opacity: 1, x: 0 });
    createScrollTrigger('.about-image', { opacity: 1, x: 0 }, 0.3);
    createScrollTrigger('.years-badge', { opacity: 1, y: 0, ease: 'back.out(1.7)' }, 0.6);

    // Card animations
    staggerAnimation('.service-card', { opacity: 1, y: 0 });
    staggerAnimation('.flip-card', { opacity: 1, y: 0 });
    staggerAnimation('.testimonial', { opacity: 1, y: 0 }, 0.2);

    // Contact form
    createScrollTrigger('.contact-form', { opacity: 1, y: 0 });

    // Floating CTA
    gsap.to('.floating-cta', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2,
        ease: 'elastic.out(1, 0.5)'
    });
}

// Form Logic
function initFormLogic() {
    const homeownerRadios = document.querySelectorAll('input[name="homeowner"]');
    const projectDetails = document.getElementById('project-details');
    const nonQualifiedMessage = document.getElementById('non-qualified-message');
    const qualifiedCTA = document.getElementById('qualified-cta');
    const leadForm = document.getElementById('leadForm');

    if (!homeownerRadios.length || !projectDetails || !nonQualifiedMessage) return;

    homeownerRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const showDetails = radio.value === 'yes';
            projectDetails.style.display = showDetails ? 'block' : 'none';
            nonQualifiedMessage.style.display = showDetails ? 'none' : 'block';
            
            animateElement(showDetails ? projectDetails : nonQualifiedMessage);
        });
    });

    document.querySelectorAll('#project-details input[required], #project-details select[required]')
        .forEach(field => field.addEventListener('change', checkFormCompletion));

    if (leadForm) {
        leadForm.addEventListener('submit', handleFormSubmit);
    }
}

// Helper Functions
function createScrollTrigger(selector, animationProps, delay = 0) {
    const element = document.querySelector(selector);
    if (!element) return;

    ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        onEnter: () => gsap.to(element, { ...animationProps, duration: 1, delay })
    });
}

function staggerAnimation(selector, animationProps, delayIncrement = 0.1) {
    gsap.utils.toArray(selector).forEach((element, i) => {
        createScrollTrigger(element, animationProps, i * delayIncrement);
    });
}

function animateElement(element) {
    if (!element) return;
    gsap.from(element, { opacity: 0, y: 20, duration: 0.8 });
}

function checkFormCompletion() {
    const formFields = document.querySelectorAll('#project-details input[required], #project-details select[required]');
    const qualifiedCTA = document.getElementById('qualified-cta');
    
    if (!formFields.length || !qualifiedCTA) return;

    const allFilled = Array.from(formFields).every(field => {
        if (field.type === 'checkbox' || field.type === 'radio') {
            return document.querySelector(`input[name="${field.name}"]:checked`);
        }
        return field.value;
    });

    qualifiedCTA.style.display = allFilled ? 'block' : 'none';
    
    if (allFilled) {
        animateElement(qualifiedCTA);
        setTimeout(() => qualifiedCTA.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Form submitted:', data);
    showConfirmation();
    
    // Production: fetch('/submit-form', { method: 'POST', body: formData })
}

function showConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation-overlay';
    confirmation.innerHTML = `
        <div class="confirmation-modal">
            <h3>Thank You!</h3>
            <p>Your information has been received. We'll contact you within 24 hours.</p>
            <button class="confirmation-close">Close</button>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    confirmation.querySelector('.confirmation-close').addEventListener('click', () => confirmation.remove());
}
