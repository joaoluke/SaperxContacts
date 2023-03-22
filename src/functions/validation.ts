import { InputValues } from "../types/inputValues";

export const validateForm = (
  inputValues: InputValues,
  phoneNumbers: string[]
) => {
  let isValid = true;
  let errors = { name: "", email: "", cpf: "", date_born: "", phone: "" };

  if (inputValues.name.trim() === "") {
    isValid = false;
    errors.name = "Nome é obrigatório.";
  }

  if (inputValues.cpf.trim() === "") {
    isValid = false;
    errors.cpf = "CPF é obrigatório.";
  }

  if (!inputValues.date_born) {
    isValid = false;
    errors.date_born = "Data de Nascimento é obrigatória";
  }

  if (inputValues.email.trim() === "") {
    isValid = false;
    errors.email = "E-mail é obrigatório.";
  } else {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(inputValues.email)) {
      isValid = false;
      errors.email = "E-mail inválido.";
    }
  }

  if (!phoneNumbers.length) {
    isValid = false;
    errors.phone = "Ao menos um telefone deve ser adicionado";
  }

  return { isValid, errors };
};
