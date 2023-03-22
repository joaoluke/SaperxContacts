import { ChangeEvent } from "react";
import { Dayjs } from "dayjs";

import { InputValues } from "./inputValues";

interface Errors {
  name: string;
  email: string;
  cpf: string;
  date_born: string;
  phone: string;
}

export interface InputDataContextType {
  inputValues: InputValues;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Dayjs | null) => void;
  handleAddPhoneNumber: () => void;
  handleRemovePhoneNumber: (index: number) => void;
  handleSubmit: () => void;
  errors: Errors;
  phoneNumbers: string[];
  editScheduler: (id: number) => void;
  mode: string;
  closeModal: () => void;
  openModalAdd: () => void;
}
