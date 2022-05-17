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
      <Box
        sx={{
          height: "3em",
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">{characterData.name}</Typography>
      </Box>

      <Grid container style={{ height: "20em" }}>
        <Grid item xs={4}>
          <CharacterImagePane characterData={characterData} />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ width: "64%", border: "2px solid green" }}>Summary</Box>
        </Grid>
      </Grid>
      <Box sx={{ border: "2px solid blue" }}>Event History</Box>
    </Paper>
  );
}
