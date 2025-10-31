// ==============================
// main.js - Core Interactivity & UI Features
// ==============================
// This file handles: cursor trail, interactive tooltips, quiz logic,
// accordion behavior, icon expansions, and help card modals
// All scroll-triggered animations are in gsap-scroll.js

// Ensure GSAP + ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

/* ====== CURSOR TRAIL EFFECT WITH OVERSHOOT ====== */
// Creates springy cursor follower with overshoot effect for playful feel
// The follower lags behind cursor with easing, then overshoots slightly using sine wave
const mouseFollower = document.createElement('div');
mouseFollower.className = 'cursor-follower';
document.body.appendChild(mouseFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
const ease = 0.15; // Lower = smoother lag, higher = snappier
const overshootFactor = 1.2; // How far overshoot goes before springing back

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateFollower() {
    const diffX = mouseX - followerX;
    const diffY = mouseY - followerY;

    // Apply easing
    followerX += diffX * ease;
    followerY += diffY * ease;

    // Apply overshoot effect (small oscillation back)
    const overshootX = Math.sin(diffX * 0.05) * overshootFactor;
    const overshootY = Math.sin(diffY * 0.05) * overshootFactor;

    mouseFollower.style.left = followerX + overshootX + 'px';
    mouseFollower.style.top = followerY + overshootY + 'px';

    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .option, .icon, .help-card, .stress-cards .card, .interactive-term');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(mouseFollower, {
            scale: 1.5,
            width: '24px',
            height: '24px',
            backgroundColor: 'rgba(29, 233, 182, 0.9)',
            boxShadow: '0 0 30px rgba(29, 233, 182, 0.8)',
            duration: 0.2
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(mouseFollower, {
            scale: 1,
            width: '16px',
            height: '16px',
            backgroundColor: 'rgba(29, 233, 182, 0.8)',
            boxShadow: '0 0 20px rgba(29, 233, 182, 0.6)',
            duration: 0.2
        });
    });
});

/* ====== STRESS RESPONSE ICONS HOVER TOOLTIP ====== */
const interactiveTerms = document.querySelectorAll('.interactive-term');

interactiveTerms.forEach(term => {
    const tooltipText = term.dataset.tooltip;
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.innerText = tooltipText;
    term.appendChild(tooltip);

    term.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-10px)';
    });

    term.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(0)';
    });
});

/* ====== PERCEPTION QUIZ LOGIC ====== */
const options = document.querySelectorAll('.stress-quiz .option');
const feedback = document.querySelector('.stress-quiz .feedback');

options.forEach(option => {
    option.addEventListener('click', () => {
        if(option.classList.contains('positive')) {
            feedback.innerText = "✨ You perceived the stress positively! Focus and energy increase.";
            feedback.className = 'feedback positive';
            gsap.fromTo(option, { scale: 1 }, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
            gsap.fromTo(feedback, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
        } else {
            feedback.innerText = "⚠️ Negative perception: stress can feel overwhelming and tiring.";
            feedback.className = 'feedback negative';
            gsap.fromTo(option, { scale: 1 }, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
            gsap.fromTo(feedback, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    });
});

/* ====== ANXIETY & COPING STRATEGIES ACCORDION ====== */
const accordions = document.querySelectorAll('.accordion-item');

accordions.forEach(item => {
    const btn = item.querySelector('.accordion-btn');
    const content = item.querySelector('.accordion-content');

    btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all accordions
        accordions.forEach(otherItem => {
            const otherContent = otherItem.querySelector('.accordion-content');
            otherItem.classList.remove('active');
            otherContent.style.maxHeight = "0px";
            otherContent.style.opacity = "0";
        });
        
        // If this wasn't open, open it
        if (!isOpen) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.opacity = "1";
        }
    });
});

/* ====== ICON CLICK EXPANSION FOR STRESS RESPONSE ====== */
// When user clicks an icon, show expanded fact box with animated text
document.querySelectorAll('.stress-response .icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const iconName = icon.dataset.name;
        const facts = {
            Brain: "Your amygdala activates, releasing stress hormones like cortisol and adrenaline.",
            Heart: "Heart rate increases from ~60 to 100+ bpm, pumping oxygen-rich blood to muscles.",
            Lungs: "Breathing rate increases from 12-20 to 20-30 breaths per minute.",
            Muscles: "Muscles tense, especially in neck, shoulders, and back, preparing for action."
        };
        
        // Create or show expansion box
        let expansionBox = document.querySelector('.icon-expansion');
        if (!expansionBox) {
            expansionBox = document.createElement('div');
            expansionBox.className = 'icon-expansion';
            document.body.appendChild(expansionBox);
        }
        
        expansionBox.innerHTML = `<h4>${iconName}:</h4><p>${facts[iconName]}</p>`;
        expansionBox.style.display = 'block';
        
        // Animate in with GSAP
        gsap.fromTo(expansionBox, 
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            gsap.to(expansionBox, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                onComplete: () => expansionBox.style.display = 'none'
            });
        }, 5000);
    });
});

/* ====== STICKY PROGRESS INDICATOR ====== */
// Create a vertical progress bar that shows scroll position
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

const updateProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY / scrollHeight * 100;
    progressBar.style.height = `${scrolled}%`;
};

window.addEventListener('scroll', updateProgress);
updateProgress();

/* ====== FINDING HELP CARD HOVER ====== */
const helpCards = document.querySelectorAll('.help-card');
helpCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {scale: 1.05, boxShadow: "0 0 20px #1DE9B6", duration: 0.3});
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {scale: 1, boxShadow: "0 0 0px #000", duration: 0.3});
    });
});

