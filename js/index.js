import Model from "./model.js";
import View from "./view.js";
import gsapAnimation from "./js-gsap.js";
import { maskList } from "./mask-list.js";

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();

    this.initialize();
    this.handleToggleNavbar()
  }

  initialize() {
    document.addEventListener("DOMContentLoaded", () => {
      gsapAnimation();
      emailjs.init("MvRAODkHqNCcghXiU");

      const phoneInput = this.view.form.querySelector('[name="phone"]');
      if (phoneInput) {
        this.mask('[name="phone"]');
      }

      this.view.form.addEventListener("submit", (e) => {
        this.handleSubmit(e);
      });
    });
  }

  mask = (selector) => {
    const setMask = (event) => {
      let matrix = "+###############";
      let phone = event.target.value.replace(/[\s#-)(]/g, "");
      maskList.forEach((item) => {
        let code = item.code.replace(/[\s#]/g, "");
        if (phone.startsWith(code)) {
          matrix = item.code;
        }
      });

      let i = 0;
      let val = event.target.value.replace(/\D/g, "");
      event.target.value = matrix.replace(/(?!\+)./g, function (a) {
        return /[#\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });
    };

    let inputs = document.querySelectorAll(selector);

    inputs.forEach((input) => {
      if (!input.value) input.value = "+";
      input.addEventListener("input", setMask);
      input.addEventListener("focus", setMask);
      input.addEventListener("blur", setMask);
    });
  };

  async handleSubmit(e) {
    e.preventDefault();

    const formElement = this.view.form;

    try {
      const formData = this.getFormData();
      const { valid, errors } = await this.model.isValidate(formData);

      if (valid) {
        await this.model.sendForm(formElement);
        this.model.state.form.process.state = "success";
        this.view.showSuccessMessage();
        this.view.resetForm();
      } else {
        this.model.state.form.process.state = "failed";
        this.view.showErrorMessage(errors);
      }
    } catch (error) {
      console.log("Error during form submission:", error);
    }
  }

  getFormData() {
    const fullName = this.view.form
      .querySelector('input[type="text"]')
      .value.trim();
    const email = this.view.form
      .querySelector('input[type="email"]')
      .value.trim();
    const phone = this.view.form
      .querySelector('input[type="tel"]')
      .value.trim();
    const subject = this.view.form
      .querySelector('input[type="text"][placeholder="Subject"]')
      .value.trim();
    const message = this.view.form.querySelector("textarea").value.trim();

    return { fullName, email, phone, subject, message };
  }

  handleToggleNavbar() {
    const btnOpen = document.getElementById('menu-icon');
    const btnClose = document.getElementById('close-menu-icon');
    const modal = document.getElementById('navbar');
  
    if (!btnOpen || !btnClose || !modal) {
      console.error("Элементы меню не найдены в DOM!");
      return; // Если элементы не найдены, прекращаем выполнение
    }
  
    btnOpen.addEventListener('click', () => {
      console.log("Открытие меню"); // Лог для отладки
      this.view.openMenu(modal, btnClose, btnOpen);
    });
  
    btnClose.addEventListener('click', () => {
      console.log("Закрытие меню"); // Лог для отладки
      this.view.closeMenu(modal, btnClose, btnOpen);
    });
  }
}

new Controller();
