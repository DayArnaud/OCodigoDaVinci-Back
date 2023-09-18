const yup = require("./yupConfig");

const validSignUp = yup.object().shape({
  name: yup.string().trim().required("Name is mandatory"),
  email: yup
    .string()
    .trim()
    .email()
    .required("Email is mandatory and must be valid"),
  password: yup
    .string()
    .trim()
    .min(6)
    .required("Password is mandatory and must be at least 6 characters"),
});

module.exports = validSignUp;
