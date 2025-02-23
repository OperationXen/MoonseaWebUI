"use client";

import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { TextField, Divider } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";
import { useEvents } from "@/data/fetch/events/character";

import type { UUID } from "@/types/uuid";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  downtime: number;
};

export function DTCatchupEvent(props: PropsType) {
  const { onClose, downtime, characterUUID } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent } = useEvents(characterUUID);

  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    createEvent({ event_type: "dt_catchingup", details: details })
      .then((_response) => {
        displayMessage("Catching up added to log", "success");
        onClose && onClose();
      })
      .catch((error) => displayMessage(error.response.data.message, "error"));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.4em" }}>
      <Divider sx={{ width: "95%", margin: "auto" }}>
        <Typography>Event Details</Typography>
      </Divider>

      <TextField
        value={details}
        onChange={(e) => setDetails(e.target.value.substring(0, 256))}
        label="Details(optional)"
      />

      <Button
        variant="contained"
        sx={{ width: "60%", margin: "auto" }}
        onClick={handleSubmit}
        disabled={downtime < 10}
      >
        Gain a level (10 downtime days)
      </Button>
    </Box>
  );
}

export default DTCatchupEvent;
