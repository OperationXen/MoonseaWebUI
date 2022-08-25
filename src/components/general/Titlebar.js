import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography, Divider } from "@mui/material";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import ProfileWidget from "../user/ProfileWidget";
import AuthButton from "../user/AuthButton";
import userStore from "../../datastore/user";

export default function Titlebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const smallMode = useMediaQuery(theme.breakpoints.down("md"));

  const [authenticated, dmID] = userStore((s) => [s.authenticated, s.dmUUID]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <IconButton
            disabled={!authenticated}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(e) => {
              setMenuOpen(true);
              setAnchorEl(e.currentTarget);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          >
            <MenuItem
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Dashboard
            </MenuItem>
            <Divider />
            <MenuItem
              disabled={!dmID || location.pathname.includes("/dungeonmaster")}
              onClick={() => {
                navigate(`/dungeonmaster/${dmID}`);
                setMenuOpen(false);
              }}
            >
              DM Records
            </MenuItem>
          </Menu>
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

            <Tooltip title="In development" placement="bottom">
              <Button
                disabled={
                  !authenticated || location.pathname.includes("/tradingpost/")
                }
                color="inherit"
                onClick={() => navigate("/tradingpost/")}
              >
                Trading Post
              </Button>
            </Tooltip>
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
