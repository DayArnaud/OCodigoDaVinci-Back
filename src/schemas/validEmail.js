const yup = require("./yupConfig");

const validEmail = yup.object().shape({
  email: yup
    .string()
    .trim()
    .min(8, "Email must have at least 8 characters")
    .matches(/@/, "Email must include @ symbol")
    .email("Email must be valid")
    .required("Email is mandatory"),
});

module.exports = validEmail;
