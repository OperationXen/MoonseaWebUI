import { useState } from "react";

import { Box, Typography, Grid } from "@mui/material";
import { TextField, Tooltip } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import CoinIcon from "../general/icons/CoinIcon";

import CharacterImagePane from "./CharacterImagePane";
import StatsWidget from "./widgets/StatsWidget";

const dataBoxStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  border: "1px dashed #202020A0",
  borderRadius: "8px",
  boxShadow: "1px 1px 2px lightgrey",
  padding: "0.4em",
};

export default function CharacterDetailsPane(props) {
  const { characterData } = props;

  const [updated, setUpdated] = useState(false);
  const [ac, setAC] = useState(characterData.ac);

  const handleUpdateAC = (v) => {
    setUpdated(true);
    setAC(v);
  };
  const handleUpdateHP = () => {};
  const handleUpdatePP = () => {};
  const handleUpdateDC = () => {};
  const handleUpdateGold = () => {};
  const handleUpdateDowntime = () => {};

  if (!characterData || characterData === {}) return null;

  return (
    <div
      style={{
        flexGrow: 100,
        maxHeight: "35em",
        display: "flex",
      }}
    >
      <CharacterImagePane characterData={characterData} />
      <Box
        sx={{
          padding: "0.4em",
          flexGrow: 100,
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
            <StatsWidget
              name="AC"
              icon={<ShieldIcon fontSize="small" />}
              value={ac}
              setValue={handleUpdateAC}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              name="HP"
              icon={<HealthIcon fontSize="small" />}
              value={characterData.hp}
              setValue={handleUpdateHP}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              name="PP"
              icon={<PerceptionIcon fontSize="small" />}
              value={characterData.pp}
              setValue={handleUpdatePP}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              name="DC"
              icon={<SaveDCIcon fontSize="small" />}
              value={characterData.dc}
              setValue={handleUpdateDC}
              sx={{ width: "25%" }}
            />
          </Box>
          <Box sx={dataBoxStyle}>
            <StatsWidget
              name="Gold"
              icon={<CoinIcon fontSize="small" />}
              value={characterData.gold}
              setValue={handleUpdateGold}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              name="Downtime"
              icon={<DowntimeIcon fontSize="small" />}
              value={characterData.gold}
              setValue={handleUpdateGold}
              sx={{ width: "25%" }}
            />
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
