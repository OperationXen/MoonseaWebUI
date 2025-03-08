"use client";

import { useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField, Box, Button } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useEvents } from "@/data/fetch/events/character";

import type { UUID } from "@/types/uuid";
import type { FreeFormEvent } from "@/types/events";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  event?: FreeFormEvent;
};

export function DTEventFreeForm(props: PropsType) {
  const { onClose, characterUUID, event: event } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent } = useEvents(characterUUID);

  const [title, setTitle] = useState(event ? event.title : "");
  const [details, setDetails] = useState(event ? event.details : "");
  const [datetime, setDatetime] = useState<Date | null>(
    event ? new Date(event.datetime) : new Date(),
  );

  const editable = event ? event.editable : true;

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4em",
        marginTop: "8px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date"
          format="yyyy/MM/dd"
          value={datetime}
          onChange={setDatetime}
          disabled={!editable}
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
