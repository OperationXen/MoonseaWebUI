"use client";

import { useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField, Divider } from "@mui/material";
import { Box, Typography, Button } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useEvents } from "@/data/fetch/events/character";

import type { UUID } from "@/types/uuid";
import type { FreeFormEvent } from "@/types/events";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  existingEvent?: FreeFormEvent;
};

export function DTEventFreeForm(props: PropsType) {
  const { onClose, characterUUID, existingEvent } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent } = useEvents(characterUUID);

  const [title, setTitle] = useState(existingEvent ? existingEvent.title : "");
  const [details, setDetails] = useState(
    existingEvent ? existingEvent.details : "",
  );
  const [datetime, setDatetime] = useState<Date | null>(
    existingEvent ? existingEvent.datetime : new Date(),
  );

  const editable = existingEvent ? existingEvent.editable : true;

  const handleSubmit = () => {
    createEvent({
      event_type: "dt_freeform",
      title: title,
      details: details,
      datetime: datetime ?? undefined,
    })
      .then((_response) => {
        displayMessage("Generic event added to log", "success");
        onClose && onClose();
      })
      .catch((error) => displayMessage(error.response.data.message, "error"));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.4em" }}>
      <Divider sx={{ width: "95%", margin: "auto" }}>
        <Typography>Event details</Typography>
      </Divider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date"
          format="yyyy/MM/dd"
          value={datetime}
          onChange={setDatetime}
        />
      </LocalizationProvider>

      <TextField
        value={title}
        label="Title"
        disabled={!editable}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Generic event"
        required
      />

      <TextField
        value={details}
        label="Details (Optional)"
        disabled={!editable}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Add details of your event here"
        multiline
        minRows={5}
        maxRows={12}
      />

      <Button
        variant="contained"
        disabled={!editable || !title}
        sx={{ width: "60%", margin: "auto" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}

export default DTEventFreeForm;
