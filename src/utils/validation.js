const validateName = async (name) => {
  if (!name || typeof name !== "string" || !name.trim()) {
    throw new Error("Name is required and must be a valid string.");
  }
};

const validatePassword = async (password) => {
  if (
    typeof password !== "string" ||
    !password.trim() ||
    password.trim().length < 6
  ) {
    throw new Error("Invalid password! Must be at least 6 characters.");
  }
};

const validateCPF = async (cpf) => {
  if (typeof cpf !== "string" || cpf.trim().length !== 11 || isNaN(cpf)) {
    throw new Error("Invalid CPF! It should have 11 numeric digits.");
  }
};

const validatePhone = async (phone) => {
  if (typeof phone !== "string" || phone.trim().length < 10 || isNaN(phone)) {
    throw new Error(
      "Invalid phone number! Should include area code and a valid number."
    );
  }
};

const validatePostal = async (postalCode) => {
  if (
    typeof postalCode !== "string" ||
    postalCode.trim().length !== 8 ||
    isNaN(postalCode)
  ) {
    throw new Error("Invalid Postal Code! Must have 8 digits.");
  }
};

const validateState = async (state) => {
  const validStates = [
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
  ];

  if (
    typeof state !== "string" ||
    state.trim().length !== 2 ||
    !validStates.includes(state.toUpperCase())
  ) {
    throw new Error("Invalid state.");
  }
};

module.exports = {
  validateName,
  validatePassword,
  validateCPF,
  validatePhone,
  validatePostal,
  validateState,
};
