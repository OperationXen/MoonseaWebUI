"use client";

import React, { useState } from "react";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";

import { IconButton, Tooltip } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";
import { exportCharacter } from "@/utils/export";
import CharacterControlsEditDialog from "./CharacterControlsEditDialog";
import CharacterDeleteConfirmation from "./CharacterDeleteConfirmation";

import { Character } from "@/types/character";

type PropsType = {
  character: Character;
};

export default function CharacterControls(props: PropsType) {
  const { character } = props;

  const { displayMessage: snackbar } = useSnackbar();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    snackbar("Copied character link to clipboard");
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit character name, race and links" placement="left">
        <IconButton>
          <EditIcon
            onClick={() => {
              setEditOpen(true);
            }}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share a link to this character" placement="left">
        <IconButton>
          <ShareIcon onClick={copyLinkToClipboard} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Export character information" placement="left">
        <IconButton>
          <FileDownloadIcon
            onClick={() => exportCharacter(character.uuid, character.name)}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete character" placement="left">
        <IconButton>
          <DeleteIcon
            className="hover:opacity-90 opacity-30"
            onClick={() => {
              setDeleteOpen(true);
            }}
          />
        </IconButton>
      </Tooltip>

      <CharacterControlsEditDialog
        character={character}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <CharacterDeleteConfirmation
        uuid={character.uuid}
        name={character.name}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </React.Fragment>
  );
}
