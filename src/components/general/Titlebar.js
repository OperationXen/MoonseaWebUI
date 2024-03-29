import { useNavigate, useLocation } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import ProfileWidget from "../user/ProfileWidget";
import MenuButton from "./MenuButton";
import AuthButton from "../user/AuthButton";
import userStore from "../../datastore/user";

export default function Titlebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const smallMode = useMediaQuery(theme.breakpoints.down("md"));

  const [authenticated, dmID] = userStore((s) => [s.authenticated, s.dmUUID]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <MenuButton />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Moonsea Codex
          </Typography>
          <Box
            sx={{
              width: "32em",
              display: smallMode ? "none" : "flex",
              justifyContent: "center",
            }}
          >
            <Button
              color="inherit"
              disabled={!authenticated || location.pathname === "/"}
              onClick={() => navigate("/")}
            >
              Dashboard
            </Button>
            <Button
              disabled={
                !authenticated || location.pathname.includes("/tradingpost/")
              }
              color="inherit"
              onClick={() => navigate("/tradingpost/")}
            >
              Trading Post
            </Button>
            <Button
              disabled={
                !authenticated || location.pathname.includes("/itemvault/")
              }
              color="inherit"
              onClick={() => navigate("/itemvault/")}
            >
              Item Vault
            </Button>
            <Button
              disabled={!dmID || location.pathname.includes("/dungeonmaster")}
              color="inherit"
              onClick={() => navigate(`/dungeonmaster/${dmID}`)}
            >
              DM Records
            </Button>
          </Box>
          <Box sx={{ width: "6em", display: "flex", justifyContent: "center" }}>
            {(authenticated && <ProfileWidget />) || <AuthButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
