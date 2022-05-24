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
      <TextField
        placeholder="Character biography"
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
        multiline
        rows={10}
      />
      <TextField
        placeholder="DM helper text"
        value={dmText}
        onChange={(e) => setDMText(e.target.value)}
        multiline
        rows={10}
      />
    </Box>
  );
}
