import React, { useEffect, useState } from "react";

import { Grid, ButtonGroup, Button } from "@mui/material";
import { Divider, Typography, Tooltip } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import SeasonRewards from "./SeasonRewards";
import DMEvents from "../events/DMEvents";

export default function DungeonMasterWindow(props) {
  const [showControls, setShowControls] = useState(false);

  return (
    <Grid
      container
      sx={{
        padding: "0.5em",
        height: "calc(100% - 2.5em)",
        position: "relative",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          border: "1px solid black",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{ width: "100%" }}
          onMouseOver={() => setShowControls(true)}
          onMouseOut={() => setShowControls(false)}
        >
          <Grid item xs={2} margin={"auto 0 auto 0.4em"}>
            {showControls && (
              <Tooltip title="Manually adjust hours">
                <ButtonGroup orientation="vertical">
                  <Button>
                    <KeyboardArrowUpIcon />
                  </Button>
                  <Button>
                    <KeyboardArrowDownIcon />
                  </Button>
                </ButtonGroup>
              </Tooltip>
            )}
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
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
          </Grid>
          <Grid item xs={2} margin="auto"></Grid>
        </Grid>
        <Divider style={{ width: "95%" }} />
        <SeasonRewards />
      </Grid>
      <Grid item xs={8}>
        <DMEvents />
      </Grid>
    </Grid>
  );
}
