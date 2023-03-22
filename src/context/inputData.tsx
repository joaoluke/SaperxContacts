import {
  createContext,
  useContext,
  ReactNode,
  useState,
  ChangeEvent,
} from "react";
import dayjs, { Dayjs } from "dayjs";

import {
  cpfMask,
  formatPhoneNumber,
  phoneMask,
  validateForm,
} from "../functions";
import { API } from "../services/api";
import { InputDataContextType } from "../types/InputDataContext";
import { useSchedulerContext } from "./scheduler";

type PropsInputDataProviders = {
  children: ReactNode;
};

const InputDataContext = createContext({} as InputDataContextType);

const InputDataContextProvider = ({ children }: PropsInputDataProviders) => {
  const { createScheduler, changeOpenModal, schedulers, updateScheduler } =
    useSchedulerContext();

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [mode, setMode] = useState("");
  const input = {
    name: "",
    email: "",
    cpf: "",
    date_born: null as Dayjs | null,
    phone: "",
    id: null as number | null,
  };
  const error = {
    name: "",
    email: "",
    cpf: "",
    date_born: "",
    phone: "",
  };
  const [inputValues, setInputValues] = useState(input);
  const [errors, setErrors] = useState(error);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === "cpf") {
      setInputValues((prevState) => ({ ...prevState, [id]: cpfMask(value) }));
    } else if (id === "phone") {
      setInputValues((prevState) => ({ ...prevState, [id]: phoneMask(value) }));
    } else {
      setInputValues((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setInputValues((prevState) => ({ ...prevState, date_born: date }));
  };

  const handleAddPhoneNumber = () => {
    if (inputValues.phone && inputValues.phone.length === 15) {
      setPhoneNumbers((prevNumbers) => [...prevNumbers, inputValues.phone]);
      setInputValues((prevState) => ({ ...prevState, phone: "" }));
    }
  };

  const handleRemovePhoneNumber = (index: number) => {
    setPhoneNumbers((prevNumbers) => prevNumbers.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const { isValid, errors } = validateForm(inputValues, phoneNumbers);

    setErrors(errors);
    console.log(isValid);
    if (isValid) {
      mode === "edit"
        ? updateScheduler(inputValues, phoneNumbers)
        : createScheduler(inputValues, phoneNumbers);
    }

    setMode("");
  };

  const closeModal = () => {
    setMode("");
    changeOpenModal(false);
    setInputValues(input);
    setPhoneNumbers([]);
    setErrors(error);
  };

  const openModalAdd = () => {
    setMode("");
    changeOpenModal(true);
    setInputValues(input);
    setPhoneNumbers([]);
    setErrors(error);
  }

  const editScheduler = (idScheduler: number) => {
    const currentScheduler = schedulers.find((item) => item.id === idScheduler);

    if (!currentScheduler) {
      console.error(`Nenhum agendador encontrado com o ID: ${idScheduler}`);
      return;
    }

    setMode("edit");

    changeOpenModal(true);
    console.log(currentScheduler);
    setPhoneNumbers(
      currentScheduler.numbers.map((number) => formatPhoneNumber(number.number))
    );
    setInputValues({
      name: currentScheduler.name,
      email: currentScheduler.email,
      cpf: cpfMask(currentScheduler.cpf),
      date_born: dayjs(currentScheduler.date_born),
      phone: "",
      id: currentScheduler.id,
    });
  };

  return (
    <InputDataContext.Provider
      value={{
        inputValues,
        handleInputChange,
        handleDateChange,
        handleAddPhoneNumber,
        handleRemovePhoneNumber,
        editScheduler,
        handleSubmit,
        errors,
        phoneNumbers,
        mode,
        closeModal,
        openModalAdd,
      }}
    >
      {children}
    </InputDataContext.Provider>
  );
};

export const useInputDataContext = () => {
  return useContext(InputDataContext);
};

export default InputDataContextProvider;
