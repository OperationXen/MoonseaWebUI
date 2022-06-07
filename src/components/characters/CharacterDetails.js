import { Box, Typography, Grid } from "@mui/material";
import { TextField, Tooltip } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import CoinIcon from "../general/icons/CoinIcon";

import CharacterImagePane from "./CharacterImagePane";

const dataBoxStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  border: "1px dashed #202020A0",
  borderRadius: "8px",
  boxShadow: "1px 1px 2px lightgrey",
  padding: "0.4em",
};

export default function CharacterDetails(props) {
  const { characterData } = props;
  if (!characterData || characterData === {}) return null;

  return (
    <div
      style={{
        maxHeight: "35em",
        display: "flex",
      }}
    >
      <CharacterImagePane characterData={characterData} />
      <Box
        sx={{
          padding: "0.4em",
          flexGrow: 0.65,
          flexShrink: 1,
        }}
      >
        <Grid container height="2.2em">
          <Grid item xs={8}>
            <Typography variant="h5">{characterData.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Current level">
              <Typography variant="h5" align="right">
                {characterData.level}
              </Typography>
            </Tooltip>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            height: "calc(100% - 2.5em)",
            flexFlow: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ ...dataBoxStyle }}>
            <Box
              sx={{ display: "flex", alignItems: "center", maxWidth: "8em" }}
            >
              <ShieldIcon sx={{ mr: 0.2, my: 0.5 }} />
              <TextField
                value={characterData.ac}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                type="number"
                size="small"
                variant="standard"
                label="Base AC"
              />
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", maxWidth: "8em" }}
            >
              <HealthIcon sx={{ mr: 0.2, my: 0.5 }} />
              <TextField
                value={characterData.hp}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                type="number"
                size="small"
                variant="standard"
                label="Max HP"
                sx={{ maxWidth: "8em" }}
              />
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", maxWidth: "10em" }}
            >
              <PerceptionIcon sx={{ mr: 0.2, my: 0.5 }} />
              <TextField
                value={characterData.pp}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                type="number"
                size="small"
                variant="standard"
                label="Passive Perception"
                sx={{ maxWidth: "8em" }}
              />
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", maxWidth: "8em" }}
            >
              <SaveDCIcon sx={{ mr: 0.2, my: 0.5 }} />
              <TextField
                value={characterData.dc}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                type="number"
                size="small"
                variant="standard"
                label="Spell DC"
                sx={{ maxWidth: "8em" }}
              />
            </Box>
          </Box>
          <Box sx={dataBoxStyle}>
            <Box
              sx={{ display: "flex", alignItems: "center", maxWidth: "8em" }}
            >
              <CoinIcon sx={{ mr: 0.7, my: 0.5 }} />
              <TextField
                value={characterData.gold}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                type="number"
                margin="none"
                size="small"
                variant="standard"
                label="Gold"
                sx={{ maxWidth: "8em" }}
              />
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", maxWidth: "8em" }}
            >
              <DowntimeIcon sx={{ mr: 0.7, my: 0.5 }} />
              <TextField
                value={characterData.downtime}
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                type="number"
                margin="none"
                size="small"
                variant="standard"
                label="Downtime"
                sx={{ maxWidth: "8em" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              ...dataBoxStyle,
              flexFlow: "column",
            }}
          >
            <Typography>Wizard (Abjuration)</Typography>
            <Typography>Wizard (Abjuration)</Typography>
            <Typography>Wizard (Abjuration)</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
