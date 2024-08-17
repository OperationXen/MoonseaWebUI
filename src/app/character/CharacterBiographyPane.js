import { useState } from "react";

import { Box, TextField } from "@mui/material";

import { DM_TEXT_PLACEHOLDER } from "../../config/strings";
import useCharacterStore from "../../datastore/character";
import { updateCharacter } from "../../api/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterBiographyPane() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [uuid, editable] = useCharacterStore((s) => [s.uuid, s.editable]);
  const [bio, setBio] = useCharacterStore((s) => [s.biography, s.setBiography]);
  const [dmText, setDMText] = useCharacterStore((s) => [
    s.dm_text,
    s.setDMText,
  ]);
  const [biographyChanged, setBiographyChanged] = useState(false);
  const [dmTextChanged, setDMTextChanged] = useState(false);

  const handleBioUpdate = () => {
    if (biographyChanged) {
      setBiographyChanged(false);
      updateCharacter(uuid, { biography: bio }).then(
        displayMessage("Biography updated", "success")
      );
    }
  };
  const handleDMTextUpdate = () => {
    if (dmTextChanged) {
      setDMTextChanged(false);
      updateCharacter(uuid, { dm_text: dmText }).then(
        displayMessage("DM info updated", "success")
      );
    }
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
        disabled={!editable}
        sx={{ flexGrow: 0.48 }}
        placeholder="Character biography"
        value={bio}
        onChange={(e) => {
          setBiographyChanged(true);
          setBio(e.target.value);
        }}
        multiline
        rows={4}
        onMouseOut={handleBioUpdate}
      />
      <TextField
        disabled={!editable}
        sx={{ flexGrow: 0.48 }}
        placeholder={DM_TEXT_PLACEHOLDER}
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
