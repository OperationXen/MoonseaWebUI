import { Box, Typography, Paper, Grid } from "@mui/material";
import {Divider, TextField} from "@mui/material"

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
        <Box sx={{ border: "1px solid black", padding: "0.4em", flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={8}>
              <Typography variant="h4">{"Character name"}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" align="right">{"Level 10"}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={3}>
              <TextField type="number" label="Base AC" />
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box sx={{ border: "2px solid blue" }}>Event History</Box>

    </Paper>
  );
}
