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
});

(function() {
  emailjs.init("MvRAODkHqNCcghXiU");
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const phone = this.querySelector('input[type="tel"]').value.trim();
  const subject = this.querySelector('input[type="text"][placeholder="Subject"]').value.trim();
  const message = this.querySelector('textarea').value.trim();

  if (!fullName || !phone || !email || !subject || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  emailjs.sendForm("service_9wg442l", "template_z668k4e", this).then(
    function () {
      alert("Сообщение успешно отправлено!");
      document.getElementById("contact-form").reset();
    },
    function (error) {
      alert("Ошибка: " + JSON.stringify(error));
    }
  );
});
