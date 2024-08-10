import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { IconButton, Menu, MenuItem, Divider } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import userStore from "../../datastore/user";

export default function MenuButton(props) {
  const router = useRouter();
  const pathname = usePathname();

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
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setMenuOpen(false)}>
        <MenuItem
          onClick={() => {
            router.push("/");
            setMenuOpen(false);
          }}
        >
          Dashboard
        </MenuItem>
        <Divider />
        <MenuItem
          disabled={pathname.includes("/itemvault")}
          onClick={() => {
            router.push(`/itemvault/`);
            setMenuOpen(false);
          }}
        >
          Item Vault
        </MenuItem>
        <MenuItem
          disabled={pathname.includes("/tradingpost")}
          onClick={() => {
            router.push(`/tradingpost/`);
            setMenuOpen(false);
          }}
        >
          Trading Post
        </MenuItem>
        <MenuItem
          disabled={!dmID || pathname.includes("/dungeonmaster/")}
          onClick={() => {
            router.push(`/dungeonmaster/${dmID}`);
            setMenuOpen(false);
          }}
        >
          DM Records
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
