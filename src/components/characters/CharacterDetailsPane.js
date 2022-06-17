import { useState, useEffect } from "react";

import { Tooltip, Box, Typography, Grid } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import CoinIcon from "../general/icons/CoinIcon";

import { updateCharacter } from "../../api/character";
import CharacterLevelsPane from "./CharacterLevelsPane";
import CharacterImagePane from "./CharacterImagePane";
import useSnackbar from "../../datastore/snackbar";
import StatsWidget from "./widgets/StatsWidget";

const dataBoxStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  padding: "0.4em",
};

export default function CharacterDetailsPane(props) {
  const { characterData } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [updated, setUpdated] = useState(false);
  const [ac, setAC] = useState();
  const [hp, setHP] = useState();
  const [pp, setPP] = useState();
  const [dc, setDC] = useState();
  const [gold, setGold] = useState();
  const [downtime, setDowntime] = useState();

  // Set internal state on component load
  useEffect(() => {
    setAC(characterData.ac);
    setHP(characterData.hp);
    setPP(characterData.pp);
    setDC(characterData.dc);
    setGold(characterData.gold);
    setDowntime(characterData.downtime);
  }, [characterData]);

  const handleUpdateAC = (x) => {
    setUpdated(true);
    setAC(x);
  };
  const handleUpdateHP = (x) => {
    setUpdated(true);
    setHP(x);
  };
  const handleUpdatePP = (x) => {
    setUpdated(true);
    setPP(x);
  };
  const handleUpdateDC = (x) => {
    setUpdated(true);
    setDC(x);
  };
  const handleUpdateGold = (x) => {
    setUpdated(true);
    setGold(x);
  };
  const handleUpdateDowntime = (x) => {
    setUpdated(true);
    setDowntime(x);
  };

  const levels = [
    { main: "Wizard", variant: "Abjuration", count: 8 },
    { main: "Fighter", variant: "", count: 2 },
  ];

  const handleChanges = () => {
    if (updated) {
      let data = {
        id: characterData.id,
        ac: ac,
        hp: hp,
        pp: pp,
        dc: dc,
        gold: gold,
        downtime: downtime,
      };

      updateCharacter(data).then(() =>
        displayMessage("Character updated", "success")
      );
      setUpdated(false);
    }
  };

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
              onMouseOut={handleChanges}
            />
            <StatsWidget
              name="HP"
              icon={<HealthIcon fontSize="small" />}
              value={hp}
              setValue={handleUpdateHP}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
            <StatsWidget
              name="PP"
              icon={<PerceptionIcon fontSize="small" />}
              value={pp}
              setValue={handleUpdatePP}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
            <StatsWidget
              name="DC"
              icon={<SaveDCIcon fontSize="small" />}
              value={dc}
              setValue={handleUpdateDC}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
          </Box>
          <Box sx={dataBoxStyle}>
            <StatsWidget
              name="Gold"
              icon={<CoinIcon fontSize="small" />}
              value={gold}
              setValue={handleUpdateGold}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
            <StatsWidget
              name="Downtime"
              icon={<DowntimeIcon fontSize="small" />}
              value={downtime}
              setValue={handleUpdateDowntime}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
          </Box>
          <CharacterLevelsPane data={levels} />
        </Box>
      </Box>
    </div>
  );
}
