import React, { useEffect, useState } from "react";

import { Grid, Box, ButtonGroup, Button } from "@mui/material";
import { Divider, Typography, Tooltip } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import SeasonRewards from "./SeasonRewards";
import DMEvents from "../events/DMEvents";

export default function DungeonMasterWindow(props) {
  const [showControls, setShowControls] = useState(false);
  const [serviceHours, setServiceHours] = useState(props.hours || 0);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "0.5em",
        height: "calc(100% - 3.5em)",
        position: "relative",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: "8px",
          display: "flex",
          flexGrow: 0.3,
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
            <Tooltip title="Manually adjust hours">
              <ButtonGroup
                orientation="vertical"
                sx={{ opacity: showControls ? 0.8 : 0.1 }}
              >
                <Button onClick={() => setServiceHours(serviceHours + 1)}>
                  <KeyboardArrowUpIcon />
                </Button>
                <Button onClick={() => setServiceHours(serviceHours - 1)}>
                  <KeyboardArrowDownIcon />
                </Button>
              </ButtonGroup>
            </Tooltip>
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
                <Typography variant="h1">{serviceHours}</Typography>
                <Typography>Hours</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={2} margin="auto"></Grid>
        </Grid>
        <Divider style={{ width: "95%" }} />
        <SeasonRewards />
      </Box>

      <Box sx={{ flexGrow: 0.68 }}>
        <DMEvents />
      </Box>
    </Box>
  );
}
