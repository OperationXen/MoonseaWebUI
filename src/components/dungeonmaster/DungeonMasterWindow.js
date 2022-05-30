import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Grid, Box, ButtonGroup, Button } from "@mui/material";
import { Typography, Tooltip } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import userStore from "../../datastore/user";
import useSnackbar from "../../datastore/snackbar";
import { getDMLogData, updateDMLogData } from "../../api/dungeonmaster";

import LoadingOverlay from "../general/LoadingOverlay";
import SeasonRewards from "./SeasonRewards";
import DMEvents from "../events/DMEvents";

export default function DungeonMasterWindow(props) {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { dmID, userID } = userStore.getState();
  const { id } = useParams();

  const [dmName, setDMName] = useState("");
  const [loading, setLoading] = useState(true);
  const [allowUpdates, setAllowUpdates] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const initialHours = props.hours || 0;
  const [serviceHours, setServiceHours] = useState(initialHours);

  useEffect(() => {
    setAllowUpdates(id == dmID);

    getDMLogData(id)
      .then((response) => {
        setServiceHours(response.data.hours);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const updateServiceHours = (val) => {
    setServiceHours(serviceHours + val);
  };
  const handleServiceHoursUpdate = () => {
    if (serviceHours !== initialHours) {
      updateDMLogData(id, serviceHours).then((response) => {
        displayMessage("DM Log updated", "success");
      });
    }
  };

  return (
    <React.Fragment>
      <LoadingOverlay show={loading} />
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
            overflow: "hidden",
          }}
        >
          <Grid
            container
            sx={{ width: "100%" }}
            onMouseOver={() => setShowControls(allowUpdates)}
            onMouseOut={() => setShowControls(false)}
          >
            <Grid item xs={2} margin={"auto 0 auto 0.4em"}>
              <Tooltip title={allowUpdates ? "Manually adjust hours" : ""}>
                <ButtonGroup
                  disabled={!allowUpdates}
                  orientation="vertical"
                  sx={{ opacity: showControls ? 0.8 : 0.1 }}
                  onMouseOut={handleServiceHoursUpdate}
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
          <Box
            sx={{ height: "0", width: "100%", borderBottom: "1px solid black" }}
          />
          <SeasonRewards />
        </Box>

        <Box sx={{ flexGrow: 0.68 }}>
          <DMEvents allowUpdates={allowUpdates} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
