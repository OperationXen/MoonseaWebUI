import { useState } from "react";

import { Tooltip, Box, Typography, Link, Grid } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import { GiTwoCoins } from "react-icons/gi";

import useCharacterStore from "../../datastore/character";
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

export default function CharacterDetailsPane() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const charData = useCharacterStore();

  const { uuid, editable, gold, downtime, setGold, setDowntime } = charData;
  const { ac, hp, pp, dc, setAC, setHP, setPP, setDC } = charData;
  const [updated, setUpdated] = useState(false);

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

  const handleChanges = () => {
    if (editable && updated) {
      let data = {
        ac: ac,
        hp: hp,
        pp: pp,
        dc: dc,
        gold: gold,
        downtime: downtime,
      };

      updateCharacter(uuid, data).then(() =>
        displayMessage("Character updated", "success")
      );
      setUpdated(false);
    }
  };

  if (!charData || charData === {}) return null;
  return (
    <div
      style={{
        flexGrow: 100,
        maxHeight: "35em",
        display: "flex",
      }}
    >
      <CharacterImagePane />
      <Box
        sx={{
          padding: "0.4em",
          flexGrow: 100,
          flexShrink: 1,
        }}
      >
        <Grid container height="2.2em">
          <Grid item xs={8}>
            <Link
              href={charData.sheet}
              target="_blank"
              rel="noopener"
              variant="h5"
              underline="hover"
              color="inherit"
            >
              {charData.name}
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Tooltip title={charData.race === "Kobold" ? "Yip yip" : "Race"}>
                <Typography variant="h5" sx={{ color: "#424242" }}>
                  {charData.race}
                </Typography>
              </Tooltip>
              <Tooltip title="Character level">
                <Typography variant="h5">{charData.level}</Typography>
              </Tooltip>
            </Box>
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
              locked={!editable}
              name="AC"
              icon={<ShieldIcon fontSize="small" />}
              value={ac}
              setValue={handleUpdateAC}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
            <StatsWidget
              locked={!editable}
              name="HP"
              icon={<HealthIcon fontSize="small" />}
              value={hp}
              setValue={handleUpdateHP}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
            <StatsWidget
              locked={!editable}
              name="PP"
              icon={<PerceptionIcon fontSize="small" />}
              value={pp}
              setValue={handleUpdatePP}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
            <StatsWidget
              locked={!editable}
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
              locked={!editable}
              name="Gold"
              icon={<GiTwoCoins />}
              value={gold}
              setValue={handleUpdateGold}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
            <StatsWidget
              locked={!editable}
              name="Downtime"
              icon={<DowntimeIcon fontSize="small" />}
              value={downtime}
              setValue={handleUpdateDowntime}
              sx={{ width: "25%" }}
              onMouseOut={handleChanges}
            />
          </Box>
          <CharacterLevelsPane data={charData} />
        </Box>
      </Box>
    </div>
  );
}
