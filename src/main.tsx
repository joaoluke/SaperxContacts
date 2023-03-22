import React from "react";
import ReactDOM from "react-dom/client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/br";

import App from "./App";

import ContextProvider from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="br">
    <ContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ContextProvider>
  </LocalizationProvider>
);
