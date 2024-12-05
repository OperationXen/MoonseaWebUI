import React, { useState } from "react";

import { Fade, IconButton, Menu, MenuItem } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/Menu";

import { Character } from "@/types/character";

import CharacterControlsEditDialog from "./CharacterControlsEditDialog";
import DeleteConfirm from "./widgets/DeleteConfirm";

type PropsType = {
  character: Character;
};

export default function CharacterControls(props: PropsType) {
  const { character } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
          <EditIcon
            fontSize="small"
            onClick={() => {
              setEditOpen(true);
              setAnchorEl(null);
            }}
          />
        </MenuItem>
        <MenuItem sx={{ padding: "0.4em" }} disabled>
          <ShareIcon fontSize="small" />
        </MenuItem>
        <MenuItem sx={{ padding: "0.4em" }}>
          <DeleteIcon
            fontSize="small"
            onClick={() => {
              setDeleteOpen(true);
              setAnchorEl(null);
            }}
          />
        </MenuItem>
      </Menu>
      <CharacterControlsEditDialog character={character} open={editOpen} onClose={() => setEditOpen(false)} />
      <DeleteConfirm character={character} open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </React.Fragment>
  );
}
