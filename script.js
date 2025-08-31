/**
 * Smooth scrolling for navigation links
 */
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

/**
 * Header background change on scroll
 */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = 'none';
    }
});

/**
 * Animate elements on scroll
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

/**
 * Counter animation for stats
 */
const animateCounters = () => {
    const counters = document.querySelectorAll('.trust-number');
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    counters.forEach(counter => {
        const text = counter.textContent;
        const targetStr = text.replace(/[^০-৯.]/g, '');

        // Convert Bengali digits to English for calculation
        let englishStr = '';
        for (let char of targetStr) {
            const index = bengaliDigits.indexOf(char);
            englishStr += index !== -1 ? index.toString() : char;
        }

        const target = parseFloat(englishStr.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[০-৯.,]/g, '');
        let current = 0;
        const increment = target / 60;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                let displayNum = Math.floor(current).toString();

                // Convert back to Bengali digits
                let bengaliNum = '';
                for (let digit of displayNum) {
                    bengaliNum += bengaliDigits[parseInt(digit)];
                }

                counter.textContent = bengaliNum + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                let finalNum = target.toString();
                let bengaliFinal = '';
                for (let digit of finalNum) {
                    if (digit === '.') {
                        bengaliFinal += '.';
                    } else {
                        bengaliFinal += bengaliDigits[parseInt(digit)];
                    }
                }
                counter.textContent = bengaliFinal + suffix;
            }
        };

        updateCounter();
    });
};

/**
 * Trigger counter animation when trust section is visible
 */
const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            trustObserver.unobserve(entry.target);
        }
    });
});

const trustSection = document.querySelector('.trust-section');
if (trustSection) {
    trustObserver.observe(trustSection);
}

/**
 * Button click handlers (can be connected to actual functionality)
 */
document.querySelectorAll('.btn-primary, .header-cta').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        // Add your actual functionality here
        console.log('Button clicked:', this.textContent);
    });
});


// Convert numbers to Bengali digits
const convertToBengaliNumbers = (str) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return str.replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};


// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Live activity counter animation
const animateLiveCounters = () => {
    const transactionCounter = document.getElementById('liveTransactions');
    const agentCounter = document.getElementById('activeAgents');
    
    if (!transactionCounter || !agentCounter) return;
    
    let transactions = 2345;
    let agents = 387;
    
    // Initial display with Bengali numbers
    transactionCounter.textContent = convertToBengaliNumbers(transactions.toString());
    agentCounter.textContent = convertToBengaliNumbers(agents.toString());
    
    // Simulate live transaction updates
    setInterval(() => {
        transactions += Math.floor(Math.random() * 3) + 1; // Add 1-3 transactions
        const bengaliTransactions = convertToBengaliNumbers(transactions.toString());
        
        // Add comma formatting for large numbers
        const formattedNumber = bengaliTransactions.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        transactionCounter.textContent = formattedNumber;
        
        // Add subtle animation when number changes
        transactionCounter.style.transform = 'scale(1.1)';
        setTimeout(() => {
            transactionCounter.style.transform = 'scale(1)';
        }, 200);
    }, 8000); // Update every 8 seconds
    
    // Simulate agent availability changes
    setInterval(() => {
        const change = Math.floor(Math.random() * 4) - 2; // -2 to +2 change
        agents += change;
        agents = Math.max(350, Math.min(420, agents)); // Keep within realistic range
        
        const bengaliAgents = convertToBengaliNumbers(agents.toString());
        agentCounter.textContent = bengaliAgents;
        
        // Add subtle animation when number changes
        agentCounter.style.transform = 'scale(1.1)';
        setTimeout(() => {
            agentCounter.style.transform = 'scale(1)';
        }, 200);
    }, 12000); // Update every 12 seconds
};

// Animate transaction feed
const animateTransactionFeed = () => {
    const transactionItems = document.querySelectorAll('.transaction-item');
    if (transactionItems.length === 0) return;
    
    transactionItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0.5';
            item.style.transform = 'translateX(-10px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 150);
        }, index * 300);
    });
};

// Initialize live activity when section becomes visible
const activityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTransactionFeed();
            
            // Repeat transaction feed animation periodically
            setInterval(animateTransactionFeed, 15000); // Every 15 seconds
            
            activityObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Testimonial card hover effects
const addTestimonialEffects = () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
            card.querySelector('.testimonial-avatar').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.testimonial-avatar').style.transform = 'scale(1)';
        });
    });
};

// Security feature progressive reveal
const addSecurityEffects = () => {
    const securityFeatures = document.querySelectorAll('.security-feature');
    
    securityFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.5s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, index * 200);
    });
};

// Initialize security effects when section is visible
const securityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            addSecurityEffects();
            securityObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start live counters
    animateLiveCounters();
    
    // Add testimonial effects
    addTestimonialEffects();
    
    // Observe sections
    const activitySection = document.querySelector('.live-activity-section');
    const securitySection = document.querySelector('.security-section');
    
    if (activitySection) {
        activityObserver.observe(activitySection);
    }
    
    if (securitySection) {
        securityObserver.observe(securitySection);
    }
});

// Add smooth transitions for all interactive elements
const addSmoothTransitions = () => {
    const elements = [
        '.testimonial-card',
        '.security-card', 
        '.compliance-card',
        '.activity-card',
        '.trust-indicator'
    ];
    
    elements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.transition = 'all 0.3s ease';
        });
    });
};

// Initialize smooth transitions
addSmoothTransitions();

// Optional: Add click tracking for analytics
const trackClicks = () => {
    document.querySelectorAll('.testimonial-card, .compliance-card, .activity-card').forEach(card => {
        card.addEventListener('click', function() {
            console.log('Card clicked:', this.querySelector('h4, h3')?.textContent || 'Unknown');
            // Add your analytics tracking here
        });
    });
};

trackClicks();