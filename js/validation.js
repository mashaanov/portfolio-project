import * as yup from "https://cdn.jsdelivr.net/npm/yup@1/+esm";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Full Name format is invalid")
    .required("Full Name is required"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is invalid"
    )
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^[+\d\s]+$/,
      "Phone format is invalid"
    )
    .required("Phone is required"),
  subject: yup
    .string()
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s-]*$/, "Subject format is invalid")
    .required("Subject is required"),
  message: yup
    .string()
    .required(false)
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s-?!:)(')]*$/, "Message format is invalid"),
});

export default (formData) => {
  return schema.validate(formData, { abortEarly: false });
};
