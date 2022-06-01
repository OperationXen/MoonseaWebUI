import { useNavigate } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Button, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import AuthButton from "../user/AuthButton";
import userStore from "../../datastore/user";

export default function Titlebar() {
  const navigate = useNavigate();
  const { dmID } = userStore.getState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100vw" }}>
        <Toolbar variant="dense">
          <IconButton
            disabled
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Moonsea Codex
          </Typography>
          <Box marginRight={"3em"}>
            <Button
              disabled
              color="inherit"
              onClick={() => navigate("/tradingpost")}
            >
              Trading Post
            </Button>
            <Button
              disabled
              color="inherit"
              onClick={() => navigate("/itemvault")}
            >
              Item Vault
            </Button>
            <Button
              disabled={!dmID}
              color="inherit"
              onClick={() => navigate(`/dungeonmaster/${dmID}`)}
            >
              DM Records
            </Button>
          </Box>
          <AuthButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
