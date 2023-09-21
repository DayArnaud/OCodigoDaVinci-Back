const yup = require("./yupConfig");

const validSignIn = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email()
    .required(
      "Email é uma campo obrigatório e deve estar em um formato válido"
    ),
  password: yup
    .string()
    .trim()
    .min(6)
    .required("Senha é obrigatória e deve ter ao menos 6 caracteres"),
});

module.exports = validSignIn;
