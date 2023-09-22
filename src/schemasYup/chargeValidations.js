const yup = require("yup");

const validateCharge = yup.object().shape({
  value: yup
    .number()
    .integer("O valor deve ser um número inteiro.")
    .required("Por favor, insira um valor numérico válido para a cobrança.")
    .min(1, "O valor deve ser positivo.")
    .typeError("O valor deve ser um número inteiro válido."),

  due_date: yup
    .string()
    .required(
      "Por favor, insira uma data válida para o vencimento da cobrança."
    )
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/,
      "A data deve estar no formato DD/MM/AAAA"
    )
    .test("is-future", "A data deve ser de hoje ou futura", function (value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [day, month, year] = value.split("/");
      const inputDate = new Date(year, month - 1, day);
      inputDate.setHours(0, 0, 0, 0);

      return inputDate >= today;
    }),

  description: yup
    .string()
    .trim()
    .required("Por favor, insira uma descrição válida para a cobrança."),
});

module.exports = {
  validateCharge,
};
