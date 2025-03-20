"use client";

import { useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, Button, TextField } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useEvents } from "@/data/fetch/events/character";

import type { UUID } from "@/types/uuid";
import type { CatchingUpEvent } from "@/types/events";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  downtime?: number;
  event?: CatchingUpEvent;
};

export function DTEventCatchup(props: PropsType) {
  const { onClose, downtime, characterUUID, event } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent, updateEvent } = useEvents(characterUUID);

  const [details, setDetails] = useState(event ? event.details : "");
  const [datetime, setDatetime] = useState<Date | null>(
    event ? new Date(event.datetime) : new Date(),
  );

  const editable = event ? event.editable : true;
  const isNewEvent = !event;

  const handleSubmit = () => {
    const data = {
      event_type: "dt_catchingup",
      details: details,
      datetime: datetime ?? undefined,
    } as CatchingUpEvent;

    if (isNewEvent) {
      createEvent(data)
        .then(() => {
          displayMessage("Catching up event added to log", "success");
          onClose && onClose();
        })
        .catch((error) => displayMessage(error.response.data.message, "error"));
    } else {
      updateEvent({ ...event, ...data })
        .then(() => {
          displayMessage("Catching up event updated", "success");
          onClose && onClose();
        })
        .catch((error) => displayMessage(error.response.data.message, "error"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
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
        value={details}
        onChange={(e) => setDetails(e.target.value.substring(0, 256))}
        label="Details(optional)"
        disabled={!editable}
        multiline
        minRows={3}
        maxRows={6}
      />

      {editable && (
        <Button
          variant="contained"
          sx={{ width: "60%", margin: "auto" }}
          onClick={handleSubmit}
          disabled={downtime !== undefined && downtime < 10}
        >
          {isNewEvent ? "Gain a level (10 downtime days)" : "Update event"}
        </Button>
      )}
    </Box>
  );
}

export default DTEventCatchup;
