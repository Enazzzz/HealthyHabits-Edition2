// ==============================
// gsap-scroll.js
// ==============================

// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

// ------------------------------
// HERO STRESS METER PARALLAX
// ------------------------------
gsap.to("#stress-meter", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  width: "80%",
  boxShadow: "0 0 30px #1DE9B6"
});

// ------------------------------
// STRESS RESPONSE ANIMATION
// ------------------------------
gsap.utils.toArray(".stress-response .icon").forEach(icon => {
  gsap.from(icon, {
    scrollTrigger: {
      trigger: icon,
      start: "top 80%",
      end: "top 50%",
      scrub: true
    },
    y: 50,
    opacity: 0,
    duration: 1
  });
});

// ------------------------------
// POSITIVE VS NEGATIVE STRESS CARDS
// ------------------------------
gsap.utils.toArray(".stress-cards .card").forEach((card, i) => {
  const direction = i % 2 === 0 ? -100 : 100;
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
    },
    x: direction,
    rotation: direction / 10,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// ------------------------------
// HEALTH RISKS BARS ANIMATION
// ------------------------------
gsap.utils.toArray(".health-risk .bar").forEach(bar => {
  const targetHeight = bar.dataset.height; // in px or %
  gsap.fromTo(bar, { height: 0 }, {
    scrollTrigger: {
      trigger: bar,
      start: "top 80%",
      end: "top 50%",
      scrub: true
    },
    height: targetHeight,
    backgroundColor: "#FFAB40",
    boxShadow: "0 0 15px #FFAB40",
    duration: 1
  });
});

// ------------------------------
// PERCEPTION QUIZ HIGHLIGHT
// ------------------------------
gsap.utils.toArray(".stress-quiz .option").forEach(option => {
  gsap.from(option, {
    scrollTrigger: {
      trigger: option,
      start: "top 85%",
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power1.out"
  });
});

// ------------------------------
// BREATHING ANIMATION (INTERACTIVE)
// ------------------------------
const breathCircle = document.querySelector(".breathing-circle");
if (breathCircle) {
  const breathe = () => {
    gsap.to(breathCircle, {
      scale: 1.3,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  };
  breathe();
}
