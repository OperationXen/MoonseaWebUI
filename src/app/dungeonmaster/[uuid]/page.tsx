"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import { Grid, Box, ButtonGroup, Button } from "@mui/material";
import { Typography, Tooltip } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import useSnackbar from "@/datastore/snackbar";
import { updateDMLogData } from "@/api/dungeonmaster";

import LoadingOverlay from "@/components/general/LoadingOverlay";
import SeasonRewards from "../rewards/SeasonRewards";
import DMEvents from "@/components/events/DMEvents";
import { useUserStatus } from "@/data/fetch/auth";

import type { UUID } from "@/types/uuid";

export default function DungeonMasterWindow() {
  const { uuid } = useParams();
  const { data: userStatus, isLoading } = useUserStatus();
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [serviceHours, setServiceHours] = useState(0);
  const [hoursChanged, setHoursChanged] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);

  const allowUpdates = !!(uuid && uuid === userStatus?.dmUUID);

  const updateServiceHours = (val: number) => {
    setHoursChanged(true);
    setServiceHours(serviceHours + val);
  };

  const handleServiceHoursUpdate = () => {
    if (hoursChanged) {
      updateDMLogData(uuid, serviceHours).then((_response) => {
        setHoursChanged(false);
        displayMessage("DM Log updated", "success");
      });
    }
  };

  return (
    <React.Fragment>
      <LoadingOverlay open={isLoading} />
      <Grid
        container
        sx={{
          display: "flex",
          padding: "0.5em",
          position: "relative",
          justifyContent: "space-around",
        }}
      >
        <Grid
          item
          xs={12}
          lg={3.95}
          sx={{
            border: "1px solid black",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            maxHeight: "calc(100vh - 4.5em)",
            marginBottom: "0.4em",
          }}
        >
          <Grid container>
            <Grid item xs={2} margin={"auto 0 auto 0.4em"}>
              <Tooltip title={allowUpdates ? "Manually adjust hours" : ""}>
                <ButtonGroup
                  disabled={!allowUpdates}
                  orientation="vertical"
                  sx={{ opacity: allowUpdates ? 0.8 : 0.1 }}
                  onMouseLeave={handleServiceHoursUpdate}
                >
                  <Button onClick={() => updateServiceHours(+1)}>
                    <KeyboardArrowUpIcon />
                  </Button>
                  <Button
                    disabled={serviceHours <= 0}
                    onClick={() => updateServiceHours(-1)}
                  >
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
                  margin: "0 0 0.4em",
                  height: "180px",
                  width: "180px",
                  border: "8px solid black",
                  borderRadius: "200px",
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
          <Box
            sx={{
              height: "0",
              width: "100%",
              borderBottom: "1px solid black",
            }}
          />
          <SeasonRewards
            allowUpdates={allowUpdates}
            dmUUID={uuid}
            hours={serviceHours}
            onChange={() => {
              setRefreshEvents(true);
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          lg={8}
          sx={{ height: "calc(100vh - 4em)", marginBottom: "0.4em" }}
        >
          <DMEvents allowUpdates={allowUpdates} uuid={uuid as UUID} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}