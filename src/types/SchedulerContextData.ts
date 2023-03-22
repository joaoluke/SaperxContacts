import { SyntheticEvent, MouseEvent, ChangeEvent } from "react";

import { InputValues } from "./inputValues";
import { Scheduler } from "./Scheduler";

interface SnackbarProps {
  severity: "error" | "success";
  open: boolean;
  message: string;
}

export interface SchedulerContextData {
  getSchedulers(): void;
  changeOpenModal(value: boolean): void;
  schedulers: Scheduler[];
  openModal: boolean;
  snackbar: SnackbarProps;
  createScheduler(inputData: InputValues, phonesNumbers: string[]): void;
  updateScheduler(inputData: InputValues, phonesNumbers: string[]): void;
  deleteScheduler(): void;
  handleCloseSnackbar(event?: SyntheticEvent | Event, reason?: string): void;
  changeIdToDelete(id: number): void;
  openAlert: boolean;
  changeOpenAlert(value: boolean): void;
  idSchedulerToDelete: number | null;
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
