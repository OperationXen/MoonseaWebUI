import React, { useState } from "react";

import { Fade, IconButton, Button, Menu, MenuItem } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/Menu";

import { Character } from "@/types/character";

type PropsType = {
  onEditClicked: () => void;
  onDeleteClicked: () => void;
};

export default function CharacterControls(props: PropsType) {
  const { onEditClicked, onDeleteClicked } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MenuIcon sx={{ opacity: "0.4" }} />
      </IconButton>
      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <MenuItem sx={{ padding: "0.4em" }}>
          <EditIcon fontSize="small" onClick={onEditClicked} />
        </MenuItem>
        <MenuItem sx={{ padding: "0.4em" }}>
          <ShareIcon fontSize="small" />
        </MenuItem>
        <MenuItem sx={{ padding: "0.4em" }}>
          <DeleteIcon fontSize="small" onClick={onDeleteClicked} />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
