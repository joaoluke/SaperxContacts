export interface PhoneNumber {
  id: number;
  id_schedule: number;
  number: number;
}

export interface Scheduler {
  id: number;
  name: string;
  numbers: PhoneNumber[];
  email: string;
  cpf: string;
  date_born: string;
}
