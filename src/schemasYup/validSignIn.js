const yup = require("./yupConfig");

const validSignIn = yup.object().shape({
  email: yup.string().trim().email().required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(6)
    .required("Password is required and should have at least 6 characters"),
});

module.exports = validSignIn;
