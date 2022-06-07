import { useState } from "react";

import { Box, TextField } from "@mui/material";

import { updateCharacter } from "../../api/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterBiographyPane(props) {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [biography, setBiography] = useState(props.biography || "");
  const [biographyChanged, setBiographyChanged] = useState(false);
  const [dmText, setDMText] = useState(props.dmText || "");
  const [dmTextChanged, setDMTextChanged] = useState(false);

  const handleBioUpdate = () => {
    let data = { id: props.id };

    if (biographyChanged) {
      data.biography = biography;
      setBiographyChanged(false);
      updateCharacter(data).then(
        displayMessage("Biography updated", "success")
      );
    }
  };
  const handleDMTextUpdate = () => {
    let data = { id: props.id };

    if (dmTextChanged) {
      data.dm_text = dmText;
      setDMTextChanged(false);
      updateCharacter(data).then(displayMessage("DM info updated", "success"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-around",
      }}
    >
      <TextField
        sx={{ flexGrow: 0.48 }}
        placeholder="Character biography"
        value={biography}
        onChange={(e) => {
          setBiographyChanged(true);
          setBiography(e.target.value);
        }}
        multiline
        rows={4}
        onMouseOut={handleBioUpdate}
      />
      <TextField
        sx={{ flexGrow: 0.48 }}
        placeholder="DM helper text"
        value={dmText}
        onChange={(e) => {
          setDMTextChanged(true);
          setDMText(e.target.value);
        }}
        multiline
        rows={4}
        onMouseOut={handleDMTextUpdate}
      />
    </Box>
  );
}
