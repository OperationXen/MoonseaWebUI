"use client";

import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { TextField, Divider } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";
import { createEventCatchingUp } from "@/api/events";

import type { UUID } from "@/types/uuid";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
};

export default function CreateDTCatchup(props: PropsType) {
  const { onClose, characterUUID } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    createEventCatchingUp(characterUUID, details)
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
      >
        Gain a level (10 downtime days)
      </Button>
    </Box>
  );
}
