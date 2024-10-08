import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm';

const schema = yup.object().shape({
    fullName: yup.string().matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, 'Invalid fullName format').required('Full Name is required'),
    email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').required('Email is required'),
    phone: yup.string().matches(/^\+\d{1,3}\s\d{4}\s\d{2}\s\d{2}\s\d{2}$/, 'Invalid phone format. The format should be: +X (XXX) XXX-XX-XX').required('Phone is required'),
    subject: yup.string().matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/).required('Subject is required'),
    message: yup.string().matches(/^[a-zA-Zа-яА-ЯёЁ\s-]$/),
})

export default (formData) => {
    return schema.validate(formData, { abortEarly: false });
};