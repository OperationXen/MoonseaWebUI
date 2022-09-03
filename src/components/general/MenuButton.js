import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IconButton, Menu, MenuItem, Divider } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import userStore from "../../datastore/user";

export default function MenuButton(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [authenticated, dmID] = userStore((s) => [s.authenticated, s.dmUUID]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <React.Fragment>
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
          disabled={location.pathname.includes("/itemvault")}
          onClick={() => {
            navigate(`/itemvault/`);
            setMenuOpen(false);
          }}
        >
          Item Vault
        </MenuItem>
        <MenuItem
          disabled={location.pathname.includes("/tradingpost")}
          onClick={() => {
            navigate(`/tradingpost/`);
            setMenuOpen(false);
          }}
        >
          Trading Post
        </MenuItem>
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
    </React.Fragment>
  );
}
