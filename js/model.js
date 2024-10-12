import validation from "./validation.js";

const initialState = {
  form: {
    errors: null,
    valid: false,
    process: {
      state: "idle",
      errors: null,
    },
  },
};

export default class Model {
  constructor() {
    this.state = { ...initialState };
  }

  async isValidate(formData) {
    try {
      await validation(formData);
      this.state.form.valid = true;
      this.state.form.errors = null;
      return { valid: this.state.form.valid, errors: this.state.form.errors };
    } catch (e) {
      console.error("Validation errors:", e);
      this.state.form.valid = false;
      this.state.form.errors = e.errors;
      return { valid: this.state.form.valid, errors: this.state.form.errors };
    }
  }

  async sendForm(formData) {
    try {
      const response = await emailjs.sendForm(
        "service_9wg442l",
        "template_z668k4e",
        formData
      );

      if (response.status === 200) {
        this.state.form.process.state = "success";
        console.log("Form sent successfully!");

        emailjs.send('service_9wg442l', 'template_qvpqyqt', formData)
        .then(() => {
          console.log('Email sent successfully');
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
        });
      } else {
        this.state.form.process.state = "failed";
        this.state.form.process.error =
          response.text || "Unknown error occurred";
        console.error(
          "Error during form submission:",
          this.state.form.process.error
        );
      }
    } catch (e) {
      this.state.form.process.state = "failed";
      this.state.form.process.error = e.message || "An unknown error occurred";
      console.error("Error during form submission:", e);
    }
  }
}