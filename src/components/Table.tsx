import { useState } from "react";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";

import { useSchedulerContext } from "../context/scheduler";
import { formatCPF, formatPhoneNumber } from "../functions";
import { PhoneNumber, Scheduler } from "../types/Scheduler";
import { useInputDataContext } from "../context/inputData";
import { PaginationActions } from "./PaginationActions";

function createData(
  name: string,
  email: string,
  date_born: string,
  cpf: string,
  qtyNumbersPhone: number,
  numbers: PhoneNumber[],
  id: number
) {
  return {
    name,
    email,
    date_born,
    cpf,
    qtyNumbersPhone,
    numbers,
    id,
  };
}

function Row(props: {
  row: ReturnType<typeof createData>;
  editScheduler(id: number): void;
  changeIdToDelete(id: number): void;
  changeOpenAlert(value: boolean): void;
}) {
  const { row, editScheduler, changeIdToDelete, changeOpenAlert } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">
          {format(new Date(row.date_born), "dd/MM/yyyy")}
        </TableCell>
        <TableCell align="left">{formatCPF(row.cpf)}</TableCell>
        <TableCell align="right">{row.qtyNumbersPhone}</TableCell>
        <TableCell align="right">
          <IconButton
            color="primary"
            component="label"
            onClick={() => editScheduler(row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              changeIdToDelete(row.id);
              changeOpenAlert(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Numeros
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Numero</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.numbers.map((phone) => (
                    <TableRow key={phone.id}>
                      <TableCell component="th" scope="row">
                        {formatPhoneNumber(phone.number)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export const TableScheduler = () => {
  const {
    schedulers,
    changeIdToDelete,
    changeOpenAlert,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useSchedulerContext();
  const { editScheduler } = useInputDataContext();

  const rows = schedulers.map((scheduler) =>
    createData(
      scheduler.name,
      scheduler.email,
      scheduler.date_born,
      scheduler.cpf,
      scheduler.numbers.length,
      scheduler.numbers,
      scheduler.id
    )
  );

  function getRowsForCurrentPage(rows: Scheduler[], page: number, rowsPerPage: number) {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return rows.slice(startIndex, endIndex);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Data de Nasc.</TableCell>
            <TableCell align="left">CPF</TableCell>
            <TableCell align="right">Qtd. de Telefones</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {getRowsForCurrentPage(rows, page, rowsPerPage).map((row, index) => (
            <Row
              key={index}
              row={row}
              editScheduler={editScheduler}
              changeIdToDelete={changeIdToDelete}
              changeOpenAlert={changeOpenAlert}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={7}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
