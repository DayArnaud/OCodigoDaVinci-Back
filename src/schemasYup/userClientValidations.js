const yup = require("./yupConfig");

const validEmail = yup.object().shape({
  email: yup
    .string()
    .trim()
    .min(8, "O email deve ter pelo menos 8 caracteres")
    .matches(/@/, "O email deve conter o símbolo @")
    .email("O email deve ser válido")
    .required("O email é obrigatório"),
});

const validateName = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("O nome é obrigatório e deve conter somente letras."),
});

const validatePassword = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(6, "Senha inválida! Deve ter pelo menos 6 caracteres.")
    .required(),
});

const validateCpf = yup.object().shape({
  cpf: yup
    .string()
    .trim()
    .length(11, "CPF inválido! Deve conter 11 números")
    .matches(/^\d+$/, "O CPF deve conter apenas números")
    .required(),
});

const validatePhone = yup.object().shape({
  phone: yup
    .string()
    .trim()
    .min(
      10,
      "Número de telefone inválido! Deve incluir o código de área, sem espaços, e um número válido."
    )
    .matches(/^\d+$/, "O número de telefone deve conter apenas números")
    .required(),
});

const validateState = yup.object().shape({
  state: yup
    .string()
    .trim()
    .oneOf([
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RR",
      "RO",
      "RJ",
      "RN",
      "RS",
      "SC",
      "SP",
      "SE",
      "TO",
      "",
    ]),
});

module.exports = {
  validEmail,
  validateName,
  validatePassword,
  validateCpf,
  validatePhone,
  validateState,
};
