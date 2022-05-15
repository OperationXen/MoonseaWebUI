import React from "react";
import { Divider, Typography, Tooltip } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";

export default function StatSummaryWidget(props) {
  const { character } = props;

  return (
    <React.Fragment>
      <Divider sx={{ margin: "8px" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Tooltip title="Armour Class">
          <div style={{ display: "flex" }}>
            <ShieldIcon />
            <Typography>{character.ac}</Typography>
          </div>
        </Tooltip>
        <Tooltip title="Maximum hit points">
          <div style={{ display: "flex" }}>
            <HealthIcon />
            <Typography>{character.hp}</Typography>
          </div>
        </Tooltip>
        <Tooltip title="Passive perception">
          <div style={{ display: "flex" }}>
            <PerceptionIcon />
            <Typography>{character.pp}</Typography>
          </div>
        </Tooltip>
        <Tooltip title="Spell save DC">
          <div style={{ display: "flex" }}>
            <SaveDCIcon />
            <Typography>{character.dc}</Typography>
          </div>
        </Tooltip>
      </div>
      <Divider sx={{ margin: "8px" }} />
    </React.Fragment>
  );
}
