import gsapAnimation from "./js-gsap.js";
import validate from "./validation.js";

document.addEventListener("DOMContentLoaded", () => {
  gsapAnimation();
  emailjs.init("MvRAODkHqNCcghXiU");
});

const validateAndSentForm = async (formData) => {
  try {
    await validate(formData);

    await emailjs.sendForm(
      "service_9wg442l",
      "template_z668k4e",
      document.getElementById("contact-form")
    );
    alert("Successfully sent!");
    document.getElementById("contact-form").reset();
  } catch (error) {
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    if (error.name === "ValidationError") {
      error.errors.forEach((err) => {
        if (
          err === "Full Name is required" ||
          err.startsWith("Invalid full name")
        ) {
          const errorMessage = document.getElementById("fullNameError");
          errorMessage.textContent = err;
        } else if (
          err === "Email is required" ||
          err.startsWith("Invalid email")
        ) {
          const errorMessage = document.getElementById("emailError");
          errorMessage.textContent = err;
        } else if (
          err === "Phone is required" ||
          err.startsWith("Invalid phone")
        ) {
          const errorMessage = document.getElementById("phoneError");
          errorMessage.textContent = err;
        } else if (
          err === "Subject is required" ||
          err.startsWith("Invalid subject")
        ) {
          const errorMessage = document.getElementById("subjectError");
          errorMessage.textContent = err;
        } else if (
          err === "Message is required" ||
          err.startsWith("Invalid message")
        ) {
          const errorMessage = document.getElementById("messageError");
          errorMessage.textContent = err;
        }
      });
    } else {
      alert("Error during form submission: " + JSON.stringify(error));
    }
  }
};

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const phone = this.querySelector('input[type="tel"]').value.trim();
    const subject = this.querySelector(
      'input[type="text"][placeholder="Subject"]'
    ).value.trim();
    const message = this.querySelector("textarea").value.trim();

    const formData = {
      fullName,
      email,
      phone,
      subject,
      message,
    };

    validateAndSentForm(formData);
  });
