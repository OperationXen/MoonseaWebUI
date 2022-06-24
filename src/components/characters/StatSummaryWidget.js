import React from "react";
import { Divider, Typography, Tooltip, Box } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";

export default function StatSummaryWidget(props) {
  const { character } = props;

  return (
    <React.Fragment>
      <Divider sx={{ margin: "8px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
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
      <Divider sx={{ margin: "8px" }} />
    </React.Fragment>
  );
}
