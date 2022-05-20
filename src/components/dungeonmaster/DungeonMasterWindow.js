import React, { useEffect } from "react";

import { Grid, Typography } from "@mui/material";

import SeasonRewards from "./SeasonRewards";
import DMEvents from "../events/DMEvents";

export default function DungeonMasterWindow(props) {
  return (
    <Grid container sx={{ padding: "0.5em", height: "calc(100% - 2.5em)" }}>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">DM Service Rewards</Typography>
        <div
          style={{
            margin: "1em 0",
            height: "250px",
            width: "250px",
            border: "14px solid black",
            borderRadius: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="h1">42</Typography>
            <Typography>Hours</Typography>
          </div>
        </div>
        <SeasonRewards />
      </Grid>
      <Grid item xs={8}>
        <DMEvents />
      </Grid>
    </Grid>
  );
}
