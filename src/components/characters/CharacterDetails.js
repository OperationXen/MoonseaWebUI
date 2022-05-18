import { Box, Typography, Paper, Grid } from "@mui/material";

import CharacterImagePane from "./CharacterImagePane";

export default function CharacterDetails(props) {
  const { characterData } = props;
  if (!characterData || characterData === {}) return null;

  console.log(characterData);
  return (
    <Paper
      elevation={8}
      style={{
        display: "flex column",
        flex: 0.98,
        flexDirection: "column",
      }}
    >
      <div style={{height: "20em", display: "flex"}}>
        <CharacterImagePane characterData={characterData} />  
        <Box sx={{ width: "64%", border: "2px solid green" }}>
          <Typography variant="h4">{characterData.name}</Typography>
        </Box>
      </div>
      <Box sx={{ border: "2px solid blue" }}>Event History</Box>

    </Paper>
  );
}
