import React, { useState } from "react";

import { Avatar, Menu, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";

import { doLogout } from "@/api/user";
import userStore from "@/datastore/user";
import ProfileWindow from "./ProfileWindow";

export default function ProfileWidget() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const { username } = userStore.getState();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event: React.MouseEvent) => {
    setAnchorEl(null);
    event.stopPropagation();
  };
  const logout = () => {
    doLogout();
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
      {username[0]?.toUpperCase() || "?"}
      <Menu id="profile-menu" anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={() => setProfileOpen(true)}>Profile Management</MenuItem>
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </Menu>
      <ProfileWindow open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Avatar>
  );
}
