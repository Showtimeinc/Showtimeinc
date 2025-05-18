document.addEventListener('DOMContentLoaded', function () {
  // your code here

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

        document.addEventListener('DOMContentLoaded', function() {
            // Video Background
            const videoBg = document.getElementById('parallaxVideo');
            if (videoBg) {
                videoBg.play().catch(e => console.log('Video autoplay prevented:', e));
            }
            
            // Video Modal
            const videoModal = document.getElementById('videoModal');
            const closeVideoModal = document.getElementById('closeVideoModal');
            const videoButtons = document.querySelectorAll('.video-play-button');
            
            if (closeVideoModal) {
                closeVideoModal.addEventListener('click', function() {
                    videoModal.classList.remove('active');
                });
            }
            
            if (videoModal) {
                videoModal.addEventListener('click', function(e) {
                    if (e.target === videoModal) {
                        videoModal.classList.remove('active');
                    }
                });
            }
            
            // Parallax Effect
            const parallaxContainer = document.querySelector('.parallax-container');
            const layers = document.querySelectorAll('.parallax-layer');
            
            if (parallaxContainer && layers.length > 0) {
                window.addEventListener('scroll', function() {
                    const scrollPosition = window.pageYOffset;
                    
                    layers.forEach(layer => {
                        const speed = parseFloat(layer.style.transform.match(/translateZ\(([^)]+)\)/)[1]);
                        const yPos = -(scrollPosition * speed * 0.5);
                        layer.style.transform = `translateZ(${speed}px) translateY(${yPos}px) scale(${1 + Math.abs(speed)/10})`;
                    });
                });
            }
            
            // Header scroll effect
            const header = document.getElementById('mainHeader');
            if (header) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            }
            
            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mainNav = document.getElementById('mainNav');
            
            if (mobileMenuBtn && mainNav) {
                mobileMenuBtn.addEventListener('click', function() {
                    mainNav.classList.toggle('active');
                    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                });
                
                // Close mobile menu when clicking a link
                document.querySelectorAll('nav a').forEach(link => {
                    link.addEventListener('click', function() {
                        if (mainNav.classList.contains('active')) {
                            mainNav.classList.remove('active');
                            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    });
                });
            }
            
            // Lazy Loading Animation
            const lazyLoadElements = document.querySelectorAll('.lazy-load');
            
            if (lazyLoadElements.length > 0) {
                const lazyLoadObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('loaded');
                            lazyLoadObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1
                });
                
                lazyLoadElements.forEach(element => {
                    lazyLoadObserver.observe(element);
                });
            }
            
            // Carousel Functionality
            const carousel = document.querySelector('.carousel');
            const carouselItems = document.querySelectorAll('.carousel-item');
            const dots = document.querySelectorAll('.carousel-dot');
            
            if (carousel && carouselItems.length > 0 && dots.length > 0) {
                let currentIndex = 0;
                const itemWidth = 320; // Width + gap
                let visibleItems = Math.floor(window.innerWidth / itemWidth) || 1;
                
                function updateCarousel() {
                    const offset = -currentIndex * itemWidth;
                    carousel.style.transform = `translateX(${offset}px)`;
                    
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                }
                
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                    });
                });
                
                // Auto-advance carousel
                let carouselInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % (carouselItems.length - visibleItems + 1);
                    updateCarousel();
                }, 5000);
                
                // Pause carousel on hover
                carousel.addEventListener('mouseenter', () => {
                    clearInterval(carouselInterval);
                });
                
                carousel.addEventListener('mouseleave', () => {
                    carouselInterval = setInterval(() => {
                        currentIndex = (currentIndex + 1) % (carouselItems.length - visibleItems + 1);
                        updateCarousel();
                    }, 5000);
                });
                
                // Responsive adjustments
                function handleResize() {
                    const newVisibleItems = Math.floor(window.innerWidth / itemWidth) || 1;
                    if (newVisibleItems !== visibleItems) {
                        visibleItems = newVisibleItems;
                        currentIndex = 0;
                        updateCarousel();
                    }
                }
                
                window.addEventListener('resize', handleResize);
            }
            
            // Floating CTA Button
            const floatingCta = document.querySelector('.floating-cta');
            
            if (floatingCta) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 300) {
                        floatingCta.classList.add('visible');
                    } else {
                        floatingCta.classList.remove('visible');
                    }
                });
            }
            
            // Enhanced Qualification Flow
            const qualificationModal = document.getElementById('qualificationModal');
            const mainCtaButton = document.getElementById('mainCtaButton');
            const bottomCtaButton = document.getElementById('bottomCtaButton');
            const floatingCtaButton = document.getElementById('floatingCtaButton');
            const closeQualification = document.getElementById('closeQualification');
            const closeSuccess = document.getElementById('closeSuccess');
            const closeDisqualified = document.getElementById('closeDisqualified');
            const qualificationSteps = document.querySelectorAll('.qualification-step');
            const progressFill = document.getElementById('progressFill');
            const qualificationForm = document.getElementById('qualificationForm');
            const contactForm = document.getElementById('contactForm');
            const formSpinner = document.getElementById('formSpinner');
            
            if (qualificationModal) {
                let currentStep = 0;
                let qualificationData = {};
                
                // Open modal when clicking any CTA button
                [mainCtaButton, bottomCtaButton, floatingCtaButton].forEach(button => {
                    if (button) {
                        button.addEventListener('click', function(e) {
                            e.preventDefault();
                            qualificationModal.classList.add('active');
                            document.body.style.overflow = 'hidden';
                            resetQualificationFlow();
                            
                            // Track event
                            trackEvent('begin_qualification', 'engagement', 'Qualification Flow Started');
                        });
                    }
                });
                
                // Close modal
                function closeModal() {
                    qualificationModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                if (closeQualification) {
                    closeQualification.addEventListener('click', closeModal);
                }
                
                if (closeSuccess) {
                    closeSuccess.addEventListener('click', closeModal);
                }
                
                if (closeDisqualified) {
                    closeDisqualified.addEventListener('click', closeModal);
                }
                
                // Click outside modal to close
                qualificationModal.addEventListener('click', function(e) {
                    if (e.target === qualificationModal) {
                        closeModal();
                    }
                });
                
                // Update progress bar
                function updateProgress() {
                    const progress = (currentStep / (qualificationSteps.length - 1)) * 100;
                    if (progressFill) {
                        progressFill.style.width = `${progress}%`;
                    }
                }
                
                // Navigation between steps
                function showStep(stepIndex) {
                    qualificationSteps.forEach((step, index) => {
                        if (index === stepIndex) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                    
                    currentStep = stepIndex;
                    updateProgress();
                }
                
                // Next button functionality
                document.querySelectorAll('.btn-next').forEach(button => {
                    button.addEventListener('click', function() {
                        if (validateStep(currentStep)) {
                            showStep(currentStep + 1);
                        }
                    });
                });
                
                // Back button functionality
                document.querySelectorAll('.btn-back').forEach(button => {
                    button.addEventListener('click', function() {
                        showStep(currentStep - 1);
                    });
                });
                
                // Validate current step before proceeding
                function validateStep(stepIndex) {
                    const currentStepElement = qualificationSteps[stepIndex];
                    
                    // Step 1: Homeowner verification
                    if (stepIndex === 0) {
                        const selectedOption = currentStepElement.querySelector('.qualification-btn.selected');
                        if (!selectedOption) {
                            showAlert('Please select an option to continue');
                            return false;
                        }
                        qualificationData.homeownerStatus = selectedOption.dataset.answer;
                        return true;
                    }
                    
                    // Step 2: Project scope (multiple selection)
                    if (stepIndex === 1) {
                        const selectedServices = Array.from(currentStepElement.querySelectorAll('input[type="checkbox"]:checked'));
                        if (selectedServices.length === 0) {
                            showAlert('Please select at least one service you\'re interested in');
                            return false;
                        }
                        
                        qualificationData.services = selectedServices.map(service => service.value);
                        return true;
                    }
                    
                    // Step 3: Budget selection
                    if (stepIndex === 2) {
                        const selectedOption = currentStepElement.querySelector('.qualification-btn.selected');
                        if (!selectedOption) {
                            showAlert('Please select a budget range to continue');
                            return false;
                        }
                        qualificationData.budget = selectedOption.dataset.answer;
                        return true;
                    }
                    
                    // Step 4: Timeline selection
                    if (stepIndex === 3) {
                        const selectedOption = currentStepElement.querySelector('.qualification-btn.selected');
                        if (!selectedOption) {
                            showAlert('Please select a timeline to continue');
                            return false;
                        }
                        qualificationData.timeline = selectedOption.dataset.answer;
                        return true;
                    }
                    
                    return true;
                }
                
                // Show alert message
                function showAlert(message) {
                    const alertElement = document.createElement('div');
                    alertElement.className = 'alert-message';
                    alertElement.textContent = message;
                    alertElement.style.position = 'fixed';
                    alertElement.style.bottom = '20px';
                    alertElement.style.left = '50%';
                    alertElement.style.transform = 'translateX(-50%)';
                    alertElement.style.backgroundColor = 'var(--accent)';
                    alertElement.style.color = 'white';
                    alertElement.style.padding = '12px 24px';
                    alertElement.style.borderRadius = '8px';
                    alertElement.style.zIndex = '10000';
                    alertElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                    alertElement.style.animation = 'fadeUp 0.3s ease';
                    
                    document.body.appendChild(alertElement);
                    
                    setTimeout(() => {
                        alertElement.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(alertElement);
                        }, 300);
                    }, 3000);
                }
                
                // Button selection functionality
                document.querySelectorAll('.qualification-btn:not(.checkbox-option)').forEach(button => {
                    button.addEventListener('click', function() {
                        // Remove selected class from siblings
                        const parent = this.parentElement;
                        parent.querySelectorAll('.qualification-btn').forEach(btn => {
                            btn.classList.remove('selected');
                        });
                        
                        // Add selected class to clicked button
                        this.classList.add('selected');
                        
                        // Enable next button if on step 1
                        if (currentStep === 0) {
                            const nextButton = qualificationSteps[0].querySelector('.btn-next');
                            if (nextButton) {
                                nextButton.disabled = false;
                            }
                        }
                    });
                });
                
                // Checkbox selection styling
                document.querySelectorAll('.checkbox-option input').forEach(checkbox => {
                    checkbox.addEventListener('change', function() {
                        const parentLabel = this.closest('.checkbox-option');
                        if (this.checked) {
                            parentLabel.classList.add('selected');
                        } else {
                            parentLabel.classList.remove('selected');
                        }
                    });
                });
                
                // Form submission
                if (qualificationForm) {
                    qualificationForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        
                        // Show loading spinner
                        if (formSpinner) {
                            formSpinner.style.display = 'block';
                        }
                        
                        // Only gather required fields
                        qualificationData.name = document.getElementById('name').value;
                        qualificationData.phone = document.getElementById('phone').value;
                        
                        // Optional fields
                        qualificationData.email = document.getElementById('email').value || 'Not provided';
                        qualificationData.notes = document.getElementById('notes').value || 'None';
                        
                        // Simulate API call with timeout
                        setTimeout(() => {
                            if (formSpinner) {
                                formSpinner.style.display = 'none';
                            }
                            
                            // Determine if qualified (simplified logic)
                            const isQualified = qualificationData.homeownerStatus !== 'no';
                            
                            if (isQualified) {
                                qualificationSteps.forEach(step => step.classList.remove('active'));
                                document.getElementById('qualifiedLead').style.display = 'block';
                                
                                // Track conversion
                                trackEvent('lead_conversion', 'conversion', 'Minimal Info Lead');
                            } else {
                                qualificationSteps.forEach(step => step.classList.remove('active'));
                                document.getElementById('disqualifiedLead').style.display = 'block';
                            }
                            
                            console.log('Qualification data:', qualificationData);
                            
                            // In a real implementation, you would send this data to your server
                            // sendLeadData(qualificationData);
                        }, 1500);
                    });
                }
                
                // Reset flow when reopened
                function resetQualificationFlow() {
                    currentStep = 0;
                    qualificationData = {};
                    
                    // Reset all steps
                    qualificationSteps.forEach((step, index) => {
                        step.classList.toggle('active', index === 0);
                    });
                    
                    // Reset selections
                    document.querySelectorAll('.qualification-btn.selected').forEach(btn => {
                        btn.classList.remove('selected');
                    });
                    
                    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                        checkbox.checked = false;
                        const parentLabel = checkbox.closest('.checkbox-option');
                        if (parentLabel) {
                            parentLabel.classList.remove('selected');
                        }
                    });
                    
                    // Reset form
                    if (qualificationForm) qualificationForm.reset();
                    
                    // Reset results screens
                    const qualifiedLead = document.getElementById('qualifiedLead');
                    const disqualifiedLead = document.getElementById('disqualifiedLead');
                    if (qualifiedLead) qualifiedLead.style.display = 'none';
                    if (disqualifiedLead) disqualifiedLead.style.display = 'none';
                    
                    // Reset progress
                    updateProgress();
                }
            }
            
            // Contact Form Submission
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = new FormData(contactForm);
                    const formStatus = document.getElementById('form-status');
                    
                    fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            formStatus.textContent = 'Thanks for your submission! We will contact you soon.';
                            formStatus.className = 'form-status success';
                            contactForm.reset();
                        } else {
                            response.json().then(data => {
                                if (Object.hasOwn(data, 'errors')) {
                                    formStatus.textContent = data.errors.map(error => error.message).join(', ');
                                } else {
                                    formStatus.textContent = 'Oops! There was a problem submitting your form';
                                }
                                formStatus.className = 'form-status error';
                            });
                        }
                    })
                    .catch(error => {
                        formStatus.textContent = 'Oops! There was a problem submitting your form';
                        formStatus.className = 'form-status error';
                    });
                });
            }
            
            // Track event function
            function trackEvent(eventName, category, label) {
                console.log(`Tracking: ${eventName}, ${category}, ${label}`);
                
                // Google Analytics
                if(typeof gtag !== 'undefined') {
                    gtag('event', eventName, {
                        'event_category': category,
                        'event_label': label
                    });
                }
                
                // Facebook Pixel
                if(typeof fbq !== 'undefined') {
                    fbq('track', eventName, {
                        content_name: label,
                        content_category: category
                    });
                }
            }
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Initialize parallax effect
            window.dispatchEvent(new Event('scroll'));
        });
});
