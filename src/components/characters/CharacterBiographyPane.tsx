"use client";

import { useState } from "react";

import { Box, TextField } from "@mui/material";

import { Character } from "@/types/character";

import { DM_TEXT_PLACEHOLDER } from "@/config/strings";
import useSnackbar from "@/datastore/snackbar";

type PropsType = {
  character: Character;
  onUpdate: (x: Partial<Character>) => Promise<any>;
};

export default function CharacterBiographyPane(props: PropsType) {
  const { character, onUpdate } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [bio, setBio] = useState(character.biography);
  const [dmText, setDMText] = useState(character.dm_text);

  const handleUpdate = () => {
    if (bio !== character.biography || dmText !== character.dm_text)
      onUpdate({ biography: bio, dm_text: dmText })
        .then((r: Character) => {
          displayMessage("Updated text", "info");
          setBio(r.biography);
          setDMText(r.dm_text);
        })
        .catch(() => displayMessage("Problem updating text", "error"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 100,
        margin: "0.4em 0",
        justifyContent: "space-around",
      }}
    >
      <TextField
        disabled={!character.editable}
        sx={{ flexGrow: 0.48 }}
        placeholder="Character biography"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
        }}
        multiline
        rows={4}
        onMouseOut={handleUpdate}
        label={bio !== character.biography ? "Biography *" : "Biography"}
      />
      <TextField
        disabled={!character.editable}
        sx={{ flexGrow: 0.48 }}
        placeholder={DM_TEXT_PLACEHOLDER}
        value={dmText}
        onChange={(e) => {
          setDMText(e.target.value);
        }}
        multiline
        rows={4}
        onMouseOut={handleUpdate}
        label={dmText !== character.dm_text ? "DM Notes *" : "DM Notes"}
      />
    </Box>
  );
}
