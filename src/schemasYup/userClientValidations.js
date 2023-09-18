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

const validateName = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required and must be a valid string."),
});

const validatePassword = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(6, "Invalid password! Must be at least 6 characters.")
    .required(),
});

const validateCpf = yup.object().shape({
  cpf: yup
    .string()
    .trim()
    .length(11, "Invalid CPF! It should have 11 numeric digits.")
    .matches(/^\d+$/, "CPF should only contain numeric digits")
    .required(),
});

const validatePhone = yup.object().shape({
  phone: yup
    .string()
    .trim()
    .min(
      10,
      "Invalid phone number! Should include area code, no spaces and a valid number."
    )
    .matches(/^\d+$/, "Phone number should only contain numeric digits")
    .required(),
});

const validatePostal = yup.object().shape({
  postal: yup
    .string()
    .trim()
    .length(8, "Invalid Postal Code! Must have 8 digits.")
    .matches(/^\d+$/, "Postal Code should only contain numeric digits")
    .nullable()
    .notRequired(),
});

const validateState = yup.object().shape({
  state: yup
    .string()
    .trim()
    .length(2, "State code must have 2 letters.")
    .oneOf(
      [
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
      ],
      "Invalid state."
    )
    .required(),
});

module.exports = {
  validEmail,
  validateName,
  validatePassword,
  validateCpf,
  validatePhone,
  validatePostal,
  validateState,
};
