import { Box, Typography, Paper, Grid } from "@mui/material";
import { Divider, TextField } from "@mui/material";

import CharacterImagePane from "./CharacterImagePane";

export default function CharacterDetails(props) {
  const { characterData } = props;
  if (!characterData || characterData === {}) return null;

  console.log(characterData);
  return (
    <div style={{ height: "20em", display: "flex" }}>
      <CharacterImagePane characterData={characterData} />
      <Box
        sx={{
          border: "1px solid black",
          padding: "0.4em",
          flexGrow: 0.65,
          borderRadius: "0 10px",
        }}
      >
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h5">{"Character name"}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" align="right">
              {"Level 10"}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "10em",
            }}
          >
            <TextField
              type="number"
              margin="none"
              size="small"
              variant="standard"
              label="Base AC"
            />
            <TextField
              type="number"
              margin="none"
              size="small"
              variant="standard"
              label="Max HP"
            />
            <TextField
              type="number"
              margin="none"
              size="small"
              variant="standard"
              label="Passive Perception"
            />
            <TextField
              type="number"
              margin="none"
              size="small"
              variant="standard"
              label="Spell DC"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
