const yup = require("./yupConfig");

const validEmail = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Email must be valid")
    .required("Email is mandatory"),
});

module.exports = validEmail;
