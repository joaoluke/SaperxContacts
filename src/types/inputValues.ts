import { Dayjs } from "dayjs";

export interface InputValues {
  name: string;
  email: string;
  cpf: string;
  date_born: Dayjs | null;
  phone: string;
  id: number | null;
}
