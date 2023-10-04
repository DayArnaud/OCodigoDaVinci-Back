const yup = require("./yupConfig");

const validSignUp = yup.object().shape({
  name: yup.string().trim().required("Nome é um campo obrigatório"),
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

module.exports = validSignUp;
