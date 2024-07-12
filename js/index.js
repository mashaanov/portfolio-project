document.addEventListener("DOMContentLoaded", () => {
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
  });
  
  document.addEventListener('DOMContentLoaded', () => {
      gsap.from(".home-content-description", { 
              duration: 2, 
              x: -40, 
              opacity: 0, 
              ease: "power1.out", 
          });
  
      gsap.from(".home-content h1", { 
              duration: 1, 
              y: -50, opacity: 0, 
              ease: "power2.out" 
          });
  
      gsap.from(".home-content h3", { 
              duration: 1, y: 50, 
              opacity: 0, 
              ease: "power2.out", 
              delay: 0.5 
          });
  
      gsap.to(".text-animation", {
              duration: 3, 
              text: {
              value: "Frontend-developer", 
              },
              ease: "power2.inOut",
              delay: 1,
          });
      gsap.from(".home-img", {
              duration: 2,
              x: 30,
              ease: "power1.out", 
          });
        });
  
  
  