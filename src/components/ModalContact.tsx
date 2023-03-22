import { useState, ChangeEvent, ReactElement, cloneElement } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogTitle from "@mui/material/DialogTitle";

import { useSchedulerContext } from "../context/scheduler";
import { useInputDataContext } from "../context/inputData";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const ModalContact = () => {
  const { changeOpenModal } = useSchedulerContext();
  const {
    inputValues,
    handleInputChange,
    handleDateChange,
    handleAddPhoneNumber,
    handleRemovePhoneNumber,
    errors,
    phoneNumbers,
    handleSubmit,
    mode,
    closeModal,
  } = useInputDataContext();

  const [dense, setDense] = useState(false);

  return (
    <Dialog open={true}>
      <DialogTitle>Cadastrar Contato</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="name"
              label="Nome completo"
              type="text"
              fullWidth
              variant="outlined"
              error={Boolean(errors.name)}
              helperText={errors.name}
              onChange={handleInputChange}
              value={inputValues.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="email"
              label="E-mail"
              type="email"
              fullWidth
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleInputChange}
              value={inputValues.email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              id="cpf"
              label="CPF"
              type="tel"
              fullWidth
              variant="outlined"
              error={Boolean(errors.cpf)}
              helperText={errors.cpf}
              onChange={handleInputChange}
              value={inputValues.cpf}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Data de Nascimento"
              sx={{ width: "100%" }}
              value={inputValues.date_born}
              onChange={handleDateChange}
              componentsProps={{
                textField: {
                  id: "date_born",
                  error: Boolean(errors.date_born),
                  helperText: errors.date_born,
                },
              }}
            />
          </Grid>
          <Grid item xs={9} sx={{ mt: 2 }}>
            <TextField
              autoFocus
              id="phone"
              label="Telefone"
              type="tel"
              fullWidth
              size="small"
              variant="outlined"
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              onChange={handleInputChange}
              value={inputValues.phone}
            />
          </Grid>
          <Grid item xs={3} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddPhoneNumber}
            >
              Adicionar
            </Button>
          </Grid>
          {phoneNumbers.length ? (
            <Grid item xs={12}>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Telefones
              </Typography>
              <Demo>
                <List dense={dense}>
                  {phoneNumbers.map((number, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemovePhoneNumber(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PhoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={number} />
                    </ListItem>
                  ))}
                </List>
              </Demo>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "edit" ? "Atualizar" : "Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
