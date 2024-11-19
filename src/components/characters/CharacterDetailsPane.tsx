"use client";

import { useState } from "react";

import { Tooltip, Box, Typography, Link, Grid } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import { GiTwoCoins } from "react-icons/gi";

import type { Character } from "@/types/character";
import CharacterLevelsPane from "./CharacterLevelsPane";
import CharacterImagePane from "./CharacterImagePane";
import useSnackbar from "../../datastore/snackbar";
import VisionWidget from "./widgets/VisionWIdget";
import StatsWidget from "./widgets/StatsWidget";

const dataBoxStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  padding: "0.4em",
};

type PropsType = {
  data: Character;
  updateCharacter: (x: Partial<Character>) => void;
};

export default function CharacterDetailsPane(props: PropsType) {
  const { data, updateCharacter } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);

  if (!data) return null;
  return (
    <Box
      sx={{
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
            <Tooltip title="Open character sheet in a new window">
              <Link href={data.sheet} target="_blank" rel="noopener" variant="h5" underline="hover" color="inherit">
                {data.name}
              </Link>
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title={data.race === "Kobold" ? "Yip yip" : "Character race"}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#424242",
                    cursor: "pointer",
                    marginRight: "0.2em",
                  }}
                >
                  {data.race}
                </Typography>
              </Tooltip>
              <VisionWidget uuid={data.uuid} editable={data.editable} vision={data.vision} doUpdate={handleUpdate} />
            </Box>
            <Tooltip title="Character level">
              <Typography variant="h5" sx={{ cursor: "pointer" }}>
                {data.level}
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
              locked={!data.editable}
              name="AC"
              icon={<ShieldIcon fontSize="small" />}
              value={data.ac}
              setValue={(val: number) => updateCharacter({ ac: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!data.editable}
              name="HP"
              icon={<HealthIcon fontSize="small" />}
              value={data.hp}
              setValue={(val: number) => updateCharacter({ hp: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!data.editable}
              name="PP"
              icon={<PerceptionIcon fontSize="small" />}
              value={data.pp}
              setValue={(val: number) => updateCharacter({ pp: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!data.editable}
              name="DC"
              icon={<SaveDCIcon fontSize="small" />}
              value={data.dc}
              setValue={(val: number) => updateCharacter({ dc: val })}
              sx={{ width: "25%" }}
            />
          </Box>
          <Box sx={dataBoxStyle}>
            <StatsWidget
              locked={!data.editable}
              name="Gold"
              icon={<GiTwoCoins />}
              value={data.gold}
              setValue={(val: number) => updateCharacter({ gold: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!data.editable}
              name="Downtime"
              icon={<DowntimeIcon fontSize="small" />}
              value={data.downtime}
              setValue={(val: number) => updateCharacter({ downtime: val })}
              sx={{ width: "25%" }}
            />
          </Box>
          <CharacterLevelsPane data={data} />
        </Box>
      </Box>
    </Box>
  );
}
