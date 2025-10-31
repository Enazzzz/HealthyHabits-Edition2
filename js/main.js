// ==============================
// main.js
// ==============================

// Global variables
let stressMeter = document.getElementById('stress-meter');
let meterLevel = 0;

// ------------------------------
// HERO STRESS METER ANIMATION
// ------------------------------
const animateStressMeter = () => {
  window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    meterLevel = Math.min(1, scrollPercent); // 0-1 scale

    stressMeter.style.width = `${meterLevel * 80}%`; // full width is 80%
    stressMeter.style.boxShadow = `0 0 ${10 + meterLevel * 20}px #1DE9B6`;
  });
};
animateStressMeter();

// ------------------------------
// INTERACTIVE TERMS: Fight, Flight, Freeze
// ------------------------------
document.querySelectorAll('.term').forEach(term => {
  const definition = term.dataset.definition;
  
  term.addEventListener('mouseenter', () => {
    const popup = document.createElement('div');
    popup.className = 'term-popup neon-teal';
    popup.innerText = definition;
    document.body.appendChild(popup);

    const rect = term.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top - 40}px`;
  });

  term.addEventListener('mouseleave', () => {
    const popup = document.querySelector('.term-popup');
    if (popup) popup.remove();
  });
});

// ------------------------------
// ACCORDION FOR COPING STRATEGIES
// ------------------------------
document.querySelectorAll('.accordion .card').forEach(card => {
  card.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');

    document.querySelectorAll('.accordion .card').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.content').style.maxHeight = null;
    });

    if (!isOpen) {
      card.classList.add('open');
      const content = card.querySelector('.content');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// ------------------------------
// HORIZONTAL SCROLL FOR HELP CARDS
// ------------------------------
const helpCards = document.querySelector('.help-cards');
if (helpCards) {
  let isDown = false;
  let startX;
  let scrollLeft;

  helpCards.addEventListener('mousedown', (e) => {
    isDown = true;
    helpCards.classList.add('active');
    startX = e.pageX - helpCards.offsetLeft;
    scrollLeft = helpCards.scrollLeft;
  });
  helpCards.addEventListener('mouseleave', () => { isDown = false; helpCards.classList.remove('active'); });
  helpCards.addEventListener('mouseup', () => { isDown = false; helpCards.classList.remove('active'); });
  helpCards.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - helpCards.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    helpCards.scrollLeft = scrollLeft - walk;
  });
}

// ------------------------------
// MINI STRESS QUIZ INTERACTION
// ------------------------------
document.querySelectorAll('.stress-quiz .option').forEach(option => {
  option.addEventListener('click', () => {
    const explanation = option.dataset.explanation;
    const result = option.parentElement.querySelector('.explanation');
    result.innerText = explanation;
    result.style.opacity = 1;
  });
});

// ------------------------------
// OPTIONAL: GSAP Scroll Animations
// ------------------------------
if (typeof gsap !== 'undefined') {
  // fade-in sections
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  });
}
