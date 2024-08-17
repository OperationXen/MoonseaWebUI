import { useState } from "react";
import { Dialog, Typography, TextField } from "@mui/material";
import { Box, Button, Divider } from "@mui/material";

import { updateCharacter } from "../../api/character";
import useCharacterStore from "../../datastore/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterDetailsEditDialog(props) {
  const { open, onClose } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const uuid = useCharacterStore((s) => s.uuid);
  const [highlight, setHighlight] = useState(false);

  const [name, setName] = useCharacterStore((s) => [s.name, s.setName]);
  const [race, setRace] = useCharacterStore((s) => [s.race, s.setRace]);
  const [sheet, setSheet] = useCharacterStore((s) => [s.sheet, s.setSheet]);
  const [changed, setChanged] = useState(false);

  const handleClose = () => {
    if (!name || !race) {
      displayMessage("Your character must have a name and a race", "info");
      return;
    }
    if (changed)
      updateCharacter(uuid, { name: name, race: race, sheet: sheet })
        .then(() => {
          displayMessage("Updated character details", "success");
        })
        .catch(() =>
          displayMessage("Unable to update character details", "error")
        );
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          setChanged(true);
          setName(e.target.value);
        }}
        error={highlight && !name}
      />
      <TextField
        fullWidth
        label="Race"
        value={race}
        onChange={(e) => {
          setChanged(true);
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
          setChanged(true);
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
          disabled={!changed || !race || !name}
          onClick={handleClose}
          fullWidth
        >
          Save changes
        </Button>
      </Box>
    </Dialog>
  );
}
