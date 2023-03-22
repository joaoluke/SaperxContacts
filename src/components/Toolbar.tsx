import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useInputDataContext } from "../context/inputData";

export const ToolbarMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { openModalAdd } = useInputDataContext();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          AGENDA
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button sx={{ color: "#fff" }} onClick={openModalAdd}>
            Adicionar Contato
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
