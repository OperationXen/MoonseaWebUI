import { useState } from "react";

import { Box, TextField } from "@mui/material";

export default function CharacterBiographyPane(props) {
  const [biography, setBiography] = useState("");
  const [dmText, setDMText] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <TextField placeholder="Character biography" multiline rows={10} />
      <TextField placeholder="DM helper text" multiline rows={10} />
    </Box>
  );
}
