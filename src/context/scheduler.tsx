import { createContext, useContext, ReactNode, useState } from "react";
import { removePhoneMask } from "../functions";

import { API } from "../services/api";
import { InputValues } from "../types/inputValues";
import { Scheduler } from "../types/Scheduler";
import { SchedulerContextData } from "../types/SchedulerContextData";

type PropsSchedulerProviders = {
  children: ReactNode;
};

const SchedulerContext = createContext({} as SchedulerContextData);

const SchedulerContextProvider = ({ children }: PropsSchedulerProviders) => {
  const [schedulers, setScheduler] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [idSchedulerToDelete, setIdSchedulerToDelete] = useState<number | null>(
    null
  );

  const snackbarInitial = {
    severity: "error",
    open: false,
    message: "",
  };
  const [snackbar, setSnackbar] = useState(snackbarInitial);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(snackbarInitial);
  };

  const changeIdToDelete = (id: number) => {
    setIdSchedulerToDelete(id);
  };

  const changeOpenModal = (value: boolean) => {
    setOpenModal(value);
  };

  const changeOpenAlert = (value: boolean) => {
    setOpenAlert(value);
  };

  const getSchedulers = async (): Promise<Scheduler[]> => {
    try {
      const response = await API.get("schedule");
      setScheduler(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const createScheduler = async (
    inputData: InputValues,
    phonesNumbers: string[]
  ) => {
    const cleanNumbers = removePhoneMask(phonesNumbers);

    const payload = {
      name: inputData.name,
      numbers: cleanNumbers,
      email: inputData.email,
      cpf: inputData.cpf.replace(/\D+/g, ""),
      date_born: inputData.date_born?.toISOString().split("T")[0],
    };

    try {
      await API.post("schedule", payload);
      setSnackbar({
        severity: "success",
        open: true,
        message: "Contato salvo com sucesso!",
      });
      getSchedulers();
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      changeOpenModal(false);
    }
  };

  const updateScheduler = async (
    inputData: InputValues,
    phonesNumbers: string[]
  ) => {
    const cleanNumbers = removePhoneMask(phonesNumbers);

    const payload = {
      name: inputData.name,
      numbers: cleanNumbers,
      email: inputData.email,
      cpf: inputData.cpf.replace(/\D+/g, ""),
      date_born: inputData.date_born?.toISOString().split("T")[0],
    };

    try {
      await API.put(`schedule/${inputData.id}`, payload);
      setSnackbar({
        severity: "success",
        open: true,
        message: "Contato editado com sucesso!",
      });
      getSchedulers();
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      changeOpenModal(false);
    }
  };

  const deleteScheduler = async () => {
    try {
      await API.delete(`schedule/${idSchedulerToDelete}`);
      setSnackbar({
        severity: "success",
        open: true,
        message: "Contato excluido com sucesso!",
      });
      setScheduler(
        schedulers.filter((scheduler) => scheduler.id !== idSchedulerToDelete)
      );
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      changeOpenAlert(false);
      setIdSchedulerToDelete(null);
    }
  };

  return (
    <SchedulerContext.Provider
      value={{
        getSchedulers,
        changeOpenModal,
        schedulers,
        openModal,
        createScheduler,
        openAlert,
        changeOpenAlert,
        deleteScheduler,
        snackbar,
        updateScheduler,
        handleCloseSnackbar,
        changeIdToDelete,
        idSchedulerToDelete,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};

export const useSchedulerContext = () => {
  return useContext(SchedulerContext);
};

export default SchedulerContextProvider;
