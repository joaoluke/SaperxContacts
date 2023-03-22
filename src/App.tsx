import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
  TableScheduler,
  ToolbarMenu,
  ModalContact,
  ModalDelete,
} from "./components";
import { useSchedulerContext } from "./context/scheduler";

function App() {
  const [count, setCount] = useState(0);

  const { getSchedulers, openModal, snackbar, handleCloseSnackbar, openAlert } =
    useSchedulerContext();

  useEffect(() => {
    getSchedulers();
  }, []);

  return (
    <div className="App">
      {openModal && <ModalContact />}
      {openAlert && <ModalDelete />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex" }}>
        <ToolbarMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            width: "100vw",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <Card sx={{ minWidth: 275 }}>
              <TableScheduler />
            </Card>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default App;
