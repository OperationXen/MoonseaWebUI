"use client";

import { useState } from "react";

import { Dialog, Typography, TextField } from "@mui/material";
import { Box, Button, Divider } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { Character } from "@/types/character";

import { useCharacter } from "@/data/fetch/character";

type PropsType = {
  character: Character;
  open: boolean;
  onClose: () => void;
};

export default function CharacterControlsEditDialog(props: PropsType) {
  const { character, open, onClose } = props;

  const { updateCharacter } = useCharacter(character.uuid);

  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [highlight, setHighlight] = useState(false);
  const [name, setName] = useState(character.name);
  const [race, setRace] = useState(character.race);
  const [faction, setFaction] = useState(character.faction);
  const [campaign, setCampaign] = useState(character.campaign);
  const [bastion, setBastion] = useState(character.bastion);
  const [sheet, setSheet] = useState(character.sheet);

  const handleSave = () => {
    updateCharacter({
      ...character,
      name,
      race,
      sheet,
      faction,
      campaign,
      bastion,
    })
      .then(() => {
        displayMessage("Updated character details", "success");
      })
      .catch(() => displayMessage("Error updating character", "error"));
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
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
        },
      }}
    >
      <Typography variant="h4" sx={{ alignSelf: "flex-start" }}>
        Edit character
      </Typography>
      <Divider sx={{ width: "95%" }}>Details</Divider>
      <TextField
        fullWidth
        required
        size="small"
        label="Character name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        error={highlight && !name}
      />
      <TextField
        fullWidth
        required
        size="small"
        label="Race"
        value={race}
        onChange={(e) => {
          setRace(e.target.value);
        }}
        placeholder="Kobold"
        error={highlight && !race}
      />
      <TextField
        fullWidth
        size="small"
        label="Faction and reknown"
        value={faction}
        onChange={(e) => {
          setFaction(e.target.value);
        }}
        placeholder="Lords Alliance (Reknown level 2)"
      />
      <TextField
        fullWidth
        size="small"
        label="Campaign"
        value={campaign}
        onChange={(e) => {
          setCampaign(e.target.value);
        }}
      />
      <Divider sx={{ width: "95%" }}>External Links</Divider>
      <TextField
        fullWidth
        size="small"
        label="Link to character sheet"
        value={sheet}
        onChange={(e) => {
          setSheet(e.target.value);
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Link to bastion map"
        value={character.bastion}
        onChange={(e) => {
          setBastion(e.target.value);
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
              sheet === character.sheet &&
              faction === character.faction &&
              campaign === character.campaign &&
              bastion === character.bastion)
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
