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
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your actual functionality here
        console.log('Button clicked:', this.textContent);
    });
});