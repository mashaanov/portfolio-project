gsap.registerPlugin(ScrollTrigger);

export default function gsapAnimation() {
  const text = "Frontend-developer";
  const typingTextElement = document.querySelector(".typing-text");
  let index = 0;

  function typeText() {
    if (index < text.length) {
      typingTextElement.textContent += text.charAt(index);
      index++;
      gsap.delayedCall(0.1, typeText);
    }
  }

  gsap.delayedCall(1, typeText);

  gsap.from(".home-content-description", {
    duration: 2,
    x: -40,
    opacity: 0,
    ease: "power1.out",
  });

  gsap.from(".home-content h1", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power2.out",
  });

  gsap.from(".home-content h3", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.from(".home-img", {
    duration: 2,
    x: 30,
    ease: "power1.out",
  });

  gsap.from(".projects-heading", {
    duration: 3,
    y: -40,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".projects-heading",
      start: "top 100%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".contact-heading", {
    duration: 3,
    y: -40,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".contact-heading",
      start: "top 100%",
      toggleActions: "play none none none",
    },
  });
}
