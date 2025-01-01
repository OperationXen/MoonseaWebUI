import React from "react";
import { Divider, Typography, Tooltip, Box } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import type { Character } from "@/types/character";

type PropsType = {
  character: Character;
};

export default function StatSummaryWidget(props: PropsType) {
  const { character } = props;

  return (
      <Box className="flex justify-around items-center">
        <Tooltip title="Armour Class">
          <Box sx={{ display: "flex", cursor: "pointer" }}>
            <ShieldIcon />
            <Typography>{character.ac}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Maximum hit points">
          <Box sx={{ display: "flex", cursor: "pointer" }}>
            <HealthIcon />
            <Typography sx={{ marginLeft: "2px" }}>{character.hp}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Passive perception">
          <Box sx={{ display: "flex", cursor: "pointer" }}>
            <PerceptionIcon />
            <Typography sx={{ marginLeft: "2px" }}>{character.pp}</Typography>
          </Box>
        </Tooltip>
        <Tooltip title="Spell save DC">
          <Box sx={{ display: "flex", cursor: "pointer" }}>
            <SaveDCIcon />
            <Typography>{character.dc}</Typography>
          </Box>
        </Tooltip>
      </Box>

  );
}
