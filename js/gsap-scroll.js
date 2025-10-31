// ==============================
// gsap-scroll.js - Scroll-Triggered Animations
// ==============================
// This file contains ALL GSAP animations that are triggered by scrolling.
// ScrollTrigger parameters explained:
// - trigger: the element that starts the animation when it enters viewport
// - start: when animation starts (e.g., "top 85%" = when top of element hits 85% from viewport top)
// - end: when animation ends (for scrub animations only)
// - scrub: true creates smooth scroll-linked animation, false = one-time animation
// - ease: animation easing function ("power2.out" = smooth deceleration)

// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

// ------------------------------
// HERO STRESS METER + PARALLAX
// ------------------------------
// Animates the stress meter bar from 0% to 80% width as user scrolls through hero section
// Uses scrub for smooth scroll-linked animation with ease-out timing
gsap.to("#stress-meter .stress-meter-bar", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  width: "80%",
  boxShadow: "0 0 30px #1DE9B6",
  ease: "power1.out"
});

// Hero text fade-in and slight parallax
gsap.from("#hero h1, #hero h2", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#hero",
    start: "top 90%"
  }
});

// ------------------------------
// STRESS RESPONSE ICONS
// ------------------------------
gsap.utils.toArray(".stress-response .icon").forEach(icon => {
  gsap.from(icon, {
    scrollTrigger: {
      trigger: icon,
      start: "top 85%",
      end: "top 60%",
      scrub: true
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// Hover effect for icons (subtle scale + glow)
document.querySelectorAll(".stress-response .icon").forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, { scale: 1.2, boxShadow: "0 0 20px #1DE9B6", duration: 0.3 });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, { scale: 1, boxShadow: "0 0 0px #000", duration: 0.3 });
  });
});

// ------------------------------
// POSITIVE VS NEGATIVE STRESS CARDS
// ------------------------------
gsap.utils.toArray(".stress-cards .card").forEach((card, i) => {
  const direction = i % 2 === 0 ? -150 : 150;
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    x: direction,
    rotation: direction / 12,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// ------------------------------
// HEALTH RISKS BARS
// ------------------------------
gsap.utils.toArray(".health-risk .bar").forEach(bar => {
  const targetHeight = bar.dataset.height;
  gsap.fromTo(bar, { height: 0 }, {
    height: targetHeight,
    backgroundColor: "#FFAB40",
    boxShadow: "0 0 20px #FFAB40",
    scrollTrigger: {
      trigger: bar,
      start: "top 80%",
      end: "top 60%",
      scrub: true
    }
  });
});

// ------------------------------
// PERCEPTION QUIZ OPTIONS
// ------------------------------
gsap.utils.toArray(".stress-quiz .option").forEach(option => {
  gsap.from(option, {
    scrollTrigger: {
      trigger: option,
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power1.out"
  });
});

// ------------------------------
// BREATHING ANIMATION
// ------------------------------
const breathCircle = document.querySelector(".breathing-circle");
if (breathCircle) {
  gsap.to(breathCircle, {
    scale: 1.5,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });
}

// ------------------------------
// CITATIONS FADE-IN
// ------------------------------
gsap.utils.toArray(".citations ul li").forEach((li, i) => {
  gsap.from(li, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: li,
      start: "top 90%"
    }
  });
});
