export default class View {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.successMessage = document.getElementById("successMessage");

    this.errorMessages = {
      fullName: document.getElementById("fullNameError"),
      email: document.getElementById("emailError"),
      phone: document.getElementById("phoneError"),
      subject: document.getElementById("subjectError"),
      message: document.getElementById("messageError"),
    };

    this.addInputListeners();
  }

  addInputListeners() {
    const inputFields = ["fullName", "email", "phone", "subject", "message"];

    inputFields.forEach((field) => {
      const inputField = this.form.querySelector(`[name="${field}"]`);
      if (inputField) {
        inputField.addEventListener("input", () => this.handleInput(field));
      }
    });
  }

  handleInput(field) {
    const inputField = this.form.querySelector(`[name="${field}"]`);
    if (inputField && inputField.classList.contains("is-invalid")) {
      inputField.classList.remove("is-invalid");
      const errorElement = this.errorMessages[field];
      if (errorElement) {
        errorElement.textContent = "";
      }
    }
  }

  resetForm() {
    this.form.reset();
    if (this.successMessage) {
      this.successMessage.style.display = "none";
    }

    Object.keys(this.errorMessages).forEach((key) => {
      const inputField = this.form.querySelector(
        `[name="${key.toLowerCase()}"]`
      );
      if (inputField) {
        inputField.classList.remove("is-invalid");
      }
    });
  }

  showSuccessMessage() {
    if (this.successMessage) {
      this.successMessage.textContent = "Successfully sent!";
      this.successMessage.style.display = "block";
    }

    Object.keys(this.errorMessages).forEach((key) => {
      const inputField = this.form.querySelector(
        `[name="${key.toLowerCase()}"]`
      );
      if (inputField) {
        inputField.classList.remove("is-invalid");
      }
    });
  }

  extractKeyFromError(err) {
    const keyPattern = /(Full Name|Email|Phone|Subject|Message)/;
    const match = err.match(keyPattern);
    return match ? match[0] : null;
  }

  showErrorMessage(errors) {
    Object.values(this.errorMessages).forEach((el) => (el.textContent = ""));

    const errorMapping = {
      "Full Name": (err) => {
        this.errorMessages.fullName.textContent = err;
        const inputField = this.form.querySelector('[name="fullName"]');
        if (inputField) {
          inputField.classList.add("is-invalid");
        }
      },
      Email: (err) => {
        this.errorMessages.email.textContent = err;
        const inputField = this.form.querySelector('[name="email"]');
        if (inputField) {
          inputField.classList.add("is-invalid");
        }
      },
      Phone: (err) => {
        this.errorMessages.phone.textContent = err;
        const inputField = this.form.querySelector('[name="phone"]');
        if (inputField) {
          inputField.classList.add("is-invalid");
        }
      },
      Subject: (err) => {
        this.errorMessages.subject.textContent = err;
        const inputField = this.form.querySelector('[name="subject"]');
        if (inputField) {
          inputField.classList.add("is-invalid");
        }
      },
      Message: (err) => {
        this.errorMessages.message.textContent = err;
        const inputField = this.form.querySelector('[name="message"]');
        if (inputField) {
          inputField.classList.add("is-invalid");
        }
      },
    };

    errors.forEach((err) => {
      const key = this.extractKeyFromError(err);
      if (key && errorMapping[key]) {
        errorMapping[key](err);
      }
    });
  }

  openMenu(modal, closeIcon, menuIcon) {
    if (!modal.classList.contains("active")) {
      menuIcon.classList.remove("active");
      menuIcon.classList.add("inactive");

      modal.classList.add("active");
      closeIcon.classList.add("active");
    
      gsap.fromTo(
        modal,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }
  
  closeMenu(modal, closeIcon, menuIcon) {
    if (modal.classList.contains("active")) {
      closeIcon.classList.remove("active");
      modal.classList.remove("active");
      menuIcon.classList.add("active");
  
      gsap.to(modal, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          modal.classList.remove("active");
        },
      });
  
      menuIcon.classList.remove("inactive");
      menuIcon.classList.add("active");
    }
  }
}
