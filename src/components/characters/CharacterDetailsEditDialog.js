import { useState } from "react";
import { Dialog, Divider, Typography, TextField, Button } from "@mui/material";

import { updateCharacter } from "../../api/character";
import useCharacterStore from "../../datastore/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterDetailsEditDialog(props) {
  const { open, onClose } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const uuid = useCharacterStore((s) => s.uuid);
  const [name, setName] = useCharacterStore((s) => [s.name, s.setName]);
  const [sheet, setSheet] = useCharacterStore((s) => [s.sheet, s.setSheet]);
  const [changed, setChanged] = useState(false);

  const handleClose = () => {
    if (changed)
      updateCharacter(uuid, { name: name, sheet: sheet })
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
        Edit character details
      </Typography>
      <Divider sx={{ width: "95%" }} />
      <TextField
        fullWidth
        label="Character name"
        value={name}
        onChange={(e) => {
          setChanged(true);
          setName(e.target.value);
        }}
      />
      <TextField
        fullWidth
        label="Link to character sheet"
        value={sheet}
        onChange={(e) => {
          setChanged(true);
          setSheet(e.target.value);
        }}
      />
      <Button
        variant="contained"
        sx={{ width: "60%" }}
        disabled={!changed}
        onClick={handleClose}
      >
        Save changes
      </Button>
    </Dialog>
  );
}
