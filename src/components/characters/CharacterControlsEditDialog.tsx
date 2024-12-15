"use client";

import { useState } from "react";

import { Dialog, Typography, TextField } from "@mui/material";
import { Box, Button, Divider } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";
import { Character } from "@/types/character";

import { characterMutation } from "@/data/fetch/character";

type PropsType = {
  character: Character;
  open: boolean;
  onClose: () => void;
};

export default function CharacterControlsEditDialog(props: PropsType) {
  const { character, open, onClose } = props;
  const mutate = characterMutation();

  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [highlight, setHighlight] = useState(false);
  const [name, setName] = useState(character.name);
  const [race, setRace] = useState(character.race);
  const [sheet, setSheet] = useState(character.sheet);

  const handleSave = () => {
    mutate
      .mutateAsync({ ...character, name: name, race: race, sheet: sheet })
      .then(() => {
        displayMessage("Updated character details", "success");
      })
      .catch(() => displayMessage(""));
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: "1px solid black",
          boxShadow: `0 0 4px inset black`,
          display: "flex",
          width: "42em",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em 2em",
          gap: "0.6em",
        },
      }}
    >
      <Typography variant="h4" sx={{ alignSelf: "flex-start" }}>
        Edit character
      </Typography>
      <Divider sx={{ width: "95%" }}>Details</Divider>
      <TextField
        fullWidth
        label="Character name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        error={highlight && !name}
      />
      <TextField
        fullWidth
        label="Race"
        value={race}
        onChange={(e) => {
          setRace(e.target.value);
        }}
        placeholder="Kobold"
        error={highlight && !race}
      />
      <Divider sx={{ width: "95%" }}>External Links</Divider>
      <TextField
        fullWidth
        label="Link to character sheet"
        value={sheet}
        onChange={(e) => {
          setSheet(e.target.value);
        }}
      />
      <Box
        sx={{ width: "60%" }}
        onMouseOver={() => setHighlight(true)}
        onMouseOut={() => setHighlight(false)}
      >
        <Button
          variant="contained"
          disabled={
            !race ||
            !name ||
            (race === character.race &&
              name === character.name &&
              sheet === character.sheet)
          }
          onClick={handleSave}
          fullWidth
        >
          Save changes
        </Button>
      </Box>
    </Dialog>
  );
}
