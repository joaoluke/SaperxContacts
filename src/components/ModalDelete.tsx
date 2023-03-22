import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSchedulerContext } from "../context/scheduler";

export const ModalDelete = () => {
  const { schedulers, idSchedulerToDelete, changeOpenAlert, deleteScheduler } =
    useSchedulerContext();

  const contactToBeDeleted = schedulers.find(
    (scheduler) => scheduler.id === idSchedulerToDelete
  );

  if (!contactToBeDeleted) {
    return console.error("contactToBeDeleted error");
  }

  return (
    <Dialog open={true} onClose={() => changeOpenAlert(false)}>
      <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Voce está preste a excluir o contato do(a) {contactToBeDeleted.name},
          e os dados serão totalmente perdidos
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => changeOpenAlert(false)}>Cancelar</Button>
        <Button variant="contained" onClick={deleteScheduler} autoFocus>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
