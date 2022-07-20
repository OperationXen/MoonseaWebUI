import { useState } from "react";

import { Avatar, Menu, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";

import userStore from "../../datastore/user";

export default function ProfileWidget() {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const { username } = userStore.getState();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  return (
    <Avatar
      sx={{
        color: "white",
        bgcolor: blue[800],
        boxShadow: "0px 0px 4px",
        "&:hover": { boxShadow: "0px 0px 6px" },
      }}
      onClick={handleMenuOpen}
    >
      {username[0].toUpperCase() || "?"}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>Profile Management</MenuItem>
        <MenuItem>Log Out</MenuItem>
      </Menu>
    </Avatar>
  );
}
