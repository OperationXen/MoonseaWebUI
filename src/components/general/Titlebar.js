import { useNavigate } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Button, IconButton, Tooltip } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export default function Titlebar() {
  const navigate = useNavigate();

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
          <Box marginRight={"1em"}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Dashboard
            </Button>
            <Tooltip title="Not yet implemented">
              <Button
                disabled
                color="inherit"
                onClick={() => navigate("/tradingpost")}
              >
                Trading Post
              </Button>
            </Tooltip>
            <Tooltip title="Not yet implemented">
              <Button
                disabled
                color="inherit"
                onClick={() => navigate("/itemvault")}
              >
                Item Vault
              </Button>
            </Tooltip>
            <Button color="inherit" onClick={() => navigate("/dungeonmaster")}>
              DM Records
            </Button>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
